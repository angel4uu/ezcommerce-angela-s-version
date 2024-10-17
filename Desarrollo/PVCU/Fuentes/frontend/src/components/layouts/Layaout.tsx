import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layaout = () => {
  return (
    <div>
        <Navbar/>
            <main className="px-4 sm:px-6 md:px-16 lg:px-32">
               <Outlet/> 
            </main>
        <Footer/>
    </div>
  )
}
