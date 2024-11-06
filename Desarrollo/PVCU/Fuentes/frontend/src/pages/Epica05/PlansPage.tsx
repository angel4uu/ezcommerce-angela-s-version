import { Helmet } from "react-helmet-async";
import { PlanCard } from "@/components/Epica5/PlanCard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export const PlansPage = () => {
  const planGratuito = {
    tipo: "gratuito",
    duracion: "ilimitado",
    precio: 0,
    descripcion: "Acesso a funcionalidades básicas.",
    beneficios: [
      "Publicar productos",
      "Comprar productos",
      "Carrito de compras",
      "Favoritos",
    ],
  };
  const planMarcasMensual = {
    tipo: "marcas",
    duracion: "mes",
    precio: 6,
    descripcion:
      "Diseñado para universitarios que ya posean una marca, proporcionando funcionalidades avanzadas.",
    beneficios: [
      "Publicar productos",
      "Comprar productos",
      "Carrito de compras",
      "Favoritos",
      "Publicar anuncios",
      "Mayor publicidad de tus productos",
      "Sección especial de Marcas",
      "Productos con check de verificación",
    ],
  };
  const planMarcasSemestral = {
    tipo: "marcas",
    duracion: "semestre",
    precio: 30,
    descripcion:
      "Diseñado para universitarios que ya posean una marca, proporcionando funcionalidades avanzadas.",
    beneficios: [
      "Publicar productos",
      "Comprar productos",
      "Carrito de compras",
      "Favoritos",
      "Publicar anuncios",
      "Mayor publicidad de tus productos",
      "Sección especial de Marcas",
      "Productos con check de verificación",
    ],
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked((prev) => !prev);
  };

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
          <div className="flex justify-center gap-3 py-12">
            <Label className="font-bold text-lg" htmlFor="periodo_plan_marcas">
              Mensual
            </Label>
            <Switch id="periodo_plan_marcas"  checked={isChecked} onCheckedChange={handleToggle}/>
            <Label className="font-bold text-lg" htmlFor="periodo_plan_marcas">
              Semestral
            </Label>
          </div>
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-20 ">
            <PlanCard {...planGratuito} />
            <PlanCard {...(isChecked?planMarcasSemestral:planMarcasMensual)} />
          </div>
        </div>
      </div>
    </>
  );
};
