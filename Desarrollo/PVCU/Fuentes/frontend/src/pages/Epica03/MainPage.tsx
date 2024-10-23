import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { SellersCard } from '../../components/carousels';

export const MainPage = () => {

  const navigate = useNavigate();
  const goToLogin = () => navigate('/login')


  return (
    <>
      <Helmet>
        <title>Ezcommerce</title>
      </Helmet>
      
      <div className="container w-full mx-auto min-h-[400px]">
        <div>

        </div>
        <div>

        </div>
        <div>

        </div>
        <div>
            <div>
              <h2 className='text-2xl font-black mb-2 text-terciaryLight dark:text-terciaryDark '>Conoce a nuestro vendedores destacados</h2>
            </div>
            <div>
              <SellersCard id='21' name='Pedro' imageAlt='da' imageSrc='../../assets/persona_computadora.png' description='este es un texto de prueba' />
            </div>
        </div>
        <div className='flex flex-col my-8'>
          <div>
            <h3 className='text-center text-xl font-black mb-2 text-secondaryLight dark:text-secondaryDark'>VAMOS</h3>
            <h2 className='text-center text-4xl font-black mb-2 text-terciaryLight dark:text-terciaryDark '>¿Listo para que todos en la universidad conozca tu marca?</h2>
            <h3 className='text-center text-xl font-semibold text-terciaryLight dark:text-terciaryDark'>¡Hazla destacar y empieza a vender hoy mismo!</h3>
          </div>
          <div className='mt-8 py-4 mx-auto'>
            <button className='w-[200px] h-[45px] rounded-lg text-lg shadow-xl bg-secondaryLight hover:bg-secondaryLightHovered text-white'
              onClick={() => goToLogin()}>
              Iniciar
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
