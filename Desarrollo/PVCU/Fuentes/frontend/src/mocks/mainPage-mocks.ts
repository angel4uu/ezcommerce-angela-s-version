import { ISellersCardProps } from "../components/cards/sellers-card";
import TestImage from '../assets/persona_computadora.png'
import TestProduct from '/image-card.jpg'
import BannerPrueba from '../assets/banner_prueba.webp'
import { IProductCardProps } from "../components/cards/product-card";

export const distinguishedSellers: ISellersCardProps[] = [
    {
        id: '1',
        name: 'Juan Rodriguez',
        description: 'Expert in digital marketing and social media strategies with over 10 years of experience.',
        imageAlt: 'Juan Rodriguez',
        imageSrc: TestImage
    },
    {
        id: '2',
        name: 'Maria Garcia',
        description: 'Designer specializing in sustainable fashion. Her brand promotes eco-friendly materials.',
        imageAlt: 'Maria Garcia',
        imageSrc: TestImage
    },
    {
        id: '3',
        name: 'Carlos Lopez',
        description: 'A highly skilled software engineer focusing on AI development and cloud infrastructure.',
        imageAlt: 'Carlos Lopez',
        imageSrc: TestImage
    },
    {
        id: '4',
        name: 'Ana Martinez',
        description: 'Professional photographer with a passion for capturing landscapes and urban environments.',
        imageAlt: 'Ana Martinez',
        imageSrc: TestImage
    },
    {
        id: '5',
        name: 'Pedro Fernandez',
        description: 'Entrepreneur with a focus on technology startups and innovations in the fintech sector.',
        imageAlt: 'Pedro Fernandez',
        imageSrc: TestImage
    },
    {
        id: '6',
        name: 'Sofia Ramirez',
        description: 'Artisan known for handmade jewelry, blending traditional techniques with modern aesthetics.',
        imageAlt: 'Sofia Ramirez',
        imageSrc: TestImage
    },
    {
        id: '7',
        name: 'Luis Perez',
        description: 'Freelance writer specializing in travel blogging and cultural journalism.',
        imageAlt: 'Luis Perez',
        imageSrc: TestImage
    },
    {
        id: '8',
        name: 'Elena Sanchez',
        description: 'Fitness coach and personal trainer with a focus on holistic health and wellness.',
        imageAlt: 'Elena Sanchez',
        imageSrc: TestImage
    }
]

export const categories = [
    {   
      id:'Electrónica 1',  
      image: TestImage,
      title: 'Electrónica 1',
      description: 'Aquí va un texto de descripción para el producto 1.',
      horiz:false  
    },
    { id: 'Electrónica 2',  
      image: TestImage,
      title: 'Electrónica 2',
      description: 'Aquí va un texto de descripción para el producto 2.',
      horiz:true
    },
    { 
      id:'elec3',    
      image: TestImage,
      title: 'Electrónica 3',
      description: 'Aquí va un texto de descripción para el producto 3.',
      horiz:true
    },
    {
      id:'dads',  
      image: TestImage,
      title: 'Electrónica 4',
      description: 'Aquí va un texto de descripción para el producto 4.',
      horiz:false
    },
  ];

  export const mockProducts: IProductCardProps[] = [
    {
        id: "1",
        name: "Smartphone X",
        price: 499.99,
        isFavourite: true,
        img: TestProduct,
        brand: "BrandX",
        qualification: 4.5
    },
    {
        id: "2",
        name: "Laptop Pro",
        price: 1299.99,
        isFavourite: false,
        img: TestProduct,
        brand: "TechMaster",
        qualification: 4.7
    },
    {
        id: "3",
        name: "Wireless Earbuds",
        price: 99.99,
        isFavourite: true,
        img: TestProduct,
        brand: "SoundMax",
        qualification: 4.3
    },
    {
        id: "4",
        name: "4K TV",
        price: 799.99,
        isFavourite: false,
        img: TestProduct,
        brand: "UltraVision",
        qualification: 4.6
    },
    {
        id: "5",
        name: "Smartwatch Series 5",
        price: 199.99,
        isFavourite: true,
        img: TestProduct,
        brand: "WearableTech",
        qualification: 4.2
    },
    {
        id: "6",
        name: "Gaming Console",
        price: 499.99,
        isFavourite: false,
        img: TestProduct,
        brand: "PlayMaster",
        qualification: 4.8
    },
    {
        id: "7",
        name: "Bluetooth Speaker",
        price: 49.99,
        isFavourite: false,
        img: TestProduct,
        brand: "SoundWave",
        qualification: 4.0
    },
    {
        id: "8",
        name: "Tablet Pro",
        price: 349.99,
        isFavourite: true,
        img: TestProduct,
        brand: "TabCo",
        qualification: 4.4
    }
];

export const images = [
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    },
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    },
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    },
    {
        src: BannerPrueba,
        alt:'Imagen prueba banner'
    }
]