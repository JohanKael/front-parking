import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import Logo from '../../image/logo-remove.png';



function Signup() {










    return (
        <div className="px-4 sm:px-6 md:px-8">
            <div className="bg-black bg-opacity-10 backdrop-blur-2xl px-16 py-10 rounded-3xl border border-zinc-500 hover:border-zinc-300 transition-all duration-30 text-white w-full max-w-2xl mx-auto">
            <img src={ Logo } className="w-32 h-28 mx-auto" alt="logo" />
                <h2 className="text-2xl text-center max-w-xs mx-auto mb-10">Veuillez <span className="text-green-600">créer</span> un compte pour le suivi du gestion du parking</h2>                
                <form className="">
                    <div className="relative mt-14">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="Name"
                            className="mt-1 block w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-600 placeholder-transparent peer"
                        />
                        <label
                            htmlFor="name"
                            className="absolute left-0 -top-5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm"
                        >
                            <AccountCircleIcon /> Name
                        </label>
                    </div>
                    <div className="relative mt-8">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            placeholder="Email"
                            className="mt-1 block w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-600 placeholder-transparent peer"
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
                        />
                        <label
                            htmlFor="password"
                            className="absolute left-0 -top-5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm"
                        >
                            <HttpsIcon /> Password
                        </label>
                    </div>
                    <div className="relative mt-8">
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            required
                            placeholder="Confirm Password"
                            className="mt-1 block w-full px-3 py-2 bg-transparent border-b border-gray-300 focus:outline-none focus:border-green-600 placeholder-transparent peer"
                        />
                        <label
                            htmlFor="confirmPassword"
                            className="absolute left-0 -top-5 text-white text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-placeholder-shown:top-2 peer-focus:-top-5 peer-focus:text-white peer-focus:text-sm"
                        >
                            <HttpsIcon /> Confirm Password
                        </label>
                    </div>
                    
                    <button 
                        type="submit"
                        className="mt-16 w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg text-white bg-green-600 hover:bg-green-700 transition-all duration-300"
                    >
                        Sign in
                    </button>
                </form>
                <p className="mt-8 text-center text-sm">
                    Vous avez déjà un compte? <Link to="/" className="font-light text-green-400 hover:tracking-wider transition-all duration-300">Se connecter</Link>
                </p>
            </div>
        </div>
    )
}

export default Signup