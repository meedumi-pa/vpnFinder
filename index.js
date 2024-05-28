const express = require("express");
const app = express();
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

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

app.post("/search", (req, res) => {
  const { name } = req.body;
  const query = `SELECT * FROM branchdetails b
  JOIN managerinfo_ m ON b.Branch_Code = m.Branch_Code_M
  JOIN networkdetails n ON b.Branch_Code = n.Branch_Code_N
  JOIN posdetails p ON b.Branch_Code = p.Branch_Code_P
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

// app.get("/status", (req, res) => {
//   const { term } = req.query;
//   const searchStatus = `%${term}%`;
//   const query = "SELECT * FROM vpninfo Where status LIKE ?";

//   pool.query(query, [searchStatus, searchStatus], (err, results) => {
//     if (err) {
//       console.error("Error executing MySQL query:", err);
//       res.status(500).json({ error: "Internal Server Error" });
//     } else {
//       const branchNames = results.map((result) => result.Region);
//       const uniqueBranchNames = [...new Set(branchNames)]; // Use Set to remove duplicates
//       res.json(uniqueBranchNames);
//       console.log(uniqueBranchNames);
//     }
//   });
// });
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

    // Perform database query based on selected option
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

    // Log the constructed query and the term value for debugging
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
