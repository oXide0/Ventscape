import CryptoJS from 'crypto-js';

const encryptData = (data: string, secretKey: string): string => {
    return CryptoJS.AES.encrypt(data, secretKey).toString();
};

const decryptData = (encryptedData: string, secretKey: string): string => {
    const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};

const setCookie = (name: string, value: string, days: number, secretKey: string): void => {
    const encryptedValue = encryptData(value, secretKey);
    const d = new Date();
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${encryptedValue};${expires};path=/;Secure;SameSite=Strict`;
};

const getCookie = (name: string, secretKey: string): string | null => {
    const nameEQ = `${name}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        const c = ca[i].trim();
        if (c.indexOf(nameEQ) === 0) {
            const encryptedValue = c.substring(nameEQ.length);
            return decryptData(encryptedValue, secretKey);
        }
    }
    return null;
};

export { setCookie, getCookie };
