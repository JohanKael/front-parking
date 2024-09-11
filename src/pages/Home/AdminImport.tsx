import LayoutAdmin from "../Component/LayoutAdmin"
import UploadIcon from '@mui/icons-material/CloudUpload';
import { CsvGateOperation } from './../Component/CsvCard'
import { useState } from "react";
import axios from "axios";

function AdminImport(){
    const [message, setMessage] = useState('');

    const [file1, setFile1] = useState<File | null>(null);
    const [file1Name, setFile1Name] = useState<String>('');

    const submitGateOperation = async () => {
        if(!file1){
            setMessage('Choisissez d\'abord un CSV')
        }
        else{
            const fd = new FormData();
            fd.append('file', file1);

            await axios.post('http://localhost:5002/Gate/operation', fd, {
                headers : {
                    "Custom-Header": "value",
                }
            }).then(res => { 
                setMessage("Upload succesful");
                console.log(res.data);
            }).catch(err =>{ 
                setMessage("Upload failed")
                console.log(err);
            });
        } 
    }

    return(
        <LayoutAdmin>
            <div className="border-2 border-dashed border-neutral-300 h-auto rounded-2xl flex flex-col xl:flex-row items-center justify-between py-8 px-20 gap-4">
                <div className="max-w-[60rem] flex flex-col gap-4 break-all">
                    <span className="flex md:flex-row flex-col gap-1">
                        <p>Importez le fichier </p>
                        <p className="font-bold">CSV</p>
                        <p>comme ci-dessous ici :</p>
                    </span>
                    <CsvGateOperation />
                </div>
                <div className="flex flex-col gap-4">
                    <input className="hidden" type="file" name="gateOperation" id="import" 
                    onChange={(e) =>{
                        const file = e.target.files![0];
                        setFile1(file);
                        setFile1Name(file.name);
                    }}
                    accept=".csv, text/csv" />
                    <label htmlFor="import">
                        <div className="border-2 border-dashed rounded-xl border-neutral-300 h-28 min-w-28 flex flex-col justify-center items-center cursor-pointer px-4">
                            <UploadIcon sx={{fontSize : 60}} className="text-neutral-300" />
                            <p className="text-neutral-500">{ file1Name }</p>
                        </div>
                    </label>

                    <button className='bg-teal-600 p-2 rounded-lg text-white border hover:border-teal-600 hover:bg-white hover:text-teal-600 transition' type="submit" 
                        onClick={submitGateOperation}
                    >
                        Submit
                    </button>
                    <p>{ message }</p>
                </div>  
            </div>
        </LayoutAdmin>
    )

}

export default AdminImport