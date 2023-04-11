
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set, remove } from "firebase/database";
import MsgForm from "./MsgForm";


import { uid } from 'uid';
import { QRCodeCanvas } from 'qrcode.react';

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

function App() {

  const [chat, setChat] = useState([]);
  const [msg, setMsg] = useState("");
  const [userID, setID] = useState(-1);

  useEffect(() => {

    const localID = localStorage.getItem("uid");
    if (localID === null) {
      const idGen = uid();
      localStorage.setItem("uid", idGen);
      setID(idGen);
    } else {
      setID(localID);
    }
    onValue(ref(database, '/chat'), snp => {
      setChat([]);
      const msg = snp.val();
      if (msg !== null)
        Object.values(msg).forEach(m => {
          setChat(cht => [...cht, m]);
        });
    });

  }, []);

  function gravarMsg(m) {
    const msgID = uid();
    set(ref(database, `/chat/${msgID}`),
      {
        id: msgID,
        msg: m,
        user: userID,
        t: Date.now()
      });
  }

  function deletarMsg(id) {
    remove(ref(database, `/chat/${id}`));
  }

  function okHandler(e) {
    e.preventDefault();
    gravarMsg(msg);
  }

  return (
    <div className="container-md bg-dark text-white ">
      <h1>Chat</h1>
      <div className='row'>
        <div className='col-xl bg-secondary rounded'>

          {chat.sort((ma, mb) => ma.t < mb.t).map(m => {
            return (
              <div className="d-flex align-items-center justify-content-between bg-dark text-white m-4 border border-2 rounded p-2" key={m.id}>
                <p className='fw-bold fs-2'>{m.msg}</p>
                <div className='d-flex gap-2'>
                  <span>{new Date(m.t).toLocaleTimeString()}</span>
                  {m.user === userID ? (<button className='btn btn-warning py-0' onClick={() => deletarMsg(m.id)}>Del</button>) : ""}
                </div>
              </div>);
          })}

        </div>

        <div className='d-flex flex-column align-items-center justify-content-center col m-2 py-5 bg-secondary rounded'>
          <h3>URL</h3>
          <QRCodeCanvas value="https://pi2-exemplo-94589.firebaseapp.com/" />
        </div>

      </div>
      <MsgForm setMsg={setMsg} okHandler={okHandler} />

    </div>
  );
}
export default App;


