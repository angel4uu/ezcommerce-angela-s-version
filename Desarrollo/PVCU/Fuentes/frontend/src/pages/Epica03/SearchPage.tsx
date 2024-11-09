import { Helmet } from 'react-helmet-async';
import { categories } from '../../mocks/mainPage-mocks';
import { Checkbox } from '../../components/ui/checkbox';
import * as Switch from '@radix-ui/react-switch';
import { Slider } from '../../components/ui/slider';


const facultades = ['FIEE','FISI', 'FCE', 'FCB', 'FCF', 'FCM']

const condicion = ['Nuevo', 'Usado']

export const SearchPage = () => {


  return (
    <>
      <Helmet>
        <title>Search - EzCommerce</title>
      </Helmet>

      <div className='w-full gap-4 flex flex-row min-h-96 my-10'>
        <div className='w-[300px] border rounded border-slate-300 p-8'>
          <h3 className='font-bold text-xl text-secondaryLight mb-4'>Filtros</h3>
          <div className='mb-4'>
            <h3 className='font-bold text-xl'>Categorias</h3>
            {
              categories.map((cat) => (
                <>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id={cat.title.toLocaleLowerCase()} className='w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight ' />
                  <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {cat.title}
                  </label>
                </div>
                </>
              ))
            }
          </div>
          <div className='mb-4'>
            <h3 className='font-bold text-xl'>Facultades</h3>
            {
              facultades.map((fac) => (
                <>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id={fac.toLocaleLowerCase()} className='w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight ' />
                  <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {fac}
                  </label>
                </div>
                </>
              ))
            }
          </div>
          <div className='mb-4'>
            <h3 className='font-bold text-xl'>Condición</h3>
            {
              condicion.map((cond) => (
                <>
                <div className="flex items-center space-x-2 my-4">
                  <Checkbox id={cond.toLocaleLowerCase()} className='w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight ' />
                  <label className="text-md font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {cond}
                  </label>
                </div>
                </>
              ))
            }
          </div>
          <div className='mb-4 flex'>
            <h3 className='font-bold text-md pt-1'>Filtrar por marca</h3>
            <Switch.Root className="ml-9 justify-self-end relative h-[32px] w-[64px] cursor-default rounded-full bg-slate-300 outline-none  data-[state=checked]:bg-secondaryLight">
              <Switch.Thumb className="block size-[28px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[34px]"/>
            </Switch.Root>
          </div>
          <div className='flex flex-col mb-4 gap-4'>
            <h3 className='font-bold text-xl'>Precio</h3>
            <div>
              <h3 className='text-md mb-2'>Desde:</h3>
              <Slider 
                min={1.0}
                max={300.00}
                step={5}
                defaultValue={[1]}
                />
            </div>
              <div>
              <h3 className='text-md mb-2'>Hasta:</h3>
                <Slider 
                  min={1.0}
                  max={300.00}
                  step={5}
                  defaultValue={[300]}
                  />
              </div>
          </div>
        </div>

        <div className=' grow border rounded border-slate-300 p-4'>
            <div>

            </div>
            <div>

            </div>
            <div>

            </div>
        </div>
      </div>
    </>
  )
}
