import { useAuth } from '@/context/AuthProvider';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { CategoriesCard, SellersCard } from '../../components/cards';
import { categories, distinguishedSellers, mockProducts, images } from '../../mocks/mainPage-mocks';
import { ProductCard } from '../../components/cards/product-card';



export const MainPage = () => {


  const navigate = useNavigate();
  const goToLogin = () => navigate('/login')

  const {authState}=useAuth();
  console.log("User id:",authState.userId);

  return (
    <>
      <Helmet>
        <title>Ezcommerce</title>
      </Helmet>
      
      <div className="container w-full mx-auto">
        <div className='my-8'>
            <Carousel opts={{
              loop:true
            }}>
                <CarouselContent>
                  {
                    images.map((i) => (
                      <CarouselItem>
                         <div className="overflow-hidden rounded-lg shadow-lg max-h-[500px]">
                          <img
                            src={i.src}
                            alt={i.alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </CarouselItem>
                    ))
                  }
                </CarouselContent>
            </Carousel>
        </div>
        <div className=' justify-center mx-auto max-w-[1350px] px-8 '>
        <Carousel opts={{
          align:'start',
          loop:true,
          dragFree:true
        }} >
                    <CarouselContent className='mb-12 mt-4 mx-auto px-20'>
                        {
                          mockProducts.map((p) => (
                            <>
                            <CarouselItem className='basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4'>
                                <ProductCard id={p.id} name={p.name} brand={p.brand} isFavourite={p.isFavourite} price={p.price} qualification={p.qualification} img={p.img}  />
                              </CarouselItem>
                            </>
                          ))
                        }
                    </CarouselContent>
                    <div className='hidden md:block '>
                        <CarouselPrevious className="bg-white w-10 h-10 border-0 shadow-md shadow-[#767676]" />
                        <CarouselNext className="bg-white w-10 h-10 border-0 shadow-md shadow-[#767676]" />
                    </div> 

                </Carousel>
        </div>
        
        <div className='mx-auto w-full p-4'>
            <div className=' mb-5 '>
              <h2 className='text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark '>Elige tu categoría favorita</h2>
            </div>
            <div className='grid grid-cols-4 grid-rows-2 gap-4 px-24'>
            {categories.map((category, index) => (
              <CategoriesCard
                id={category.id}
                key={index}
                image={category.image}
                title={category.title}
                description={category.description}
                horiz={category.horiz}
                index={index}
              />
            ))}

            </div>
        </div>
        <div className='mx-auto mb-10'>
            <div className='mt-8 mb-5'>
              <h2 className='text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark '>Conoce a nuestro vendedores destacados</h2>
            </div>
            <div className='mt-3 relative'>
                <Carousel opts={{
                  loop:true,
                  dragFree:true
                }} >
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
