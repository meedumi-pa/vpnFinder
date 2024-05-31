const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const bcrypt = require("bcryptjs");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Root@#1",
  database: "vpndb",
  insecureAuth: true,
});
pool.getConnection((err, conn) => {
  if (err) {
    console.error("Error connecting to Mysql:", err);
    return;
  }
  console.log("Connected to Mysql!");
  conn.release();
});
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.get("/", (req, res) => {
  if (req.session.role) {
    // User is authenticated
    return res.json({ valid: true, role: req.session.role });
  } else {
    // User is not authenticated
    return res.json({ valid: false });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { usergroup, username, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(
      `INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?)`,
      [username, hashedPassword, email, usergroup]
    );
    console.log("success", res);
    res.json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) throw err;
      if (
        results.length === 0 ||
        !(await bcrypt.compare(password, results[0].password))
      ) {
        res.status(401).send("Invalid email or password");
      } else {
        req.session.user = {
          id: results[0].id,
          email: results[0].email,
          role: results[0].role, // Assuming 'role' is a column in the 'users' table
        };
        res.send({ role: results[0].role });
        //res.send("Login successful");
      }
    }
  );
});
const checkUserRole = (role) => {
  return (req, res, next) => {
    if (
      req.session.user &&
      req.session.user.role === role &&
      (role === "user" ||
        (role === "admin" &&
          (req.path === "/search" || req.path === "/reports")))
    ) {
      next();
    } else {
      res.status(403).send("Unauthorized");
    }
  };
};

// User routes
app.get("/user", checkUserRole("user"), (req, res) => {
  res.send("User Page");
});

// Admin routes
app.get("/admin", checkUserRole("admin"), (req, res) => {
  res.send("Admin Page");
});

// Search page accessible to both users and admins
app.get("/search-user", checkUserRole("user"), (req, res) => {
  res.send("Search Page");
});

// Reports page accessible to both users and admins
app.get("/reports", checkUserRole("user"), (req, res) => {
  res.send("Reports Page");
});

// VPN page accessible only to admins
app.get("/addvpn", checkUserRole("admin"), (req, res) => {
  res.send("VPN Page");
});
// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   pool.query(
//     `SELECT * FROM users WHERE email = ?`,
//     [email],
//     (error, results, fields) => {
//       if (error) {
//         console.error("Error querying database:", error.message);
//         return res.status(500).json({ message: "Internal server error" });
//       }
//       if (results.length === 0) {
//         return res.status(401).json({ message: "Invalid email or password" });
//       }

//       const user = results[0];
//       // Compare hashed password with provided password using bcrypt
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) {
//           console.error("Error comparing passwords:", err.message);
//           return res.status(500).json({ message: "Internal server error" });
//         }
//         if (!result) {
//           return res.status(401).json({ message: "Invalid email or password" });
//         }
//         if (results.length > 0) {
//           req.session.role = user.role;

//           return res.json({ Login: true });
//         } else {
//           return res.json({ Login: false });
//         }
//       });
//     }
//   );
// });

app.get("/logout", (req, res) => {
  return res.json({ Status: "success" });
});

app.put("/pwd", (req, res) => {
  const { email, password } = req.body;

  // Generate salt and hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const query = `UPDATE users SET password = ? WHERE email = ?`;
    pool.query(query, [hashedPassword, email], (err, results, fields) => {
      if (err) {
        console.error("Error executing MySQL Query:", err);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json({ message: "Data updated successfully!" });
        console.log("Successful", results);
      }
    });
  });
});

app.post("/search", (req, res) => {
  const { name } = req.body;
  const query = `SELECT * FROM branchdetails b
  LEFT JOIN managerinfo_ m ON b.Branch_Code = m.Branch_Code_M
  LEFT JOIN networkdetails n ON b.Branch_Code = n.Branch_Code_N
  LEFT JOIN posdetails p ON b.Branch_Code = p.Branch_Code_P
  LEFT JOIN scaleinfo s ON b.Branch_Code = s.Branch_Code_S
  WHERE b.Branch_Code = ? OR b.Branch_Name = ?
  `;

  pool.query(query, [name, name], (err, results, fields) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const formattedResults = results.map((result) => ({
        ...result,
        OpeningDate: formatDate(result.OpeningDate),
      }));

      res.json(formattedResults);
    }
  });
});
function formatDate(dateString) {
  console.log("Received date string:", dateString);

  if (!dateString) {
    return null; // Handle null or empty values gracefully
  }

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    console.error("Invalid date string:", dateString);
    return null; // Handle invalid date strings
  }

  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
}

app.get("/suggestions", (req, res) => {
  const { term } = req.query;
  const searchTerm = `%${term}%`;

  const query = `
    SELECT Branch_Name AS suggestion FROM branchdetails b WHERE b.Branch_Name LIKE ? 
    UNION 
    SELECT Branch_Code AS suggestion FROM branchdetails b WHERE b.Branch_Code LIKE ?
    LIMIT 5`;

  pool.query(query, [searchTerm, searchTerm], (err, results, fields) => {
    if (err) {
      console.error("Error executing MySQL query:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      const suggestions = results.map((result) => result.suggestion);
      res.json(suggestions);
    }
  });
});

app.post("/insert", (req, res) => {
  const {
    BranchCode,
    BranchType,
    BranchName,
    BranchAddress,
    TelephoneNumber,
    Email,
    openDate,
    selectedProvince,
    selectedDistrict,
    DSdevision,
    VPNCircuitID,
    SDWanID,
    GatewayIP,
    ServerIP,
    ManagerPCIP,
    FingerPrintIP,
    AP,
    LQAP,
    POS01,
    POS02,
    POS03,
    POS04,
    POS05,
    POS06,
    LQ_POS01,
    LQ_POS02,
    Scale01,
    Scale02,
    Scale03,
    Scale04,
    Scale05,
    Scale06,
    Region,
    AreaManagerName,
    Epf_AM,
    ContactNo_Am,
    BranchManagerName,
    Epfno_sm,
    ContactNo_Sm,
  } = req.body;

  try {
    // Start transaction
    pool.getConnection((err, conn) => {
      if (err) {
        throw err;
      }

      conn.beginTransaction((err) => {
        if (err) {
          throw err;
        }

        // Insert data into BranchDetails table
        conn.query(
          `INSERT INTO BranchDetails (
            Branch_Code,
            Branch_Type,
            Branch_Name,
            Branch_Address,
            Branch_TelephoneNo,
            Branch_Email,
            OpeningDate,
            Province,
            District,
            DS_Division,
            Region
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            BranchCode,
            BranchType,
            BranchName,
            BranchAddress,
            TelephoneNumber,
            Email,
            openDate,
            selectedProvince,
            selectedDistrict,
            DSdevision,
            Region,
          ],
          (err, result) => {
            if (err) {
              conn.rollback(() => {
                throw err;
              });
            } else {
              console.log(result);
            }

            // Insert data into NetworkDetails table
            conn.query(
              `INSERT INTO NetworkDetails (
                Branch_Code_N,
                VPN_CircuitID,
                SDWAN_CircuitID,
                VPN_GatewayIP,
                ServerIP,
                BackOfficeIP,
                FingerPrintIP,
                AP_IP,
                LQAP_IP
              ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
              [
                BranchCode,
                VPNCircuitID,
                SDWanID,
                GatewayIP,
                ServerIP,
                ManagerPCIP,
                FingerPrintIP,
                AP,
                LQAP,
              ],
              (err, result) => {
                if (err) {
                  conn.rollback(() => {
                    throw err;
                  });
                }

                // Insert data into POSDetails table
                conn.query(
                  `INSERT INTO POSDetails (
                    Branch_Code_P,
                    POS01,
                    POS02,
                    POS03,
                    POS04,
                    POS05,
                    POS06,
                    LQPOS01,
                    LQPOS02
                  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`,
                  [
                    BranchCode,
                    POS01,
                    POS02,
                    POS03,
                    POS04,
                    POS05,
                    POS06,
                    LQ_POS01,
                    LQ_POS02,
                  ],
                  (err, result) => {
                    if (err) {
                      conn.rollback(() => {
                        throw err;
                      });
                    }

                    //Insert data into Scaleinfo table
                    conn.query(
                      `INSERT INTO Scaleinfo (
                      Branch_Code_S,
                      Scale01,
                      Scale02,
                      Scale03,
                      Scale04,
                      Scale05,
                      Scale06
                    ) VALUES (?,?,?,?,?,?,?)`,
                      [
                        BranchCode,
                        Scale01,
                        Scale02,
                        Scale03,
                        Scale04,
                        Scale05,
                        Scale06,
                      ],
                      (err, result) => {
                        if (err) {
                          conn.rollback(() => {
                            throw err;
                          });
                        }
                      }
                    );

                    // Insert data into Managerinfo table
                    conn.query(
                      `INSERT INTO Managerinfo_ (
                        Branch_Code_M,
                        Area_Manager_Name,
                        EPF_AM,
                        Contact_AM,
                        Branch_Manager_Name,
                        EPF_BM,
                        Contact_BM
                      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                      [
                        BranchCode,
                        AreaManagerName,
                        Epf_AM,
                        ContactNo_Am,
                        BranchManagerName,
                        Epfno_sm,
                        ContactNo_Sm,
                      ],
                      (err, result) => {
                        if (err) {
                          conn.rollback(() => {
                            throw err;
                          });
                        }

                        // Commit transaction if all queries are successful
                        conn.commit((err) => {
                          if (err) {
                            conn.rollback(() => {
                              throw err;
                            });
                          }
                          console.log("Transaction Complete.");
                          res.send("Transaction Complete.");
                        });
                      }
                    );
                  }
                );
              }
            );
          }
        );
      });
    });
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Error inserting data.");
  }
});

app.put("/update", (req, res) => {
  const updatedData = req.body;
  const { Branch_Code, ...otherData } = updatedData;
  const { status } = otherData;

  // Exclude status from otherData
  delete otherData.status;

  // Construct the SET part of the SQL query

  const updateColumns = Object.keys(otherData)
    .map((column) => `${column} = '${otherData[column]}'`)
    .join(", ");

  // Include status in the WHERE clause
  const query = `UPDATE 
    branchdetails b
    JOIN managerinfo_ m ON b.Branch_Code = m.Branch_Code_M
    JOIN networkdetails n ON b.Branch_Code = n.Branch_Code_N
    JOIN posdetails p ON b.Branch_Code = p.Branch_Code_P 
    JOIN scaleinfo s ON b.Branch_Code = s.Branch_Code_S
    SET ${updateColumns}
    WHERE b.Branch_Code = '${Branch_Code}'`;

  console.log("Executing query:", query);

  pool.query(query, (err, result) => {
    if (err) {
      console.error("Error updating data: ", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json({ message: "data updated successfully!" });
      console.log("Successful", result);
    }
  });
});
app.get("/reports", (req, res) => {
  const { term1, term2 } = req.query;
  // const searchStatus = `%${cterm}%`;
  try {
    let query;

    switch (term1) {
      case "alldetails":
        query = `
          SELECT 
            b.Branch_Code, b.Branch_Name, b.Branch_Address, b.Branch_TelephoneNo, b.Branch_Email, b.OpeningDate,
            b.Province, b.District, b.DS_Division, b.Region,
            m.Area_Manager_Name, m.Contact_AM, m.Branch_Manager_Name, m.Contact_BM,
            n.VPN_CircuitID, n.SDWAN_CircuitID, n.VPN_GatewayIP, n.ServerIP, n.BackOfficeIP, n.FingerPrintIP, n.AP_IP, n.LQAP_IP,
            p.POS01, p.POS02, p.POS03, p.POS04, p.POS05, p.POS06, p.LQPOS01, p.LQPOS02
          FROM 
            branchdetails b
            JOIN managerinfo_ m ON b.Branch_Code = m.Branch_Code_M
            JOIN networkdetails n ON b.Branch_Code = n.Branch_Code_N
            JOIN posdetails p ON b.Branch_Code = p.Branch_Code_P`;
        break;

      case "region":
        // Ensure to properly sanitize input to prevent SQL injection
        query = `
          SELECT 
            b.*, m.*, n.*, p.*
          FROM 
            branchdetails b
            JOIN managerinfo_ m ON b.Branch_Code = m.Branch_Code_M
            JOIN networkdetails n ON b.Branch_Code = n.Branch_Code_N
            JOIN posdetails p ON b.Branch_Code = p.Branch_Code_P
          WHERE 
            b.Region = '${term2}'`;
        break;

      case "province":
        // Ensure to properly sanitize input to prevent SQL injection
        query = `
          SELECT 
            b.Branch_Code, b.Branch_Name, b.Branch_Address, b.Branch_TelephoneNo, b.Branch_Email, b.OpeningDate,
            b.Province, b.District, b.DS_Division, b.Region,
            m.Area_Manager_Name, m.Contact_AM, m.Branch_Manager_Name, m.Contact_BM,
            n.VPN_CircuitID, n.SDWAN_CircuitID, n.VPN_GatewayIP, n.ServerIP, n.BackOfficeIP, n.FingerPrintIP, n.AP_IP, n.LQAP_IP,
            p.POS01, p.POS02, p.POS03, p.POS04, p.POS05, p.POS06, p.LQPOS01, p.LQPOS02
          FROM 
            branchdetails b
            JOIN managerinfo_ m ON b.Branch_Code = m.Branch_Code_M
            JOIN networkdetails n ON b.Branch_Code = n.Branch_Code_N
            JOIN posdetails p ON b.Branch_Code = p.Branch_Code_P
          WHERE 
            b.Province = '${term2}'`;
        break;
      case "district":
        // Ensure to properly sanitize input to prevent SQL injection
        query = `
          SELECT 
            b.Branch_Code, b.Branch_Name, b.Branch_Address, b.Branch_TelephoneNo, b.Branch_Email, b.OpeningDate,
            b.Province, b.District, b.DS_Division, b.Region,
            m.Area_Manager_Name, m.Contact_AM, m.Branch_Manager_Name, m.Contact_BM,
            n.VPN_CircuitID, n.SDWAN_CircuitID, n.VPN_GatewayIP, n.ServerIP, n.BackOfficeIP, n.FingerPrintIP, n.AP_IP, n.LQAP_IP,
            p.POS01, p.POS02, p.POS03, p.POS04, p.POS05, p.POS06, p.LQPOS01, p.LQPOS02
          FROM 
            branchdetails b
            JOIN managerinfo_ m ON b.Branch_Code = m.Branch_Code_M
            JOIN networkdetails n ON b.Branch_Code = n.Branch_Code_N
            JOIN posdetails p ON b.Branch_Code = p.Branch_Code_P
          WHERE 
            b.District = '${term2}'`;
        break;
      default:
        return res.status(400).send("Invalid option");
    }

    console.log("Executing query:", query);
    console.log("Term:", term1, term2);

    pool.query(query, [term1, term2], (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      // Log the query result for
      console.log("Query result:", result);

      if (result.length === 0) {
        // No data found for the specified term
        return res
          .status(404)
          .json({ error: "No data found for the specified term" });
      }

      // Data found, send it as JSON response
      res.json(result);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal server error");
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
