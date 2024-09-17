import { useState } from "react"
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
    Sortie_rfid : number,
    Already_Used : number,
    Expired : number,
    From_Another_System: number,
    Has_No_Access: number,
    Has_No_Credits: number,
    Not_Taken: number,
    Others: number,
    Token_Unknown: number
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
        console.log(response.data);
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
                    <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex border rounded-2xl p-6 hover:shadow-xl shadow-xl justify-between items-center">
                            <div className="flex flex-col items-start">
                                <p className="font-semibold text-[3rem] xl:text-[4rem] text-neutral-800">{ totalGateOperation?.Entree ? totalGateOperation?.Entree : 0 }</p>
                                <p className="text-neutral-500">Nombre d'entrée</p>
                            </div>
                            <div className="bg-green-200 xl:p-2 rounded-lg xl:rounded-2xl">
                                <SouthEastIcon className="text-lime-600" sx={{ fontSize : 40 }}/>
                            </div>
                        </div>
                        <div className="flex border rounded-2xl p-6 hover:shadow-xl shadow-xl justify-between items-center">
                            <div className="flex flex-col items-start">
                                <p className="font-semibold text-[3rem] xl:text-[4rem] text-neutral-800">{ totalGateOperation?.Entree_rfid ? totalGateOperation?.Entree_rfid : 0 }</p>
                                <p className="text-neutral-500">Nombre d'entrée abonnement </p>
                            </div>
                            <div className="bg-green-200 xl:p-2 rounded-lg xl:rounded-2xl">
                                <SouthEastIcon className="text-lime-600" sx={{ fontSize : 40 }}/>
                            </div>
                        </div>
                        <div className="flex border rounded-2xl p-6 hover:shadow-xl shadow-xl justify-between items-center">
                            <div className="flex flex-col items-start">
                                <p className="font-semibold text-[3rem] xl:text-[4rem] text-neutral-800">{ totalGateOperation?.Sortie ? totalGateOperation?.Sortie : 0 }</p>
                                <p className="text-neutral-500">Nombre de sortie </p>
                            </div>
                            <div className="bg-amber-200 xl:p-2 rounded-lg xl:rounded-2xl">
                                <NorthEastIcon className="text-amber-500" sx={{ fontSize : 40 }}/>
                            </div>
                        </div>
                        <div className="flex border rounded-2xl p-6 hover:shadow-xl shadow-xl justify-between items-center">
                            <div className="flex flex-col items-start">
                                <p className="font-semibold text-[3rem] xl:text-[4rem] text-neutral-800">{ totalGateOperation?.Sortie_rfid ? totalGateOperation?.Sortie_rfid : 0 }</p>
                                <p className="text-neutral-500">Nombre de sortie abonnement </p>
                            </div>
                            <div className="bg-amber-200 xl:p-2 rounded-lg xl:rounded-2xl">
                                <NorthEastIcon className="text-amber-500" sx={{ fontSize : 40 }}/>
                            </div>
                        </div>
                        <div className="shadow-xl col-span-2 p-8">
                            <p className="font-semibold text-lg">Le nombre d'anomalies rencontrées entre ces dates :</p>
                            {
                                (totalGateOperation?.Already_Used) ? 
                                <div className="w-full p-8">
                                    <span className="flex flex-row gap-2">
                                        <p className="text-gray-700">Déjà utilisé :</p>
                                        <p className="text-orange-600">{ totalGateOperation?.Already_Used }</p>
                                    </span>
                                    <span className="flex flex-row gap-2">
                                        <p className="text-neutral-700">Expiré :</p>
                                        <p className="text-red-600">{ totalGateOperation?.Expired }</p>
                                    </span>
                                    <span className="flex flex-row gap-2">
                                        <p className="text-neutral-700">Provenant d'un autre système :</p>
                                        <p className="text-green-600">{ totalGateOperation?.From_Another_System }</p>
                                    </span>
                                    <span className="flex flex-row gap-2">
                                        <p className="text-neutral-700">N'a pas d'accès :</p>
                                        <p className="text-purple-600">{ totalGateOperation?.Has_No_Access }</p>
                                    </span>
                                    <span className="flex flex-row gap-2">
                                        <p className="text-neutral-700">Pas de crédit :</p>
                                        <p className="text-teal-600">{ totalGateOperation?.Has_No_Credits }</p>
                                    </span>
                                    <span className="flex flex-row gap-2">
                                        <p className="text-neutral-700">Non pris en charge :</p>
                                        <p className="text-yellow-600">{ totalGateOperation?.Not_Taken }</p>
                                    </span>
                                    <span className="flex flex-row gap-2">
                                        <p className="text-neutral-700">Token inconnu :</p>
                                        <p className="text-pink-600">{ totalGateOperation?.Token_Unknown }</p>
                                    </span>
                                    <span className="flex flex-row gap-2">
                                        <p className="text-neutral-700">Autres :</p>
                                        <p className="text-indigo-600">{ totalGateOperation?.Others }</p>
                                    </span>
                                </div>
                                :
                                <div className="w-full flex justify-center p-8">
                                    <p className="text-neutral-300 font-semibold text-[2rem]">Il n'y a pas eu d'anomalies</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="shadow-xl py-4 col-span-1 rounded-2xl mt-8 xl:mt-0 px-4">
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