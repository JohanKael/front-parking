import { useEffect, useState } from "react";
import LayoutAdmin from "../Component/LayoutAdmin";
import { Role, User } from "../../services/authService";
import { fetchDatas } from "../../services/service";
import { formatDate } from "../../Function/Function";
import { PuffLoader } from "react-spinners";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

function ListUser() {
    const [allUser, setAllUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [usersPerPage, setUsersPerPage] = useState<number>(2); // Nombre d'utilisateurs à afficher par page

    const getAllUser = async (pageNumber: number, pageSize: number) => {
        if (pageNumber <= 0 || pageSize <= 0) {
            console.error("pageNumber and pageSize must be greater than 0.");
            return;
        }
    
        try {
            const url_to_fetch = `http://10.0.105.140:5002/User/allUsers?pageNumber=${pageNumber}&pageSize=${pageSize}`;
            const datas = await fetchDatas(url_to_fetch);
            setAllUsers(datas);
        } catch (error) {
            console.log(error);
        }
    };
    

    const [userToEdit, setUserToEdit] = useState<User>();

    const getUserById = async (id: number) => {
        try {
            const url = `http://10.0.105.140:5002/User/${id}`;
            const datas = await axios.get(url);
            setUserToEdit(datas.data);
        } catch (error) {
            console.log(error);
        }
    };

    const [roles, setRoles] = useState<Role[]>([]);

    const getAllRoles = async () => {
        try {
            const url_to_fetch = 'http://10.0.105.140:5002/Role';
            const response = await fetchDatas(url_to_fetch);
            setRoles(response);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUser(currentPage, usersPerPage);
        getAllRoles();
    }, [currentPage]);

    // affichage fenêtre pour changements
    const [edit, setEdit] = useState<boolean>(false);
    const [idRole, setIdRole] = useState<number>();
    const [userIdToEdit, setUserIdToEdit] = useState<number>();

    useEffect(() => {
        setTimeout(() => {
            getAllUser(currentPage, usersPerPage);
        }, 3000);
    }, [idRole]);

    const changeRole = async () => {
        try {
            const url = `http://10.0.105.140:5002/Role/change/${userIdToEdit}`;
            const response = await axios.put(url, idRole, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        } finally {
            setEdit(false);
        }
    };

    // Pagination
    const indexOfLastUser = currentPage * usersPerPage; // Dernier utilisateur de la page actuelle
    const indexOfFirstUser = indexOfLastUser - usersPerPage; // Premier utilisateur de la page actuelle
    const currentUsers = allUser.slice(indexOfFirstUser, indexOfLastUser); // Utilisateurs à afficher

    // Changer de page
    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const totalPages = Math.ceil(allUser.length / usersPerPage); // Calcul du nombre total de pages

    return (
        <LayoutAdmin>
            {edit && (
                <div className="fixed inset-0 z-10 bg-black bg-opacity-50 backdrop-blur-lg flex items-center justify-center">
                    <div className="bg-white w-[35rem] pb-14 rounded-3xl p-4 flex flex-col gap-10">
                        <div className="flex justify-end">
                            <button
                                className="bg-neutral-800 bg-opacity-10 rounded-full backdrop-blur-lg p-1"
                                onClick={() => setEdit(false)}
                            >
                                <CloseIcon />
                            </button>
                        </div>
                        <div className="px-8 text-xl font-semibold">Changer le rôle de la personne</div>
                        <div className="px-8 flex flex-col gap-8">
                            <span className="flex flex-col gap-4">
                                <p>Nom :</p>
                                <div className="px-4 py-2 border border-neutral-300 rounded-lg focus:border-green-600">
                                    {userToEdit?.nomUser}
                                </div>
                            </span>
                            <span className="flex flex-col gap-4">
                                <p>Email :</p>
                                <div className="px-4 py-2 border border-neutral-300 rounded-lg focus:border-green-600">
                                    {userToEdit?.emailUser}
                                </div>
                            </span>
                            <span className="flex flex-col gap-4">
                                <p>Role :</p>
                                <select
                                    className="px-4 py-2 border border-neutral-400 rounded-lg focus:border-green-600"
                                    onChange={(e) => setIdRole(parseInt(e.target.value))}
                                >
                                    {roles.map(role => (
                                        <option key={role.id} value={role.id}>{role.nomRole}</option>
                                    ))}
                                </select>
                            </span>
                            <button
                                className="bg-green-600 py-4 rounded-xl text-white text-lg hover:bg-green-700 transition"
                                onClick={() => changeRole()}
                            >
                                Enregistrer les changements
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <p className="font-semibold text-xl text-neutral-500">La liste des utilisateurs confirmés :</p>

            {/* Pagination */}
            <div className="flex flex-col md:flex-row justify-end items-center mt-4 gap-10">
                <div>
                    page: &nbsp;
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-green-500 text-white' : 'border border-green-500 text-green-500'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <div className="flex items-center gap-4">
                    <p>Utilisateurs par page:</p>
                    <input min={1} placeholder={ String(usersPerPage) } type="number" name="" id="" className="border border-black py-2 pl-8 w-20 rounded-md" onChange={ (e) => setUsersPerPage( parseInt(e.target.value)) }/>
                </div>
            </div>

            <table className='border-collapse w-full mt-4'>
                <thead>
                    <tr className='border-b border-neutral-300'>
                        <th className='p-3 text-left w-1/4 text-blue-950 font-light text-lg'>Nom</th>
                        <th className='p-3 text-left w-1/4 text-blue-950 font-light text-lg'>Email</th>
                        <th className='p-3 text-left w-1/4 text-blue-950 font-light text-lg'>Role</th>
                        <th className='p-3 text-left w-1/4 text-blue-950 font-light text-lg'>Date de demande</th>
                        <th className='p-3 text-left w-1/4 text-blue-950 font-light text-lg'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers.map(user => (
                        <tr key={user.userId} className='hover:bg-neutral-100 transition'>
                            <td className='p-3 text-left font-semibold'>{user.nomUser}</td>
                            <td className='p-3 text-left text-neutral-400'>{user.emailUser}</td>
                            <td className='p-3 text-left'>
                                <p
                                    className={`rounded-full flex justify-center bg-opacity-20 w-16 py-1 ${user.nomRole.toLowerCase() === 'admin' ? 'text-green-700 bg-green-500' : 'text-yellow-600 bg-yellow-500'}`}>{user.nomRole}
                                </p>
                            </td>
                            <td className='p-3'>{formatDate(user.dateDemande)}</td>
                            <td className='p-3'>
                                {user.isActive ?
                                    <p className="text-green-600 flex gap-2 items-center"><PuffLoader color="" size={20} />actif</p>
                                    :
                                    <p className="flex gap-2 items-center"><FiberManualRecordIcon sx={{ fontSize: 15 }} />non actif</p>
                                }
                            </td>
                            <td className="pl-4 md:pl-20">
                                <button
                                    className="bg-lime-500 bg-opacity-10 p-1 rounded-lg"
                                    onClick={() => {
                                        setEdit(true);
                                        setUserIdToEdit(user.userId);
                                        setIdRole(user.idRole);
                                        getUserById(user.userId);
                                    }}
                                >
                                    <EditSharpIcon className="text-teal-500" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </LayoutAdmin>
    );
}

export default ListUser;
