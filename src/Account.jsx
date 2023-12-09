import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Avatar from './Avatar_deprecated'
import Journal from './JournalList'


export default function Account({ session }) {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    console.log("bg session" ,session)
    useEffect(() => {
        let ignore = false
        async function getProfile() {
            setLoading(true)
            const { user } = session

            const { data, error } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (!ignore) {
                if (error) {
                    console.warn("bg useEffect fail!!!!! ",error)
                    console.warn(error)
                } else if (data) {
                    setUsername(data.username)
                    setWebsite(data.website)
                    setAvatarUrl(data.avatar_url)
                }
            }

            setLoading(false)
        }

        getProfile()

        return () => {
            ignore = true
        }
    }, [session])

    async function updateProfile(event, avatarUrl) {
        console.log('updateProfile1 start event ',event, 'avatarUrl',avatarUrl);
        event.preventDefault()

        setLoading(true)

        const { user } = session
        console.log('updateProfile2 user',user)
        const updates = {
            id: user.id,
            username,
            website,
            avatar_url,
            updated_at: new Date(),
        }
        console.log('updateProfile3 upsert updates',updates)
        const { error } = await supabase.from('profiles').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false)
    }

    return (
        <div>
        <form onSubmit={updateProfile} className="form-widget">
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="text" value={session.user.email} disabled />
            </div>
            <div>
                <label htmlFor="username">Name</label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="url"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>
            <Avatar
                url={avatar_url}
                size={150}
                onUpload={(event, url) => {
                    updateProfile(event, url)
                }}
            />
            

            <div>
                <button className="button block primary" type="submit" disabled={loading}>
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>

            <div>
                <button className="button block" type="button" onClick={() => supabase.auth.signOut()}>
                    Sign Out
                </button>
            </div>
           
        </form>
        xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        
        </div>
    )
}