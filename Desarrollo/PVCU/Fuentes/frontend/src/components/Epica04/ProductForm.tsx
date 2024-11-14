import React, { useCallback, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus, X, Maximize2 } from "lucide-react";

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImagePreviewModal } from "./formulario/ImagePreviewModal";
import { useNavigate } from "react-router";

// Esquema de validación de Zod
const categories = ["electronics", "clothing", "home", "books", "other"] as const;
const formSchema = z.object({
  productName: z.string({ required_error:"este campo es requerido" }),
  price: z.coerce.number({ required_error:"este campo es requerido", invalid_type_error:"Este campo debe ser un número" }).nonnegative().gte(0, {message: "Los precios no pueden ser negativos"}),
  stock: z.coerce.number({ required_error:"este campo es requerido", invalid_type_error:"Este campo debe ser un número" }).nonnegative().gte(0, {message: "Los precios no pueden ser negativos"}),
  description: z.string({ required_error:"este campo es requerido" }),
  category: z.enum(categories,{
    errorMap: () => ({ message: "Selecciona una categoría" }),
  }),
  
});

interface UploadedImage {
  id: string;
  url: string;
}

const SortableImage = ({ image }: { image: UploadedImage }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: image.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative aspect-square bg-muted rounded-lg overflow-hidden"
      {...attributes}
      {...listeners}
    >
      <img src={image.url} alt="Uploaded product" className="w-full h-full object-cover" />
    </div>
  );
};

export const ProductForm = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      price: 0,
      stock: 0,
    },
  });

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
    }));

    setImages((current) => {
      const updated = [...current, ...newImages];
      return updated.slice(0, 5);
    });
  }, []);
  
  const removeImage = useCallback((id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  }, []);

  const handleDragEnd = useCallback((event: any) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((currentImages) => {
        const oldIndex = currentImages.findIndex((img) => img.id === active.id);
        const newIndex = currentImages.findIndex((img) => img.id === over.id);
        return arrayMove(currentImages, oldIndex, newIndex);
      });
    }
  }, []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(images);
    // Resetear el formulario
    form.reset();
    setImages([]);
    navigate("/my-published-products");
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8">
      <h1 className="text-2xl font-bold">Formulario para agregar o actualizar un producto</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Imágenes de tus productos</h2>
        <p className="text-sm text-muted-foreground">
          Fotos - {images.length}/5 - Puedes agregar un máximo de 5 fotos
        </p>

        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={images.map((img) => img.id)} strategy={horizontalListSortingStrategy}>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {images.map((image) => (
                <div key={image.id} className="relative group">
                  <SortableImage image={image} />
                  <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity pointer-events-none">
                    {/* Overlay buttons */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image.url);
                      }}
                      className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors pointer-events-auto"
                    >
                      <Maximize2 className="w-4 h-4 text-gray-900" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      className="p-1.5 bg-white/90 rounded-full hover:bg-white transition-colors pointer-events-auto"
                    >
                      <X className="w-4 h-4 text-gray-900" />
                    </button>
                  </div>
                </div>
              ))}
              {images.length < 5 && (
                <label className="aspect-square rounded-lg border-2 border-dashed cursor-pointer flex items-center justify-center">
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileUpload} />
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </label>
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del producto</FormLabel>
                <FormControl>
                  <Input placeholder="Escribe el nombre de tu producto" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio del producto</FormLabel>
                <FormControl>
                  <Input placeholder="S/ 0.00" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea placeholder="Descripción" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoría</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Categoría del producto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electrónicos</SelectItem>
                      <SelectItem value="clothing">Ropa</SelectItem>
                      <SelectItem value="home">Hogar</SelectItem>
                      <SelectItem value="books">Libros</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <Button type="submit" className="flex-1 bg-[#00457C] hover:bg-[#00457C]/90">
              Guardar
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              Cancelar
            </Button>
          </div>
        </form>
      </Form>

      <ImagePreviewModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};
