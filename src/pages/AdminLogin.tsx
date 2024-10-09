import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from 'react-router-dom';
import Logo from '../../image/logo-remove.png';
import { loginAdmin } from '../services/authService';
import { useState } from 'react';
import { redirect } from '../services/redirection';
import { ClipLoader } from 'react-spinners';

function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await loginAdmin(email, password);
            if (result.status !== 'loginSuccess') {
                setError(result.message);
            } else {
                const token = result.token;
                const expirationTime = Date.now() + 24 * 60 * 60 * 1000; // 24 heures

                // Stockage du token et de la date d'expiration
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiration', expirationTime.toString());

                const user = {
                    userId: result.idUser,
                    userName: result.nom,
                    userEmail: result.email
                };
                sessionStorage.setItem('userInfo', JSON.stringify(user));
                redirect(result.status);
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center px-4 sm:px-6 md:px-8">
            <div className="bg-black bg-opacity-20 backdrop-blur-sm px-16 py-16 rounded-3xl border border-zinc-500 hover:border-zinc-300 transition-all duration-30 text-white w-[30rem]">
                <img src={ Logo } className="w-32 h-28 mx-auto" alt="logo" />
                <h2 className="text-2xl text-center max-w-xs mx-auto mb-10">Bonjour <span className="text-green-600">admin,</span> veuillez vous connecter pour le suivi du parking</h2>
                
                <form className="" onSubmit={handleSubmit}>
                    <div className="relative mt-14">
                        <input
                            type="email"
                            value={email}
                            id="email"
                            name="email"
                            required
                            placeholder="Email"
                            className="mt-1 block w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-600 placeholder-transparent peer"
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError('');
                            }}
                        />
                        <label
                            htmlFor="email"
                            className="absolute left-0 -top-5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm"
                        >
                            <EmailIcon /> Email
                        </label>
                    </div>
                    <div className="relative mt-8">
                        <input
                            type="password"
                            value={password}
                            id="password"
                            name="password"
                            required
                            placeholder="Password"
                            className="mt-1 block w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-600 placeholder-transparent peer"
                            onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('')
                                }
                            }
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 -top-5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm"
                        >
                            <HttpsIcon /> Password
                        </label>
                    </div>
                    {error && (
                        <div className="mt-8 text-center text-sm text-red-600 border border-red-600 rounded-lg bg-white p-2">
                            {error}
                        </div>
                    )}
                    
                    <button 
                        type="submit"
                        className="mt-14 w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg text-white bg-green-600 hover:bg-green-700 transition-all duration-300 flex justify-center items-center gap-2"
                    >
                        Login 
                        { loading && (
                            <ClipLoader 
                                size={20}
                                color='#FFF'
                            />
                        ) }
                    </button>
                </form>
                <p className="mt-8 text-center text-sm">
                    Vous voulez créer un compte? <Link to="/go/admin/signup" className="font-light text-green-400 hover:tracking-wider transition-all duration-300">Créer un compte</Link>
                </p>
            </div>
        </div>
    )
}

export default AdminLogin;

