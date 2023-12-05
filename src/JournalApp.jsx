import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import JournalList from './JournalList'

function JournalApp({ session }) { 

    const [isVisibleAccount, setIsVisibleAccount] = useState(false);
    const [isVisibleJournal, setIsVisibleJournal] = useState(false);
    return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
    <button onClick={() => setIsVisibleAccount(!isVisibleAccount)}>  {isVisibleAccount ? 'Hide Account' : 'Show Account'}  </button>
    <button onClick={() => setIsVisibleJournal(!isVisibleJournal)}>  {isVisibleJournal? 'Hide Journal' : 'Show Journal'}  </button>
      { isVisibleAccount && <Account key={session.user.id} session={session} /> }
      { isVisibleJournal && <JournalList session={session} isRoot={true}/>}
    </div>
  )
}

export default JournalApp