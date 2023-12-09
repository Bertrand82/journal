import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import JournalList from './JournalList'
import imageNew from './assets/newitem.svg';
import imageUploadImage from './assets/uploadlogo.svg'
import Avatar from './Avatar_deprecated'
import JournalItemImage2 from './JournalItemImage2'




export default function CreateItem(props) {
    const [parent, setParent] = useState(props.idParent)
    const [titre, setTitre] = useState(null)
    const [description, setDescription] = useState(null)
    const [urlImage, setUrlImage] = useState(null)
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isVisibleFormCreate, setIsVisibleFormCreate] = useState(false)
    const [isRoot, setIsRoot] = useState(props.isRoot)
    const [session, setSession] = useState(props.session)


    async function createJournalItem(event, avatarUrl) {
        console.log('createJournal2 start event ', event, 'avatarUrl', avatarUrl);
        setIsVisibleFormCreate(false)
        event.preventDefault()

        setLoading(true)

        const { user } = session
        const isR = (parent === undefined || parent === null) 
        setIsRoot(isR )
        console.log('bg createJournal2 parent', parent)
        console.log('bg createJournal2 isRoot', isRoot)
        console.log('bg createJournal2 isR', isR)
        console.log('createJournal2 user', user)
        const createObject = {
            userid: user.id,
            parentid: parent,
            titre: titre,
            description: description,
            isroot: isR,
            urlimage : urlImage

        }
        console.log('createJournal2 insert updates', createObject)
        const { data, error } = await supabase.from('journal').insert(createObject).select().single()

        if (error) {
            alert(error.message)
        } else {
            console.log("createJournal3 retour ", data)
            console.log("createJournal3 retour id ", data.id)
            setId(data.id)
            props.createListener(data)
        }
        setLoading(false)

    }

    const  setUploadedUrlImage = (urlImage) =>{
        console.log("bg setUploadedUrlImage "+urlImage)
        setUrlImage(urlImage)
    }

    
    const formCreate = () => {
        return (
            <div>
                <div>Create form</div> 
                <div>
                    <label htmlFor="parent">Parent</label>
                    <input
                        id="parent"
                        type="text"
                        value={parent}
                        readOnly={true}

                    />
                </div>
                <div>
                    <label htmlFor="titre">Titre</label>
                    <input
                        id="titre"
                        type="text"
                        value={titre}
                        onChange={(e) => setTitre(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input
                        id="description"
                        type="text"

                        value={description || ''}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="description">Image</label>
                    <JournalItemImage2 session={session} onUploadedImage= {setUploadedUrlImage}></JournalItemImage2>
                </div>
                <div>
                    <button className="button block primary" type="button" onClick={(event) => createJournalItem(event)} disabled={false}>
                        create
                    </button>
                </div>

            </div>

        )
    }
    return (
        <div>
            <div>
                <button onClick={() => setIsVisibleFormCreate(!isVisibleFormCreate)} style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <img src={imageNew} style={{ width: '20px', height: '20px' }} />
                </button>
                    
            </div>
            <div>
            {isVisibleFormCreate && formCreate()}
         

            </div>
        </div>
    );
};



