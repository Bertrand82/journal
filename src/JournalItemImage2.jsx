

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
import { v4 as uuidv4 } from 'uuid'

export default function JournalItemImage2(props) {
  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(props.image == null ? interrogation : props.image);
 
  const [session, setSession] =useState(props.session);
  const onClickImage = (event) => {
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
      const idImmage =session.user.id+'/'+'bg00_'+uuidv4();
      uploadAvatar(file,idImmage);

      // Read the file content as a data URL
      reader.readAsDataURL(file,idImmage);
    } else {
      setSelectedImage(null); // If no file is selected, set the selectedImage to null
    }
  };

  async function uploadAvatar(file, idImage) {
    console.log("upload avatar start idImage "+idImage)
    const { data, error } = await supabase.storage.from('images').upload(idImage, file)
    if (data) {     
      console.log("bg upload data  ", data)
      console.log("bg uploadData fullPath" , data.fullPath)
      //url :              https://kodiylsiewikvgjhiqfa.supabase.co/storage/v1/object/public/images/d10a3ae2-334e-4ba6-bff8-b97abae92662/bg00006?t=2023-12-09T17%3A35%3A01.920Z
      // fullpath: bg uploadData fullPath                                                    images/d10a3ae2-334e-4ba6-bff8-b97abae92662/bg00006
      //VITE_SUPABASE_URL=https://kodiylsiewikvgjhiqfa.supabase.co
      const data2 =  supabase.storage.from('images').getPublicUrl(idImage);
      console.log("bg data publicUrl",data2)
      const publicUrl =  data2.data.publicUrl
      console.log("bg publicUrl ", publicUrl)
      console.log("bg publicUrl onUploadedImage 11", props.onUploadedImage)
      console.log("bg publicUrl onUploadedImage 22", props.onUploadedImage)
      props.onUploadedImage(publicUrl)
    }else {
      console.log("upload error ", error)
    }
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
  down: '0px',
  width: '250px',
  height: '40px',
  color: 'greenyellow',
  border: '2px solid greenyellow',
  background: 'transparent',
}
const myStyle2 = {
  height: '50px',
  border: '2px solid red',
}

const myStyle3 = {
  border: '4px solid blue',
  display: 'inLine',
  background: 'blue',
}


