import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router"

// Definición del esquema de validación con Zod
const formSchema = z.object({
  productName: z.string().nonempty("El nombre del producto es obligatorio"),
  price: z.number().positive("Debe ser un número positivo"),
  stock: z.number().int().nonnegative("El stock debe ser un número no negativo"),
  description: z.string().optional(),
  category: z.string().nonempty("Selecciona una categoría"),
  condition: z.string().nonempty("Selecciona una condición"),
})

type FormData = z.infer<typeof formSchema>

export const useProductForm = () => {
  const navigate = useNavigate()
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      price: 0,
      stock: 0,
      description: "",
      category: "",
      condition: "",
    },
  })

  const onSubmit = (data: FormData) => {
    console.log("Datos del formulario:", data)
    navigate("/my-published-products")
  }

  return {
    form,
    onSubmit,
  }
}
