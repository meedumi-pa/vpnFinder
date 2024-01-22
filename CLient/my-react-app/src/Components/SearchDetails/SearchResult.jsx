import React, { useState, useEffect } from 'react'
import './searchResults.css';
import { CloseButton } from 'react-bootstrap';

import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const SearchResult = ({data,  onSaveChanges }) => {
  const [editMode,setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...data ,BranchId: '',BranchName:'',BranchAddress:'',BranchTelephoneNo:'',Email:'',MobileNo:'',
  VPN_Circuit_ID:'',VPN_GatewayIP:'',ServerIP:'',BackOfficeIP:'',FingerPrint_IP:'',POS01:'',POS02:'',POS03:'',POS04:'',POS05:'',POS06:'',POS07:''});
  
  
  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleSaveChanges = () => {
    onSaveChanges(formData);
    setEditMode(false);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    // Set initial form data when the component mounts or data changes
    setFormData({ ...data });
  }, [data]);

  return (
    <div>
      
        <div className="Search_results">
      
         <form key={data.BranchId} className="result_form">
        

          <div className="form-details">
      
          <div style={{ position: 'relative' }}>
            {editMode ? (
              <Button type='button' style={{ position: 'absolute', top: 0, right: 0 }} variant="warning" onClick={handleSaveChanges}>
                Save Changes
              </Button>
            ):(
            <Button type='button' style={{ position: 'absolute', top: 0, right: 0 }} variant="info" onClick={handleToggleEditMode} >
            {onSaveChanges ? 'Edit VPN' : 'Search'}
            </Button>
            )}
        
            </div>
         
          <h3 className="heading_text">Branch Details</h3>
        
          <div className='formRow'>
          <div className="form_field">
          <label>Branch ID:</label>
          <input 
          type="text" 
          value={formData.BranchId || ''} 
          readOnly={!editMode} 
          onChange={(e)=> handleInputChange('BranchId',e.target.value)}
          className="form-input"/>
          </div>
          
          <div className="form_field">
          <label>Branch Name:</label>
          <input type="text" 
          value={formData.BranchName || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('BranchName',e.target.value)}
          className="form-input"/>
          </div></div>

          <div className='formRow'>
          <div className="form_field">
          <label>Branch Address:</label>
          <textarea id="textareaid" 
          value={formData.BranchAddress || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('BranchAddress',e.target.value)} 
           className="form-input-large"
          /* style={{ height: textareaHeight }}*//>
          </div>
          
          <div className="form_field">
          <label>Branch Telephone No:</label>
          <input type="text" 
          value={formData.BranchTelephoneNo || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('BranchTelephoneNo',e.target.value)}
          className="form-input" />
          </div></div>

          <div className='formRow'>
          <div className="form_field">
          <label>Email:</label>
          <input type="text" 
          value={formData.Email || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('Email',e.target.value)}
           className="form-input"/>
          </div>
          
          <div className="form_field">
          <label>Mobile No:</label>
          <input type="text" 
          value={formData.MobileNo || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('MobileNo',e.target.value)}
         className="form-input"/>
          </div></div>

          <div className='formRow'>
          <div className="form_field">
          <label>VPN Circuit ID:</label>
          <input type="text" 
          value={formData.VPN_Circuit_ID || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('VPN_Circuit_ID',e.target.value)}
           className="form-input"/>
          </div>
          
          <div className="form_field">
          <label>VPN Gateway IP:</label>
          <input type="text" 
          value={formData.VPN_GatewayIP || ''}
           readOnly={!editMode}
          onChange={(e)=> handleInputChange('VPN_GatewayIP',e.target.value)}
           className="form-input"/>
          </div></div>

          <div className='formRow'>
          <div className="form_field">
          <label>Server IP:</label>
          <input type="text" 
          value={formData.ServerIP || ''}
           readOnly={!editMode}
          onChange={(e)=> handleInputChange('ServerIP',e.target.value)}
          className="form-input" />
          </div>
          
          <div className="form_field">
          <label>BackOffice IP:</label>
          <input type="text" 
          value={formData.BackOfficeIP || ''}
           readOnly={!editMode}
          onChange={(e)=> handleInputChange('BackOfficeIP',e.target.value)} className="form-input"/>
          </div></div>

          <div className='formRow'>
          <div className="form_field">
          <label>FingerPrint IP:</label>
          <input type="text" value={formData.FingerPrint_IP || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('FingerPrint_IP',e.target.value)} 
          className="form-input"/>
          </div>
         
          <div className="form_field">
          <label>POS 01:</label>
          <input type="text" value={formData.POS01 || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('POS01',e.target.value)} className="form-input"/>
          </div></div>

          <div className='formRow'>
          <div className="form_field">
          <label>POS 02:</label>
          <input type="text" value={formData.POS02 || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('POS02',e.target.value)} className="form-input"/>
          </div>
         
          <div className="form_field">
          <label>POS 03:</label>
          <input type="text" value={formData.POS03 || ''}
           readOnly={!editMode}
          onChange={(e)=> handleInputChange('POS03',e.target.value)} className="form-input"/>
          </div></div>
          <div className='formRow'>
          <div className="form_field">
          <label>POS 04:</label>
          <input type="text" value={formData.POS04 || ''}
           readOnly={!editMode}
          onChange={(e)=> handleInputChange('POS04',e.target.value)} className="form-input"/>
          </div>
          
          <div className="form_field">
          <label>POS 05:</label>
          <input type="text" value={formData.POS05 || ''} 
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('POS05',e.target.value)} className="form-input"/>
          </div></div>

          <div className='formRow'>
          <div className="form_field">
          <label>POS 06:</label>
          <input type="text" value={formData.POS06 || ''} 
           readOnly={!editMode}
          onChange={(e)=> handleInputChange('POS06',e.target.value)} className="form-input"/>
          </div>
          
          <div className="form_field">
          <label>POS 07:</label>
          <input type="text" value={formData.POS07 || ''}
          readOnly={!editMode}
          onChange={(e)=> handleInputChange('POS07',e.target.value)} className="form-input"/>
          </div></div>
          </div>
          
        </form>

      </div>
    </div>
  )
}

export default SearchResult