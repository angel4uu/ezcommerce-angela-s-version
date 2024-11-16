import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { UploadedImage } from "./useImageUpload";
import { createArticulo, Articulo } from "../../../api/apiArticulos";
import { useAuth } from "@/hooks/useAuth";
import { LoadCatalogos } from "../../../helpers/LoadCatalogos";
import { useEffect, useState } from "react";

// Esquema de validación de Zod


const formSchema = z.object({
  nombre : z.string().min(1, { message: "Este campo es requerido" }), 
  precio: z.coerce.number().min(0, { message: "El precio debe ser un número no negativo" }),
  stock: z.coerce.number().min(1, { message: "El stock debe ser un número no negativo" }),
  descripcion: z.string().min(10, { message: "Este campo es requerido con un minimo de 10 caracteres" }), 
  etiquetas: z.array(z.number()).refine((value) => value.some((item) => item), {
    message: "Selecciona al menos una etiqueta",
  }),
  id_marca: z.number().optional(),
  is_marca: z.boolean().optional(),
});



interface UseProductFormProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

export const useProductForm = ({ images, setImages }: UseProductFormProps) => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  const [catalogoUser, setCatalogoUser] = useState<{
    id: number;
    id_usuario: number;
    id_marca: number | null;
    capacidad_maxima: number;
    espacio_ocupado: number;
  }>({
    id: 0,
    id_usuario: 0,
    id_marca: null,
    capacidad_maxima: 0,
    espacio_ocupado: 0,
  });




  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      precio: 0,
      stock: 1,
      etiquetas: [],
      id_marca: undefined,
      is_marca: false,
    },
  });

  useEffect(() => {
    if (authState.userId !== null) {
      LoadCatalogos(authState.userId).then((data) => {
        if (data) {
          setCatalogoUser(data);
        } else {
          console.error("No se encontró ningún catálogo para este usuario.");
        }
      });
    }
  }, [authState.userId]);

  console.log("Catalogo del usuario:", catalogoUser.id);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const data = { ...values, id_catalogo: catalogoUser.id};
      const response = await createArticulo(data as Articulo);
      console.log("Artículo creado exitosamente:", response.data);
      form.reset();
      setImages([]);
      navigate("/my-published-products");
    } catch (error) {
      console.error(error);
    }
  };

  return { form, onSubmit };
};
