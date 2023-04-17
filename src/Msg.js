
function Msg({ deleteHandler, messageContent, currentUser }) {

    return (
        <div className="d-flex align-items-center justify-content-between bg-dark text-white messageContent-1 border border-1 rounded p-2" key={messageContent.id}>
            <div>
                <span className="fs-4">{messageContent.userName}</span>:
                <p className='fw-bold fs-2 mx-4'>{messageContent.msg}</p>
            </div>
            <div className='d-flex gap-2'>
                <span>{new Date(messageContent.time).toLocaleTimeString()}</span>
                {messageContent.user === currentUser.uid ? (<button className='btn btn-warning py-0' onClick={() => deleteHandler(messageContent.id)}>Del</button>) : ""}
            </div>
        </div>

    );
}

export default Msg;