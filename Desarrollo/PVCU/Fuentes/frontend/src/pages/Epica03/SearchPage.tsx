import { Helmet } from 'react-helmet-async';
import { categories } from '../../mocks/mainPage-mocks';
import { Checkbox } from '../../components/ui/checkbox';
import * as Switch from '@radix-ui/react-switch';
import { Slider } from '../../components/ui/slider';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';

const facultades = ['FIEE','FISI', 'FCE', 'FCB', 'FCF', 'FCM'];
const condicion = ['Nuevo', 'Usado'];

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Estados de los filtros en tiempo real (temporal)
  const [tempFilters, setTempFilters] = useState({
    categorias: [] as string[],
    facultades: [] as string[],
    condicion: [] as string[],
    min: 0,
    max: 500,
    brandFilter: false,
  });

  // Estado para los filtros aplicados
  const [_appliedFilters, setAppliedFilters] = useState({
    categorias: [] as string[],
    facultades: [] as string[],
    condicion: [] as string[],
    min: 0,
    max: 500,
    brandFilter: false,
  });

  const handleCheckboxChange = (value: string, key: string) => {
    setTempFilters((prevFilters:any) => {
      const updatedArray = prevFilters[key as keyof typeof prevFilters].includes(value)
        ? prevFilters[key as keyof typeof prevFilters].filter((item:any) => item !== value)
        : [...prevFilters[key as keyof typeof prevFilters], value];
      return { ...prevFilters, [key]: updatedArray };
    });
  };

  const handleFilterApply = () => {
    setAppliedFilters(tempFilters);
    const searchParams = new URLSearchParams(location.search);

    searchParams.delete('categorias');
    tempFilters.categorias.forEach((cat) => searchParams.append('categorias', cat));

    searchParams.delete('facultades');
    tempFilters.facultades.forEach((fac) => searchParams.append('facultades', fac));

    searchParams.delete('condicion');
    tempFilters.condicion.forEach((cond) => searchParams.append('condicion', cond));


    tempFilters.min !== 0 ? searchParams.set('min', tempFilters.min.toString()) : null;
    tempFilters.max !== 500 ? searchParams.set('max', tempFilters.max.toString()) : null
    searchParams.set('byBrand', tempFilters.brandFilter ? 'true' : '') 

    navigate(`?${searchParams.toString()}`);
  };

  const handleClearFilters = () => {
    navigate('')
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);

    setTempFilters({
      categorias: searchParams.getAll('categorias'),
      facultades: searchParams.getAll('facultades'),
      condicion: searchParams.getAll('condicion'),
      min: Number(searchParams.get('min') || '0'),
      max: Number(searchParams.get('max') || '500'),
      brandFilter: searchParams.get('byBrand') === 'true',
    });
  }, [location.search]);

  return (
    <>
      <Helmet>
        <title>Search - EzCommerce</title>
      </Helmet>

      <div className="w-full gap-4 flex flex-row min-h-96 my-10">
        <div className="w-[300px] border rounded border-slate-300 p-8">
          <h3 className="font-bold text-xl text-secondaryLight mb-4">Filtros</h3>

          <div className="mb-4">
            <h3 className="font-bold text-xl">Categorias</h3>
            {categories.map((cat) => (
              <div key={cat.title} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={cat.title.toLowerCase()}
                  className="w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight"
                  onCheckedChange={() => handleCheckboxChange(cat.title, 'categorias')}
                  checked={tempFilters.categorias.includes(cat.title)}
                />
                <label htmlFor={cat.title.toLowerCase()} className="text-md font-medium leading-none">
                  {cat.title}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-xl">Facultades</h3>
            {facultades.map((fac) => (
              <div key={fac} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={fac.toLowerCase()}
                  className="w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight"
                  onCheckedChange={() => handleCheckboxChange(fac, 'facultades')}
                  checked={tempFilters.facultades.includes(fac)}
                />
                <label htmlFor={fac.toLowerCase()} className="text-md font-medium leading-none">
                  {fac}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4">
            <h3 className="font-bold text-xl">Condición</h3>
            {condicion.map((cond) => (
              <div key={cond} className="flex items-center space-x-2 my-4">
                <Checkbox
                  id={cond.toLowerCase()}
                  className="w-[24px] h-[24px] rounded-lg border-2 border-secondaryLight data-[state=checked]:bg-secondaryLight"
                  onCheckedChange={() => handleCheckboxChange(cond, 'condicion')}
                  checked={tempFilters.condicion.includes(cond)}
                />
                <label htmlFor={cond.toLowerCase()} className="text-md font-medium leading-none">
                  {cond}
                </label>
              </div>
            ))}
          </div>

          <div className="mb-4 flex">
            <h3 className="font-bold text-md pt-1">Filtrar por marca</h3>
            <Switch.Root
              className="ml-9 relative h-[32px] w-[64px] cursor-default rounded-full bg-slate-300 outline-none data-[state=checked]:bg-secondaryLight"
              onCheckedChange={() => setTempFilters((prev) => ({ ...prev, brandFilter: !prev.brandFilter }))}
              checked={tempFilters.brandFilter}
            >
              <Switch.Thumb className="block size-[28px] translate-x-0.5 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[34px]" />
            </Switch.Root>
          </div>

          <div className="flex flex-col mb-4 gap-4">
            <h3 className="font-bold text-xl">Precio</h3>
            <div>
              <h3 className="text-md mb-2">Desde: S/. {tempFilters.min}</h3>
              <Slider
                min={1}
                max={500}
                step={1}
                value={[tempFilters.min]}
                onValueChange={([value]) => setTempFilters((prev) => ({ ...prev, min: value }))}
              />
            </div>
            <div>
              <h3 className="text-md mb-2">Hasta: S/. {tempFilters.max}</h3>
              <Slider
                min={1}
                max={500}
                step={1}
                value={[tempFilters.max]}
                onValueChange={([value]) => setTempFilters((prev) => ({ ...prev, max: Math.max(value, prev.min) }))}
              />
            </div>
            <div className='flex flex-row gap-4 justify-center'>
            <button
              onClick={handleClearFilters}
              className='mt-4 px-1 py-2 w-2/5 bg-red-500 text-sm text-white rounded-lg'
            >
              Limpiar filtro
            </button>
              <button
                onClick={handleFilterApply}
                className='mt-4 px-4 py-2 w-2/5 bg-secondaryLight text-white rounded-lg'
              >
                Aplicar
              </button>
            </div>
            </div>
          
        </div>

        <div className="grow border rounded border-slate-300 p-4">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  );
};
