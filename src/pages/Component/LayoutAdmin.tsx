import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../../../image/logo-remove.png'
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import PlayForWorkIcon from '@mui/icons-material/PlayForWork';
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Perso from './../../../image/perso.png'
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import React, { useEffect, useState } from 'react';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import axios from 'axios';
import PaidIcon from '@mui/icons-material/Paid';

interface LayoutProps{
    children : React.ReactNode;
}

function LayoutAdmin({ children } : LayoutProps) {

    const navigate = useNavigate();
    const {pathname} = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const deconnect = async () => {
        localStorage.removeItem('token');
        const user = sessionStorage.getItem('userInfo');
        const parsedUser = JSON.parse(user!);
        const id = parsedUser?.userId;
        try {
            const response = await axios.put(`http://10.0.105.140:5002/User/offline/${id}`, false, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
        sessionStorage.removeItem('userInfo');
        navigate('/go/admin');
    };

    var user = JSON.parse(sessionStorage.getItem('userInfo')!);

    const isTokenValid = () => {
        const expiration = localStorage.getItem('tokenExpiration');
        return expiration && Date.now() < parseInt(expiration);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const tokenValid = isTokenValid();

        if (!token || !tokenValid) {
            if (pathname !== '/go/admin' && pathname !== '/' && pathname !== '/signup' && pathname !== '/go/admin/signup') {
                navigate('/not-found');
            }
        }
    }, [pathname, navigate]);

    return (
        <div className="fixed md:px-4 inset-0 bg-slate-100">
            <div className="gap-4 h-screen md:py-4 grid grid-cols-1 md:grid-cols-12">
                <div className={`col-span-2 flex flex-col items-center gap-4 px-4 transition-transform duration-300 fixed top-0 left-0 h-full z-30 ${isMenuOpen ? 'bg-teal-600 bg-opacity-20 backdrop-blur-sm translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:z-auto`}>
                    <div className='bg-white w-full flex justify-center rounded-3xl shadow-lg mt-4 md:mt-0'>
                        <img src={Logo} alt="" className='md:w-36 w-40'/>
                    </div>
                    <div className='bg-white w-full flex justify-center rounded-3xl p-4 flex-col gap-2 shadow-lg'>
                        <div className='flex flex-col xl:flex-row items-center gap-4 justify-start'>
                            <div>
                                <img src={ Perso } alt="" className='w-14'/>
                            </div>
                            <div className='flex flex-col'>
                                <p className='md:hidden xl:block font-semibold text-lg'>{ user?.userName }</p>
                                <p className='md:hidden xl:block break-all font-light text-neutral-500'>{ user?.userEmail }</p>
                            </div>
                        </div>
                        <button onClick={ deconnect } className='bg-teal-700 flex justify-center rounded-full font-thin break-words py-2 xl:rounded-xl hover:tracking-widest transition-all duration-300 mb-1'>
                            <LogoutIcon className='text-white'/> 
                            <p className='hidden xl:block text-white'>&nbsp; Se déconnecter</p>
                        </button>
                    </div>
                    <div className='bg-white w-full flex flex-col px-2 rounded-3xl py-2 gap-1 shadow-lg'>
                        <h2 className='text-2xl font-semibold ml-2 text-neutral-400'>Liens</h2>
                        <Link to='/admin/home'>
                            <div className='flex md:justify-center xl:justify-start font-thin bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl mb-1 hover:tracking-wider transition-all hover:shadow-md'>
                                <PaidIcon />
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Statistiques paiement</p>
                            </div>
                        </Link>
                        <Link to='/admin/gate'>
                            <div className='flex md:justify-center xl:justify-start font-thin bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl mb-1 hover:tracking-wider transition-all hover:shadow-md'>
                                <AnalyticsIcon /> 
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Statistiques barrières</p>
                            </div>
                        </Link>
                        <Link to='/admin/list'>
                            <div className='flex md:justify-center xl:justify-start font-thin bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl mb-1 hover:tracking-wider transition-all hover:shadow-md'>
                                <PeopleIcon /> 
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Liste des utilisateurs</p>
                            </div>
                        </Link>
                        <Link to='/admin/user'>
                            <div className='flex md:justify-center xl:justify-start font-thin bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl mb-1 hover:tracking-wider transition-all hover:shadow-md'>
                                <AssignmentIndIcon /> 
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Demande d'accès</p>
                            </div>
                        </Link>
                        <Link to='/admin/import'>
                            <div className='flex md:justify-center xl:justify-start font-thin bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl mb-1 hover:tracking-wider transition-all hover:shadow-md'>
                                <PlayForWorkIcon /> 
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Import</p>
                            </div>
                        </Link>
                        <Link to='/admin/ocr'>
                            <div className='flex md:justify-center xl:justify-start font-thin bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl mb-1 hover:tracking-wider transition-all hover:shadow-md'>
                                <DocumentScannerIcon /> 
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;OCR</p>
                            </div>
                        </Link>
                    </div>
                </div>
                    <button 
                        className="md:hidden absolute top-2 right-4 text-black p-2 rounded-lg backdrop-blur-xl bg-white bg-opacity-30"
                        onClick={toggleMenu}
                    >
                        <MenuIcon />
                    </button>
                <div className="pt-20 xl:p-8 bg-white md:rounded-3xl grid-cols-1 md:col-span-10 p-7 gap-10 overflow-y-auto shadow-2xl">
                    { children }
                </div>
            </div>
        </div>

    )


}


export default LayoutAdmin