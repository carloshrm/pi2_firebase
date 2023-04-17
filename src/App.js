
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from 'firebase/auth';

import MsgForm from "./MsgForm";


import { uid } from 'uid';
import { QRCodeCanvas } from 'qrcode.react';
import Msg from './Msg';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
  measurementId: process.env.REACT_APP_measurementId,
  databaseURL: process.env.REACT_APP_databaseURL
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();


function App() {

  const [chat, setChat] = useState([]);
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          name: user.displayName,
          uid: user.uid,
          img: user.photoURL,
        });
        onValue(ref(database, '/chat'), snp => {
          setChat([]);
          const msg = snp.val();
          if (msg !== null)
            Object.values(msg).forEach(m => {
              setChat(cht => [...cht, m]);
            });
        });
      } else {
        setUser(undefined);
        setChat([]);
      }
    });



  }, []);

  function entrar() {
    signInWithPopup(auth, provider);
  }

  function sair() {
    signOut(auth);
  }

  function gravarMsg(m) {
    const msgID = uid();
    set(ref(database, `/chat/${msgID}`),
      {
        id: msgID,
        msg: m,
        user: user.uid,
        userName: user.name,
        time: Date.now()
      });
  }

  function deleteHandler(id) {
    remove(ref(database, `/chat/${id}`));
  }

  function okHandler(msg) {
    gravarMsg(msg);
  }

  return (
    <div className="container-md bg-dark text-white ">
      <h1>Chat</h1>
      <div className='row'>
        {!auth.currentUser ?
          <div className='col-xl'>
            <button className='btn btn-light' onClick={entrar}>Entrar</button>
          </div>
          :
          <div className='col-xl'>
            <div>
              <img src={user.img} alt='' />
              <p>{user.name}</p>
            </div>
            <button className='btn btn-danger' onClick={sair}>Sair</button>
            <MsgForm okHandler={okHandler} />
          </div>}
      </div>
      <div className='row'>
        <div className='col-xl bg-secondary rounded m-2'>
          <div className='row p-5'>
            {user !== undefined ?
              chat.sort((ma, mb) => ma.time < mb.time)
                .map(m => {
                  return (<Msg key={m.id} deleteHandler={deleteHandler} messageContent={m} currentUser={user} />);
                }) : <p className='bg-dark p-2 rounded'>Entre para participar do chat!</p>}
          </div>
        </div>

        <div className='d-flex flex-column align-items-center justify-content-center col m-2 p-2 bg-secondary rounded'>
          <h3>URL</h3>
          <QRCodeCanvas value="https://pi2-exemplo-94589.firebaseapp.com/" />
        </div>
      </div>
    </div>
  );
}
export default App;


