import axios from 'axios';


export const fetchDatas = async (urlToFetch: string) => {
    try {
        const response = await axios.get(urlToFetch);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const changeUserConfirmation = async (id : number, url: string, status: boolean | null) => {
    try {
        const response = await axios.put(url, 
            {
                isConfirmed: status
            },
            { headers : {
                'Content-Type': 'application/json',
                'IdUser' : id
            }});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const postDatas = async (urlToPost : string ,datas : any) => {
    try {
        const response = await axios.post(urlToPost, datas);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}