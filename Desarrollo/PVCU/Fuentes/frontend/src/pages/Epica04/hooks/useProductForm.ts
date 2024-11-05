import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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

  const [images, setImages] = React.useState<File[]>([])
  const [selectedImage, setSelectedImage] = React.useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files && files.length > 0) {
      setImages((prev) => [...prev, ...Array.from(files)].slice(0, 10))
    }
  }

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index))
  }

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedImage(null)
  }

  const onSubmit = (data: FormData) => {
    console.log("Datos del formulario:", data)
  }

  return {
    form,
    images,
    selectedImage,
    isModalOpen,
    handleImageUpload,
    removeImage,
    openModal,
    closeModal,
    onSubmit,
  }
}
