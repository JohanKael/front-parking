import axios from 'axios';

export const fetchDatas = async (urlToFetch: string) => {
    try {
        const response = await axios.get(urlToFetch)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const changeUserConfirmation = async (url: string, status: boolean | null) => {
    try {
        const response = await axios.put(url, {
            isConfirmed: status
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
}