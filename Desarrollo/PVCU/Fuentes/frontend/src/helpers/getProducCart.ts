import { getCatalogoById } from "../api/apiCatalogos";
import { getUsuarios } from "../api/apiUsuarios";
import { Articulo, getArticulo } from "../api/apiArticulos";
import { LoadImageMajor } from "./getImageMajor";

export interface ProductCart {
  ownerProduct: string;
  productTitle: string;
  productPrice: number;
  productDescription: string;
  productUrl: string;
  productRating: number;
}

export const getProductCart = async (id: number): Promise<ProductCart> => {
  try {
    // Obtener datos del producto
    const productResponse = await getArticulo(id);
    const product = productResponse.data;

    if (!product) {
      throw new Error(`No se encontró el producto con ID ${id}`);
    }

    // Obtener imagen principal
    let imageUrl = "";
    try {
      const images = await LoadImageMajor(product.id);
      if (images.length > 0) {
        imageUrl = images[0].url;
      } else {
        console.warn(`No se encontraron imágenes para el producto con ID ${product.id}`);
      }
    } catch (error) {
      console.error(`Error al obtener las imágenes del producto con ID ${product.id}:`, error);
    }

    // Obtener el catálogo
    let ownerProduct = "Usuario desconocido";
    try {
      const catalogoResponse = await getCatalogoById(product.id_catalogo);
      const catalogo = catalogoResponse.data;

      // Obtener el usuario del catálogo
      if (catalogo?.id_usuario) {
        try {
          const userResponse = await getUsuarios(catalogo.id_usuario);
          ownerProduct = userResponse.data?.nombres || ownerProduct;
        } catch (error) {
          console.error(
            `Error al obtener el usuario con ID ${catalogo.id_usuario}:`,
            error
          );
        }
      } else {
        console.warn(`El catálogo con ID ${product.id_catalogo} no tiene un usuario asociado.`);
      }
    } catch (error) {
      console.error(
        `Error al obtener el catálogo del producto con ID ${product.id_catalogo}:`,
        error
      );
    }

    // Estructurar el objeto `ProductCart`
    return {
      ownerProduct,
      productTitle: product.nombre,
      productPrice: product.precio,
      productDescription: product.descripcion,
      productUrl: imageUrl,
      productRating: 4, // Rating estático por ahora
    };
  } catch (error) {
    console.error("Error al obtener el ProductCart:", error);
    throw error; // Lanza el error para manejarlo en el llamado
  }
};
