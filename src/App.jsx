import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import { Provider } from 'react-redux'
import store from './store'; // Import the Redux store
import JournalApp from './JournalApp'

function App() {
  const [session, setSession] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <Provider store={store}>
      <div className="container" style={{ padding: '50px 0 100px 0' }}>
        {!session ? <Auth /> : <div> <JournalApp session={session} /></div>}
      </div>
    </Provider>
  )
}

export default App