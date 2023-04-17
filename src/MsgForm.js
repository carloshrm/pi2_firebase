import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { auth, database } from "./FirebaseControl";
import { uid } from "uid";

function MsgForm() {

    const [msg, setMsg] = useState("");

    function gravarMsg(m) {
        const msgID = uid();
        set(ref(database, `/chat/${msgID}`),
            {
                id: msgID,
                msg: m,
                user: auth.currentUser.uid,
                userName: auth.currentUser.displayName,
                time: Date.now()
            });
    }

    return (
        <div className='row p-5'>
            <form action="" onSubmit={(e) => { e.preventDefault(); }}>
                <h3>Escreva uma mensagem: </h3>
                <input type="text" name="ti" id="ti" onKeyDown={() => { return false; }} onChange={(e) => setMsg(e.target.value)} value={msg} />
                <button className="btn btn-primary mx-2" type="button" onClick={() => {
                    gravarMsg(msg);
                    setMsg("");
                }}>Enviar</button>
            </form>
        </div>
    );
}

export default MsgForm;