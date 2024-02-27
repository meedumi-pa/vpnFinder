import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import './inputvpn.css'
import Button from 'react-bootstrap/Button';
import { FaTimes } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import Toast from '../Toast/Toast';  



const Inputform = ({ setSearchResultVisible}) => {
  const [showForm, setShowForm] = useState(true);
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');

  const provinces = [
    {id:1,name:'Northern Province',districts:['Jaffna','Kilinochchi','Mannar','Mullativu','Vavuniya']},
    {id:2,name:'North Western Provine',districts:['Kurunegala','Puttalam']},
    {id:3,name:'Western Province', districts:['Colombo','Gampaha','Kalutara']},
    {id:4,name:'North Central Province',districts:['Anuradhapura','Polonnaruwa']},
    {id:5,name:'Central Province',districts:['Kandy','Matale','Nuwara Eliya']},
    {id:6,name:'Sabaragamuwa Province',districts:['Kegalle','Ratnapura']},
    {id:7,name:'Eastern Province',districts:['Ampara','Batticoloa','Trincomalee']},
    {id:8,name:'Uva Province',districts:['Badulla','Monaragala']},
    {id:9,name:'Southern Province',districts:['Galle','Matara','Hambantota']}
  ];
    const [warehouseChecked, setWarehouseChecked] = useState(false);
    const [branchChecked, setBranchChecked] = useState(false);
    const [rmOfficeChecked, setRmOfficeChecked] = useState(false);
    const [SelectedProvince,setSelectedProvince] = useState("");
    const [SelectedDistrict,setSelectedDistrict] = useState("");
    const [status,setStatus] = useState("");
    const [Region,setRegion] = useState("");
    const [openDate,setOpenDate] = useState("");
    const [BranchCode,setBranchCode] = useState("");
    const [BranchName,setBranchName] = useState("");
    const [BranchAddress,setBranchAddress]=useState("");
    const [TelephoneNumber,setTelephoneNumber] = useState("");
    const [Email,setEmail] = useState("");
    const [MobileNumber,setMobileNumber] = useState("");
    const [VPNCircuitID,setVPNCircuitID] = useState("");
    const [SdWanID,setSdWanId]=useState("");
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
    const [POS06,setPOS06] = useState("");
    const [POS07,setPOS07] = useState("");
    const [AreaManagerName,setAreaManagerName] = useState("");
    const [EPFno_Am,setEPFno_Am]=useState("");
    const [ContactNo_Am,setContactNo_Am] = useState("");
    const [branchManagerName,setBranchManagerName] = useState("");
    const [EPFno_Sm,setEPFno_Sm]=useState("");
    const [ContactNo_Sm,setContactNo_sm] = useState("");


    const [togglemode,setTogglemode] = useState(false);
    const [togglemode2,setTogglemode2] = useState(false);
    const [togglemode3,setTogglemode3] = useState(false);
    const [togglemode4,setTogglemode4] = useState(false);
  
  useEffect(()=> {
      setShowForm(true);
    return () =>{
      setShowForm(false); 
      
    };
  },[setSearchResultVisible]);

  const handleProvinceChange = (event) => {
    const provinceId = event.target.value;
    const province = provinces.find(p => p.id === parseInt(provinceId));
    setSelectedProvince(provinceId);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event) => {
    setSelectedDistrict(event.target.value);
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    
    switch (name) {
      case 'warehouse':
        setWarehouseChecked(checked);
        break;
      case 'branch':
        setBranchChecked(checked);
        break;
      case 'rmOffice':
        setRmOfficeChecked(checked);
        break;
      default:
        break;
    }
  };
  const submitReview = async (e) => {

    e.preventDefault();
    console.log("submit button clicked");
    const status = {
      warehouse: warehouseChecked,
      branch: branchChecked,
      rmOffice: rmOfficeChecked,
    };
  
    const requiredFields = [BranchCode, BranchName, BranchAddress,TelephoneNumber,Email,
      MobileNumber,VPNCircuitID,GatewayIP,ServerIP,ManagerPCIP,FingerPrintIP,AP,LQAP,POS01,POS02,POS03,
      POS04,POS05,POS06,POS07,Region,openDate,AreaManagerName,EPFno_Am,ContactNo_Am,branchManagerName,EPFno_Sm,ContactNo_Sm];
    if (requiredFields.some(field => !field.trim())) {
     
      setShowToast(true);
      showToastMessage('Please fill in all required fields', 'danger');

      setTimeout(() => {
        setShowToast(false);
      }, 3000)
      return;
    }
    
    try {
      
      const response = await axios.post("http://localhost:3001/insert", {
        BranchCode,BranchName,BranchAddress,TelephoneNumber,Email,MobileNumber,VPNCircuitID,
        GatewayIP, ServerIP,ManagerPCIP,FingerPrintIP,AP,LQAP,POS01,POS02,POS03,POS04,
        POS05,POS06,POS07,Region,openDate,AreaManagerName,EPFno_Am,ContactNo_Am,branchManagerName,EPFno_Sm,ContactNo_Sm,status,SelectedProvince,SelectedDistrict,SdWanID,
      });
    
  
      // if (response.data.message === 'Values Inserted') {
        // Reset form fields after successful submission
        resetFormFields();
  
        // Operation was successful
        console.log("Successful Insert");
        setShowToast(true);
        showToastMessage('Successful Insert', 'success');
  
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
        setShowForm(false);
      // } else {
      //   console.error("Insert Unsuccessful");
      //   console.error.response;
      // }
       
       
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
    if (!showForm) {
    setOpenDate("");
    setRegion("");
    setBranchCode("");
    setBranchName("");
    setBranchAddress("");
    setTelephoneNumber("");
    setEmail("");
    setMobileNumber("");
    setVPNCircuitID("");
    setSdWanId("");
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
    setPOS06(" ");
    setPOS07(" ");
    setAreaManagerName(" ");
    setContactNo_Am(" ");
    setEPFno_Am(" ");
    setBranchManagerName("");
    setContactNo_sm(" ");
    setEPFno_Sm(" ");
    }
  };

 const handleCloseForm = () => {
  setShowForm(false);
  setSearchResultVisible(true);
  
};



  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type); 
    setShowToast(true);
  };

 
  const handleToggleMode = () => {
    
    setTogglemode(!togglemode);
    setTogglemode2(false);
    setTogglemode3(false);
    setTogglemode4(false);
};

const handleToggleMode2 = () => {
    setTogglemode(false);
    setTogglemode2(!togglemode2);
    setTogglemode3(false);
    setTogglemode4(false);
};

const handleToggleMode3 = () => {
    setTogglemode(false);
    setTogglemode2(false);
    setTogglemode3(!togglemode3);
    setTogglemode4(false);
};

const handleToggleMode4 = () => {
    setTogglemode(false);
    setTogglemode2(false);
    setTogglemode3(false);
    setTogglemode4(!togglemode4);
};
const handleResetIForm = ()=>{
  setOpenDate("");
  setRegion("");
  setBranchCode("");
  setBranchName("");
  setBranchAddress("");
  setTelephoneNumber("");
  setEmail("");
  setMobileNumber("");
  setVPNCircuitID("");
  setSdWanId("");
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
  setPOS06(" ");
  setPOS07(" ");
  setAreaManagerName(" ");
  setContactNo_Am(" ");
  setEPFno_Am(" ");
  setBranchManagerName("");
  setContactNo_sm(" ");
  setEPFno_Sm(" ");
}
  return (
    <div className={`formInput ${showForm ? 'show' : 'hide'}`}>
       
      {showForm && (
          // <form  onSubmit={submitReview}> 
         
              <div className='formContainer'>
              <div className='formRow'  style={{ position: 'relative' }}>
              <legend className='topic' style={{fontSize:'20px'}}> Add VPN Details</legend>
              <FaTimes className="close-icon1" onClick={handleCloseForm} />
              <Button type='submit' variant="success" onClick={submitReview} style={{ position: 'absolute', top: 0, right: 20 }}>UPDATE</Button>
              <Button type='submit' variant="success" onClick={handleResetIForm} style={{ position: 'absolute', top: 0, right: 130 }}>RESET</Button>
              </div>
              <div className={`toggleBranch toggleBranch1 ${togglemode ? 'active' : ''}`} onClick={handleToggleMode}>
              <legend> Branch Details</legend>
              </div>
              {togglemode  && (
              <div className='details'>
  
              <div className='formRow'>
                <div className="checkbox-row">
              <label>Ware House</label>
              <input type='checkbox' 
                  name="warehouse"
                  checked={warehouseChecked}
                  onChange={handleCheckboxChange}/>
              <label>Branch</label>
              <input  type='checkbox' 
                name="branch"
                checked={branchChecked}
                onChange={handleCheckboxChange}/>
              <label>RM Office</label>
              <input  type='checkbox' 
                name="rmOffice"
                checked={rmOfficeChecked}
                onChange={handleCheckboxChange}/>
              </div>
              </div>
                   <div className='formRow'>
               <div className="formColumn">
                <label>Province:</label>
                <select id='provinces' name='province' value={SelectedProvince}  onChange={handleProvinceChange} >
                    <option>Select a Province..</option>
                  {provinces.map(province =>(
                     <option key={province.id} value={province.id}>{province.name}</option>
                  ))}
                  </select>
               </div>
            
              <div className='formColumn'>
                <label>District:</label>
                <select id="districts" value={SelectedDistrict} onChange={handleDistrictChange} disabled={!SelectedProvince}>
            <option value="">Select District</option>
            {SelectedProvince && provinces.find(p => p.id === parseInt(SelectedProvince)).districts.map((district, index) => (
            <option key={index} value={district}>{district}</option>
          ))}
          </select>
              </div>
        
              </div>
                 
              <div className='formRow'>
               <div className="formColumn">
                <label>Region:</label>
                <input type='text' name='Region' value={Region} placeholder='Region' onChange={(e)=>{
                  setRegion(e.target.value)}} />
               </div>
              
              <div className='formColumn'>
                <label>Opening Date:</label>
                <input type='date' name='openDate' value={openDate} placeholder='Opening Date' onChange={(e)=>{
                  setOpenDate(e.target.value);
                }}></input>
              </div>
              </div>
              
                <div className='formRow'>
                  <div className='formColumn'>
                  <label>Branch Code</label>
                  <input  type='text' name='BranchCode'value={BranchCode} placeholder='Branch Code' onChange={(e)=>{
                    setBranchCode(e.target.value)
                  }}/> 
                  </div>
                  <div className='formColumn'>
                  <label>Branch Name</label>
                  <input type='text'  name='BranchName'value={BranchName} placeholder='Branch Name' onChange={(e)=>{
                    setBranchName(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>Branch Address</label>
                  <textarea className='form-input-large1'  name='BranchAddress' value={BranchAddress} placeholder='Branch Address' onChange={(e)=>{
                    setBranchAddress(e.target.value)
                  }}/> 
                  </div>
                  <div className='formColumn'>
                  <label>Telephone Number</label>
                  <input  type='text' name='TelephoneNumber' value={TelephoneNumber} placeholder='Telephone Number'onChange={(e)=>{
                    setTelephoneNumber(e.target.value)
                  }}/>  
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>Email</label>
                  <input  type='text' name='Email'value={Email} placeholder='Email'onChange={(e)=>{
                    setEmail(e.target.value)
                  }}/>
                  </div>
                  
                   <div className='formColumn'>
                  <label>Mobile Number</label>
                  <input  type='text' name='MobileNumber' value={MobileNumber}placeholder='Mobile Number'onChange={(e)=>{
                    setMobileNumber(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  </div>
                )}
                
                <div className={`toggleBranch toggleBranch2 ${togglemode2 ? 'active' : ''}`} onClick={handleToggleMode2}>
                  <legend>Network Details</legend>
                  </div>
                  {togglemode2  && (
                    <div className='details'>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>VPN Circuit ID</label>
                  <input  type='text' name='VPNCircuitID' value={VPNCircuitID} placeholder='VPN Circuit ID'onChange={(e)=>{
                    setVPNCircuitID(e.target.value)
                  }} />  
                  </div>
                  <div className='formColumn'>
                  <label>SD WAN ID</label>
                  <input  type='text' name='SDWanID'value={SdWanID} placeholder='SDWanID'onChange={(e)=>{
                    setSdWanId(e.target.value)
                  }} /> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>Gateway IP</label>
                  <input  type='text' name='GatewayIP'value={GatewayIP} placeholder='Gateway IP'onChange={(e)=>{
                    setGatewayIP(e.target.value)
                  }} /> 
                  
                  </div>
                   <div className='formColumn'>
                  <label>Server IP</label>
                  <input  type='text' name='ServerIP' value={ServerIP} placeholder='Server IP'onChange={(e)=>{
                    setServerIP(e.target.value)
                  }} /> 
                   </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>ManagerPC IP</label>
                  <input  type='text' name='ManagerPCIP' value={ManagerPCIP} placeholder='ManagerPC IP'onChange={(e)=>{
                    setManagerPCIP(e.target.value)
                  }} />  
                  </div>
                 
                  <div className='formColumn'>
                  <label>FingerPrint IP</label>
                  <input  type='text' name='FingerPrintIP' value={FingerPrintIP} placeholder='FingerPrint IP'onChange={(e)=>{
                    setFingerPrintIP(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className="formRow">
                  <div className='formColumn'>
                  <label>AP</label>
                  <input  type='text' name='AP' value={AP} placeholder='AP'onChange={(e)=>{
                    setAP(e.target.value)
                  }} /> 
                  </div>
                  <div className='formColumn'>
                  <label>LQAP</label>
                  <input  type='text' name='LQAP'value={LQAP} placeholder='LQAP'onChange={(e)=>{
                    setLQAP(e.target.value)
                  }}/>  
                  </div>
                  </div>
                  </div>
                  )}
                 
                  <div className={`toggleBranch toggleBranch3 ${togglemode3 ? 'active' : ''}`} onClick={handleToggleMode3}>
                  <legend> POS Machine Details</legend>
                  </div>
                  {togglemode3 && (
                    <div className='details'>
                  <div className='formRow'>

                  <div className='formColumn'>
                  <label>POS 01</label>
                  <input  type='text' name='POS01' value={POS01 }placeholder='POS 01'onChange={(e)=>{
                    setPOS01(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>POS 02</label>
                  <input  type='text' name='POS02' value={POS02} placeholder='POS 02'onChange={(e)=>{
                    setPOS02(e.target.value)
                  }}/>  
                  </div>
                  <div className='formColumn'>
                  <label>POS 03</label>
                  <input  type='text' name='POS03' value={POS03} placeholder='POS 03'onChange={(e)=>{
                    setPOS03(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>POS 04</label>
                  <input  type='text' name='POS04' value={POS04} placeholder='POS 04'onChange={(e)=>{
                    setPOS04(e.target.value)
                  }}/>  
                  </div>
                  <div className='formColumn'>
                  <label>POS 05</label>
                  <input  type='text' name='POS05' value={POS05} placeholder='POS 05'onChange={(e)=>{
                    setPOS05(e.target.value)
                  }}/>  
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className='formColumn'>
                  <label>POS 06</label>
                  <input type='text' name='POS06' value={POS06} placeholder='POS 06'onChange={(e)=>{
                    setPOS06(e.target.value)
                  }}/>  
                  </div>
                  <div className='formColumn'>
                  <label>POS 07</label>
                  <input  type='text' name='POS07' value={POS07} placeholder='POS 07'onChange={(e)=>{
                    setPOS07(e.target.value)
                  }}/>  
                  </div>
                  </div>
               </div>
                  )}
                  <div className={`toggleBranch toggleBranch4 ${togglemode4 ? 'active' : ''}`} onClick={handleToggleMode4}>
              <legend>Manager's info</legend>
              </div>
              {togglemode4 &&(
                <div className='details'>
              <div className='formRow'>
               <div className="formColumn">
                <label>Area Manager Name:</label>
                <input type='text' name='AreaManagerName' value={AreaManagerName} placehlder='Area Manager Name' onChange={(e)=>{
                  setAreaManagerName(e.target.value)}} />
               </div>
               </div>
               <div className='formRow'>
               <div className="formColumn">
                <label>EPF No:</label>
                <input type='text' name='Epf-AM' value={EPFno_Am} placeholder='EPF No' onChange={(e)=>{
                  setEPFno_Am(e.target.value)}} />
               </div>
              <div className='formColumn'>
                <label>Contact Number:</label>
                <input type='text' name='ContactNumber' value={ContactNo_Am} placeholder='Contact Number' onChange={(e)=>{
                  setContactNo_Am(e.target.value);
                }}></input>
              </div>
              </div>
              
                <div className='formRow'>
                  <div className='formColumn'>
                  <label>Branch Manager Name</label>
                  <input  type='text' name='BranchManagerName' value={branchManagerName}placeholder='Branch Manager Name' onChange={(e)=>{
                    setBranchManagerName(e.target.value)
                  }}/> 
                  </div>
                  </div>
                  <div className='formRow'>
                  <div className="formColumn">
                   <label>EPF No:</label>
                   <input type='text' name='Epfno-sm'value={EPFno_Sm} placeholder='EPF No' onChange={(e)=>{
                     setEPFno_Sm(e.target.value)}} />
                  </div>
                  <div className='formColumn'>
                  <label>Contact Number</label>
                  <input type='text'  name='contactNumberSM' value={ContactNo_Sm} placeholder='Contact Number' onChange={(e)=>{
                    setContactNo_sm(e.target.value)
                  }}/> 
                  </div>
             </div> 
             </div>
              )}  
              </div>
          // </form>
          
           
      )}
       {showToast && (
            <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
            )}
     </div>
     
  );
};

export default Inputform