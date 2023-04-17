import { QRCodeCanvas } from 'qrcode.react';
export default function QR() {
    return (<div className='d-flex flex-column align-items-center justify-content-center col m-2 p-2 bg-secondary rounded'>
        <h3>URL</h3>
        <QRCodeCanvas value="https://pi2-exemplo-94589.firebaseapp.com/" />
    </div>);
}