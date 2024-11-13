import { Helmet } from "react-helmet-async";
import { PlanCard } from "@/components/Epica5/PlanCard";
import { Plan } from "@/types";
import { GratisModal } from "../../components/Epica5/GratisModal";
import { useLoaderData } from "react-router";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const beneficios_basicos = [
  "Publicar productos",
  "Comprar productos",
  "Carrito de compras",
  "Favoritos",
];
const beneficios_marcas = (productos_adicionales: number | null) => {
  const nuevos_beneficios = [...beneficios_basicos];
  nuevos_beneficios.push("Publicidad de tus productos en la página principal.");
  nuevos_beneficios.push(
    `${productos_adicionales} espacios adicionales para publicar productos en tu catálogo.`
  );
  return nuevos_beneficios;
};
const planGratuito: Plan = {
  id: "0",
  descripcion: "Acceso a funcionalidades básicas",
  precio: 0,
  duracion_meses: null,
  productos_adicionales: null,
  tipo: "gratuito",
  beneficios: beneficios_basicos,
};


interface LoaderData {
  planesData: Plan[];
}
export function loader():LoaderData {
  const planesData: Plan[] = [
    {
      id: "1",
      duracion_meses: 1,
      productos_adicionales: 5,
      precio: 6,
      descripcion: "descripcion 1 y 5.",
    },
    {
      id: "2",
      duracion_meses: 2,
      productos_adicionales: 10,
      precio: 15,
      descripcion: "descripcion 2 y 10.",
    },
  ];
  
  planesData.forEach((plan) => {
    plan.beneficios = beneficios_marcas(plan.productos_adicionales);
    plan.tipo = "marcas";
  });
  planesData.unshift(planGratuito);
  return { planesData };
}

export const PlansPage = () => {
  const {planesData}=useLoaderData() as LoaderData;
  return (
    <>
      <Helmet>
        <title>Planes</title>
      </Helmet>

      <div className=" flex flex-col pt-5 pb-12">
        <h1 className="font-semibold text-4xl mb-5">Planes</h1>
        <p>
          Suscribete a uno de nuestros planes que te brinda acceso a
          funcionaliadaes exlusivas que tranformarán la manera de vender.
        </p>
        <div className=" flex flex-col text-center pt-12">
          <h2 className="font-black text-2xl">
            <span>Aquí tienes todos</span>
            <br />
            <span className="text-secondaryLight">nuestros planes</span>
          </h2>
          <Carousel className="w-full mt-12">
            <CarouselContent>
            {planesData.map((plan,index) => (
                <CarouselItem key={index} className="md:basis-1/2">
                  <div className="p-4 flex justify-center h-full">
                    
                      <PlanCard key={plan.id} planObj={plan} />
                    
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <GratisModal />
    </>
  );
};
