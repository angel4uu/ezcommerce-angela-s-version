import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

import { ChevronLeft, CirclePlus,  } from "lucide-react";
import { Button } from '@/components/ui/button';

import { CardPublishedEdit } from "../../components/Epica04/CardPublishedEdit";

export const MyPublishedProductsPage = () => {
  return (
    <>
      <Helmet>
        <title>Mis productos publicados</title>
      </Helmet>

      <div className='my-3 py-2 px-12 space-y-4'>
        <div className='text-4xl font-sans'>
          <ChevronLeft className="h-6 w-6 mr-4 inline-block" />
          <Link to='/products-management'>Productos publicados</Link>
        </div>
        <div className='flex items-center justify-between py-2 px-3'>
          <p className='text-base'>Presiona en uno de los productos para actualizar sus datos</p>
          <Button className='py-3 px-6 text-base bg-secondaryLight hover:bg-blue-900'>
            <CirclePlus className='h-4 w-4 inline-block mr-4 text-secondaryLight bg-white rounded-lg' />
            <Link to='/publish-product'>Publicar producto</Link>
          </Button>
        </div>
        <div className='flex flex-wrap items-center justify-center gap-11 p-3'>
          {
            Array.from({ length: 15 }).map((_, index) => (
              <CardPublishedEdit key={index} />
            ))
          }
        </div>
      </div>
    </>
  )
}
