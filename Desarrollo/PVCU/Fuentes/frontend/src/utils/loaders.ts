import { articulosService,catalogosService,usuariosService,imagesService,etiquetasService } from "@/api";

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
  try {
    const productResponse = await articulosService.getArticulo(id);
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
        const userResponse = await usuariosService.getUsuarios(catalogo.id_usuario);
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



export const LoadImageMajor = async (id_articulo: number) => {
    const response = await imagesService.getImage(id_articulo);
    return response.data.results; // Devuelve todas las imagen del articulo
};

export const LoadUsuarios = async (userId: number) => {
  const response = await usuariosService.getUsuarios(userId);
  return response.data;
};

export const LoadArticulosByUser = async (id_usuario: number) => {
  const response = await articulosService.getArticulosByUsuario(id_usuario);
  return response.data.results; // Devuelver todos los artículos del usuario
};

export const LoadCatalogos = async (id_usuario: number) => {
  const response = await catalogosService.getCatalogoUser(id_usuario);
  return response.data.results; // Devuelve el primer catálogo porque se asume que el usuario solo tiene un catálogo
};

export const LoadEtiquetas = async () => {
  const response = await etiquetasService.getEtiquetas();
  return response.data.results.map((etiqueta: { id: number; nombre: string }) => ({
    id: etiqueta.id,
    nombre: etiqueta.nombre,
  }));
}; 



