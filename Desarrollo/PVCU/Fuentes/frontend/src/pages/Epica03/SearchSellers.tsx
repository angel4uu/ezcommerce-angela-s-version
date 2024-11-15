import { Helmet } from 'react-helmet-async';
import { Checkbox } from '../../components/ui/checkbox';
import * as Switch from '@radix-ui/react-switch';
import { useLocation, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { PaginationComp } from '../../components/Epica03/paginationComponent';
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import axios from 'axios'


const facultades = ['FIEE', 'FISI', 'FCE', 'FCB', 'FCF', 'FCM'];

export const SearchSellers = () => {
  const location = useLocation();
  const navigate = useNavigate();

    const [sellerName, setSellerName] = useState('')
  const handleSearch = () => {
    if (sellerName) {
      navigate(`/sellers?name=${encodeURIComponent(sellerName)}`);
    } else {
      navigate("/search"); 
    }
  };

  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [tempFilters, setTempFilters] = useState({
    name: '',
    facultades: [] as string[],
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
    filters.facultades.forEach((fac) => queryParams.append('facultades', fac));
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
    searchParams.delete('facultades');
    tempFilters.facultades.forEach((fac) => searchParams.append('facultades', fac));
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
      facultades: [],
      brandFilter: false,
    });
    setCurrentPage(1);
  };

  // Manejo del cambio de estado en los checkboxes de categorías y facultades
  const handleCheckboxChange = (category: string, type: 'facultades') => {
    const updatedFilters = { ...tempFilters };
    const filterList = updatedFilters[type];
    updatedFilters[type] = filterList.includes(category) ? filterList.filter((item) => item !== category) : [...filterList, category];
    setTempFilters(updatedFilters);
  };

  const handleLimitChange = (newLimit: number) => {
    setItemsPerPage(newLimit);
    setCurrentPage(1); // Reiniciar a la primera página
    updateUrlWithPage(1); // Actualizar URL con el nuevo límite
    fetchData(1, appliedFilters); // Recargar datos con el nuevo límite
  };

  // Leer los filtros desde la URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const nameParam = searchParams.get('name') || '';
    const newTempFilters = {
      ...tempFilters,
      name: nameParam,
      facultades: searchParams.getAll('facultades'),
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
        <title>Vendedores - EzCommerce</title>
      </Helmet>
      <section className="w-full mx-auto mt-8">
      <div className="bg-gradient-to-b from-[#00366926] to-white rounded-lg px-6 pt-8 pb-2 space-y-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-secondaryLight">
            Vendedores estudiantiles
          </h2>
          <p className="text-slate-600">
            Descubre los productos que ofrecen estos estudiantes.
          </p>
          <p className="text-slate-600">
            Apoya a los universitarios emprendedores mientras impulsas sus sueños y
            proyectos.
          </p>
        </div>
      </div>
    </section>
    <div className='w-full mx-auto px-6  mt-10 mb-8'>
        <div className="relative max-w-4xl  mx-auto ">
            <Input
            className="pr-9 bg-slate-50"
            placeholder="Buscar..."
            type="search"
            value={sellerName}
            onChange={(e) => setSellerName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()} 
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        </div>
    </div>
      <div className="w-full gap-4 flex flex-row min-h-96 mt-4 mb-10 ">
        <div className="w-[300px] border rounded border-slate-300 p-8">
          <h3 className="font-bold text-xl text-secondaryLight mb-4">Filtros</h3>

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
        <div className="flex flex-col grow border rounded border-slate-300 p-4">
          <div className='grow'>

          </div>
          <div className='flex flex-row justify-between mt-4 '>
            <div className='flex'>
              <div className='mr-3 pt-1'>
                <h3 className="text-lg font-semibold mb-2">Items por página:</h3>
              </div>
              <div className="flex items-center gap-4 mr-8">
                <div className="relative">
                  <select
                    onChange={(e) => handleLimitChange(Number(e.target.value))}
                    defaultValue="10"
                    className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring focus:border-blue-300"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="25">25</option>
                    <option value="30">30</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                      <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className='mr-8 pt-1'>
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
