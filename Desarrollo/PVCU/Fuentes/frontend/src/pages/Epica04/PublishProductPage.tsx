import { Helmet } from 'react-helmet';
import { ProductForm } from '@/components/layouts/ProductForm';

export const PublishProductPage = () => {
  return (
    <>
      <Helmet>
        <title>Publicar Producto</title>
      </Helmet>

      <ProductForm />
    </>
  )
}
