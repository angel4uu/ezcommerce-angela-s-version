import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { UploadedImage } from "./useImageUpload";

// Esquema de validación de Zod
const categories = ["electronics", "clothing", "home", "books", "other"] as const;
const formSchema = z.object({
  productName: z.string().min(1, { message: "Este campo es requerido" }), 
  price: z.coerce.number().min(0, { message: "El precio debe ser un número no negativo" }),
  stock: z.coerce.number().min(1, { message: "El stock debe ser un número no negativo" }),
  description: z.string().min(10, { message: "Este campo es requerido con un minimo de 10 caracteres" }), 
  category: z.enum(categories, {
    errorMap: () => ({ message: "Selecciona una categoría" }),
  }),
});



interface UseProductFormProps {
  images: UploadedImage[];
  setImages: React.Dispatch<React.SetStateAction<UploadedImage[]>>;
}

export const useProductForm = ({ images, setImages }: UseProductFormProps) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      price: 0,
      stock: 1,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    console.log(images); 
    form.reset(); 
    setImages([]); 
    navigate("/my-published-products"); 
  };

  return { form, onSubmit };
};
