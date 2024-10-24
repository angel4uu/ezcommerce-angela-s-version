import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

import { CardFavourite } from "../../components/Epica04/CardFavourite";
import { ChevronLeft } from 'lucide-react';

export const FavouritesPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <>
      <Helmet>
        <title>Favoritos</title>
      </Helmet>

      <div className='my-3 py-2 px-12 space-y-4'>
        <div className='text-4xl font-sans items-center'>
            <ChevronLeft className="h-6 w-6 mr-4 inline-block" />
            <Link to='#' onClick={handleGoBack}>Productos que te gustan</Link>
        </div>
        <div className='flex items-center py-2 px-3'>
            <p className='text-base'>Aquí puedes encontrar todos tus productos favoritos.</p>
          
        </div>
        <div className='flex flex-wrap items-center justify-center gap-11 p-3'>
          {
            Array.from({ length: 6 }).map((_, index) => (
              <CardFavourite key={index} />
            ))
          }
        </div>
      </div>
    </>
  )
}
