import React, {useState} from 'react' 
import firebase from '@firebase/app'; 
import '@firebase/firestore'
import { db } from '../firebase';

const Form = ({form, setForm, user}) => {

    const [ error, setError ] = useState();

    const handleChange = e=>{ 
        setForm({ 
            ...form, 
            [e.target.id] : e.target.value
        })
    }

    const submitForm = async (e) => { 
        e.preventDefault(); 
        setForm({ 
            author: "", 
            msg: ""
        })
        return;
        if(form.author.trim() == "" || form.author.trim() == ""){ 
            return;
        }

        const msgRef = db.collection('messages'); 
        await msgRef.add({ 
            author: form.author, 
            txt: form.msg,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        }) 
        setForm({ 
            author: "", 
            msg: ""
        })
    }

    return ( 
        <div className="container-fluid"> 
            <div className="card border-light shadow-sm bg-light" style={{height: "100%"}}> 
                <div className="border"> 
                    <h3 className="card-title text-center pt-2"> ¿Asistirás? </h3> 
                    <h5 className="card-subtitle text-center text-muted pb-2"> Deja un mensaje </h5>
                </div> 
                <form onSubmit={submitForm}> 
                    <div className="form-group mt-3 p-2"> 
                        <label htmlFor="author"> Escribe tu nombre: </label> 
                        <input type="text" className="form-control form-control-sm shadow" id="author" onChange={handleChange} value={form.author}/>
                    </div>
                    <div className="form-group mt-3 p-2"> 
                        <label htmlFor="textarea"> Deja un mensaje </label> 
                        <textarea className="form-control shadow" id="msg" onChange={handleChange} defaultValue={form.msg} value={form.msg}>  </textarea>
                    </div>
                    <button type="submit" className="btn btn-success my-2 rounded  text-bold w-100 shadow-sm" style={{width: "80px"}}> 
                        Asistiré!
                     </button>
                </form> 

            </div>
        </div>

     );
}
 
export default Form;