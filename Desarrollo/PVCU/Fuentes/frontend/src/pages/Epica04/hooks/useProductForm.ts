import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { UploadedImage } from "./useImageUpload";
import { createArticulo, Articulo } from "../../../api/apiArticulos";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

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


  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    console.log(values);
    console.log(images);
    // const res = await createArticulo(); 
    form.reset(); 
    setImages([]); 
    navigate("/my-published-products"); 
  };

  return { form, onSubmit };
};
