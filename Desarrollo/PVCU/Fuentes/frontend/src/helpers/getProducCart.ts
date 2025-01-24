import { catalogosService } from "../api/apiCatalogos";
import { usuariosService } from "../api/apiUsuarios";
import { articulosService } from "../api/apiArticulos";
import { LoadImageMajor } from "./getImageMajor";
import { useAuth } from "@/hooks/useAuth";

export interface ProductCart {
  ownerProduct: string;
  productTitle: string;
  productPrice: number;
  productDescription: string;
  productUrl: string;
  productRating: number;
  quantity: number;
}

export const getProductCart = async (id: number): Promise<ProductCart> => {
  const auth  = useAuth();
  try {
    const productResponse = await articulosService.getArticulo(id,auth.authState.accessToken);
    const product = productResponse.data;

    if (!product) {
      throw new Error(`No se encontró el producto con ID ${id}`);
    }

    let imageUrl = "";
    try {
      const images = await LoadImageMajor(product.id);
      imageUrl = images.length > 0 ? images[0].url : "placeholder.jpg";
    } catch (error) {
      console.error(`Error al obtener las imágenes:`, error);
    }

    let ownerProduct = "Usuario desconocido";
    try {
      const catalogoResponse = await catalogosService.getCatalogoById(product.id_catalogo);
      const catalogo = catalogoResponse.data;

      if (catalogo?.id_usuario) {
        const { authState } = useAuth();
        const access_token = authState.accessToken;
        const userResponse = await usuariosService.getUsuarios(catalogo.id_usuario, access_token);
        ownerProduct = userResponse.data?.nombres || ownerProduct;
      }
    } catch (error) {
      console.error(`Error al obtener el usuario del catálogo:`, error);
    }

    return {
      ownerProduct,
      productTitle: product.nombre,
      productPrice: product.precio,
      productDescription: product.descripcion,
      productUrl: imageUrl,
      productRating: 4,
      quantity: 1, // Cambiado de 0 a 1
    };
  } catch (error) {
    console.error("Error al obtener el ProductCart:", error);
    throw error;
  }
};