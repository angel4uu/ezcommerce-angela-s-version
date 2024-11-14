import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

const formSchema = z.object({
  productName: z.string().nonempty("El nombre del producto es obligatorio"),
  price: z.number().positive("Debe ser un número positivo"),
  stock: z.number().int().nonnegative("El stock debe ser un número no negativo"),
  description: z.string().optional(),
  category: z.string().nonempty("Selecciona una categoría"),
  condition: z.string().nonempty("Selecciona una condición"),
});

type FormData = z.infer<typeof formSchema>;

interface UploadedImage {
  id: string;
  url: string;
}

export const useProductForm = (maxImages = 5) => {
  const navigate = useNavigate();
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
  });

  const [images, setImages] = useState<UploadedImage[]>([]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
    }));

    setImages((current) => {
      const updated = [...current, ...newImages];
      return updated.slice(0, maxImages);
    });
  }, [maxImages]);

  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  }, []);

  const onDragEnd = (event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((currentImages) => {
        const oldIndex = currentImages.findIndex((img) => img.id === active.id);
        const newIndex = currentImages.findIndex((img) => img.id === over.id);
        return arrayMove(currentImages, oldIndex, newIndex);
      });
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Datos del formulario:", data);
    navigate("/my-published-products");
  };

  return {
    form,
    onSubmit,
    images,
    handleFileUpload,
    removeImage,
    onDragEnd,
  };
};
