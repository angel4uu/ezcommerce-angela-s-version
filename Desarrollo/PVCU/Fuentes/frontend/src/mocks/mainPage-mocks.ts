import { ISellersCardProps } from "../components/mainPage/sellers-card";
import TestImage from '../assets/persona_computadora.png'

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
      colSpan: 1,
      rowSpan: 2,
    },
    { id: 'Electrónica 2',  
      image: TestImage,
      title: 'Electrónica 2',
      description: 'Aquí va un texto de descripción para el producto 2.',
      colSpan: 2,
      rowSpan: 1,
    },
    { 
      id:'elec3',    
      image: TestImage,
      title: 'Electrónica 3',
      description: 'Aquí va un texto de descripción para el producto 3.',
      colSpan: 2,
      rowSpan: 1,
    },
    {
      id:'dads',  
      image: TestImage,
      title: 'Electrónica 4',
      description: 'Aquí va un texto de descripción para el producto 4.',
      colSpan: 1,
      rowSpan: 2,
    },
  ];