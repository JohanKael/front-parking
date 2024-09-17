import LayoutAdmin from "../Component/LayoutAdmin"
import UploadIcon from '@mui/icons-material/CloudUpload';
import { CsvAnomalie, CsvGateOperation } from '../Component/CsvCard'
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function AdminImport(){

    //concernant message et erreur du file 1
    const [message1, setMessage1] = useState('');
    const [error1, setError1] = useState('');

    const [file1, setFile1] = useState<File | null>(null);
    const [file1Name, setFile1Name] = useState<String>('');

    const submitGateOperation = async () => {
        if(!file1){
            setMessage1('Choisissez d\'abord un CSV')
        }
        else{
            const fd = new FormData();
            fd.append('file', file1);

            await axios.post('http://10.0.105.140:5002/Gate/operation', fd, {
                headers : {
                    "Custom-Header": "value",
                }
            }).then(res => { 
                setMessage1(res.data);
            }).catch(err =>{ 
                setError1("Upload failed")
                console.log(err);
            });
        } 
    }



    //pour erreur et message file 2
    const [error2, setError2] = useState('');
    const [message2, setMessage2] = useState('');

    const [file2, setFile2] = useState<File | null>(null);
    const [file2Name, setFile2Name] = useState<String>('');

    const submitAnomalie = async () => {
        if(!file2){
            setMessage2('Choisissez d\'abord un CSV')
        }else{
            const fd = new FormData();
            fd.append('file', file2);

            await axios.post('http://10.0.105.140:5002/Gate/anomalie', fd, {
                headers : {
                    "Custom-Header": "value",
                }
            }).then(res => { 
                setMessage2(res.data);
            }).catch(err =>{ 
                setError2("Upload failed")
                console.log(err);
            });
        }
    }

    return(
        <LayoutAdmin>

            <div className="flex flex-col gap-8">
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
                        <input className="hidden" type="file" name="gateOperation" id="import-gate-operation" 
                        onChange={(e) =>{
                            const file = e.target.files![0];
                            setFile1(file);
                            setFile1Name(file.name);
                        }}
                        accept=".csv, text/csv" />
                        <label htmlFor="import-gate-operation">
                            <div className="border-2 border-dashed rounded-xl border-neutral-300 h-28 min-w-28 flex flex-col justify-center items-center cursor-pointer px-4">
                                <UploadIcon sx={{fontSize : 60}} className="text-neutral-300" />
                                <p className="text-neutral-500">{ file1Name }</p>
                            </div>
                        </label>

                        <button className='bg-teal-600 p-2 rounded-lg text-white border hover:border-teal-600 hover:bg-white hover:text-teal-600 transition' type="submit" 
                            onClick={ submitGateOperation }
                        >
                            Submit
                        </button>
                        <div>
                            { 
                                (error1) ? <p className="text-red-600">{error1}</p> : <p className="text-green-600">{message1}</p> 
                            }
                        </div>
                    </div>  
                </div>
                <div className="border-2 border-dashed border-neutral-300 h-auto rounded-2xl flex flex-col xl:flex-row items-center justify-between py-8 px-20 gap-4">
                    <div className="max-w-[60rem] flex flex-col gap-4 break-all">
                        <span className="flex md:flex-row flex-col gap-1">
                            <p>Importez le fichier </p>
                            <p className="font-bold">CSV</p>
                            <p>comme ci-dessous ici :</p>
                        </span>
                        <CsvAnomalie />
                    </div>
                    <div className="flex flex-col gap-4">
                        <input className="hidden" type="file" name="anomalie" id="import-anomalie" 
                        onChange={(e) =>{
                            const file = e.target.files![0];
                            setFile2(file);
                            setFile2Name(file.name);
                        }}
                        accept=".csv, text/csv" />
                        <label htmlFor="import-anomalie">
                            <div className="border-2 border-dashed rounded-xl border-neutral-300 h-28 min-w-28 flex flex-col justify-center items-center cursor-pointer px-4">
                                <UploadIcon sx={{fontSize : 60}} className="text-neutral-300" />
                                <p className="text-neutral-500">{ file2Name }</p>
                            </div>
                        </label>

                        <button className='bg-teal-600 p-2 rounded-lg text-white border hover:border-teal-600 hover:bg-white hover:text-teal-600 transition' type="submit" 
                            onClick={ submitAnomalie }
                        >
                            Submit
                        </button>
                        <div>
                            {   
                                (error2) ? <p className="text-red-600">{ error2 }</p> : <p className="text-green-600">{ message2 }</p>
                            }
                        </div>
                    </div>  
                </div>
            </div>
            
        </LayoutAdmin>
    )

}

export default AdminImport