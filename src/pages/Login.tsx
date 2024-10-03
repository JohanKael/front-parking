import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import { Link } from 'react-router-dom';
import Logo from '../../image/logo-remove.png';
import { useState } from 'react';
import { loginUser } from '../services/authService';
import { redirect } from '../services/redirection';
import { ClipLoader } from 'react-spinners';


function Login() {

    const [email, setEmail] = useState<string>('');
    const [pass, setPassword] = useState<string>('');
    const [error, setError] = useState('');

    const [loading, setLoading] = useState(false);

    // Fonction de login
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const result = await loginUser(email, pass);
            if (result.status === 'loginFailed') {
                setError(result.message);
            } else {
                localStorage.setItem('token', result.token);
                const user = {
                    userId : result.idUser,
                    userName : result.nom,
                    userEmail : result.email
                }
                sessionStorage.setItem('userInfo', JSON.stringify(user));
                redirect(result.status);
            }
        } catch (error) {
            console.error('Erreur de connexion:', error);
        }finally{
            setLoading(false);
        }
    }


    return (
        <div className="px-4 sm:px-6 md:px-8">
            <div className="bg-black bg-opacity-10 backdrop-blur-2xl px-16 py-10 rounded-3xl border border-zinc-500 hover:border-zinc-300 transition-all duration-30 text-white w-full max-w-2xl mx-auto">
                <img src={ Logo } className="w-32 h-28 mx-auto" alt="logo" />
                <h2 className="text-2xl text-center max-w-xs mx-auto mb-10"><p className="text-green-600">Bonjour, </p> veuillez vous connecter pour le suivi du parking</h2>
                
                <form className="" onSubmit={handleSubmit}>
                    <div className="relative mt-14">
                        <input
                            type="email"
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
                    Vous voulez créer un compte? <Link to="/signup" className="font-light text-green-400 hover:tracking-wider transition-all duration-300">Créer un compte</Link>
                </p>
            </div>
        </div>
    )
}

export default Login;