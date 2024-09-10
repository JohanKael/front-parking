import LayoutAdmin from "../Component/LayoutAdmin"
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import { CsvGateOperation } from './../Component/CsvCard'
import { useState } from "react";
import { postDatas } from "../../services/service";

function AdminImport(){
    const [message, setMessage] = useState('');

    const [file1, setFile1] = useState(null);
    const [file1Name, setFile1Name] = useState('');

    const handleFileChange = (e : any) => {
        const file = e.target.files[0];
        if (file) {
            setFile1(file);
            setFile1Name(file.name);
        }else{
            setFile1Name('')
        }
    }

    const submitGateOperation = async (e : any) => {
        e.preventDefault();
        if(!file1){
            setMessage('Choisissez d\'abord un fichier');
        }else{
            setMessage('');
        }
        
        const formData = new FormData();
        formData.append('file', file1);
        
        const url_to_post = "http://localhost:5002/Gate/operation";
        try {
            const response = await postDatas(url_to_post, file1);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <LayoutAdmin>
            <div className="border-2 border-dashed border-neutral-300 h-auto rounded-2xl flex flex-col xl:flex-row items-center justify-between p-8 gap-4">
                <div className="max-w-[60rem] flex flex-col gap-4 break-all">
                    <span className="flex md:flex-row flex-col gap-1">
                        <p>Importez le fichier </p>
                        <p className="font-bold">CSV</p>
                        <p>comme ci-dessous ici :</p>
                    </span>
                    <CsvGateOperation />
                </div>
                <form onSubmit={ submitGateOperation }>
                    <input className="hidden" type="file" name="gateOperation" id="import" onChange={ handleFileChange } accept=".csv, text/csv" />
                    <div className="flex flex-col gap-4">
                        <label htmlFor="import">
                            <div className="border-2 border-dashed rounded-xl border-neutral-300 h-28 min-w-28 flex flex-col justify-center items-center cursor-pointer px-4">
                                <SaveAltIcon sx={{fontSize : 60}} className="text-neutral-300" />
                                <p className="text-neutral-500">{ file1Name }</p>
                            </div>
                        </label>

                        <button className='bg-teal-600 p-2 rounded-lg text-white border hover:border-teal-600 hover:bg-white hover:text-teal-600 transition' type="submit">Submit</button>
                    </div>  
                </form>
                <p>{ message }</p>
            </div>
        </LayoutAdmin>
    )

}

export default AdminImport