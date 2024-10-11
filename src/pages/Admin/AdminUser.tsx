import { useEffect, useState } from 'react';
import AdminLayout from '../Component/LayoutAdmin.tsx'
import { changeUserConfirmation, fetchDatas } from '../../services/service.ts';
import DoneIcon from '@mui/icons-material/Done';
import DenyIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { formatDate } from '../../Function/Function.ts'
import { User } from '../../services/authService.ts'
import { useNavigate } from 'react-router-dom';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

function AdminHome(){
    const navigate = useNavigate();

    const [nonConfirmed, setNonConfirmed] = useState<User[] | null>([]);
    const nonConfirmedCount = nonConfirmed ? nonConfirmed.length : 0;
    
    const [allUsers, setAllUsers] = useState<User[] | null>([]);
    const confirmedCount = allUsers ? allUsers.length : 0;

    const [deniedUser, setDeniedUser] = useState<User[] | null>([]);
    const deniedUserCount = deniedUser ? deniedUser.length : 0;

    const [activeUsers, setActiveUsers] = useState<User[]>([]);

    // liste des users en pending(en attente)
    const getNonConfirmedUsers = async () => {
        try {
            const url_to_fetch = 'http://10.0.105.140:5002/User/nonConfirmed';
            const datas = await fetchDatas(url_to_fetch);
            setNonConfirmed(datas);
        } catch (error) {
            console.log(error)
        }
    };

    // get tous les users acceptés ainsi que leur nombre
    const getCountAllUsers = async () => {
        try {
            const url_to_fetch = 'http://10.0.105.140:5002/User/allUsers';
            const datas = await fetchDatas(url_to_fetch);
            setAllUsers(datas);
        } catch (error) {
            console.log(error)
        }
    }

    // liste des users non acceptés
    const getDeniedUsers = async () => {
        try {
            const url_to_fetch = 'http://10.0.105.140:5002/User/deniedUser';
            const datas = await fetchDatas(url_to_fetch);
            setDeniedUser(datas);
        } catch (error) {
            console.log(error)
        }
    }

    // modifier l'accès de l'user(oui, non, pending)
    const changeUserDemand = async (userid: number, state: boolean | null) => {
        const user = JSON.parse(sessionStorage.getItem('userInfo')!);
        try {
            const url = `http://10.0.105.140:5002/User/changeConfirmation/${userid}`
            const res = await changeUserConfirmation(user.userId , url, state)
            if(res != null){
                navigate('/admin/user')
            }
        } catch (error) {
            console.log(error)
        }
    }

    // 0 et 1 pour conditionner les confirmations et refus
    const [reload, setReload] = useState<boolean>(false);

    useEffect(() => {

        setTimeout(() => {
            getNonConfirmedUsers();
            getCountAllUsers();
            getDeniedUsers();
        }, 100)

    }, [reload, navigate]);

    const getActiveUsers = async () => {
        try {
            const url_to_fetch = 'http://10.0.105.140:5002/User/active';
            const response = await fetchDatas(url_to_fetch);
            setActiveUsers(response);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getActiveUsers();
    }, [activeUsers]);

    // fenêtre demande de confirmation final
    const [ windowConfirmation, setWindowConfirmation] = useState(false);
    // userId de la personne à confirmer
    const [ userToConfirm, setUserToConfirm ] = useState< number | null>(null);

    // fonction au clic de confirmation final pour accepter la demande d'accès
    const handleConfirmation = (state : boolean ) => {
        changeUserDemand(userToConfirm!, state);
        setUserToConfirm(null);
        setWindowConfirmation(false);
        setReload(!reload);
    }

    return(

            <AdminLayout>
                    <div className={`fixed bg-black bg-opacity-50 backdrop-blur-sm inset-0 z-50 flex items-center justify-center ${windowConfirmation ? 'block' : 'hidden'}`}>
                        <div className="bg-white py-20 px-12 shadow-lg rounded-xl flex flex-col gap-8">
                            <div>
                                <p>Êtes-vous sûr de cette confirmation ?</p>
                            </div>
                            <div className='flex justify-center gap-8'>
                                <button className='px-6 rounded-lg bg-teal-600 text-white'
                                    onClick={() => handleConfirmation(true) }
                                >
                                    Oui j'accepte
                                </button>
                                <button className='px-6 p-2 rounded-lg border border-teal-600 text-teal-600'
                                    onClick={() => setWindowConfirmation(false) }
                                >
                                    Non, je refuse
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 2xl:grid-cols-3 gap-10'>
                        <div className='col-span-2'>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-10'>
                                <div className='bg-gradient-to-l from-green-500 to-lime-300 xl:h-52 hover:shadow-xl flex flex-col items-center justify-center text-white rounded-3xl px-4 pt-4 transition'>
                                    <div>
                                        Nombre d'utilisateurs total
                                    </div>
                                    <div className='font-bold text-[5rem]'>
                                        { confirmedCount }
                                    </div>
                                </div>
                                <div className='bg-white border border-neutral-300 xl:h-52 hover:shadow-lg flex flex-col xl:flex-row justify-between hover:shadow-neutral-300 transition items-end text-white rounded-3xl px-10 py-2'>
                                    <div>
                                        <div className='text-black'>
                                            Nombre de demande d'accès
                                        </div>
                                        <div className='text-neutral-500 font-semibold text-[4rem] xl:text-[5rem]'>
                                            { nonConfirmedCount }
                                        </div>
                                    </div>
                                    <div className='bg-amber-200 p-2 rounded-xl mb-5'>
                                        <PersonAddIcon className='text-amber-400' sx={{fontSize: 30}}/>
                                    </div>
                                </div>
                                <div className='bg-white border border-neutral-300 xl:h-52 hover:shadow-lg flex flex-col xl:flex-row justify-between hover:shadow-neutral-300 transition items-end text-white rounded-3xl px-10 py-2'>
                                    <div>
                                        <div className='text-black'>
                                            Nombre d'accès refusé
                                        </div>
                                        <div className='text-neutral-500 font-semibold text-[4rem] xl:text-[5rem]'>
                                            { deniedUserCount }
                                        </div>
                                    </div>
                                    <div className='bg-rose-200 p-2 rounded-xl mb-5'>
                                        <PersonOffIcon className='text-rose-400' sx={{fontSize: 30}}/>
                                    </div>
                                </div>
                            </div><br />

                            <div className='bg-white rounded-3xl p-10 overflow-x-auto'>
                                <p className='mb-6 font-semibold text-neutral-300 text-2xl'>Liste des demandes d'accès :</p>
                                { ( nonConfirmed != null) ? 
                                    <table className='border-collapse w-full'>
                                        <thead>
                                            <tr className='border-b border-neutral-300'>
                                                <th className='p-3 text-left w-1/4 text-slate-500'>Nom</th>
                                                <th className='p-3 text-left w-1/4 text-slate-500'>Email</th>
                                                <th className='p-3 pl-8 text-left w-1/4 text-slate-500'>Role</th>
                                                <th className='p-3 text-left w-1/4 text-slate-500'>Date de demande</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {nonConfirmed?.map(user => (
                                                <tr key={user.userId} className='hover:bg-neutral-100 transition'>
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
                                                            <button 
                                                                className='bg-green-500 text-white font-semibold py-1 px-2 rounded-lg shadow-md shadow-green-300 hover:bg-green-600 transition duration-300 flex'
                                                                onClick={() =>{
                                                                        setReload(!reload)
                                                                        setWindowConfirmation(true)
                                                                        setUserToConfirm(user.userId)
                                                                    }
                                                                }
                                                            >
                                                                <DoneIcon/> Accepter
                                                            </button>
                                                            <button 
                                                                className='bg-red-500 text-white font-semibold py-1 px-2 rounded-lg shadow-md shadow-red-300 hover:bg-red-600 transition duration-300 flex'
                                                                onClick={() =>{
                                                                    changeUserDemand(user.userId, false)
                                                                    setReload(!reload)
                                                                }
                                                            }
                                                            >
                                                                <DenyIcon /> refuser
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    :
                                    <div  className='flex w-full justify-center'>
                                        <p className='text-neutral-300 font-semibold text-[3rem]'>Rien à afficher</p>
                                    </div>
                                }
                            </div><br />

                            <div className='bg-white rounded-3xl p-10 overflow-x-auto'>
                                <p className='mb-6 font-semibold text-neutral-300 text-2xl'>Liste des accès refusés :</p>
                                <table className='border-collapse w-full'>
                                    <thead>
                                        <tr className='border-b border-neutral-300'>
                                            <th className='p-3 text-left w-1/4 text-slate-500'>Nom</th>
                                            <th className='p-3 text-left w-1/4 text-slate-500'>Email</th>
                                            <th className='p-3 pl-8 text-left w-1/4 text-slate-500'>Role</th>
                                            <th className='p-3 text-left w-1/4 text-slate-500'>Date de demande</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {deniedUser?.map(user => (
                                            <tr key={user.userId} className='hover:bg-neutral-100 transition'>
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
                                                        <button 
                                                            className='text-red-300 hover:text-red-600 py-2 px-2 transition duration-300 flex'
                                                            onClick={() =>{
                                                                changeUserDemand(user.userId, null)
                                                                setReload(!reload)
                                                            }
                                                        }
                                                        >
                                                            <RemoveCircleOutlineIcon />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className='col-span-1 border border-neutral-300 rounded-3xl p-8'>
                            <p className='font-semibold text-2xl text-neutral-300 mb-6'>Liste des utilisateurs actifs</p>
                            {
                                activeUsers?.map((user, index) => (
                                    <div key={ index } className='flex items-center justify-between gap-20 border-b border-neutral-200 py-2 px-4'>
                                        <div>
                                            <p className='text-lg font-semibold' >{ user.nomUser }</p>
                                            <p className='text-sm' >{ user.emailUser }</p>
                                        </div>
                                        <p className='bg-green-400 bg-opacity-30 text-green-600 px-3 rounded-full text-sm'>actif</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>


            </AdminLayout>
    )
}

export default AdminHome