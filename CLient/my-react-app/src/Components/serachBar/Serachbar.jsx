import React, { useState } from 'react'
import './searchbar.css';
import axios from 'axios';
import {FaSearch} from "react-icons/fa";
import logo from '../../assets/vpnLogo.png';

const Serachbar = ({onSearch , setDetails }) => {
    const [searchTerm,setSearchTerm]=useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleKeyPress = (event) =>{
        if(event.key === 'Enter' && onSearch){
            onSearch(searchTerm);
        }
    } 
    const handleInputChange = async (event) => {
      const newTerm = event.target.value;
      setSearchTerm(newTerm);
    
      const apiUrl = `http://localhost:3001/suggestions?term=${newTerm}`;
      console.log('API URL:', apiUrl);
    
      try {
        const response = await axios.get(apiUrl);
        setSuggestions(response.data);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };
    
    const handleSuggestionClick = async (suggestion) => {
      setSearchTerm(suggestion);
      setSuggestions([]);
      try {
        const response = await axios.post('http://localhost:3001/search', {
          name: suggestion,
        });
        if (response.data && response.data.length > 0) {
          setDetails(response.data[0]);
          
        } else {
          setDetails(null);
         
        }
      } catch (error) {
        console.error('Error fetching details:', error);
      }
       setSearchTerm('');
    }; // Clear suggestions when a suggestion is clicked
    

  return (
    <div>
      
      <div className='Branch_search'>
     
       <FaSearch id="search-icon" size={20} />

        <input type='text'
        value={searchTerm}
        placeholder='Search by Branch Name'
        onChange={handleInputChange} 
        onKeyPress={handleKeyPress}/>
    </div>
  <ul>
<div className="suggestions-container" style={{ display: searchTerm.length > 0 ? 'block' : 'none' }}>
  { suggestions.map((suggestion, index) => (
    <div
      key={index}
      className="suggestion"
      onClick={() => handleSuggestionClick(suggestion)}
    >
      {suggestion}
    </div>
  ))}
</div>
</ul>
<div className='Vpn__header-logo'>
                <img src={logo} alt="logo" />
            </div>
    </div>
  )
}

export default Serachbar