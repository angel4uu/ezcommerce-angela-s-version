import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { UploadedImage } from "./useImageUpload";
import { createArticulo, Articulo, updateArticulo } from "../../../api/apiArticulos";
import { createImage } from "../../../api/apiImages";
import { getFileURL } from "../../../utils/helpers";
import { useAuth } from "@/hooks/useAuth";
import { LoadCatalogos } from "../../../helpers/LoadCatalogos";
import { useEffect, useState } from "react";
import { LoadUsuarios } from "../../../helpers/getUser";

// Esquema de validación de Zod
const formSchema = z.object({
  nombre: z.string().min(1, { message: "Este campo es requerido" }),
  precio: z.coerce.number().min(0, { message: "El precio debe ser un número no negativo" }),
  stock: z.coerce.number().min(1, { message: "El stock debe ser un número no negativo" }),
  descripcion: z.string().min(10, { message: "Este campo es requerido con un mínimo de 10 caracteres" }),
  etiquetas: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Selecciona al menos una etiqueta",
  }),
  id_marca: z.number().optional(),
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
  const { authState } = useAuth();
  const [catalogos, setCatalogos] = useState<Array<{
    id: number;
    id_usuario: number;
    id_marca: number | null;
    capacidad_maxima: number;
    espacio_ocupado: number;
  }>>([]);
  const [isMarca, setIsMarca] = useState(false);

  // Cargar información del usuario para verificar si tiene marca
  useEffect(() => {
    if (authState.userId !== null) {
      LoadUsuarios(authState.userId).then((data) => {
        if (data) {
          setIsMarca(data.tiene_marca);
        } else {
          console.error("No se encontró información del usuario.");
        }
      });
    }
  }, [authState.userId]);

  // Cargar los catálogos del usuario
  useEffect(() => {
    if (authState.userId !== null) {
      LoadCatalogos(authState.userId).then((data) => {
        if (data) {
          setCatalogos(data);
        } else {
          console.error("No se encontraron catálogos para este usuario.");
        }
      });
    }
  }, [authState.userId]);

  // Establecer los valores por defecto del formulario (si existe un producto)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: product?.nombre || "",
      descripcion: product?.descripcion || "",
      precio: product?.precio || 0,
      stock: product?.stock || 1,
      etiquetas: product?.etiquetas || [],
      id_marca: product?.id_marca,
      is_marca: product?.id_marca ? true : false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      // Determinar el catálogo según el estado del switch
      const selectedCatalogo = values.is_marca
        ? catalogos.find((catalogo) => catalogo.id_marca !== null)
        : catalogos.find((catalogo) => catalogo.id_marca === null);

      if (!selectedCatalogo) {
        console.error("No se encontró un catálogo adecuado.");
        return;
      }

      // Construir los datos a enviar
      const data: Articulo = {
        ...values,
        id_catalogo: selectedCatalogo.id,
        id_marca: selectedCatalogo.id_marca ?? undefined,
      };

      console.log("Enviando datos del producto:", data);

      let productId: number;

      // Si existe un `product`, es una actualización; de lo contrario, es creación
      if (product) {
        if (product.id !== undefined) {
          const response = await updateArticulo(product.id, data);
          productId = response.data.id;
          console.log("Producto actualizado exitosamente:", response.data);
        } else {
          console.error("El ID del producto es indefinido.");
          return;
        }
      } else {
        const response = await createArticulo(data);
        productId = response.data.id;
        console.log("Producto creado exitosamente:", response.data);
      }

      // Subir imágenes a Firebase y registrar sus URLs en el backend
      for (const image of images) {
        const storageDir = `product_image/${productId}`;
        const url = await getFileURL(image.file, storageDir); // Subir imagen a Firebase
        if (url) {
          await createImage({ id_articulo: productId, url }); // Registrar URL en el backend
        } else {
          console.error("URL de la imagen es nula.");
        }
        console.log("Imagen registrada en el backend:", url);
      }

      // Resetear formulario y estado de imágenes
      form.reset();
      setImages([]);
      navigate("/my-published-products");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  return { form, onSubmit, isMarca };
};
