import './App.css'
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import Auth from './Auth'
import Account from './Account'
import JournalList from './JournalList'
import imageNew from './assets/newitem.svg';
import imageUploadImage from './assets/uploadlogo.svg'
import Avatar from './Avatar'




export default function CreateItem(props) {
    const [parent, setParent] = useState(props.idParent)
    const [titre, setTitre] = useState(null)
    const [description, setDescription] = useState(null)
    const [id, setId] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isVisibleFormCreate, setIsVisibleFormCreate] = useState(false)
    const [isVisibleFormCreateImage , setIsVisibleFormCreateImage] = useState(false)
    const [isRoot, setIsRoot] = useState(props.isRoot)


    async function createJournalItem(event, avatarUrl) {
        console.log('createJournal2 start event ', event, 'avatarUrl', avatarUrl);
        event.preventDefault()

        setLoading(true)

        const { user } = props.session
        console.log('createJournal2 user', user)
        const createObject = {
            userid: user.id,
            parentid: parent,
            titre: titre,
            description: description,
            isroot: isRoot

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

    const formCreateImage = () => {
        return (
            <div>
                <div>Create form Image</div> 
                <Avatar onUpload={(event, url) => { console.log("on upload image no implmented yet")}}></Avatar>
            </div>
            )
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
                    <button onClick={() => setIsVisibleFormCreateImage(!isVisibleFormCreateImage)} style={{ border: 'none', backgroundColor: 'transparent' }}>
                        <img src={imageUploadImage} style={{ width: '20px', height: '20px' }} />
                    </button>
            </div>
            <div>
            {isVisibleFormCreate && formCreate()}
            {isVisibleFormCreateImage && formCreateImage()}

            </div>
        </div>
    );
};



