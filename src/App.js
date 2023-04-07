
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set, remove } from "firebase/database";

import { uid } from 'uid';

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
const analytics = getAnalytics(app);
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
    console.log("uid " + userID);
    onValue(ref(database, '/chat'), snp => {
      setChat([]);
      const msg = snp.val();
      if (msg !== null)
        Object.values(msg).forEach(m => {
          console.log(m);
          setChat(cht => [...cht, m]);
        });
    });
  }, []);

  function gravarMsg(m) {
    const msgID = uid();
    set(ref(database, `/chat/${msgID}`), { id: msgID, msg: m, user: userID, t: Date.now() });
  }

  function deletarMsg(id) {
    remove(ref(database, `/chat/${id}`));
  }

  function okHandler(e) {
    e.preventDefault();
    gravarMsg(msg);
  }

  return (
    <div className="container-sm bg-dark mx-auto text-white p-4 rounded my-2">
      <h1>Chat</h1>
      {chat.map(m => {
        return (
          <div className="d-flex align-items-center justify-content-between bg-secondary text-white m-4 border border-2 rounded p-2 w-50" key={m.id}>
            <p className='fw-bold fs-2'>{m.msg}</p>
            <div className='d-flex gap-2'>
              <span>{new Date(m.t).toLocaleTimeString()}</span>
              {m.user === userID ? (<button className='btn btn-dark py-0' onClick={() => deletarMsg(m.id)}>Del</button>) : ""}
            </div>
          </div>);
      })}
      <form action="" onSubmit={(e) => { e.preventDefault(); }}>
        <h3>Escreva uma mensagem: </h3>
        <input type="text" name="ti" id="ti" onKeyDown={() => { return false; }} onChange={(e) => setMsg(e.target.value)} />
        <button className="btn btn-primary mx-2" type="button" onClick={okHandler} >Enviar</button>
      </form>
    </div>
  );
}
export default App;
