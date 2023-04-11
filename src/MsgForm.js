import React from "react";

function MsgForm({ setMsg, okHandler }) {
    return (
        <div className='row p-5'>
            <form action="" onSubmit={(e) => { e.preventDefault(); }}>
                <h3>Escreva uma mensagem: </h3>
                <input type="text" name="ti" id="ti" onKeyDown={() => { return false; }} onChange={(e) => setMsg(e.target.value)} />
                <button className="btn btn-primary mx-2" type="button" onClick={okHandler}>Enviar</button>
            </form>
        </div>
    );
}

export default MsgForm;