import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Account from './Account'
import JournalList from './JournalList'

function JournalApp({ session }) { 
    const showAccount = 1;
    const showJournal = 2;
    const [isVisibleAccount, setIsVisibleAccount] = useState(showAccount);
    const [show, setShow] = useState(showAccount);
    
    return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
    <button style={ (show===showAccount)?stylesButtonSelected:stylesButtonUnSelected} onClick={() => setShow(showAccount)}>  Account </button>
    <button style={ (show===showJournal)?stylesButtonSelected:stylesButtonUnSelected} onClick={() => setShow(showJournal)}>  Journal  </button>
      { (show===showAccount) && <Account key={session.user.id} session={session} /> }
      { (show===showJournal) && <JournalList session={session} isRoot={true}/>}
    </div>
  )
}

const stylesButtonSelected= { 
  border:  '2px solid white',
};
const stylesButtonUnSelected= { 
  border:  '0px solid white',
};

export default JournalApp