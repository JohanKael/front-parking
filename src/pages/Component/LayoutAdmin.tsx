import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../image/logo-remove.png'
import PeopleIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Perso from './../../../image/perso.png'
import React from 'react';

interface LayoutProps{
    children : React.ReactNode;
}


function LayoutAdmin({ children } : LayoutProps) {

    const navigate = useNavigate();

    const deconnect = () => {
        localStorage.removeItem('token');

        navigate('/go/admin');
    };


    return (
        <div className="fixed md:px-4 inset-0 bg-black bg-opacity-50 backdrop-blur-lg">
            <div className="gap-4 h-screen md:py-4 grid grid-cols-1 md:grid-cols-12">
                <div className="rounded-3xl col-span-2 hidden md:flex md:items-center md:flex-col gap-4">
                    <div className='bg-white bg-opacity-10 w-full flex justify-center rounded-3xl'>
                        <img src={Logo} alt="" className='md:w-36'/>
                    </div>
                    <div className='bg-white bg-opacity-10 w-full flex justify-center rounded-3xl p-4 flex-col gap-2'>
                        <div className='flex text-white items-center gap-4 justify-start'>
                            <img src={ Perso } alt="" className='w-14'/>
                            Nom User
                        </div>
                        <button onClick={ deconnect }>
                            <div className='text-white font-thin bg-white bg-opacity-10 py-2 pl-4 rounded-xl hover:bg-opacity-100 hover:text-black hover:font-normal transition mb-1'>
                                <LogoutIcon /> Se déconnecter
                            </div>
                        </button>
                    </div>
                    <div className='bg-white bg-opacity-10 w-full flex flex-col px-2 rounded-3xl py-2 gap-2'>
                        <h2 className='text-white text-2xl font-normal ml-3'>Liens</h2>
                        <Link to='/admin/home'>
                            <div className='text-white font-thin bg-white bg-opacity-0 py-2 pl-4 rounded-xl hover:bg-opacity-5 transition mb-1'>
                                <PeopleIcon /> Gestion des utilisateurs
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="overflow-y-auto bg-white md:rounded-3xl grid-cols-1 md:col-span-10 p-7 flex flex-col gap-10">
                    { children }
                </div>
            </div>
        </div>

    )


}


export default LayoutAdmin