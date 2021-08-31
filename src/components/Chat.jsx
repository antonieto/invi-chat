import React, {useState} from 'react'

import firebase from '@firebase/app'; 

import { useCollectionData } from 'react-firebase-hooks/firestore';

import {db, auth} from '../firebase';

const Chat = ({user}) => {
    
    const chatRef = db.collection('chat'); 
    const q = chatRef.orderBy('createdAt').limit(50); 
    
    const [messages, loading, error] = useCollectionData(q,{idField:'id'});
    const [form, setForm ] = useState('');
   
    if(!user){ 
        return null;
    } 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        console.log(user);
        if(form.trim() == ""){ 
            return;
        } 
        const msgText = form; 
        setForm("");
        await chatRef.add({ 
            author: user.displayName, 
            photoURL: user.photoURL,
            txt: msgText, 
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })

    }

    const handleChange = e => { 
        setForm(e.target.value)
    }



    return (  
        <div> 
            <h3>Beinvenido al chat, {user.displayName} </h3> 
            <div className="card bg-dark p-4" style={{overflow: "scroll", overflowX: "hidden", maxHeight: "400px"} }> 
                {loading ? <p> loading... </p> : messages.map((message, index)=> { 
                    
                    return ( 
                        <div id={message.id} className=""> 
                            <div className="row card bg-light pt-2 mt-1 d-flex shadow" style={{width: "max-content"}}> 
                                {/* <div> 
                                    <img src={message.photoURL} alt="" className="rounded-circle d-block" style={{width: "70px"}} />
                                </div> */} 

                                <h6> <span style={{fontWeight: "400"}}> {message.author}:  </span> {message.txt}  </h6> 
                            
                            </div>
                        </div>
                    )
                }
                )}
            </div>
            <form onSubmit={handleSubmit} className="mt-2"> 
                <input type="text" className="form-control"  placeholder="message" onChange={handleChange} value={form}/>
                <button type="submit" className="btn btn-primary m-2">Send Message</button> 
                {user ? <button type="button" className="btn btn-danger m-2" onClick={ ()=> {auth.signOut()} }> Log Out</button> : null}
            </form> 
        </div>
    );
}
 
export default Chat;