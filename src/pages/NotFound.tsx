
import { Link } from 'react-router-dom'
import notFound from './../../image/404.png'

function NotFound(){

    return(
        <div className="fixed md:px-4 inset-0 bg-black bg-opacity-30 backdrop-blur-lg flex items-center justify-center flex-col gap-10">
                <div>
                    <img src={ notFound } alt="" className='w-[40rem]'/>
                </div>
                <p className='text-3xl font-thin text-white'>Vous vous êtes perdus,</p>
                <p className='text-3xl font-semibold text-white'>Veuillez revenir en arrière</p>

                <Link to='/' className='border border-white font-semibold text-white px-8 py-4 rounded-lg hover:bg-white hover:text-black transition'>
                    Revenir
                </Link>
        </div>
    )


}

export default NotFound