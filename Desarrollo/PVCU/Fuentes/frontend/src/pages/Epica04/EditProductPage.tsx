import { Helmet } from 'react-helmet-async'
import { useParams } from 'react-router-dom'
import { ProductForm } from "../../components/Epica04/ProductForm"
import { getProductById } from "./mocks/products"

export const EditProductPage = () => {
  const { productId } = useParams<{ productId: string }>()
  
  const productToEdit = getProductById(Number(productId))

  if (!productToEdit) {
    return <p>Producto no encontrado</p>
  }

  return (
    <>
      <Helmet>
        <title>Editar {productToEdit.name}</title>
      </Helmet>

      <ProductForm product={productToEdit} />
    </>
  )
}
