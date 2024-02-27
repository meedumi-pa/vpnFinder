import axios from 'axios';
import React, { useState,useEffect } from 'react';
import './csvDownload.css';
import { CSVLink } from 'react-csv';
import { FaTimes } from 'react-icons/fa';
// import { useCsv } from 'react-csv';

const CSVDownload = () => {
   
    const [allData,setAlldata] = useState([]);
    const[csv,setcsv] = useState([]);
    const [csvTerm,setcsvTerm] = useState([]);
    const [showcsv,setshowcsv] = useState(true);
    const [regionList, setRegionList] = useState([]);
    
    useEffect(() => {
      fetchRegions();
    }, []);

    const fetchRegions = async (event) => {

      try {
        const response = await axios.get(`http://localhost:3001/region?term=${encodeURIComponent(csvTerm)}`);
        const regions = response.data;
        console.log(regions);
        setRegionList(regions);
      } catch(error) {
        console.error('Error fetching regions');
      }
    }
      
    const Allcsvdata = async (event)=>{
        event.preventDefault();
        try{
            const response = await axios.get('http://localhost:3001/alldata');
            const allData = response.data;

            setAlldata(allData);
            }catch(error){
                console.error('Error fethching all outlet data');
        }
    }
     
    const handleRegionCSV = async (event)=>{
      const csvTerm = event.target.value;
      setcsvTerm(csvTerm);
      try{
        const response = await axios.get(`http://localhost:3001/csv?term=${csvTerm}`);
        const csv = response.data;

        setcsv(csv);
      }catch(error){
        console.error('Error fetching region branch details');
      }
    }

    const closecsvForm = ()=>{
      setshowcsv(false);
    }
    const ResetFields = ()=>{
      setAlldata("");
      setcsvTerm("");
    }
  return (
    <div>
      {showcsv && (
      <div className='container'>
        <FaTimes onClick={closecsvForm} className='close-iconcsv'/>
        <legend>Download as CSV</legend>
        <label>Outlet Details : 
          <button className='btnAll' onClick={Allcsvdata}>All Branch Details..</button>
            {Array.isArray(allData) && allData.length > 0 && (
            <CSVLink className='csvlink' data={allData} filename='allData.csv'>
                Download CSV
            </CSVLink>
            )}
        </label> 
        <label htmlFor="regionInput">Select Region:
        <input
            id="regionInput"
            type="text"
            value={csvTerm}
            onChange={handleRegionCSV}
            placeholder='Select Region...'
            list="regionList"
        />
        </label>
        <datalist id="regionList">
            {regionList.map((item, index) => (
                   <div key={index} value={item}>{item}</div>
            ))}
        </datalist>
        {csvTerm && (
            <CSVLink data={csv} className='csvlink' filename='BranchDetails.csv' >
                Download CSV
            </CSVLink>
        )}  
         
          <button className="btn" type='submit' onClick={ResetFields}>Reset</button>
      </div>
      
      )}
    </div>
  )
}


export default CSVDownload