import axios from "axios";
import LayoutAdmin from "../Component/LayoutAdmin";
import { useState } from "react";
import BackspaceIcon from '@mui/icons-material/Backspace';


function Ocr(){

    const [selectedImages, setSelectedImages] = useState<File[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageData, setImageData] = useState<{ filename: string; prix: number[] }[]>([]);

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
                const response = await axios.post('http://127.0.0.1:8000/upload-images/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Réponse de l\'API:', response.data);
                // Ajoute les données d'images reçues à l'état
                setImageData(prevData => [...prevData, ...response.data]);
            } catch (error) {
                console.error('Erreur lors de l\'upload des images:', error);
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

    const handleImageRemoval = (index: number) => {
        const newSelectedImages = [...selectedImages];
        const newImageData = [...imageData];
        newSelectedImages.splice(index, 1);
        newImageData.splice(index, 1);
        setSelectedImages(newSelectedImages);
        setImageData(newImageData);
    };

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
                    <label htmlFor="file-upload" className="text-black cursor-pointer border-2 border-dashed border-neutral-300 hover:border-neutral-400 transition text-xl rounded-2xl w-96 md:w-full h-40 md:h-[15rem] flex justify-center items-center">
                        Importez les photos du journal 📸
                    </label>
                </div>

                {/* Affichage des images avec prix */}
                <div className="">
                    {imageData.map((data, index) => {
                        const priceCount = countPrices(data.prix);
                        return (
                            <div key={index} className="flex flex-row justify-around items-center w-full border border-neutral-300 rounded-2xl my-4 shadow-xl py-10">
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
                                                value={count}
                                                placeholder={count.toString()}
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
            </div>
        </LayoutAdmin>
    );

}

export default Ocr