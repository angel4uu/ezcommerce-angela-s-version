import { useImageUpload } from "../../pages/Epica04/hooks/useImageUpload";
import { useProductForm } from "../../pages/Epica04/hooks/useProductForm";
import { ImageUpload } from "./formulario/ImageUpload";
import { ImagePreviewModal } from "./formulario/ImagePreviewModal";
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useNavigate } from "react-router";

export const ProductForm = () => {
  // Hook para manejar la subida y gestión de imágenes
  const { images, setImages, handleFileUpload, removeImage, handleDragEnd } = useImageUpload(5);
  // Hook para manejar el formulario de producto
  const { form, onSubmit } = useProductForm({ images, setImages });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const navigate = useNavigate();
  const onCancel = () => {
    form.reset();
    setImages([]);  
    navigate("/my-published-products");
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-8 font-sans">
      <h1 className="text-2xl font-bold">Formulario para agregar o actualizar un producto</h1>

      {/* Componente para cargar y gestionar imágenes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Imágenes de tus productos</h2>
        <p className="text-sm text-muted-foreground">
          Fotos - {images.length}/5 - Puedes agregar un máximo de 5 fotos
        </p>
        <ImageUpload
          images={images}
          onPreview={setSelectedImage}
          handleFileUpload={handleFileUpload}
          removeImage={removeImage}
          onDragEnd={handleDragEnd}
        />
      </div>

      {/* Formulario de producto */}
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
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              Cancelar
            </Button>
          </div>
        </form>
      </Form>

      {/* Modal de vista previa de la imagen */}
      <ImagePreviewModal imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />
    </div>
  );
};
