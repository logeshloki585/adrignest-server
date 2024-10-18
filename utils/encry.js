import CryptoJS from 'crypto-js';
const SECRET_KEY = 'Adrignest2024';

export function encrypt(text) {
    const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
    return `sk-${encrypted}`;
}


export function decrypt(encryptedText) {
    const encrypted = encryptedText.slice(3);
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
}