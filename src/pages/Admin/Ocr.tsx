import axios from "axios";
import LayoutAdmin from "../Component/LayoutAdmin";
import { useEffect, useState } from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';
import { postDatas } from "../../services/service";
import PulseLoader from "react-spinners/PulseLoader";


function Ocr(){

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageData, setImageData] = useState<{ filename: string; prix: number[] }[]>([]);

    const [loading, setLoading] = useState<boolean>(false);

    // pour afficher le div des totaux
    const [showTotaux,  setShowTotaux] = useState<boolean>(false);


    const handleImage = async (event: { target: { files: FileList | null } }) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const filesArray = Array.from(selectedFiles);
            // Conserve les anciennes images et ajoute les nouvelles
            setSelectedImages(prevImages => [...prevImages, ...filesArray]);

            const formData = new FormData();
            filesArray.forEach(file => {
                formData.append('files', file);
            });

            try {
                setLoading(true);
                const response = await axios.post('http://127.0.0.1:8000/upload-images/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Réponse de l\'API:', response.data);
                // Ajoute les données d'images reçues à l'état
                setImageData(prevData => [...prevData, ...response.data]);
                setShowTotaux(true);
            } catch (error) {
                console.error('Erreur lors de l\'upload des images:', error);
            }finally{
                setLoading(false);
            }
        }
    };

    const handleImageClick = (image: File) => {
        setPreviewImage(URL.createObjectURL(image)); // Ouvre la prévisualisation de l'image
    };

    const closeModal = () => {
        setPreviewImage(null); // Ferme la prévisualisation
    };



    // Fonction pour compter les occurrences de chaque prix
    const countPrices = (prices: number[]) => {
        const priceCount: { [key: number]: number } = {};
        prices.forEach(price => {
            priceCount[price] = (priceCount[price] || 0) + 1;
        });
        return priceCount;
    };

    // Fonction pour obtenir une couleur pour chaque prix
    const priceColors: { [key: number]: string } = {};
    const getPriceColor = (price: number) => {
        if (!priceColors[price]) {
            // Assignez une couleur unique à chaque prix
            const colors = ['text-green-600', 'text-amber-600', 'text-purple-600', 'text-sky-800', 'text-red-500'];
            priceColors[price] = colors[Object.keys(priceColors).length % colors.length];
        }
        return priceColors[price];
    };

    // Fonction pour enlever chaque image ainsi que leur présence dans le tableau
    const handleImageRemoval = (index: number) => {
        const newSelectedImages = [...selectedImages];
        const newImageData = [...imageData];
        newSelectedImages.splice(index, 1);
        newImageData.splice(index, 1);
        setSelectedImages(newSelectedImages);
        setImageData(newImageData);
    };

    // Calculer les totaux des prix
    const totalPriceCount: { [key: number]: number } = {};
    imageData.forEach(data => {
        const priceCount = countPrices(data.prix);
        Object.entries(priceCount).forEach(([price, count]) => {
            const numericPrice = Number(price); // Convertir la clé en nombre
            totalPriceCount[numericPrice] = (totalPriceCount[numericPrice] || 0) + count;
        });
    });

    // Pour capturer les changements des nombres par prix
    const [editablePriceCounts, setEditablePriceCounts] = useState<{ [key: number]: number }>({});

    // Initialiser editablePriceCounts avec totalPriceCount au premier rendu
    useEffect(() => {
        setEditablePriceCounts(totalPriceCount);
        // console.log("Valeurs par défaut des totaux:", totalPriceCount);
    }, [imageData]);

    // Fonction pour gérer le changement de valeur
    const handlePriceChange = (price: string, value: number) => {
        setEditablePriceCounts(prev => {
            const updatedCounts = { ...prev, [price]: value };
            // console.log("Nouvelle valeur après changement:", updatedCounts);
            return updatedCounts;
        });
    };




    // date par défault lors de la submission des données
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const [message, setMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    // Fonction qui va envoyer les ventes de ce jour
    const insertVente = async () => {
        const  newVente = {
            "date" : selectedDate,
            "ensemblePrix" : editablePriceCounts
        }
        try {
            const response = await postDatas('http://10.0.105.140:5002/insert', newVente);
            console.log(response);
            setMessage(response);
        } catch (error) {
            setError("Erreur lors de l'insertion des paiements");
        }

    }

    const [confirmation, setConfirmation] = useState<boolean>(false);

    return (
        <LayoutAdmin>
            <div className="flex flex-col gap-10">
                <div className="w-full flex justify-center items-center">
                    <input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImage}
                    />
                    <label htmlFor="file-upload" className="text-black cursor-pointer border-2 border-dashed border-neutral-300 hover:border-neutral-400 transition text-xl rounded-2xl w-96 md:w-full h-40 md:h-[15rem] flex justify-center items-center px-6 md:px-0">
                        Importez toutes les photos du journal 📸
                    </label>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="col-span-2">
                        {   
                            loading ? (
                                <div className="w-full h-full flex justify-center items-center">
                                    <PulseLoader 
                                        color="rgb(63 63 70)"
                                    />
                                </div>
                            )
                            :
                                (
                                    /* Affichage des images avec prix */
                                    <div className="">
                                        {imageData.map((data, index) => {
                                            const priceCount = countPrices(data.prix);
                                            return (
                                                <div key={index} className="gap-4 md:gap-0 flex flex-row justify-around items-center w-full border border-neutral-300 rounded-2xl my-4 shadow-xl py-10 px-4 md:px-0">
                                                    <div
                                                        className="w-40 h-96 rounded-2xl overflow-hidden cursor-pointer flex flex-col items-center border border-black"
                                                        onClick={() => handleImageClick(selectedImages[selectedImages.length - imageData.length + index])}
                                                    >
                                                        <img
                                                            src={URL.createObjectURL(selectedImages[selectedImages.length - imageData.length + index])}
                                                            alt={data.filename}
                                                            className="w-full h-3/4 object-cover" // Ajustez la hauteur pour laisser de la place au texte
                                                        />
                                                        <p className="mt-8 text-center text-sm font-semibold">{data.filename}</p>
                                                    </div>

                                                    {/* <div className="text-center mt-2">
                                                        {data.prix.map((price, priceIndex) => (
                                                            <div key={priceIndex} className={`${getPriceColor(price)} font-semibold`}>
                                                                {price} Ar
                                                            </div>
                                                        ))}
                                                    </div> */}

                                                    {/* Affichage des prix avec leurs occurrences */}
                                                    <div className="mt-2 flex flex-col gap-2">
                                                        {Object.entries(priceCount).map(([price, count], priceIndex) => (
                                                            <div key={priceIndex} className="flex items-center gap-2">
                                                                <span>{price} Ar:</span>
                                                                <input
                                                                    type="number"
                                                                    placeholder={count.toString()}
                                                                    readOnly
                                                                    className="border border-neutral-400 rounded px-1 py-1 w-14"
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {/* Bouton pour supprimer l'image */}
                                                    <button
                                                        onClick={() => handleImageRemoval(index)}
                                                    >
                                                        <BackspaceIcon className="text-red-500 hover:translate-x-2"/>
                                                    </button>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                        }
                    </div>

                    {
                        (showTotaux) ? (
                            /* Affichage des totaux */
                            <div className="mt-4 col-span-1 w-full xl:h-[30rem] px-10 py-6 flex flex-col gap-10 border border-neutral-400 rounded-2xl shadow-xl">
                                <div className="rounded-xl">
                                    <h3 className="font-semibold text-xl">Total des prix :</h3>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {Object.entries(editablePriceCounts).length === 0 ? (
                                            <div className="flex items-center justify-center text-center text-gray-300 text-3xl font-bold h-32">
                                                Rien à afficher
                                            </div>
                                        ) : (
                                            Object.entries(editablePriceCounts).map(([price, totalCount]) => (
                                                <div key={price} className="flex items-center gap-2">
                                                    <span className="">{price} Ar:</span>
                                                    <input
                                                        type="number"
                                                        value={totalCount}
                                                        onChange={(e) => handlePriceChange(price, Number(e.target.value))}
                                                        className="border border-neutral-300 rounded-lg px-2 py-1 w-14"
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                                <div className="rounded-xl flex flex-col gap-4">
                                    <h3 className="font-semibold text-xl">Veuillez saisir une date :</h3>
                                    <input 
                                        type="date" 
                                        value={selectedDate} 
                                        onChange={(e) => setSelectedDate(e.target.value)} 
                                        className="border border-neutral-300 rounded-lg px-8 py-2" 
                                    />
                                    <button 
                                        onClick={() => setConfirmation(true) } 
                                        type="submit" 
                                        className="mt-4 bg-lime-500 rounded-xl text-white text-xl py-4 border-b border-white shadow-xl shadow-lime-200 hover:border transition"
                                    >
                                        Accepter les informations
                                    </button>
                                    {
                                        (error) ?
                                            <p className="text-red-500">{ error }</p>
                                        :
                                            <p className="text-green-500">{ message }</p>
                                    }
                                </div>
                            </div>
                        ):null
                    }
                </div>

                {/* Modale pour la prévisualisation */}
                {previewImage && (
                    <div 
                        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70" 
                        onClick={closeModal}
                    >
                        <div 
                            className="relative" 
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img 
                                src={previewImage} 
                                alt="Prévisualisation" 
                                className="max-w-screen max-h-screen object-contain"
                            />
                        </div>
                    </div>
                )}

                {/* Div de confirmation d'insertion */}
                <div className={`fixed inset-0 bg-black bg-opacity-40 backdrop-blur-md z-10 ${ confirmation ? 'flex items-center justify-center' : 'hidden'}`}>
                    <div className="bg-white px-32 py-16 rounded-xl shadow-lg flex flex-col gap-4">
                        <h1 className="text-black text-3xl">Confirmation de l'insertion</h1>
                        <p className="text-gray-700 mt-4">Êtes-vous sûr de vouloir confirmé ?</p>
                        <div className="flex gap-12">
                            <button 
                                className="bg-green-700 hover:bg-green-800 transition text-white px-8 py-2 rounded-lg" 
                                onClick={ () => {
                                    insertVente()
                                    setConfirmation(false);
                                }}
                            >
                                Oui, je confirme
                            </button>
                            <button 
                                className="border-2 border-green-600 text-green-700 font-semibold px-8 py-2 rounded-lg" 
                                onClick={() => setConfirmation(false) }
                            >
                                Revenir
                            </button>
                        </div>
                    </div>
                </div>


            </div>    
        </LayoutAdmin>
    );

}

export default Ocr