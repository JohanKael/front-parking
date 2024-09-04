import { useEffect, useState } from 'react';
import AdminLayout from './../Component/LayoutAdmin.tsx'
import { fetchDatas } from '../../services/service.ts';
import DoneIcon from '@mui/icons-material/Done';
import DenyIcon from '@mui/icons-material/Close';
import { formatDate } from '../../Function/Function.ts'

interface User{
    idUser : number
    nomUser : string
    emailUser : string
    nomRole : string
    dateDemande : string
}

function AdminHome(){

    const [nonConfirmed, setNonConfirmed] = useState<User[] | null>([]);
    const nonConfirmedCount = nonConfirmed ? nonConfirmed.length : 0;
    
    const [allUsers, setAllUsers] = useState<User[] | null>([]);
    const confirmedCount = allUsers ? allUsers.length : 0;

    const getNonConfirmedUsers = async () => {
        try {
            const url_to_fetch = 'http://localhost:5002/User/nonConfirmed';
            const datas = await fetchDatas(url_to_fetch);
            console.log(datas);
            setNonConfirmed(datas);
        } catch (error) {
            console.log(error)
        }
    };

    const getCountAllUsers = async () => {
        try {
            const url_to_fetch = 'http://localhost:5002/User/allUsers';
            const datas = await fetchDatas(url_to_fetch);
            console.log(datas);
            setAllUsers(datas);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getNonConfirmedUsers();
        getCountAllUsers();
    }, [])

    return(
        <AdminLayout>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10'>
                <div className='bg-gradient-to-l from-green-500 to-lime-300 md:h-52 hover:shadow-lg flex flex-col items-center justify-center text-white rounded-3xl px-4 pt-4'>
                    <div>
                        Nombre d'utilisateurs total :
                    </div>
                    <div className='font-bold text-[5rem]'>
                        { confirmedCount }
                    </div>
                </div>
                <div className='border border-neutral-300 md:h-52 hover:shadow-lg flex flex-col hover:shadow-neutral-300 transition items-center justify-center text-white rounded-3xl px-4 pt-4'>
                    <div className='text-black'>
                        Nombre de demande d'accès :
                    </div>
                    <div className='font-normal text-black text-[5rem]'>
                        { nonConfirmedCount }
                    </div>
                </div>
                <div className='border border-neutral-300 md:h-52 hover:shadow-lg flex flex-col hover:shadow-neutral-300 transition items-center justify-center text-white rounded-3xl px-4 pt-4'>
                    <div className='text-black'>
                        Nombre de demande d'accès :
                    </div>
                    <div className='font-normal text-black text-[5rem]'>
                        { nonConfirmedCount }
                    </div>
                </div>
            </div>
            <div className='border border-neutral-300 rounded-3xl hover:shadow-lg hover:shadow-neutral-300 transition p-10 overflow-x-auto'>
                <p className='mb-6'>La liste des demandes d'accès :</p>
                <table className='border-collapse w-full'>
                    <thead>
                        <tr className='border-b border-neutral-300'>
                            <th className='p-3 text-left w-1/4'>Nom</th>
                            <th className='p-3 text-left w-1/4'>Email</th>
                            <th className='p-3 pl-8 text-left w-1/4'>Role</th>
                            <th className='p-3 text-left w-1/4'>Date de demande</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonConfirmed?.map(user => (
                            <tr key={user.idUser} className='hover:bg-neutral-100 transition'>
                                <td className='p-3'>{user.nomUser}</td>
                                <td className='p-3'>{user.emailUser}</td>
                                <td className='p-3'>
                                    <p 
                                        className={ `rounded-full flex justify-center py-1 bg-opacity-20 w-20 ${user.nomRole.toLowerCase() === 'admin' ? 'text-green-700 bg-green-500' : 'text-yellow-600 bg-yellow-500'}` }>{user.nomRole}
                                    </p>
                                </td>
                                <td className='p-3'>{ formatDate(user.dateDemande) }</td>
                                <td>
                                    <div className='flex gap-4 items-center justify-center'>
                                        <button className='bg-green-500 text-white font-semibold py-1 px-2 rounded-lg shadow-md shadow-green-300 hover:bg-green-600 transition duration-300 flex'>
                                            <DoneIcon/> Accepter
                                        </button>
                                        <button className='bg-red-500 text-white font-semibold py-1 px-2 rounded-lg shadow-md shadow-red-300 hover:bg-red-600 transition duration-300 flex'>
                                            <DenyIcon /> refuser
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </AdminLayout>
    )
}

export default AdminHome