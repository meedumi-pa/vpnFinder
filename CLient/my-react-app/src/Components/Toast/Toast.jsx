import React from 'react';
import { Alert } from 'react-bootstrap';
import './toast.css';

const Toast = ({ message, type, onClose }) => {
  return (
    
     <Alert variant={type} onClose={onClose} dismissible style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
     {message}
   </Alert>
  );
};

export default Toast;
