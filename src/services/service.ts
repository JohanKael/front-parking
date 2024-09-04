import axios from 'axios';

export const fetchDatas = async (urlToFetch: string) => {
    try {
        const response = await axios.get(urlToFetch)
        return response.data;
    } catch (error) {
        console.log(error);
    }
}