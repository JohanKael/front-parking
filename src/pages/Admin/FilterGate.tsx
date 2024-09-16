import { useEffect, useState } from "react"
import LayoutAdmin from "../Component/LayoutAdmin"
import { dateTimeFormat } from "../../Function/Function";
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

interface GateOperation{
    Entree : number,
    Entree_rfid : number,
    Sortie : number,
    Sortie_rfid : number
}

function FilterGate(){

    const [ dateFrom, setDateFrom ] = useState<string>('');
    const [ dateTo, setDateTo ] = useState<string>('');
    const [ totalGateOperation, setTotalGateOperation ] = useState<GateOperation>();

    const getDate = async () => {
        const dateOne = dateTimeFormat(dateFrom);
        const dateTwo = dateTimeFormat(dateTo);

        const url_to_post = "http://10.0.105.140:5002/Gate/filter";
        const response = await axios.get(url_to_post, {
            params:{
                dateFrom : dateOne,
                dateTo : dateTwo
            }
        });
        setTotalGateOperation(response.data);
    }

    const datas = {
        labels: ['Entrée', 'Entrée abonnement', 'Sortie', 'Sortie abonnement'],
        datasets: [{
            label: 'Operations',
            data: [
                totalGateOperation?.Entree,
                totalGateOperation?.Entree_rfid,
                totalGateOperation?.Sortie,
                totalGateOperation?.Sortie_rfid
            ],
            backgroundColor: [
                'rgb(250 204 21)',
                'rgb(132 204 22)',
                'rgb(239 68 68)',
                'rgb(2 132 199)'
            ],
            borderColor: '#fff',
            borderWidth: 1
        }]
    }

    return(
        <LayoutAdmin>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6 xl:gap-2">
                    <p className="text-lg font-semibold">Veuiller choisir entre deux dates :</p>
                    <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 xl:items-center">
                        <input 
                            type="datetime-local" 
                            name="" 
                            id="" 
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                            onChange={(e) => setDateFrom(e.target.value)}
                        />
                        <p>&nbsp;jusqu'à&nbsp;</p>
                        <input 
                            type="datetime-local" 
                            name="" 
                            id="" 
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                            onChange={(e) => setDateTo(e.target.value)}
                        />
                        <button 
                            type="submit"
                            className="bg-teal-500 text-white rounded-md px-8 py-2 text-lg hover:bg-teal-600 transition-colors mt-3 xl:mt-0"
                            onClick={getDate}
                        >
                            Filtrer
                        </button>
                    </div>
                </div>
                <div className="py-4 grid grid-cols-1 xl:grid-cols-3 gap-0 xl:gap-10">
                    <div className="col-span-2 grid grid-cols-2 gap-8">
                        <div className="hover:text-yellow-400 hover:border-yellow-400 bg-yellow-400 rounded-2xl p-6 hover:shadow-xl hover:shadow-yellow-200 transition">
                            <p className="text-white">Nombre d'entrée :</p>
                            <div className="flex flex-col md:flex-row items-center gap-3 xl:gap-6">
                                <p className="font-bold text-[3rem] xl:text-[5rem] text-white">{ totalGateOperation?.Entree ? totalGateOperation?.Entree : 0 }</p>
                                <SouthEastIcon className="text-white" sx={{ fontSize : 60 }}/>
                            </div>
                        </div>
                        <div className="hover:border-lime-500 bg-lime-500 rounded-2xl p-6 hover:shadow-xl hover:shadow-lime-300 transition">
                            <p className="text-white">Nombre d'entrée abonnement :</p>
                            <div className="flex flex-col md:flex-row items-center gap-3 xl:gap-6">
                                <p className="font-bold text-[3rem] xl:text-[5rem] text-white">{ totalGateOperation?.Entree_rfid ? totalGateOperation?.Entree_rfid : 0 }</p>
                                <SouthEastIcon className="text-white" sx={{ fontSize : 60 }}/>
                            </div>
                        </div>
                        <div className="hover:border-red-500 bg-red-500 rounded-2xl p-6 hover:shadow-xl hover:shadow-red-300 transition">
                            <p className="text-white">Nombre de sortie :</p>
                            <div className="flex flex-col md:flex-row items-center gap-3 xl:gap-6">
                                <p className="font-bold text-[3rem] xl:text-[5rem] text-white">{ totalGateOperation?.Sortie ? totalGateOperation?.Sortie : 0 }</p>
                                <NorthEastIcon className="text-white" sx={{ fontSize : 60 }}/>
                            </div>
                        </div>
                        <div className="hover:border-sky-600  bg-sky-600 rounded-2xl p-6 hover:shadow-xl hover:shadow-sky-300 transition">
                            <p className="text-white">Nombre de sortie abonnement :</p>
                            <div className="flex flex-col md:flex-row items-center gap-3 xl:gap-6">
                                <p className="font-bold text-[3rem] xl:text-[5rem] text-white">{ totalGateOperation?.Sortie_rfid ? totalGateOperation?.Sortie_rfid : 0 }</p>
                                <NorthEastIcon className="text-white" sx={{ fontSize : 60 }}/>
                            </div>
                        </div>
                    </div>
                    <div className="border border-slate-300 py-4 col-span-1 rounded-2xl mt-8 xl:mt-0 px-4">
                        <p className="text-neutral-500">Doughnut Chart des statistiques :</p>
                        { totalGateOperation ? 
                            <div className="h-96 flex justify-center items-center">
                                <Doughnut data={datas}/>
                            </div>
                            : 
                            <div className="h-80 flex justify-center items-center">
                                <p className="text-neutral-300 font-semibold text-[3rem]">Rien à afficher</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            
        </LayoutAdmin>
    )
}

export default FilterGate