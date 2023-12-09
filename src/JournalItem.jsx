
import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

import CreateItem from './JournalItemCreate'
import Avatar from './Avatar'
import JournalList from './JournalList'
import imageDossierOpen from './assets/dossierOpen.svg';
import imageDossierClosed from './assets/dossierClosed.svg';
import imageDossierDelete from './assets/dossierDelete.svg';
import JournalItemImage2 from './JournalItemImage2'


export default function JournalItem({ item, deleteListener, session }) {
    const [showDetails, setShowDetails] = useState(false);
    const [session2, setSession2] = useState(session)
    const [urlImage, setUrlImage] = useState(null)

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

    async function downloadImage(pathImage) {
        if (pathImage) {
            try {
                const { data, error } = await supabase.storage.from('avatars').download(pathImage)
                if (error) {
                    throw error
                }
                const urlImage = URL.createObjectURL(data)
                setImageUrl(urlImage)
            } catch (error) {
                console.log('Error downloading image: ', error.message)
            }
        }
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

    const onClickImage = () => {
        console.log("on click image bg")
    }

    console.log("bg 44444444 item.id " + item.id + "  session ", session2)
    return (
        <div>
            <div style={containerStyles}>
                <div style={{ border: 'solid', }}>
                    <button onClick={toggleDetails} style={styleButton}>
                        <img src={showDetails ? imageDossierOpen : imageDossierClosed} alt="Button Image" style={styleImage} />
                    </button>


                    <button onClick={deleteItem} style={styleButton}>
                        <img src={imageDossierDelete} style={styleImage} />
                    </button>
                </div>
                {item.titre}

                <div style={alignRightStyles}>

                    <img
                        onClick={onClickImage}
                        src={item.urlimage}
                        style={styleImageVignette} />

                </div>
            </div>

            {showDetails && (
                <div style={{ border: 'solid', marginLeft: '100px', textAlign: 'left' }}>
                    <p>Id: {item.id}</p>
                    <p>Description: {item.description}</p>
                    <p>
                        <img
                            onClick={onClickImage}
                            src={item.image}
                            style={styleImageDetail} />
                    </p>
                    <JournalList session={session2} idParent={item.id} isRoot={false} />
                    {/* Other item details */}

                </div>
            )}

        </div>
    );
};
// prompt chatgpt : react style display align right inline after an element on the same line
const containerStyles = {
    display: 'flex', // Or use display: 'grid';
    justifyContent: 'space-between', // Or any other alignment option
    border: '2px solid white'
};

const alignRightStyles = {
    textAlign: 'right',
    border: 'solid'
};

const styleButton = {
    border: '2px solid green', padding: '0', backgroundColor: 'transparent', marginLeft: '0',
}
const styleImage = {
    border: '2px solid red', margin: '0px', width: '50px', height: '50px'
}
const styleImageVignette = {
    height: '50px',
    border: '5px solid red',
}
const styleImageDetail = {
    weight: '80px',
    border: '5px solid red',
}