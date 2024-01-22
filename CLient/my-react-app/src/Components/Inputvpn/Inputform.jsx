import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import './inputvpn.css'
import Button from 'react-bootstrap/Button';
import { FaTimes } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from '../Toast/Toast'; // Import the Toast 



const Inputform = ({ setSearchResultVisible, setShowPopup}) => {
  const [showForm, setShowForm] = useState(true);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

    const [BranchCode,setBranchCode] = useState("");
    const [BranchName,setBranchName] = useState("");
    const [BranchAddress,setBranchAddress]=useState("");
    const [TelephoneNumber,setTelephoneNumber] = useState("");
    const [Email,setEmail] = useState("");
    const [MobileNumber,setMobileNumber] = useState("");
    const [VPNCircuitID,setVPNCircuitID] = useState("");
    const [GatewayIP,setGatewayIP] = useState("");
    const [ServerIP,setServerIP] = useState("");
    const [ManagerPCIP,setManagerPCIP] = useState("");
    const [FingerPrintIP,setFingerPrintIP] = useState("");
    const [AP,setAP] = useState("");
    const [LQAP,setLQAP] = useState("");
    const [POS01,setPOS01] = useState("");
    const [POS02,setPOS02] = useState("");
    const [POS03,setPOS03] = useState("");
    const [POS04,setPOS04] = useState("");
    const [POS05,setPOS05] = useState("");
  
  useEffect(()=> {
      setShowForm(true);
    return () =>{
      setShowForm(false); 
      
    };
  },[setSearchResultVisible]);
  
  
  const submitReview = async (e) => {

    e.preventDefault();
    console.log("submit button clicked");
  
    const requiredFields = [BranchCode, BranchName, BranchAddress,TelephoneNumber,Email,
      MobileNumber,VPNCircuitID,GatewayIP,ServerIP,ManagerPCIP,FingerPrintIP,AP,LQAP,POS01,POS02,POS03,POS04,POS05,];
    if (requiredFields.some(field => !field.trim())) {
      // Show error toast for empty fields
      setShowToast(true);
      showToastMessage('Please fill in all required fields', 'danger');

      setTimeout(() => {
        setShowToast(false);
      }, 3000)
      return;
    }

    try {
      console.log("Before axios.post");
      const response = await axios.post("http://localhost:3001/insert", {
        BranchCode,
        BranchName,
        BranchAddress,
        TelephoneNumber,
        Email,
        MobileNumber,
        VPNCircuitID,
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
      });
      console.log("Before axios.post");
  
      if (response.data.message === 'Values Inserted') {
        // Reset form fields after successful submission
        resetFormFields();
  
        // Operation was successful
        console.log("Successful Insert");
        setShowToast(true);
        showToastMessage('Successful Insert', 'success');
  
        // setShowForm(false);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      } else {
        console.error("Insert Unsuccessful");
      }
       
       
      } catch (error) {
        if (error.response && error.response.status === 409) {
          // Duplicate entry error handling
          setShowToast(true);
          showToastMessage('Duplicate Entry: This data already exists', 'danger');
          console.error('Duplicate entry:', error.response.data.error);
        } else {
          // Other error handling
          setShowToast(true);
          showToastMessage(`Unexpected error: ${error.message}`, 'danger');
          console.error('Error:', error.message);
        }
      }

  };
  const resetFormFields = () => {
    setBranchCode("");
    setBranchName("");
    setBranchAddress("");
    setTelephoneNumber("");
    setEmail("");
    setMobileNumber("");
    setVPNCircuitID("");
    setGatewayIP("");
    setServerIP("");
    setManagerPCIP("");
    setFingerPrintIP("");
    setAP("");
    setLQAP("");
    setPOS01("");
    setPOS02("");
    setPOS03("");
    setPOS04("");
    setPOS05("");
  };

 const handleCloseForm = () => {
  setShowForm(false);
  setSearchResultVisible(true);
  setShowPopup(false);
   
};


  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type); 
    setShowToast(true);
  };
  
 
  return (
    <div className={`formInput ${showForm ? 'show' : 'hide'}`}>
      
      {showForm && (
          <form  onSubmit={submitReview}> 
         
              <div className='VpnDetails'>
              <div className='formRow'  style={{ position: 'relative' }}>
              <h2>VPN Details</h2>
              <FaTimes className="close-icon1" onClick={handleCloseForm} />
              <Button type='submit' variant="info" style={{ position: 'absolute', top: 3, right: 10 }}>UPDATE</Button>
              </div>
              <legend> Branch Details</legend>
                <div className='formRow'>
                  <div className='formColumn'>
                  <label>Branch Code</label>
                  <input  type='text' name='BranchCode' placeholder='Branch Code' onChange={(e)=>{
                    setBranchCode(e.target.value)
                  }}/> 
                  </div>
                  <div className='formColumn'>
                  <label>Branch Name</label>
                  <input type='text'  name='BranchName' placeholder='Branch Name' onChange={(e)=>{
                    setBranchName(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>Branch Address</label>
                  <textarea className='form-input-large1'  name='BranchAddress' placeholder='Branch Address' onChange={(e)=>{
                    setBranchAddress(e.target.value)
                  }}/> 
                  </div>
                  <div className='formColumn'>
                  <label>Telephone Number</label>
                  <input  type='text' name='TelephoneNumber' placeholder='Telephone Number'onChange={(e)=>{
                    setTelephoneNumber(e.target.value)
                  }}/>  
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>Email</label>
                  <input  type='text' name='Email' placeholder='Email'onChange={(e)=>{
                    setEmail(e.target.value)
                  }}/>
                  </div>
                  
                   <div className='formColumn'>
                  <label>Mobile Number</label>
                  <input  type='text' name='MobileNumber' placeholder='Mobile Number'onChange={(e)=>{
                    setMobileNumber(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div/>
                  <hr></hr>
                  <legend>Network Details</legend>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>VPN Circuit ID</label>
                  <input  type='text' name='VPNCircuitID' placeholder='VPN Circuit ID'onChange={(e)=>{
                    setVPNCircuitID(e.target.value)
                  }}/>  
                  </div>
                  <div className='formColumn'>
                  <label>Gateway IP</label>
                  <input  type='text' name='GatewayIP' placeholder='Gateway IP'onChange={(e)=>{
                    setGatewayIP(e.target.value)
                  }}/> 
                  
                  </div>
                  </div>
                   <div className='formRow'>
                   <div className='formColumn'>
                  <label>Server IP</label>
                  <input  type='text' name='ServerIP' placeholder='Server IP'onChange={(e)=>{
                    setServerIP(e.target.value)
                  }}/> 
                   
                  </div>
                  <div className='formColumn'>
                  <label>ManagerPC IP</label>
                  <input  type='text' name='ManagerPCIP' placeholder='ManagerPC IP'onChange={(e)=>{
                    setManagerPCIP(e.target.value)
                  }}/>  
                 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>FingerPrint IP</label>
                  <input  type='text' name='FingerPrintIP' placeholder='FingerPrint IP'onChange={(e)=>{
                    setFingerPrintIP(e.target.value)
                  }}/> 
                  </div>
                  <div className='formColumn'>
                  <label>AP</label>
                  <input  type='text' name='AP' placeholder='AP'onChange={(e)=>{
                    setAP(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <hr></hr>
                  <legend> POS Machine Details</legend>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>LQAP</label>
                  <input  type='text' name='LQAP' placeholder='LQAP'onChange={(e)=>{
                    setLQAP(e.target.value)
                  }}/>  
                  </div>
                  <div className='formColumn'>
                  <label>POS 01</label>
                  <input  type='text' name='POS01' placeholder='POS 01'onChange={(e)=>{
                    setPOS01(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>POS 02</label>
                  <input  type='text' name='POS02' placeholder='POS 02'onChange={(e)=>{
                    setPOS02(e.target.value)
                  }}/>  
                  </div>
                  <div className='formColumn'>
                  <label>POS 03</label>
                  <input  type='text' name='POS03' placeholder='POS 03'onChange={(e)=>{
                    setPOS03(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>POS 04</label>
                  <input  type='text' name='POS04'placeholder='POS 04'onChange={(e)=>{
                    setPOS04(e.target.value)
                  }}/>  
                  </div>
                  <div className='formColumn'>
                  <label>POS 05</label>
                  <input  type='text' name='POS05' placeholder='POS 05'onChange={(e)=>{
                    setPOS05(e.target.value)
                  }}/>  
                  </div>
                  </div>
                 
                </div>
                
          </form>
           
      )}
       {showToast && (
            <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
            )}
     </div>
     
  );
};

export default Inputform