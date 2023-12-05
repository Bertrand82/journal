import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import CreateItem from './JournalItemCreate'
import Avatar from './Avatar'
import JournalList from './JournalList'
import imageDossierOpen from './assets/dossierOpen.svg';
import imageDossierClosed from './assets/dossierClosed.svg';
import imageDossierDelete from './assets/dossierDelete.svg';



export default function JournalItem({ item, deleteListener, session }) {
    const [showDetails, setShowDetails] = useState(false);
    const [session2, setSession2] = useState(session)

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    const deleteItem = () => {
        console.log("delete item ", item)
        deleteListener(item)
        deleteItemById()

    }
    const createItemListener = () => {
        console.log("bg create item listener")
    }

    async function deleteItemById() {
        console.log('deleteItemById start asynchron');
        try {
            const { data, error } = await supabase
                .from('journal')
                .delete()
                .eq('id', item.id);

            if (error) {
                throw error;
            }

            console.log('deleteItemById Item deleted successfully:');
            // Handle success or UI updates after deletion

        } catch (error) {
            console.error('Error deleting item:', error);
            // Handle error scenario
        }
    }

    console.log("bg 44444444 item.id " + item.id + "  session ", session2)
    return (
        <div>
            <div style={{border: 'solid',textAlign: 'left'}}>
                <button onClick={toggleDetails} style={{ border: 'none', backgroundColor: 'transparent',marginLeft: '0' }}>
                    <img src={showDetails ? imageDossierOpen : imageDossierClosed} alt="Button Image" style={{ width: '20px', height: '20px' }} />
                </button>


                <button onClick={deleteItem} style={{ border: 'none', backgroundColor: 'transparent' }}>
                    <img src={imageDossierDelete} style={{ width: '20px', height: '20px' }} />
                </button>
                {item.titre}
            </div>
            {showDetails && (
                <div style={{border: 'solid',marginLeft:'100px',textAlign: 'left'}}>
                    <p>Id: {item.id}</p>
                    <p>Description: {item.description}</p>
                    <JournalList session={session2} idParent={item.id} isRoot={false} />
                    {/* Other item details */}

                </div>
            )}

        </div>
    );
};