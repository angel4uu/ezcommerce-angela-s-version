import { useNavigate } from 'react-router'
import  rightArrow  from '../../assets/icons/right-arrow.svg'

export interface ISellersCardProps {
    id:string,
    imageSrc:string,
    imageAlt:string,
    name:string,
    description:string
}

export const SellersCard = (
    {
     id,
     imageSrc,
     imageAlt,
     name,
     description
    }:ISellersCardProps) => {
        const navigate = useNavigate()
        const goToProfile = () => navigate(`/userId/profile/${id}`)

        return(
            <>
                <div className="flex flex-col bg-white shadow-xl rounded-lg max-w-[260px] min-h-[400px] p-4">
                    <div className="">
                        <img
                        src={imageSrc}
                        alt={imageAlt}
                        />
                    </div>
                    <div className="">
                        <h3 className='text-xl font-bold text-terciaryLight dark:text-terciaryDark'>
                            {name}
                        </h3>
                    </div>
                    <div className="flex">
                        <div className="">
                            <p>{description}</p>
                        </div>
                        <div className="">
                            <button className='rounded-full bg-[#B7B7B7] opacity-45'
                                onClick={() => goToProfile()}
                            >
                                <img className='h-7 w-7' src={rightArrow} />
                            </button>
                        </div>
                    </div>
                </div>
            </>
        )
}

