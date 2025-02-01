import { useAuth } from '@/hooks/useAuth';
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
import { categories, distinguishedSellers, images } from './mainPage-mocks';
import { ProductCard } from '../../components/cards/product-card';
import { LoginModal } from '@/components/Epica5/LoginModal';
import { useTrademark } from '@/hooks/useTrademark';
import { useEffect, useState } from 'react';
import { imagesService,articulosService,escuelasService,usuariosService,Articulo,Usuario,EscuelaProfesional } from '@/api';


export const MainPage = () => {
  const navigate = useNavigate();
  const { authId, setLoginModal } = useAuth();
  const { marca, membresia, plan } = useTrademark();
  const [products, setProducts] = useState<Articulo[]>([])
  const [escuelas, setEscuelas] = useState<EscuelaProfesional[]>([])
  const [sellers, setSellers] = useState<Usuario[]>([])

  console.log("User id:", authId);
  console.log({ marca: marca, membresia: membresia, plan: plan });

  function handleTrademarkClick() {
    if (authId) {
      navigate('/plans')
    }
    else {
      setLoginModal(true);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const articulos = await articulosService.getArticulos();
  
        const images = await imagesService.getAllImages();
  
        interface Image {
          id_articulo: number;
          url: string;
        }

        const imageMap = images?.reduce((acc: Record<number, string>, img: Image) => {
          if (!acc[img.id_articulo]) {
            acc[img.id_articulo] = img.url; 
          }
          return acc;
        }, {} as Record<number, string>);
  
        const productsWithImages = articulos.map((product:Articulo) => ({
          ...product,
          imageUrl: imageMap[product.id] || null,
        }));
  
        setProducts(productsWithImages);

        const escuelas = await escuelasService.getEscuelas();
        setEscuelas(escuelas);
  
        const vendedoresResponse = await usuariosService.instance.get('?es_vendedor=true');
        setSellers(vendedoresResponse.data.results);
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      }
    };
  
    fetchData();
  }, []);
  
  

  return (
    <>
      <Helmet>
        <title>Ezcommerce</title>
      </Helmet>

      <div className="container w-full mx-auto">
        <div className="my-8">
          <Carousel
            opts={{
              loop: true,
            }}
          >
            <CarouselContent>
              {images.map((i, index) => (
                <CarouselItem>
                  <div
                    key={`d-${index}`}
                    className="overflow-hidden rounded-lg shadow-lg max-h-[500px]"
                  >
                    <img
                      key={`i-${index}`}
                      src={i.src}
                      alt={i.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
        <div className=" justify-center mx-auto max-w-[1350px] px-8 ">
          <Carousel
            opts={{
              align: "start",
              loop: false,
              dragFree: true,
            }}
          >
            <CarouselContent className="mb-12 mt-4 mx-auto px-20">
              {products.map((p) => (
                <CarouselItem
                  key={`ci-${p.id}`}
                  className="basis-1/1 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4"
                >
                  <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.nombre}
                    price={p.precio}
                    qualification={4.4}
                    img={p.imageUrl || "default-image-url.jpg"}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="hidden md:block ">
              <CarouselPrevious className="bg-white w-10 h-10 border-0 shadow-md shadow-[#767676]" />
              <CarouselNext className="bg-white w-10 h-10 border-0 shadow-md shadow-[#767676]" />
            </div>
          </Carousel>
        </div>

        <div className="mx-auto w-full p-4">
          <div className=" mb-5 ">
            <h2 className="text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark ">
              Elige tu categoría favorita
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 px-4 xl:px-16">
            {categories.map((category, index) => (
              <CategoriesCard
                id={category.id.toString()}
                key={`cc-${index}`}
                image={category.image}
                title={category.title}
                description={category.description}
                horiz={category.horiz}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="mx-auto mb-10">
          <div className="mt-8 mb-5">
            <h2 className="text-left text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark ">
              Conoce a nuestro vendedores destacados
            </h2>
          </div>
          <div className="mt-3 relative">
            <Carousel
              opts={{
                loop: true,
                dragFree: true,
              }}
            >
              <CarouselContent className="mb-24 mx-2">
                {sellers.map((seller, index) => (
                  <>
                    <CarouselItem
                      key={`ci-${index}`}
                      className="basis-1/1 sm:basis-1/2 md:basis-1/3 xl:basis-1/5"
                    >
                      <SellersCard
                        key={`sc-${index}`}
                        id={seller.id?.toString() || index.toString()}
                        name={`${seller.nombres} ${seller.apellido_p}`}
                      />
                    </CarouselItem>
                  </>
                ))}
              </CarouselContent>
              <div className="absolute bottom-8  left-1/2 transform -translate-x-1/3 flex space-x-10 ">
                <CarouselPrevious className="bg-[#B7B7B7]" />
                <CarouselNext className="bg-[#B7B7B7]  " />
              </div>
            </Carousel>
          </div>
        </div>
        <div className="flex flex-col my-8">
          <div>
            <h3 className="text-center text-xl font-black mb-2 text-secondaryLight dark:text-secondaryDark">
              VAMOS
            </h3>
            <h2 className="text-center text-4xl font-black mb-2 text-terciaryLight dark:text-terciaryDark ">
              ¿Listo para que todos en la universidad conozca tu marca?
            </h2>
            <h3 className="text-center text-xl font-semibold text-terciaryLight dark:text-terciaryDark">
              ¡Hazla destacar y empieza a vender hoy mismo!
            </h3>
          </div>
          <div className="mt-8 py-4 mx-auto">
            <button
              className="w-[200px] h-[45px] rounded-lg text-lg shadow-xl bg-secondaryLight hover:bg-secondaryLightHovered text-white"
              onClick={handleTrademarkClick}
            >
              Iniciar
            </button>
          </div>
        </div>
      </div>
      <LoginModal />
    </>
  );
}
