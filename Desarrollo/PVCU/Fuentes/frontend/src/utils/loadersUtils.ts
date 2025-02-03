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
    const product= await articulosService.getArticulo(id);

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
      const catalogo = await catalogosService.getCatalogo(product.id_catalogo);
    
      if (catalogo?.id_usuario) {
        const userResponse = await usuariosService.getUsuario(catalogo.id_usuario);
        ownerProduct = userResponse?.nombres || ownerProduct;
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
    const response = await imagesService.getImagesByArticulo(id_articulo);
    return response; // Devuelve todas las imagen del articulo
};

export const LoadEtiquetas = async () => {
  const response = await etiquetasService.getEtiquetas();
  return response.map((etiqueta: { id: number; nombre: string }) => ({
    id: etiqueta.id,
    nombre: etiqueta.nombre,
  }));
}; 



