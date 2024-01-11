import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Account from './Account'
import JournalList from './JournalList'
import Avatar from './Avatar'

function JournalApp({ session }) {
  const showAccount = 1;
  const showJournal = 2;

  const [show, setShow] = useState(showAccount);
  const [avatarUrl, setAvatarUrl] = useState("")
  const [nom, setNom] = useState("")
  console.log("bg session", session);

  useEffect(() => {

    async function getProfile() {

      const { user } = session
      console.log("bg yyyyyyyeessssss")
      const { data, error } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single()


      if (error) {
        console.warn("bg xxxx useEffect fail!!!!! ", error)
        console.warn(error)
      } else if (data) {
        console.log("bg xxxx data-----------------------", data);
        setNom(data.username)
        setAvatarUrl(data.avatar_url)
        console.log("bg xxxx data-----------------------", avatarUrl);
      }


    };
    getProfile();
  }, [session])



  return (
    <div style={stylesContainer} >
      <div style={stylesMenuBg}>
        <button style={(show === showJournal) ? stylesButtonSelected : stylesButtonUnSelected} onClick={() => setShow(showJournal)}>  Journal  </button>

        <button style={(show === showAccount) ? stylesButtonSelected : stylesButtonUnSelected} onClick={() => setShow(showAccount)}>  Account </button>
   
        <button style={{  border: '2px solid red', borderRadius: 3, right: 80, position: 'absolute' }}> {nom} </button>
        <div style={{  border: '2px solid white', borderRadius: 3, right: 10, position: 'absolute' }}>
     
          <Avatar
            url={avatarUrl}
            size={40}
            hideUpload={true}
          />
        </div>


      </div>
      {(show === showAccount) && <Account key={session.user.id} session={session} />}
      {(show === showJournal) && <JournalList session={session} isRoot={true} />}
    </div>
  )
}

const stylesButtonSelected = {
  border: '2px solid white',
};
const stylesButtonUnSelected = {
  border: '0px solid white',
};
const stylesMenuBg = {
  border: '2px solid white',
  display: 'flex', /* Make the menu items appear next to each other */
  width: '100%', /* Make the menu span the container */
  /*  background-color: '#f0f0f0',/* Example background color */
  padding: '10px', /* Adjust padding as needed */
  margin: '0px', /* Adjust margin as needed */
};
const stylesContainer = {
  border: '2px solid red',
  width: '100%', /* Adjust as needed */
  height: '100vh', /* Adjust as needed */
  position: 'relative',
  /* padding: '50px 0 100px 0',*/
}

export default JournalApp