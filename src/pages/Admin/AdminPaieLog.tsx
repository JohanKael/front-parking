import { useEffect, useState } from "react";
import LayoutAdmin from "../Component/LayoutAdmin";
import { formatNumber, getMonthName } from "../../Function/Function";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title, LineElement, PointElement } from 'chart.js';
import { Doughnut, Line } from "react-chartjs-2";
import PulseLoader from "react-spinners/PulseLoader";

// Enregistrement des composants nécessaires pour le graphique
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    LineElement, // Ajoutez cet élément pour les graphiques à lignes
    PointElement // Ajoutez cet élément pour les graphiques à lignes
);

interface Detail {
    id: number;
    datePaiement: string;
    prix: number;
    nombrePrix: number;
}

interface DetailChart {
    yearOfPaiement: any;
    monthOfPaiement: number;
    total: any;
    id: number;
    mois: number;
    annee: number;
    datePaiement: string;
    totalMensuel: number;
    totalAnnuel: number;
    dailyTotal: number;
}

function AdminPaieLog(){

    const [yesterdayPay, setYesterdayPay] = useState<number>(0);
    const [detailYesterday, setYesterdayDetail] = useState<Detail[]>([]);
    const [date, setDate] = useState<string>('');
    const [dateFin, setDateFin] = useState<string>('');
    const [month, setPaiementMonth] = useState<number>(0);
    const [year, setPaiementYear] = useState<number>(0);
    const [dataMonth, setDataMonth] = useState<DetailChart[]>([]);
    const [dataYear, setDataYear] = useState<DetailChart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [dailyMonthPaiement, setDailyMonthPaiement] = useState<DetailChart[]>([]);

    // Fonction pour récupérer le paiement <d'hier>
    const getPaiementEntreDate = async (date: string, dateTwo: string) => {
        setLoading(true);
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/log';
            const response = await axios.get(url_to_get, {
                params: {
                    dateFrom: date,
                    dateTo: dateTwo
                }
            });
            setYesterdayPay(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    }

    // Fonction pour récupérer les détails du paiement d'hier
    const getDetailPaiement = async (date: string, dateTwo: string) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/details/log';
            const response = await axios.get(url_to_get, {
                params: {
                    dateFrom: date,
                    dateTo: dateTwo
                }
            });
            setYesterdayDetail(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // obtenir les paiements journalier pour un mois
    const getDailyMonthPaiement = async (date : string, dateTwo : string) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/month/daily/log';
            const response = await axios.get(url_to_get, {
                params: {
                    dateFrom: date,
                    dateTo: dateTwo
                }
            });
            setDailyMonthPaiement(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fonction pour récupérer le total de ce mois pour cette année
    const getMonthPaiement = async (date: string) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/month/log';
            const response = await axios.get(url_to_get, {
                params: {
                    date: date
                }
            });
            setPaiementMonth(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fonction pour récupérer le total de ce mois pour cette année
    const getYearPaiement = async (date: string) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/year/log';
            const response = await axios.get(url_to_get, {
                params: {
                    date: date
                }
            });
            setPaiementYear(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fonction pour récupérer les totals par mois de cette année
    const getGraphMonth = async (date: string) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/month/datachart/log';
            const response = await axios.get(url_to_get, {
                params: {
                    date: date
                }
            });
            setDataMonth(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    // Fonction pour récupérer les totals par année
    const getGraphYear = async () => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/year/datachart/log';
            const response = await axios.get(url_to_get);
            setDataYear(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {

        // Mettre comme date par défaut la date d'hier
        const today = new Date();

        const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 2, 0, 0);
        const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);

        const dateForInput = firstDayOfMonth.toISOString().slice(0, 10);
        const dateTwoForInput = lastDayOfMonth.toISOString().slice(0, 10);

        setDate(dateForInput);
        setDateFin(dateTwoForInput);

        getPaiementEntreDate(dateForInput, dateTwoForInput);
        getDetailPaiement(dateForInput, dateTwoForInput);
        getMonthPaiement(dateForInput);
        getYearPaiement(dateForInput);
        getDailyMonthPaiement(dateForInput, dateTwoForInput);
        getGraphMonth(dateForInput);

        getGraphYear();
    }, []);


    const handleFilterClick = () => {
        const firstDayOfMonth = new Date(date);
        const lastDayOfMonth = new Date(dateFin);

        const dateForInput = firstDayOfMonth.toISOString().slice(0, 10);
        const dateTwoForInput = lastDayOfMonth.toISOString().slice(0, 10);

        setDate(dateForInput);
        setDateFin(dateTwoForInput);

        getPaiementEntreDate(dateForInput, dateTwoForInput);
        getDetailPaiement(dateForInput, dateTwoForInput);
        getMonthPaiement(dateForInput);
        getYearPaiement(dateForInput);
        getDailyMonthPaiement(dateForInput, dateTwoForInput);
        getGraphMonth(dateForInput);

        getGraphYear();
    }

    // Configuration des données pour l'encaissement mensuel
    const chartDataMonth = {
        labels: dataMonth.map(item => getMonthName(item.monthOfPaiement)), // Récupère les labels
        datasets: [{
            label: 'MGA', // Légende du graphique
            data: dataMonth.map(item => item.total), // Récupère les valeurs
            backgroundColor: 'rgba(75, 192, 0, 0.6)', // couleur de fond
            borderColor: 'rgba(75, 192, 0, 1)', // Couleur de la bordure
            borderWidth: 2,
            tension: 0.4
        }],
    }

    // Options pour le graphique à lignes
    const optionsMonth = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Utilisation de 'as const' pour indiquer le type
            },
            title: {
                display: true,
                text: 'Paiement encaissé par mois',
            },
        },
    };

    // Configuration des données pour l'encaissement annuel
    const chartDataYear = {
        labels: dataYear.map(item => item.yearOfPaiement), // Récupère les labels
        datasets: [{
            label: 'MGA', // Légende du graphique
            data: dataYear.map(item => item.total), // Récupère les valeurs
            backgroundColor: 'rgba(245, 158, 11, 0.4)', // Couleur de fond
            borderColor: 'rgb(245 158 11)', // Couleur de la bordure
            borderWidth: 2,
            tension: 0.4
        }],
    }

    // Options pour le graphique à lignes
    const optionsYear = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Utilisation de 'as const' pour indiquer le type
            },
            title: {
                display: true,
                text: 'Paiement encaissé par année',
            },
        },
    };

    const chartDailyMonth = {
        labels: dailyMonthPaiement.map(item => item.datePaiement),
        datasets: [{
            label: 'MGA',
            data: dailyMonthPaiement.map(item => item.total),
            backgroundColor: 'rgba(34, 197, 94, 0.5)', // Couleur de fond en green-600
            borderColor: 'rgba(34, 197, 94, 1)', // Couleur de bordure en green-600
            borderWidth: 2,
            tension: 0.4
        }],
    };

    // Options pour le graphique à barres
    const optionsDailyMonth = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Paiement encaissé par mois',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    const groupedDetails = detailYesterday.reduce<{ [key: number]: { id: number; prix: number; nombrePrix: number } }>((acc, detail) => {
        if (!acc[detail.prix]) {
            acc[detail.prix] = {
                id: detail.id, // ou n'importe quel identifiant unique
                prix: detail.prix,
                nombrePrix: 0,
            };
        }
        acc[detail.prix].nombrePrix += detail.nombrePrix; // Cumul des prix
        return acc;
    }, {});

    // Convertir l'objet en tableau pour le rendu
    const uniqueDetails = Object.values(groupedDetails);

    // Configuration des données pour le graphique en doughnut
    const details = {
        labels: uniqueDetails.map(item => item.prix.toString()),
        datasets: [{
            label: 'Nombre',
            data: uniqueDetails.map(item => item.nombrePrix),
            backgroundColor: [
                'rgb(255, 99, 71)',    // Tomate (Rouge)
                'rgb(255, 165, 0)',    // Orange
                'rgb(255, 255, 0)',    // Jaune
                'rgb(34, 193, 195)',    // Cyan
                'rgb(52, 152, 219)',    // Bleu ciel
                'rgb(155, 89, 182)',    // Violet
                'rgb(241, 196, 15)',    // Or
                'rgb(244, 67, 54)',     // Rouge vif
                'rgb(66, 165, 245)',    // Bleu clair
                'rgb(255, 229, 204)',   // Pêche
            ],
            borderColor: '#fff',
            borderWidth: 1
        }]
    }

    return(
        <LayoutAdmin>

            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6 xl:gap-2">
                    <p className="text-lg font-semibold">Veuillez choisir une date :</p>
                    <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 xl:items-center">
                        <input
                            type="date"
                            value={date}
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <p>jusqu'au</p>
                        <input
                            type="date"
                            value={dateFin}
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                            onChange={(e) => setDateFin(e.target.value)}
                        />
                        <button
                            className="bg-teal-600 text-white px-4 py-2 rounded-md flex justify-center"
                            onClick={handleFilterClick}
                        >
                            Filtrer
                        </button>
                        <div className="flex justify-center items-center">
                                {
                                    loading ? <PulseLoader /> : null
                                }
                        </div>
                    </div>
                </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 h-[45rem] md:gap-10">
                        <div className="md:w-full col-span-1 flex flex-col w-full gap-8">
                            <div className="rounded-3xl bg-gradient-to-b from-green-800 to-lime-400 text-white px-6 pt-4 pb-14">
                                <p className="text-xl text-neutral-200">Recettes date selectionné</p>
                                <div className="flex flex-col 2xl:flex-row items-center gap-0 xl:gap-4 justify-between">
                                    <h1 className="font-bold text-[50px]">{formatNumber(yesterdayPay)}</h1>
                                    <p className="mt-3 text-3xl">MGA</p>
                                </div>
                            </div>
                            <div className='rounded-3xl mb-10 py-2 md:py-10 px-8 bg-white shadow-lg flex flex-col gap-0 md:gap-4 border border-neutral-300'>
                                <p className="text-2xl font-bold text-neutral-400">Détails date selectionné</p>
                                <div>
                                    {
                                        uniqueDetails.map((detail, index) => (
                                            <div key={index}>
                                                <span className="flex">
                                                    <p>{formatNumber(detail.prix)} Ar : &nbsp;</p>
                                                    <p className="text-green-700">{detail.nombrePrix}</p>
                                                </span>
                                            </div>
                                        )
                                    )}
                                </div>
                                <div className="h-80 flex items-center justify-center">
                                    <Doughnut data={details} />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 flex flex-col gap-10 pb-10 mt-10 md:mt-0">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="border border-neutral-300 shadow-lg col-span-1 rounded-3xl text-white px-6 py-9">
                                    <p className="text-xl text-neutral-500">Recettes mensuelles</p>
                                    <div className="flex flex-col 2xl:flex-row items-center justify-between gap-0 xl:gap-4">
                                        {(month) ? <h1 className="font-semibold text-[3rem] text-neutral-700">{formatNumber(month)}</h1> : <h1 className="font-semibold text-[3rem] text-neutral-700">0</h1> }
                                        <p className="rounded-lg py-1 px-2 bg-lime-500 mt-3 text-3xl text-white">MGA</p>
                                    </div>
                                </div>
                                <div className="border border-neutral-300 shadow-lg col-span-1 rounded-3xl text-white px-6 py-9">
                                    <p className="text-xl text-neutral-500">Recettes annuelles</p>
                                    <div className="flex flex-col 2xl:flex-row items-center gap-0 xl:gap-4 justify-between">
                                        { (year) ? <h1 className="font-semibold text-[3rem] text-neutral-700">{formatNumber(year)}</h1> : <h1 className="font-semibold text-[3rem] text-neutral-700">0</h1> }
                                        <p className="rounded-lg py-1 px-2 bg-amber-500 mt-3 text-3xl text-white">MGA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                <p className="text-2xl text-neutral-400 font-bold">Encaissements journalier entre les dates selectionnées :</p>
                                <div className="border border-neutral-300 rounded-2xl h-96 shadow-lg flex justify-center items-center">
                                    <Line data={chartDailyMonth} options={optionsDailyMonth} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col gap-4">
                                    <p className="text-2xl text-neutral-400 font-bold">Encaissements mensuels :</p>
                                    <div className="border border-neutral-300 rounded-2xl h-96 shadow-lg flex justify-center items-center">
                                        <Line data={chartDataMonth} options={optionsMonth} />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <p className="text-2xl text-neutral-400 font-bold">Encaissements annuels :</p>
                                    <div className="border border-neutral-300 rounded-2xl h-96 shadow-lg flex justify-center items-center">
                                        <Line data={chartDataYear} options={optionsYear} />
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            </div>
            
        </LayoutAdmin>
    );

}

export default AdminPaieLog