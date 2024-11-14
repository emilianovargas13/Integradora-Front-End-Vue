import CryptoJS from 'crypto-js';

const secretKey = process.env.VUE_APP_SECRET_KEY;

export const encrypt = (data: string): string => {
    return CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
}

export const decrypt = (data: string): object => {
    return JSON.parse(CryptoJS.AES.decrypt(data, secretKey).toString(CryptoJS.enc.Utf8));
}

export const encryptRouteParam = (param: string): string => {
    const encryptedData = CryptoJS.AES.encrypt(param, secretKey).toString();
    return encryptedData.replace(/\//g, '_');
}

export const decryptRouteParam = (param: string): string => {
    const replacedParam = param.replace(/_/g, '/');
    return CryptoJS.AES.decrypt(replacedParam, secretKey).toString(CryptoJS.enc.Utf8);
}