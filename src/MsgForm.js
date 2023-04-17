import React, { useState } from "react";

function MsgForm({ okHandler }) {

    const [msg, setMsg] = useState("");

    return (
        <div className='row p-5'>
            <form action="" onSubmit={(e) => { e.preventDefault(); }}>
                <h3>Escreva uma mensagem: </h3>
                <input type="text" name="ti" id="ti" onKeyDown={() => { return false; }} onChange={(e) => setMsg(e.target.value)} value={msg} />
                <button className="btn btn-primary mx-2" type="button" onClick={() => {
                    okHandler(msg);
                    setMsg("");
                }}>Enviar</button>
            </form>
        </div>
    );
}

export default MsgForm;