import { Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ModalDeleteProduct } from "../../components/Epica04/ModalDeleteProduct";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoadImageMajor } from "@/utils";

interface CardProduct {
  id: number;
  nombre: string;
  precio: number;
  rating: number;
}

interface CardPublishedEditProps {
  product: CardProduct;
  onProductDeleted: (id: number) => void;
}

export const CardPublishedEdit: React.FC<CardPublishedEditProps> = ({
  product,
  onProductDeleted,
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null); // Estado para la imagen principal
  const [loadingImage, setLoadingImage] = useState<boolean>(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const image = await LoadImageMajor(product.id); 
        setImageUrl(image[0]?.url || null); 
      } catch (error) {
        console.error("Error al cargar la imagen principal:", error);
        setImageUrl(null); // En caso de error, se evita mostrar una imagen rota
      } finally {
        setLoadingImage(false);
      }
    };

    fetchImage();
  }, [product.id]);
  
  return (
    <Card className="w-52 p-3 overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square overflow-hidden rounded-md mb-4">
          {loadingImage ? (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <span className="text-gray-500 text-sm">Cargando...</span>
            </div>
          ) : imageUrl ? (
            <img
              src={imageUrl}
              alt={product.nombre}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-100">
              <span className="text-gray-500 text-sm">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="py-3 px-2">
          <div className="flex items-center justify-center text-white bg-[#FBC116] rounded-3xl w-[68px] py-1 px-4 mb-3">
            <Star className="w-3 h-3 fill-white" />
            <span className="text-xs font-sans ml-1">{product.rating}</span>
          </div>
          <h3 className="font-sans font-bold text-secondaryLight text-base mb-1">
            {product.nombre}
          </h3>
          <p className="text-sm font-bold text-terciaryLight">
            S/ {product.precio}
          </p>
        </div>
      </CardContent>
      <CardFooter className="grid gap-3 p-0">
        <Button variant="edit" className="p-0">
          <Link to={`/edit-product/${product.id}`} className="w-full">
            Editar
          </Link>
        </Button>
        <ModalDeleteProduct
          productId={product.id}
          onDeleteSuccess={() => onProductDeleted(product.id)}
        />
      </CardFooter>
    </Card>
  );
};
