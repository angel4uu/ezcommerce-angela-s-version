import { Helmet } from 'react-helmet-async';
import { categories } from '../../mocks/mainPage-mocks';
import { Checkbox } from '../../components/ui/checkbox';
import * as Switch from '@radix-ui/react-switch';
import { Slider } from '../../components/ui/slider';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { PaginationComp } from '../../components/Epica03/paginationComponent';
import axios from 'axios'

const facultades = ['FIEE','FISI', 'FCE', 'FCB', 'FCF', 'FCM'];

export const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const [tempFilters, setTempFilters] = useState({
    name: '',
    categorias: [] as string[],
    facultades: [] as string[],
    min: 0,
    max: 500,
    brandFilter: false,
  });

  const [appliedFilters, setAppliedFilters] = useState(tempFilters);
  const apiUrl = 'https://api.example.com/items';

  // Construir la URL de la API
  const constructApiUrl = (page: number, filters: typeof appliedFilters) => {
    const queryParams = new URLSearchParams();
    queryParams.append('page', page.toString());
    queryParams.append('limit', itemsPerPage.toString());

    if (filters.name) queryParams.append('name', filters.name);
    filters.categorias.forEach((cat) => queryParams.append('categorias', cat));
    filters.facultades.forEach((fac) => queryParams.append('facultades', fac));
    if (filters.min !== 0) queryParams.append('min', filters.min.toString());
    if (filters.max !== 500) queryParams.append('max', filters.max.toString());
    if (filters.brandFilter) queryParams.append('byBrand', 'true');

    return `${apiUrl}?${queryParams.toString()}`;
  };

  // Obtener datos desde la API con Axios
  const fetchData = async (page: number, filters: typeof appliedFilters) => {
    try {
      const url = constructApiUrl(page, filters);
      const response = await axios.get(url);

      setItems(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  // Cambiar de página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page, appliedFilters);
    updateUrlWithPage(page);
  };

  // Actualizar la URL con la página actual
  const updateUrlWithPage = (page: number) => {
    const searchParams = new URLSearchParams(location.search);

    searchParams.set('page', page.toString());
    searchParams.set('limit', itemsPerPage.toString());

    if (tempFilters.name) searchParams.set('name', tempFilters.name);
    searchParams.delete('categorias');
    tempFilters.categorias.forEach((cat) => searchParams.append('categorias', cat));
    searchParams.delete('facultades');
    tempFilters.facultades.forEach((fac) => searchParams.append('facultades', fac));
    if (tempFilters.min !== 0) searchParams.set('min', tempFilters.min.toString());
    if (tempFilters.max !== 500) searchParams.set('max', tempFilters.max.toString());
    searchParams.set('byBrand', tempFilters.brandFilter ? 'true' : '');

    navigate(`?${searchParams.toString()}`);
  };

  // Aplicar filtros
  const handleFilterApply = () => {
    setAppliedFilters(tempFilters);
    fetchData(1, tempFilters);
    setCurrentPage(1);
  };

  // Limpiar filtros
  const handleClearFilters = () => {
    setTempFilters({
      name: '',
      categorias: [],
      facultades: [],
      min: 0,
      max: 500,
      brandFilter: false,
    });
    setCurrentPage(1);
  };

  // Manejo del cambio de estado en los checkboxes de categorías y facultades
  const handleCheckboxChange = (category: string, type: 'categorias' | 'facultades') => {
    const updatedFilters = { ...tempFilters };
    const filterList = updatedFilters[type];
    updatedFilters[type] = filterList.includes(category) ? filterList.filter((item) => item !== category) : [...filterList, category];
    setTempFilters(updatedFilters);
  };

  // Leer los filtros desde la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name') || '';
    const newTempFilters = {
      ...tempFilters,
      name: nameParam,
      categorias: searchParams.getAll('categorias'),
      facultades: searchParams.getAll('facultades'),
      min: Number(searchParams.get('min') || '0'),
      max: Number(searchParams.get('max') || '500'),
      brandFilter: searchParams.get('byBrand') === 'true',
    };
    setTempFilters(newTempFilters);
    setAppliedFilters(newTempFilters);
    setCurrentPage(Number(searchParams.get('page') || '1'));

    fetchData(currentPage, newTempFilters);
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
          <div className='flex flex-row justify-between mb-4'>
            <div>
              { tempFilters.name && (<h3>{items.length} resultados para "{tempFilters.name}"</h3>) }
            </div>
            <div className='mr-8'>
              <PaginationComp
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisiblePages={5}
              />
            </div>
          </div>
          <div>

          </div>
          <div className='flex flex-row justify-between mt-4'>
            <div>
              
            </div>
            <div className='mr-8'>
                <PaginationComp
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                  maxVisiblePages={5}
                />
              </div>
            </div>
        </div>
      </div>
    </>
  );
};
