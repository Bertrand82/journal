

import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import JournalList from './JournalList'
import imageNew from './assets/newitem.svg';
import imageUploadImage from './assets/uploadlogo.svg'
import interrogation from './assets/interrogation.svg'

import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export default function JournalItemImage2(props) {
  const [uploading, setUploading] = useState(false);

  const [selectedImage, setSelectedImage] = useState(interrogation);
  const onClickImage = (event)=> {
    console.log("bg onclick image")
  }
  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; // Get the first selected file
    console.log("bg handleFileInputChange");
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        // Update the state with the data URL of the selected image
        setSelectedImage(e.target.result);
      };

      // Read the file content as a data URL
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null); // If no file is selected, set the selectedImage to null
    }
  };

  const uploadAvatar = () => {
    console.log("upload avatar")
  }

  return (
    <div style={containerStyles}>

      <img
        onClick={onClickImage}
        src={selectedImage}
        style={myStyle2}
      />
      <div style={myStyle3} >
        <input style={myStyle1} type="file" onChange={handleFileInputChange} ></input>
      </div>
    </div>
  )
}


const containerStyles = {
  display: 'flex', // Or use display: 'grid';
  justifyContent: 'space-between', // Or any other alignment option
  border: '2px solid yellow'
};


const myStyle1 = {
  display: 'inLine',
  down:'0px',
  width: '250px',
  height: '40px',  
  color:'greenyellow',
  border: '2px solid greenyellow',
  background : 'transparent',
}  
const myStyle2 = { 
  height: '50px', 
  border: '2px solid red',
}

const myStyle3 = { 
  border: '4px solid blue',
  display: 'inLine', 
  background : 'blue',
}  
  
  
