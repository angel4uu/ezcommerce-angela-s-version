import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CategoriesCard, SellersCard } from '../../components/mainPage';
import { categories, distinguishedSellers } from '../../mocks/mainPage-mocks';


export const MainPage = () => {

  const navigate = useNavigate();
  const goToLogin = () => navigate('/login')


  return (
    <>
      <Helmet>
        <title>Ezcommerce</title>
      </Helmet>
      
      <div className="container  w-full mx-auto min-h-[400px]">
        <div>

        </div>
        <div>

        </div>
        
        <div className='bg-cover bg-[#F2E2D2] bg-opacity-70 w-full p-4'>
            <div className=' mb-5 '>
              <h2 className='text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark '>Elige tu categoría favorita</h2>
            </div>
            <div className='grid grid-cols-4 grid-rows-2 gap-4 grid-flow-col px-24'>
            {categories.map((category, index) => (
              <CategoriesCard
                id={category.id}
                key={index}
                image={category.image}
                title={category.title}
                description={category.description}
                colSpan={category.colSpan}
                rowSpan={category.rowSpan}
              />
            ))}

            </div>
        </div>
        <div className='mx-auto mb-10'>
            <div className='mt-8 mb-5'>
              <h2 className='text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark '>Conoce a nuestro vendedores destacados</h2>
            </div>
            <div className='mt-3 relative'>
                <Carousel >
                    <CarouselContent className='mb-24 mx-2'>
                        {
                          distinguishedSellers.map((seller) => (
                            <>
                            <CarouselItem className='basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/5'>
                                <SellersCard 
                                    id={seller.id}
                                    name={seller.name}
                                    description={seller.description}
                                    imageAlt={seller.imageAlt}
                                    imageSrc={seller.imageSrc}                                
                                />
                              </CarouselItem>
                            </>
                          ))
                        }
                    </CarouselContent>
                    <div className="absolute bottom-8  left-1/2 transform -translate-x-1/3 flex space-x-10 ">
                        <CarouselPrevious className="bg-[#B7B7B7]" />
                        <CarouselNext className="bg-[#B7B7B7]  " />
                    </div>
                </Carousel>

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
