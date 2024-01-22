import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import './App.css'
import Serachbar from './Components/serachBar/Serachbar';
import SearchResult from './Components/SearchDetails/SearchResult';
import axios from 'axios';
import { FaTimes } from "react-icons/fa";
import Inputform from './Components/Inputvpn/Inputform';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';

import Toast from './Components/Toast/Toast';

const Container = styled.div.attrs((props) => ({
  style: {
    filter: props.showPopup ? 'blur(5px)' : 'none',
  },
}))`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  transition: filter 0.3s ease;
`;


function App() {
  const [details, setDetails] = useState(null);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [searchResultVisible, setSearchResultVisible] = useState(true);
  const [formType, setFormType] = useState('searchResult');  
  const[showPopup,setShowPopup] = useState(false);
  const [addVpnClicked, setAddVpnClicked] = useState(
    localStorage.getItem('addVpnClicked') === 'true'
  );
  
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  
  

  const handleSearch = async (searchTerm) => {
    try {
      const response = await axios.post('http://localhost:3001/search', {
        name: searchTerm,
      });
     // console.log('Response from server:', response);
      if (response.data && response.data.length > 0) {
        setDetails(response.data[0]);
        console.log('Details set:', response.data[0]);
      } else {
        setDetails(null); // or setDetails({});
        console.log('No details found');
      }
      setFormType('searchResult');
      setSearchPerformed(true);

     
    } catch (error) {
      console.error('Error fetching details:', error);
    }

     
   
  };
  
  const handleAddVpnClick = () => {
    // Switch to the add VPN form
  
    setFormType('addVPN');
    setSearchPerformed(false);
    setAddVpnClicked(true);
    setShowPopup(true);
    
  };

  const handleSearchResultClose = () => {
    setFormType('searchResult');
    setAddVpnClicked(false);
   
    ;
  };
  const handleSaveChanges = async (updatedData) => {
    try {
      const response = await axios.put('http://localhost:3001/update', updatedData);

      setDetails(response.data);
      //setEditMode(false);
      handleSearchResultClose();
     setShowToast(true);
      showToastMessage('Update successful','success');
   
      setTimeout(() => {
        setShowToast(false);
      }, 3000); 
      console.log('Save changes button clicked. Updated details:', response.data); 
   
    } catch (error) {
      console.error('Error saving changes:', error);
     setShowToast(true);
     showToastMessage('Update Unsuccessful','danger');
      
     setTimeout(() => {
      setShowToast(false);
    }, 3000); 
     
    setFormType('searchResult');
  }
};

  const handleCloseForm = () => {
    setDetails(null);
    setFormType('searchResult');
    setSearchResultVisible(true);
  };

  const showToastMessage = (message, type) => {
    console.log('Setting showToast to true');
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  return ( 
    <Container $showPopup={showPopup}>
      <div className='gradient_bg'>
        
          <Router>
            <Button className='vpn_button' variant="success" onClick={handleAddVpnClick}>
                Add VPN
            </Button>
          
            <Routes> 
            {!searchPerformed && (
              <Route path="/"
                     element={ 
                      <>
                        <Serachbar onSearch={(term) => { handleSearch(term); setSearchPerformed(true); }} setDetails={setDetails}/>
        
                        {searchPerformed && (!details || Object.keys(details).length === 0) ? (
                          <p>No details found</p>
                        ) : (
                          details && Object.keys(details).length > 0 && (
                            <>
                              {formType === 'searchResult' && searchResultVisible &&(
                                <>
                                <SearchResult data={details}  
                                              onSaveChanges={handleSaveChanges} 
                                              onClose={handleSearchResultClose}
                                />
                                <FaTimes className="close-icon" onClick={handleCloseForm} />
                                {showToast && (
                                  <Toast message={toastMessage} type={toastType} onClose={() => setShowToast(false)} />
                                )} 
                                </>
                              )}
                              
                              
                              
                            </>
                          )
                        )}
                      </>
                      }
                     
              />
              )}
      
            </Routes>
            {formType === 'addVPN' && showPopup && (
                        <Inputform 
                        setSearchResultVisible={setSearchResultVisible} 
                        setShowPopup={setShowPopup}
                       />
                      )}
          </Router>
       
      </div>
    </Container>
  );
};

export default App;

   
