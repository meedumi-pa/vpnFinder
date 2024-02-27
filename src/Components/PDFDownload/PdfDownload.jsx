import React, { useState,useEffect } from 'react'
import axios from 'axios';
import jsPDF from 'jspdf';
import './pdfDownload.css';
import { FaTimes } from "react-icons/fa";

const PdfDownload = () => {
    const [selectedBranch, setSelectedBranch] = useState('');
    const [selectedRegion,setSelectedRegion] = useState('');
    const [selectedBranchCode,setSelectedBranchCode] = useState('');
    const [branchDetails, setBranchDetails] = useState(null);
  
    const [regionSuggestion,setRegionsuggestion] = useState([]);
    const [branchSuggestions,setBranchSuggestions] = useState([]);
    const [bCodeSuggestions,setbCodeSuggestions] = useState([]);

    const [showpdfForm,setshowpdfForm] = useState(true);  

    const handleRegion = async (event) => {
      const regionName = event.target.value;
      setSelectedRegion(regionName);
    
      const suggestRegionUrl = `http://localhost:3001/region?term=${encodeURIComponent(regionName)}`;
    
      try {
        const response = await axios.get(suggestRegionUrl);
        setRegionsuggestion(response.data);
      } catch (error) {
        console.error('Error fetching region suggestions:', error);
      }
    
      // Fetch branch names based on the selected region
      const suggestBranchUrl = `http://localhost:3001/branches?region=${encodeURIComponent(regionName)}`;
    
      try {
        const response = await axios.get(suggestBranchUrl);
        setBranchSuggestions(response.data); // Update branchSuggestions state with fetched branch names
        console.log('Branch Suggestions:', response.data); // Add this line to debug
      } catch (error) {
        console.error('Error fetching branch suggestions:', error);
      }
    };
    
    
    const handleBranchName = (event) => {
      setSelectedBranch(event.target.value);
    };
  
    const handleBranchCode = async (event) => {
      const bCode = event.target.value
      setSelectedBranchCode(bCode);

      const suggestBranchCodeUrl = `http://localhost:3001/branchdetails?term=${encodeURIComponent(bCode)}`;

      try{
        const response = await axios.get(suggestBranchCodeUrl);
        setbCodeSuggestions(response.data);
        console.log('BranchId Suggestions:', response.data);
      }catch (error) {
        console.error('Error fethching branch code suggestions:',error);
      }
    };
  
    const handleSuggestionClick = (value, type) => {
      switch (type) {
        case 'region':
          setSelectedRegion(value);
          setRegionsuggestion([]); // Clear suggestions after selection
          break;
        case 'branch':
          setSelectedBranch(value);
          setBranchSuggestions([]); // Clear suggestions after selection
          break;
        case 'branchCode':
          setSelectedBranchCode(value);
         
          break;
        default:
          break;
      }
    };
    const handleKeyPress = (event)=>{
      if(event.key === 'Enter' && onSearch){
        onSearch(selectedRegion);

        setSelectedRegion('');
        setRegionsuggestion([]);
        window.location.reload();
      }
    }

    const handleSubmit = async(event)=>{
        event.preventDefault();
        try{
            const response= await axios.post('http://localhost:3001/pdf',{
                bname:selectedBranch,
                branchCode: selectedBranchCode
            });
            const data =  response.data;
            console.log('Branch Details:', data);
            setBranchDetails(data);
        }catch (error){
            console.error('Error fetching branch details: ',error);
        }
    };
    

    const handleDownloadPdf = () => {
        if (branchDetails && branchDetails.length > 0) {
            const branchDetail = branchDetails[0]; // Access the first element in the array
    
            const pdf = new jsPDF();
    
            pdf.text(`Region: ${branchDetail.Region}`, 10, 10);
            pdf.text(`Branch Id: ${branchDetail.BranchId}`, 10, 20);
            pdf.text(`Branch Name: ${branchDetail.BranchName}`, 10, 30);
            pdf.text(`Branch Address: ${branchDetail.BranchAddress}`, 10, 40);
            pdf.text(`Telephone No: ${branchDetail.BranchTelephoneNo}`, 10, 50);
            pdf.text(`Email: ${branchDetail.Email}`, 10, 60);
            pdf.text(`Mobile No: ${branchDetail.MobileNo}`, 10, 70);
            pdf.text(`Vpn Id: ${branchDetail.VPN_Circuit_ID}`, 10, 80);
            pdf.text(`Gateway IP: ${branchDetail.Vpn_Gateway_IP}`, 10, 90);
            pdf.text(`Server IP: ${branchDetail.ServerIp}`, 10, 100);
            pdf.text(`Manager PC IP: ${branchDetail.BackOffice_IP}`, 10, 110);
    
            pdf.save('branch-details.pdf');
        } else {
            console.error('No branch details found.');
        }
    };
    
    const handleClosepdfForm = () => {
      setBranchDetails(null);
      window.location.reload();
    };
  
    const handleCloseForm = ()=>{
      setshowpdfForm(false);
    }
    const ResetFields = ()=>{
      setSelectedRegion("");
      setSelectedBranch("");
      setSelectedBranchCode("");
      setRegionsuggestion([]);
      setBranchSuggestions([]);
    
    }
    return (
      <div>
        {showpdfForm && (
        <div className="pdf-container">
          <legend>Download as PDF</legend> 
          <FaTimes className="close-iconpdf" onClick={handleCloseForm} />
          <div className="row">
          <label>Select Region:
            <input type='text'
              value={selectedRegion}
              placeholder='Search by Region name'
              onChange={handleRegion}
              onKeyPress={handleKeyPress} />
          </label>
          </div>
         <div className="suggestion_container">
         {regionSuggestion.map((region, index) => (
         <div key={index} onClick={() => handleSuggestionClick(region, 'region')}>{region}</div>
               ))}
        </div>
        
        <div className="row">
        <label>
          Branch Name:
          <input
            type="text"
            value={selectedBranch}
            placeholder="Search by Branch name"
            onChange={handleBranchName}
          />
        </label>
        </div>
        <div className="suggestion_container2">
          {branchSuggestions.map((branch, index) => (
            <div key={index} onClick={() => handleSuggestionClick(branch, 'branch')}>
              {branch}
            </div>
          ))}
        </div>
       
        <div className="row">
          <label>Select Branch Code:
            <input type='text'
              value={selectedBranchCode}
              placeholder='Search by Branch code'
              onChange={handleBranchCode} />
          </label>
          </div>
          <div className="suggestion_container">
            {bCodeSuggestions.map((branchCode,index)=>(
              <div key={index} onClick={() =>handleSuggestionClick(branchCode,'branchCode')}>
                {branchCode}
              </div>
            ))}
          </div>
          <div className="btngroup">
          <button className="btn" type="submit" onClick={handleSubmit}>Submit</button>
          <button className="btn" type='submit' onClick={ResetFields}>Reset</button>
         </div>
        </div>
        )};

      {branchDetails && branchDetails.length > 0 &&  (
        <>
         <FaTimes className="close-icon-pdf" onClick={handleClosepdfForm} />
         
       <div className='pdfResults'>
        <legend>Lanka Sathosa Limited</legend>
        <h5>Branch Details Report</h5>
       <hr></hr>
       <div className='detailItem'>
         <label>Region:</label>
         <span>{branchDetails[0].Region}</span>
       </div>
       <div className='detailItem'>
         <label>Branch Id:</label>
         <span>{branchDetails[0].BranchId}</span>
       </div>
       <div className='detailItem'>
         <label>Branch Name:</label>
         <span>{branchDetails[0].BranchName}</span>
       </div>
       <div className='detailItem'>
         <label>Branch Address:</label>
         <span className='baddress'>{branchDetails[0].BranchAddress}</span>
       </div>
       <div className='detailItem'>
         <label>Telephone No:</label>
         <span>{branchDetails[0].BranchTelephoneNo}</span>
       </div>
       <div className='detailItem'>
         <label>Email:</label>
         <span>{branchDetails[0].Email}</span>
       </div>
       <div className='detailItem'>
         <label>Mobile No:</label>
         <span>{branchDetails[0].MobileNo}</span>
       </div>
       <div className='detailItem'>
         <label>Vpn Id:</label>
         <span>{branchDetails[0].VPN_Circuit_ID}</span>
       </div>
       <div className='detailItem'>
         <label>Gateway IP:</label>
         <span>{branchDetails[0].Vpn_Gateway_IP}</span>
       </div>
       <div className='detailItem'>
         <label>Server IP:</label>
         <span>{branchDetails[0].ServerIp}</span>
       </div>
       <div className='detailItem'>
         <label>Manager PC IP:</label>
         <span>{branchDetails[0].BackOffice_IP}</span>
       </div>
      
       <button onClick={handleDownloadPdf}>Download PDF</button>
     </div>
     </>
     
      )}
        </div>
    )
    }


export default PdfDownload;