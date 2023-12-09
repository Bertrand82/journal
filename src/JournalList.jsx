import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabaseClient'
import JournalItem from './JournalItem'
import CreateItem from './JournalItemCreate'
import Avatar from './Avatar_deprecated'


export default function JournalList(props) {
    const [loading, setLoading] = useState(true)
    const [titre, setTitre] = useState("no data titre")
    const [description, setDescription] = useState("no description")
    const [id, setId] = useState(null)
    const [session, setSession] = useState(props.session)
    const [listJournal, setListJournal] = useState([])
    const [listJournalSize, setListJournalSize] = useState(0)
    const [count, setCount] = useState(0);
    const [idParent, setIdParent] = useState(props.idParent)
    const [isRoot, setIsRoot] = useState(props.isRoot)
    useEffect(() => {
        let ignore = false
        async function getJournalRoot() {
            setLoading(true)
            const user = props.session.user
            console.log("bg idParent1 ", idParent)
            const idParent2 = (idParent) ? idParent : 'null'
            console.log("bg idParent2 ", idParent2)
            console.log("bg isRoot ", isRoot)

            console.log("bg isRoot !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", isRoot)
            const { data, error } = await supabase
                .from('journal')
                .select(`id,userid, parentid, titre, description,urlimage`)
                .eq('isroot',true)
            //.eq('userid', user.id)

            if (error) {
                console.warn("bg getJournal useEffect fail!!!!! ", error)
                console.warn(error)
                setTitre('No Data1')
                setDescription('No data2')
            } else if (data) {
                console.log("journal bg init ", data)
                console.log("journal bg init length", data.length)
                setListJournal(data)
                setListJournalSize(data.length)
            }
            setLoading(false)
        }
        async function getJournalItem() {
            setLoading(true)
            const user = props.session.user
            console.log("bg idParent1 ", idParent)
            const idParent2 = (idParent) ? idParent : 'null'
            console.log("bg idParent2 ", idParent2)
            console.log("bg isRoot ", isRoot)


            console.log("bg NotRoot xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", isRoot)
            const { data, error } = await supabase
                .from('journal')
                .select(`id,userid, parentid, titre, description,urlimage`)
                .eq('userid', user.id)
                .eq('parentid',idParent2)




            if (error) {
                console.warn("bg getJournal useEffect fail!!!!! ", error)
                console.warn(error)
                setTitre('No Data1')
                setDescription('No data2')
            } else if (data) {
                console.log("journal bg init ", data)
                console.log("journal bg init length", data.length)
                setListJournal(data)
                setListJournalSize(data.length)
            }
            setLoading(false)
        }
        if (isRoot) {
            getJournalRoot()
        } else {
            getJournalItem()
        }

        return () => {
            ignore = true
        }
    }, [props.session])

    async function updateJournal(event, avatarUrl) {
        console.log('updateJournal start event ', event, 'avatarUrl', avatarUrl);
        event.preventDefault()

        setLoading(true)

        const { user } = session
        console.log('updateJournal2 user', user)
        const updates = {
            id,
            userId: user.id,
            parentId,
            titre,
            description,
            urlimage,
            updated_at: new Date(),
        }
        console.log('updateJournal3 upsert updates', updates)
        const { error } = await supabase.from('journal').upsert(updates)

        if (error) {
            alert(error.message)
        } else {
            setAvatarUrl(avatarUrl)
        }
        setLoading(false)
    }
    const createListener = (item) => {
        console.log("bg createListener ", item)
        listJournal.push(item)
        setListJournal(listJournal)
        console.log("bg createListener listJournal", listJournal)
        setCount(count + 1)
    }

    const deleteListener = (item) => {
        console.log("bg deleteListener ", item)
        const index = listJournal.findIndex(i => i.id === item.id);
        if (index !== -1) {
            listJournal.splice(index, 1);

            console.log(` Element with ID ${item.id} removed successfully.`);
        } else {
            console.log(`Element with ID ${item.id} not found.`);
        }
        setListJournal(listJournal)

        setCount(count + 1)
        console.log("bg deleteListener listJournal", listJournal)
    }



    const createJournal1 = (event) => {
        console.log("create event no implemented yet " + titre + "   " + description)
    }

    return (
        <div>
            <div>
                <div> Items : {listJournalSize} </div> {count}
                <ul>
                    {listJournal.map((item) => (
                        <li key={item.id}>
                            <JournalItem key={item.id} item={item} session={session} deleteListener={deleteListener} />
                        </li>
                    ))}
                </ul>
            </div>
            <CreateItem session={session} createListener={createListener} idParent={idParent} isRoot={false}/>
        </div>
    )
}

