import axios from 'axios';

export class DataService {
    convertFromBase64toPDF(base64: string) {

        const byteArray = new Uint8Array(
            atob(base64).split('').map(char => char.charCodeAt(0))
        );
        const file = new Blob([byteArray], { type: 'application/pdf' });
        return URL.createObjectURL(file);

    }
}