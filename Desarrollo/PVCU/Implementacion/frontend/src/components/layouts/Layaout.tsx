import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";

export const Layaout = () => {
  return (
    <>
        <Navbar/>
            <main>
               <Outlet/> 
            </main>
        <Footer/>
    </>
  )
}
