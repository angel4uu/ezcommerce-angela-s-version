import { useAuth } from '@/context/AuthProvider';
import { Helmet } from 'react-helmet-async';

export const MainPage = () => {
  const {authState}=useAuth();
  console.log("User id:",authState.userId);
  return (
    <>
      <Helmet>
        <title>Ezcommerce</title>
      </Helmet>
      
      <div className="h-[400px]">

      </div>
    </>
  )
}
