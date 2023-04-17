
import 'bootstrap/dist/css/bootstrap.css';
import { useEffect, useState } from "react";

import { onValue, ref } from "firebase/database";
import { onAuthStateChanged } from 'firebase/auth';
import { auth, database } from './FirebaseControl';

import Msg from './Msg';

import UserView from './UserView';
import QR from './QR';

function App() {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        onValue(ref(database, '/chat'), snp => {
          setChat([]);
          const msg = snp.val();
          if (msg !== null)
            Object.values(msg).forEach(m => {
              setChat(cht => [...cht, m]);
            });
        });
      } else {
        setChat([]);
      }
    });
  }, []);

  return (
    <div className="container-md bg-dark text-white ">

      <h1>Chat</h1>
      <div className='row'>
        <UserView />
      </div>

      <div className='row'>
        <div className='col-xl bg-secondary rounded m-2'>
          <div className='row p-5'>
            {auth.currentUser ?
              chat.sort((ma, mb) => ma.time < mb.time).map(m => {
                return (<Msg key={m.id} messageContent={m} />);
              }) : <p className='bg-dark p-2 rounded'>Entre para participar do chat!</p>}
          </div>
        </div>
        <QR />
      </div>

    </div>
  );
}
export default App;


