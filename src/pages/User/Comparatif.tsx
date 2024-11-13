import { useState, useEffect } from "react";
import { convertToDateInputFormat, dateLitteralToDateTime, formatNumber } from "../../Function/Function";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import { Doughnut } from "react-chartjs-2";
import Layout from "../Component/Layout";

interface OCRLog{
    log: number,
    ocr: number
}

function Comparatif(){

    const [firstDate, setFirstDate] = useState('');
    const [lastDate, setLastDate] = useState('');

    const [loading, setLoading] = useState<boolean>(false);

    const [response, setResponse] = useState<OCRLog>({ log: 0, ocr: 0 });

    const getRevenue = async (firstDate: string, lastDate: string) => {
        try {
            const response = await axios.post("http://10.0.105.140:5002/Vente/comparatif", {
                dateOne: firstDate,
                dateTwo: lastDate
            });
    
            setResponse(response.data);
        } catch (error) {
            console.error("Erreur lors de la requête :", error);
        }
    };
    

    useEffect(() => {
        const date = new Date();

        const dateDebutLitteral = new Date(date.getFullYear(), date.getMonth(), 1);
        const dateFinLitteral = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        const dateTimeDebut = dateLitteralToDateTime(dateDebutLitteral);
        const dateTimeFin = dateLitteralToDateTime(dateFinLitteral);

        const dateDebutToInput = convertToDateInputFormat(dateTimeDebut);
        const dateFinToInput = convertToDateInputFormat(dateTimeFin);

        setFirstDate(dateDebutToInput);
        setLastDate(dateFinToInput);

        getRevenue(dateDebutToInput, dateFinToInput);
    }, []);

    const handleClickComparatif = async () => {
        setLoading(true);
        try {
            await getRevenue(firstDate, lastDate);
        } catch (error) {
            
        }finally{
            setLoading(false);
        }
    }


    const datas = {
        labels: ['Revenue de la caisse', 'Revenue du rouleau'],
        datasets: [{
            label: 'MGA',
            data: [
                response?.log,
                response?.ocr
            ],
            backgroundColor: [
                'rgb(132 204 22)',
                'rgb(250 204 21)'
            ],
            borderColor: '#fff',
            borderWidth: 1
        }]
    }

    return(
        <Layout>
            <div className="w-full h-full">
                <div className="w-full flex flex-col gap-4 mb-4">
                    <p>Veuillez choisir entre deux dates :</p>
                    <div className="flex items-center gap-10">
                        <input 
                            type="date" 
                            name="" 
                            id="" 
                            value={firstDate}
                            onChange={(e) => setFirstDate(e.target.value)}
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                        />
                        <p>jusqu'au</p>
                        <input 
                            type="date" 
                            name="" 
                            id="" 
                            value={lastDate}
                            onChange={(e) => setLastDate(e.target.value)}
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                        />
                        <button
                            className="bg-teal-600 text-white px-4 py-2 rounded-md flex justify-center"
                            onClick={handleClickComparatif}
                        >
                            Filtrer
                        </button>
                    </div>
                </div>
                {
                    (loading) ? 
                    <div className="w-full flex justify-center pt-10">
                        <PulseLoader />
                    </div>
                    :
                    <div className="w-full grid grid-cols-4 pt-10 gap-10">
                        <div className="col-span-2 flex flex-col gap-6">
                            <div className="bg-lime-500 rounded-3xl shadow-xl px-8 py-6">
                                <p className="text-white text-xl">Revenue de la caisse</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-white font-semibold text-[60px]">{ formatNumber(response?.log ?? 0) }</p>
                                    <span className="bg-green-200 bg-opacity-60 p-4 rounded-2xl xl:rounded-2xl">
                                        <PointOfSaleIcon className="text-lime-600" sx={{ fontSize: 30 }}/>
                                    </span>
                                </div>
                            </div>
                            <div className="bg-amber-300 rounded-3xl shadow-xl px-8 py-6">
                                <p className="text-white text-xl">Revenue du rouleau</p>
                                <div className="flex justify-between items-center">
                                    <p className="text-white font-semibold text-[60px]">{ formatNumber(response?.ocr ?? 0) }</p>
                                    <span className="bg-amber-200 p-4 rounded-2xl xl:rounded-2xl">
                                        <TextSnippetIcon className="text-amber-500" sx={{ fontSize: 30 }}/>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 rounded-3xl border border-neutral-200 shadow-xl px-8 py-6">
                            <p>Chart graphique des différences :</p>
                            <Doughnut data={datas}/>
                        </div>
                        {
                            response?.log === response?.ocr ? (
                                <div className="col-span-1 rounded-3xl border border-lime-500 bg-green-200 bg-opacity-60 shadow-xl px-8 py-6">
                                    <p className="text-lime-600 text-lg font-semibold">Remarques :</p>
                                    <p>Tout semble bon, les chiffres coïncident.</p>
                                </div>
                            ) : 
                                <div className="col-span-1 rounded-3xl border border-red-500 bg-rose-200 bg-opacity-60 shadow-xl px-8 py-6">
                                    <p className="text-red-600 text-lg font-semibold">Remarques :</p>
                                    <p>Le chiffre de la caisse est supérieur au chiffre du rouleau. Il se pourrait qu'il y ait eu un problème comme la faute de saisie manuelle, etc...</p>
                                </div>
                        }

                    </div>
                }
            </div>
        </Layout>
    );
}


export default Comparatif