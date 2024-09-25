import { useEffect, useState } from "react";
import LayoutAdmin from "../Component/LayoutAdmin";
import { dateLitteralToDate, formatNumber, getMonthName } from "../../Function/Function";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from "react-chartjs-2";
import PulseLoader from "react-spinners/PulseLoader";

// Enregistrement des composants nécessaires pour le graphique
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

interface Detail {
    id: number;
    datePaiement: string;
    prix: number;
    nombrePrix: number;
}

interface DetailChart {
    id: number;
    mois: number;
    annee: number;
    totalMensuel: number;
    totalAnnuel: number;
}

function AdminPaie() {
    const [translate, setTranslate] = useState<boolean>(false);
    const [yesterdayPay, setYesterdayPay] = useState<number>(0);
    const [detailYesterday, setYesterdayDetail] = useState<Detail[]>([]);
    const [date, setDate] = useState<string>('');
    const [month, setPaiementMonth] = useState<number>(0);
    const [year, setPaiementYear] = useState<number>(0);
    const [dataMonth, setDataMonth] = useState<DetailChart[]>([]);
    const [dataYear, setDataYear] = useState<DetailChart[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    // Fonction pour récupérer le paiement d'hier
    const getPaiementYesterday = async (date: Date) => {
        setLoading(true);
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/yesterday/paiement';
            const response = await axios.get(url_to_get, {
                params: {
                    date: dateLitteralToDate(date)
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
    const getDetailYesterday = async (date: Date) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/yesterday/paiement/details';
            const response = await axios.get(url_to_get, {
                params: {
                    date: dateLitteralToDate(date)
                }
            });
            setYesterdayDetail(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fonction pour récupérer le total de ce mois pour cette année
    const getMonthPaiement = async (date: Date) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/month';
            const response = await axios.get(url_to_get, {
                params: {
                    date: dateLitteralToDate(date)
                }
            });
            setPaiementMonth(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fonction pour récupérer le total de ce mois pour cette année
    const getYearPaiement = async (date: Date) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/year';
            const response = await axios.get(url_to_get, {
                params: {
                    date: dateLitteralToDate(date)
                }
            });
            setPaiementYear(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    // Fonction pour récupérer les totals par mois de cette année
    const getGraphMonth = async (date: Date) => {
        try {
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/month/datachart';
            const response = await axios.get(url_to_get, {
                params: {
                    date: dateLitteralToDate(date)
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
            const url_to_get = 'http://10.0.105.140:5002/Vente/paiement/year/datachart';
            const response = await axios.get(url_to_get);
            setDataYear(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        setTranslate(true); // On déclenche la translation

        // Mettre comme date par défaut la date d'hier
        const today = new Date();
        const hier = new Date(today.setDate(today.getDate() - 1));
        const formattedDate = hier.toISOString().slice(0, 10); // Formater pour l'input de type date
        setDate(formattedDate); // Initialiser le state date

        // Appeler les fonctions avec la date d'hier
        getPaiementYesterday(hier);
        getDetailYesterday(hier);
        getMonthPaiement(hier);
        getYearPaiement(hier);
        getGraphMonth(hier);
        getGraphYear();
    }, []);

    // Met à jour la date et appelle les fonctions fetch lorsque l'input change
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    }

    const handleFilterClick = () => {
        const selectedDate = new Date(date);
        getPaiementYesterday(selectedDate);
        getDetailYesterday(selectedDate);
        getMonthPaiement(selectedDate);
        getYearPaiement(selectedDate);
        getGraphMonth(selectedDate);
        getGraphYear();
    }

    // Configuration des données pour le graphique en doughnut
    const details = {
        labels: detailYesterday.map(item => item.prix.toString()),
        datasets: [{
            label: 'Nombre',
            data: detailYesterday.map(item => item.nombrePrix),
            backgroundColor: [
                'rgb(2 132 199)',
                'rgb(250 204 21)',
                'rgb(132 204 22)',
                'rgb(239 68 68)',
            ],
            borderColor: '#fff',
            borderWidth: 1
        }]
    }

    // Configuration des données pour le graphique à barres
    const chartDataMonth = {
        labels: dataMonth.map(item => getMonthName(item.mois)), // Récupère les labels
        datasets: [{
            label: 'Nombre', // Légende du graphique
            data: dataMonth.map(item => item.totalMensuel), // Récupère les valeurs
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Couleur de fond
            borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la bordure
            borderWidth: 1,
        }],
    }

    // Options pour le graphique à barres
    const optionsMonth = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Utiliser 'as const' pour indiquer que c'est un type littéral
            },
            title: {
                display: true,
                text: 'Paiement encaissé par mois',
            },
        },
    };

    // Configuration des données pour le graphique à barres
    const chartDataYear = {
        labels: dataYear.map(item => item.annee), // Récupère les labels
        datasets: [{
            label: 'Nombre', // Légende du graphique
            data: dataYear.map(item => item.totalAnnuel), // Récupère les valeurs
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Couleur de fond
            borderColor: 'rgba(75, 192, 192, 1)', // Couleur de la bordure
            borderWidth: 1,
        }],
    }

    // Options pour le graphique à barres
    const optionsYear = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const, // Utiliser 'as const' pour indiquer que c'est un type littéral
            },
            title: {
                display: true,
                text: 'Paiement encaissé par annee',

            },
        },
    };
    

    return (
        <LayoutAdmin>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-6 xl:gap-2">
                    <p className="text-lg font-semibold">Veuillez choisir une date :</p>
                    <div className="flex flex-col xl:flex-row gap-2 xl:gap-10 xl:items-center">
                        <input
                            type="date"
                            value={date}
                            className="border border-neutral-400 px-8 py-2 rounded-md"
                            onChange={handleDateChange}
                        />
                        <button
                            className="bg-teal-600 text-white px-4 py-2 rounded-md flex"
                            onClick={handleFilterClick}
                        >
                            Filtrer
                        </button>
                        <div>
                                {
                                    loading ? <PulseLoader /> : null
                                }
                        </div>
                    </div>
                </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 h-[45rem] md:gap-10">
                        <div className="w-[19rem] md:w-full col-span-1">
                            <div className="rounded-3xl bg-gradient-to-b from-green-800 to-lime-300 text-white px-6 pt-4 pb-14">
                                <p className="text-xl text-neutral-200">Revenu de la veille</p>
                                <div className="flex flex-col 2xl:flex-row items-center gap-0 xl:gap-4">
                                    <h1 className="font-bold text-[50px]">{formatNumber(yesterdayPay)}</h1>
                                    <p className="mt-3 text-3xl">MGA</p>
                                </div>
                            </div>
                            <div className={`rounded-3xl py-2 md:py-10 px-8 transition-transform duration-1000 ${translate ? '-translate-y-12 2xl:-translate-y-14' : '-translate-y-44'} bg-white shadow-xl flex flex-col gap-0 md:gap-4 border border-neutral-300`}>
                                <p className="text-2xl font-bold text-neutral-400">Détails de la veille</p>
                                <div>
                                    {
                                        detailYesterday.map((detail) => (
                                            <span key={detail.id} className="flex">
                                                <p>{formatNumber(detail.prix)} Ar : &nbsp;</p>
                                                <p className="text-green-700">{detail.nombrePrix}</p>
                                            </span>
                                        ))
                                    }
                                </div>
                                <div className="h-80 flex items-center justify-center">
                                    <Doughnut data={details} />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-3 flex flex-col gap-10 pb-10">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="border border-neutral-300 shadow-xl col-span-1 rounded-3xl text-white px-6 py-6">
                                    <p className="text-xl text-neutral-600">Revenu mensuel</p>
                                    <div className="flex flex-col 2xl:flex-row items-center gap-0 xl:gap-4">
                                        <h1 className="font-semibold text-[3rem] text-neutral-800">{formatNumber(month)}</h1>
                                        <p className="mt-3 text-3xl text-neutral-800">MGA</p>
                                    </div>
                                </div>
                                <div className="border border-neutral-300 shadow-xl col-span-1 rounded-3xl text-white px-6 py-6">
                                    <p className="text-xl text-neutral-600">Revenu annuel</p>
                                    <div className="flex flex-col 2xl:flex-row items-center gap-0 xl:gap-4">
                                        <h1 className="font-semibold text-[3rem] text-neutral-800">{formatNumber(year)}</h1>
                                        <p className="mt-3 text-3xl text-neutral-800">MGA</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-2xl text-neutral-400 font-bold">Graphique du mois :</p>
                                <div className="border border-neutral-300 rounded-2xl h-96 shadow-xl flex justify-center items-center">
                                    <Bar data={chartDataMonth} options={optionsMonth} />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <p className="text-2xl text-neutral-400 font-bold">Graphique annuel :</p>
                                <div className="border border-neutral-300 rounded-2xl h-96 shadow-xl flex justify-center items-center">
                                    <Bar data={chartDataYear} options={optionsYear} />
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </LayoutAdmin>
    );
}

export default AdminPaie;
