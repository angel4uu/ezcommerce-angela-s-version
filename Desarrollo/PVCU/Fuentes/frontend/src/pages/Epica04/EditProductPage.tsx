import { Helmet } from 'react-helmet-async';
import { ProductForm  } from "../../components/Epica04/ProductForm"; // Asegúrate de que la ruta sea correcta

export const EditProductPage = () => {
    return (
        <>
            <Helmet>
                <title>Editar Nombre producto</title>
            </Helmet>

            {/* Aqui iria el componente de mi formulario con la información para editar */}
            <ProductForm />
        </>
    )
}
