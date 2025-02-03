import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { UploadedImage } from "./useImageUpload";
import { Articulo, articulosService, Catalogo, catalogosService, imagesService, usuariosService } from "@/api";
import { getFileURL } from "../../../utils/firebaseUtils";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

// Esquema de validación de Zod
const formSchema = z.object({
  nombre: z.string().min(1, { message: "Este campo es requerido" }),
  precio: z.coerce.number().min(0, { message: "El precio debe ser un número no negativo" }),
  stock: z.coerce.number().min(1, { message: "El stock debe ser un número no negativo" }),
  descripcion: z.string().min(10, { message: "Este campo es requerido con un mínimo de 10 caracteres" }),
  etiquetas: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Selecciona al menos una etiqueta",
  }),
  id_marca: z.number().nullable().optional(),
  is_marca: z.boolean().default(false),
});

interface UseProductFormProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}


export const useProductForm = ({
  images,
  setImages,
  product,
}: UseProductFormProps & { product?: Articulo }) => {
  const navigate = useNavigate();
  const { authId } = useAuth();
  const [catalogos, setCatalogos] = useState<Array<Catalogo>>([]);
  const [isMarca, setIsMarca] = useState(false);

  useEffect(() => {
    if (authId !== null) {
      usuariosService.getUsuario(authId).then((data) => {
        if (data) {
          setIsMarca(data.tiene_marca);
        } else {
          console.error("No se encontró información del usuario.");
        }
      });
    }
  }, [authId]);

  useEffect(() => {
    if (authId !== null) {
      catalogosService.getCatalogoByUser(authId).then((data) => {
        if (data) {
          setCatalogos(data);
        } else {
          console.error("No se encontraron catálogos para este usuario.");
        }
      });
    }
  }, [authId]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: product?.nombre || "",
      descripcion: product?.descripcion || "",
      precio: product?.precio || 0,
      stock: product?.stock || 1,
      etiquetas: product?.etiquetas || [],
      id_marca: product?.id_marca ?? null,
      is_marca: product?.id_marca ? true : false,
    },
  });

  const processImages = async (images: UploadedImage[], productId: number) => {
    for (const image of images) {
      if (image.file) {
        // Nueva imagen: Subir a Firebase y registrar en el backend
        try {
          const storageDir = `product_image/${productId}`;
          const url = await getFileURL(image.file, storageDir);
          if (url) {
            await imagesService.createImage({ id_articulo: productId, url });
            console.log(`Nueva imagen registrada: ${url}`);
          } else {
            throw new Error("No se pudo obtener la URL de la imagen.");
          }
        } catch (error) {
          console.error("Error al subir nueva imagen:", error);
          throw new Error("Error al subir nueva imagen.");
        }
      } else {
        // Imagen existente: actualizar en el backend
        try {
          await imagesService.updateImage(Number(image.id), { id_articulo: productId, url: image.preview });
          console.log(`Imagen existente actualizada: ${image.preview}`);
        } catch (error) {
          console.error("Error al actualizar imagen existente:", error);
          throw new Error("Error al actualizar imagen existente.");
        }
      }
    }
  };
 console.log("hola")
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("me active");
    try {
      console.log("Enviando formulario...");
      const selectedCatalogo = values.is_marca
        ? catalogos.find((catalogo) => catalogo.id_marca !== null)
        : catalogos.find((catalogo) => catalogo.id_marca === null);

      if (!selectedCatalogo) throw new Error("No se encontró un catálogo adecuado.");

      const productData: Partial<Articulo> = {
        ...values,
        id_catalogo: selectedCatalogo.id,
        id_marca: selectedCatalogo.id_marca ?? undefined,
      };

      let productId: number;

      if (product) {
        const response = await articulosService.updateArticulo(product.id!, productData);
        productId = response.data.id;
      } else {
        const response = await articulosService.createArticulo(productData);
        productId = response.data.id;
      }

      await processImages(images, productId);
      navigate("/my-published-products");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };
  return { form, onSubmit, isMarca };
};
