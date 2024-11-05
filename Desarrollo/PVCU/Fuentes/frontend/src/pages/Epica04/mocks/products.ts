export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    rating: number;
  }
  
  // Datos de ejemplo
  export const products: Product[] = [
    {
      id: 1,
      name: "Audífonos Sony",
      price: 34.00,
      imageUrl: "image-card.jpg", // Asegúrate de que la ruta de la imagen sea correcta
      rating: 4.8,
    },
    {
      id: 2,
      name: "Auriculares Bose",
      price: 79.99,
      imageUrl: "image-card.jpg",
      rating: 4.7,
    },
    {
      id: 3,
      name: "Auriculares JBL",
      price: 49.99,
      imageUrl: "image-card.jpg",
      rating: 4.5,
    },
    // Agrega más productos según sea necesario
  ];
  