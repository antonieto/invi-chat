import React from 'react'
import google_logo from './google_logo.svg';
import firebase from '@firebase/app';
import {auth} from '../firebase'; 

const SignIn = ({user}) => {
    
    const googleSignIn = () => { 
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    const githubSignIn = () => { 
        const provider = new firebase.auth.GithubAuthProvider();
        provider.addScope('repo')
        auth.signInWithRedirect(provider);
    }

    if(user){ 
        return null;
    } 

    return ( 
        <div className="container-fluid"> 
            
            <div className="w-50"> 
                <button type="button" className="btn btn-warning m-2" onClick={googleSignIn}> Sign In With Google <img src={google_logo}/> </button>  
                
                <button type="button" className="btn btn-secondary m-2" onClick={githubSignIn}> Sign In With GitHub</button> 
            </div>
        </div>
      );
}
 
export default SignIn;