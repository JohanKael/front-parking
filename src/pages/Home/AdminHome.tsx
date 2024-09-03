import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';

function AdminHome() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="fixed px-2 inset-0 bg-black bg-opacity-30 backdrop-blur-2xl flex items-center justify-center">
            <div className="flex w-full h-screen px-0 py-0 md:px-2 md:py-4">
                <div className={`${isMenuOpen ? 'block bg-dark' : 'hidden bg-white bg-opacity-10'} md:block w-full md:w-1/5 backdrop-blur-sm p-6 rounded-3xl mr-4 absolute md:relative top-0 left-0 h-full z-[1] md:z-10`}>
                    {/* Contenu du menu */}
                </div>
                <div className="w-full md:w-4/5 bg-white p-8 rounded-3xl">
                    <MenuIcon className='md:text-white cursor-pointer' onClick={toggleMenu} />
                    {/* Reste du contenu */}
                </div>
            </div>
        </div>
    )
}

export default AdminHome