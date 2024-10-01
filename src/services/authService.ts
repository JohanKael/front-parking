import axios from 'axios';

export interface User{
    userId : number
    idRole: number;
    nomUser : string
    emailUser : string
    nomRole : string
    dateDemande : string
    isActive: boolean
}

export interface Role{
    id: number;
    nomRole: string;
    codeRole: number;
}

export const loginAdmin = async (email: string, password: string) => {
    const BASE_URL = 'http://10.0.105.140:5002/Auth';
    try {
        const response = await axios.post(`${BASE_URL}`, {
        emailUser: email,
        mdpUser: password
        });
        return response.data;
    } catch (error) {

    }
};

export const loginUser = async (email: string, password: string) => {
    const BASE_URL = 'http://10.0.105.140:5002/Auth/user';
    try {
        const response = await axios.post(`${BASE_URL}`, {
        emailUser: email,
        mdpUser: password
        });
        return response.data;
    } catch (error) {

    }
};

export const signupAdmin = async (name: string, email: string, password: string) => {
    const url_to_post = 'http://10.0.105.140:5002/Admin/createAdmin';
    try {
        const response = await axios.post(`${url_to_post}`, {
            nomUser: name,
            emailUser: email,
            mdpUser: password
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du compte:', error);
        throw error;
    }
}

export const signup = async (name: string, email: string, password: string) => {
    const url_to_post = 'http://10.0.105.140:5002/User/createUser';
    try {
        const response = await axios.post(`${url_to_post}`, {
            nomUser: name,
            emailUser: email,
            mdpUser: password
        });
        return response.data;
    } catch (error) {
        console.error('Erreur lors de la création du compte:', error);
        throw error;
    }
}
