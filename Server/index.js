const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors'); 


const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Root@#1",
    database:"vpndb",
    insecureAuth: true,
})
pool.getConnection((err,conn)=>{
    if(err){
        console.error('Error connecting to Mysql:',err);
        return;
    }
    console.log('Connected to Mysql!');
    conn.release();
});
app.use(bodyParser.json());
app.use(cors());
// API endpoint for searching by name
app.post('/search', (req, res) => {
  const { name } = req.body;
  const query = `SELECT * FROM vpninfo WHERE BranchName = '${name}'`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      console.log(results);
    }
  });
});

// Add a new API endpoint for suggestions
app.get('/suggestions', (req, res) => {
  const { term } = req.query;
  const query = `SELECT BranchName FROM vpninfo WHERE BranchName LIKE '${term}%' LIMIT 5`;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const suggestions = results.map((result) => result.BranchName);
      res.json(suggestions);
    }
  });
});

app.post("/insert",(req,res)=>{

  const BranchCode = req.body.BranchCode
  const BranchName = req.body.BranchName
  const BranchAddress = req.body.BranchAddress
  const TelephoneNo = req.body.TelephoneNumber
  const Email = req.body.Email
  const MobileNo = req.body.MobileNumber
  const VPNCircuitID = req.body.VPNCircuitID
  const GatewayIP = req.body.GatewayIP
  const ServerIP = req.body.ServerIP
  const ManagerPcIP = req.body.ManagerPCIP
  const FingerPrintIP = req.body.FingerPrintIP
  const AP = req.body.AP
  const LQAP = req.body.LQAP
  const POS01 = req.body.POS01
  const POS02 = req.body.POS02
  const POS03 = req.body.POS03
  const POS04 = req.body.POS04
  const POS05 = req.body.POS05
  try {
    const sqlInsert =
      "INSERT INTO vpninfo (BranchId,BranchName,BranchAddress,BranchTelephoneNo,Email,MobileNo,VPN_Circuit_ID,VPN_GatewayIP,ServerIP,BackOfficeIP,FingerPrint_IP,POS01,POS02,POS03,POS04,POS05,POS06,POS07) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    pool.query(
      sqlInsert,
      [
        BranchCode,
        BranchName,
        BranchAddress,
        TelephoneNo,
        Email,
        MobileNo,
        VPNCircuitID,
        GatewayIP,
        ServerIP,
        ManagerPcIP,
        FingerPrintIP,
        AP,
        LQAP,
        POS01,
        POS02,
        POS03,
        POS04,
        POS05,
      ],
      (err, result) => {
        if (err) {
          console.error(err);

          if (err.code === 'ER_DUP_ENTRY') {
            res.status(409).json({ error: 'Duplicate entry' });
          } else {
            res.status(500).json({ error: 'Internal server error' });
          }
        } else {
          res.status(200).json({ message: 'Values Inserted' });
          console.log(result)
          //res.send('Values Inserted');
        }
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
 
app.put('/update',(req,res)=>{
  const updatedData = req.body;
  const {BranchId,BranchName,BranchAddress,BranchTelephoneNo,Email,MobileNo,VPN_Circuit_ID,VPN_GatewayIP,ServerIP,BackOfficeIP,FingerPrint_IP,POS01,POS02,POS03,POS04,POS05,POS06,POS07}=updatedData;
  const updateColumns = Object.keys(updatedData)
  .filter(column =>column !== 'BranchId')
  .map(column => `${column} = '${updatedData[column]}'`)
  .join(', ');
  const query = `UPDATE vpninfo SET ${updateColumns} WHERE  BranchId = '${BranchId}' `;
  console.log('Executing query:',query);

  pool.query(query,[BranchId,BranchName,BranchAddress,BranchTelephoneNo,Email,MobileNo,VPN_Circuit_ID,VPN_GatewayIP,ServerIP,BackOfficeIP,FingerPrint_IP,POS01,POS02,POS03,POS04,POS05,POS06,POS07],(err,result) => {
    if(err){
      console.error('Error updating data: ',err);
      res.status(500).json({error:'Internal Server Error'});
    }else{
      res.json({message:'data updated successfully!'});
      console.log('Succesful',result);
    }
  })
})
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});