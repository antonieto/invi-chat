import React, { useState } from 'react'; 
import Header from './components/Header';
import Form from './components/Form';
import SignIn from './components/SignIn';
import Mensajes from './components/Mensajes';
import Chat from './components/Chat';

import { auth } from './firebase'; 

import {useAuthState } from 'react-firebase-hooks/auth';

function App() {

  const [form, setForm] = useState({ 
    author:"", 
    msg: ""
  })

  const [user] = useAuthState(auth);

  return (
    <div className="App bg-light vh-100">
      <Header/> 
      <div className="container-fluid w-75"> 
        <div className="row">
          
          <div className="col-md">
            <Form 
              setForm={setForm} 
              form={form} 
              user={user}
            />  
            {/* <Mensajes/> */}
          </div>
          <div className="col-md">
            <SignIn 
              user={user}
            /> 
            <Chat 
              user={user}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
