import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../../../image/logo-remove.png'
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useEffect, useState } from 'react';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import axios from 'axios';

interface LayoutProps{
    children : React.ReactNode;
}

function Layout({ children } : LayoutProps) {

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
        navigate('/');
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
        <div className="fixed md:px-4 inset-0">
            <div className="gap-4 h-screen md:py-4 grid grid-cols-1 md:grid-cols-12">
                <div className={`col-span-2 flex flex-col items-center gap-4 px-4 transition-transform duration-300 fixed top-0 left-0 h-full z-30 ${isMenuOpen ? 'bg-teal-800 bg-opacity-70 backdrop-blur-3xl translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:z-auto`}>
                    <div className='md:bg-white md:bg-opacity-10 md:backdrop-blur-3xl w-full flex justify-center items-center rounded-3xl'>
                        <img src={Logo} alt="" className='w-28 md:w-36'/>
                    </div>
                    <div className='bg-white bg-opacity-10 md:bg-opacity-10 md:backdrop-blur-3xl w-full flex justify-center rounded-3xl p-4 flex-col gap-2'>
                        <div className='flex flex-col xl:flex-row text-white items-center gap-4 justify-start'>
                            <div>
                                <AccountCircleIcon sx={{ fontSize: 45 }}/>
                            </div>
                            <div className='flex flex-col'>
                                <p className='md:hidden xl:block font-semibold text-lg'>{ user?.userName }</p>
                                <p className='md:hidden xl:block break-all font-light text-neutral-300'>{ user?.userEmail }</p>
                            </div>
                        </div>
                        <button onClick={ deconnect }>
                            <div className='flex justify-center rounded-full text-white font-thin break-words bg-white bg-opacity-10 py-2 xl:rounded-xl hover:bg-opacity-100 hover:text-black transition-colors duration-300 mb-1'>
                                <LogoutIcon /> 
                                <p className='hidden xl:block'>&nbsp; Se déconnecter</p>
                            </div>
                        </button>
                    </div>
                    <div className='bg-white bg-opacity-10 md:bg-opacity-10 md:backdrop-blur-3xl w-full flex flex-col px-2 rounded-3xl py-2 gap-1'>
                        <h2 className='text-white text-2xl font-semibold ml-2'>Liens</h2>
                        <Link to='/comparatif'>
                            <div className='flex md:justify-center xl:justify-start text-white font-thin bg-white bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl hover:bg-opacity-30 transition mb-1'>
                                <CurrencyExchangeIcon />
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Comparatif caisse et revenues</p>
                            </div>
                        </Link>
                        <Link to='/home'>
                            <div className='flex md:justify-center xl:justify-start text-white font-thin bg-white bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl hover:bg-opacity-30 transition mb-1'>
                                <h2 className='font-bold'>MGA</h2>
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Statistiques paiement</p>
                            </div>
                        </Link>
                        <Link to='/paie'>
                            <div className='flex md:justify-center xl:justify-start text-white font-thin bg-white bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl hover:bg-opacity-30 transition mb-1'>
                                <h2 className='font-bold'>MGA</h2>
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Statistiques paiement OCR</p>
                            </div>
                        </Link>
                        <Link to='/gate'>
                            <div className='flex md:justify-center xl:justify-start text-white font-thin bg-white bg-opacity-0 pl-2 py-2 xl:px-4 rounded-xl hover:bg-opacity-30 transition mb-1'>
                                <AnalyticsIcon /> 
                                <p className='md:hidden xl:block'>&nbsp;&nbsp;&nbsp;Statistiques barrières</p>
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
                <div className="pt-20 xl:p-8 bg-white md:rounded-3xl grid-cols-1 md:col-span-10 p-7 gap-10 overflow-y-auto">
                    { children }
                </div>
            </div>
        </div>

    )


}


export default Layout