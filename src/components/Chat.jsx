import React, {useState} from 'react'

import firebase from '@firebase/app'; 

import { useCollectionData } from 'react-firebase-hooks/firestore';

import {db, auth} from '../firebase';

const Chat = ({user}) => {
    
    const chatRef = db.collection('chat'); 
    const q = chatRef.orderBy('createdAt').limit(50); 
    
    const [messages, loading, error] = useCollectionData(q,{idField:'id'});
    const [form, setForm ] = useState(''); 
    const [ lastItem, setLastItem  ] = useState('');
   
    if(!user){ 
        return null;
    } 

    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        if(form.trim() == ""){ 
            return;
        } 


        const msgText = form; 
        setForm("");
        await chatRef.add({ 
            author: user.displayName, 
            photoURL: user.photoURL,
            txt: msgText, 
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),  
        })
        
        if(!loading){
            document.getElementById(messages[messages.length-1].id).scrollIntoView({behavior: 'smooth', block: "start"});
        }
        
    }

    const handleChange = e => { 
        setForm(e.target.value)
    }

    return (  
        <div> 
            <h3>Beinvenido al chat, {user.displayName} </h3> 
            <div className="card bg-dark p-4" style={{overflow: "scroll", overflowX: "hidden", maxHeight: "400px"} }> 
                {loading ? <p> loading... </p> : messages.map((message, index)=> { 
                    // const time = new Date(message.createdAt.seconds * 1000).toISOString().substr(14, 5)
                    return (  
                        <div id={message.id} className=""> 
                            <div className="row card bg-primary pt-2 mt-1 d-flex shadow" style={{width: "max-content"}}> 
                                {/* <div> 
                                    <img src={message.photoURL} alt="" className="rounded-circle d-block" style={{width: "70px"}} />
                                </div> */} 
                                <h6 className="text-light"> <span style={{fontWeight: "400"}}> {message.author}:  </span> {message.txt}  </h6> 
                                <h6 className="text-light" style={{fontWeight: "300", fontSize: "10px"}}>  </h6>
                            
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