import React from "react";
import { auth, provider } from "./FirebaseControl";
import { signInWithPopup, signOut } from 'firebase/auth';
import MsgForm from "./MsgForm";

function UserView() {

    function entrar() {
        signInWithPopup(auth, provider);
    }

    function sair() {
        signOut(auth);
    }

    return !auth.currentUser ?
        <div className='col-xl'>
            <button className='btn btn-light' onClick={entrar}>Login com Google</button>
        </div>
        :
        <div className='col-xl'>
            <div>
                <img src={auth.currentUser.photoURL} alt='' />
                <p>{auth.currentUser.displayName}</p>
            </div>
            <button className='btn btn-danger' onClick={sair}>Sair</button>
            <MsgForm />
        </div>;
}

export default UserView;