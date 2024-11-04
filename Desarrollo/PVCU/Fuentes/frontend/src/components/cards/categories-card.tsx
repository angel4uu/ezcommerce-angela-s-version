import { useNavigate } from "react-router";

interface ICategoriesCardProps {
    id:string,
    image:string,
    title:string,
    description:string,
    colSpan:number,
    rowSpan:number
}

export const CategoriesCard = ({id, image, title, description, colSpan, rowSpan }:ICategoriesCardProps) => {
    const navigate = useNavigate()
    const goToCategory = () => navigate(`/userId/search/${id}`)
    return (
      <button className={`col-span-${colSpan} row-span-${rowSpan} bg-white rounded-lg shadow-lg border-[1.5px] border-slate-400 p-4 flex flex-${colSpan === 2 ?'row':'col'} gap-4`}
        onClick={() => goToCategory()}>
        <div className={colSpan === 1 ? 'w-full':'w-1/2'}>
          <img
            src={image}
            className='w-full h-[180px] object-cover rounded-lg'
            alt={title}
          />
        </div>
        <div >
          <h2 className='text-left truncate text-4xl font-bold mb-2 text-terciaryLight dark:text-terciaryDark'>{title}</h2>
          <hr className="mb-3"/>
          <p className='line-clamp-6'>{description}</p>
        </div>
      </button>
    );
  };