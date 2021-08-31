import React from 'react'
import firebase from '@firebase/app';
import { auth } from '../firebase'; 


const SingOut = () => {
    return ( 
        <div style="w-100"> 
            <button type="button" className="btn btn-danger w-100" onClick={ auth.signOut() }> Log Out</button> 
        </div>       
      );
}
 
export default SingOut;