import React, {useState, useEffect} from 'react' 
import firebase from '@firebase/app'; 

import { useCollectionData } from 'react-firebase-hooks/firestore';

import {db} from '../firebase';


 
const Mensajes = () => {
       
    const msgRef = db.collection('messages'); 
    const q = msgRef.orderBy('createdAt').limit(25);
    const [messages, loading, error] = useCollectionData(q, {idField: 'id'});

    return (  
        <div className="container-fluid mt-4 mb-4"> 
           <div className="card bg-warning"> 
                <h5 className="text-center text-white mt-3"> Algunos mensajes que han dejado mis amigos: </h5> 
                <div className=""> 
                    {loading || error ? null : messages.map((item)=>( 
        
                        <div id={item.id} className="card border-dark m-2 p-2"> 
                            <h6 className=""> {item.author} </h6> 
                            <p className="text-bold"> {item.txt} </p> 

                        </div>
                    
                    ))}
                </div>
           </div> 
        </div>

    );
}
 
export default Mensajes;