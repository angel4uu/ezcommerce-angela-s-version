import * as React from "react"
import { Button } from "@/components/ui/button"
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { ImageUpload } from "./formulario/ImageUpload"
import { ImagePreviewModal } from "./formulario/ImagePreviewModal"
import { useProductForm } from "../../pages/Epica04/hooks/useProductForm"
import { Product } from "../../pages/Epica04/mocks/products"
import { Link } from "react-router-dom"

interface ProductFormProps {
  product?: Product
}

export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const {
    form,
    images,
    selectedImage,
    handleImageUpload,
    removeImage,
    openModal,
    closeModal,
    onSubmit,
  } = useProductForm()

  // Cargar los datos del producto en el formulario si se está editando
  React.useEffect(() => {
    if (product) {
      form.reset({
        productName: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        category: product.category,
        condition: product.condition,
      })
    }
  }, [product, form])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="font-sans max-w-3xl py-9 space-y-8 mx-auto"
      >
        <h1 className="text-3xl font-semibold">
          {product ? "Editar Producto" : "Agregar Producto"}
        </h1>

        <ImageUpload
          images={images}
          onImageUpload={handleImageUpload}
          onRemoveImage={removeImage}
          onImageClick={openModal}
        />

        <ImagePreviewModal imageUrl={selectedImage} onClose={closeModal} />

        <div className="space-y-6 font-sans">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Obligatorio</h2>
            <p className="tex-base text-muted-foreground">
              Proporciona una descripción que sea lo mas detallada posible
            </p>
          </div>
          <FormField
            control={form.control}
            name="productName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Nombre del producto</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Escribe el nombre de tu producto"
                    {...field}
                  />
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
                <FormLabel className="text-base">Precio del producto</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="S/ 0.00" {...field} />
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
                <FormLabel className="text-base">Stock</FormLabel>
                <FormControl>
                  <Input type="number" min="0" placeholder="0" {...field} />
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
                <FormLabel className="text-base">Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descripción"
                    className="min-h-[100px] max-h-52"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo para la categoría con valor seleccionado */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Categoría</FormLabel>
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

          {/* Campo para la condición con valor seleccionado */}
          <FormField
            control={form.control}
            name="condition"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Condición</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estado del producto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Nuevo</SelectItem>
                      <SelectItem value="used">Usado</SelectItem>
                      <SelectItem value="refurbished">Reacondicionado</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex items-center justify-center flex-wrap sm:flex-nowrap gap-4">
          <Button
            type="submit"
            className="bg-secondaryLight hover:bg-blue-900 w-full"
            size="lg"
          >
            Guardar
          </Button>
          <Button type="button" variant="outline" className="w-full px-0" size="lg">
            <Link to="/my-published-products" className="w-full">Cancelar</Link>
          </Button>
        </div>
      </form>
    </Form>
  )
}
