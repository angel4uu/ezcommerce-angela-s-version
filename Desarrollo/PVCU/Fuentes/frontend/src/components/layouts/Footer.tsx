import { Facebook, Instagram, MessageCircle,  } from "lucide-react"
import { Link } from "react-router-dom"
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 col-span-1 md:col-span-2 lg:col-span-1">
            <div className="flex items-center space-x-2">
              <img
                src="/src/assets/Ezcommerce-Footer.png"
                alt="EzCommerce Logo"
                width={180}
                height={88}
                className="rounded"
              />
            </div>
            <p className="text-sm">
              Una tienda virtual creada para conectar y apoyar a universitarios,
              donde cada compra y venta fortalece nuestra comunidad.
            </p>
            <div className="flex space-x-4">
              <Link to="#" className="hover:text-white">
                <Facebook size={24} />
              </Link>
              <Link to="#" className="hover:text-white">
                <Instagram size={24} />
              </Link>
              <Link to="#" className="hover:text-white">
                <MessageCircle size={24} />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Compañía</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Términos y condiciones
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Política de privacidad
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Soporte
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Mi Cuenta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  Vender producto
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Categoría de producto
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Promociones
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Comunidad</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="#" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Sugerencias y feedback
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Únete a nosotros
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm">
            Copyright @ 2024 EzCommerce. Todos los derechos reservados
          </p>
        </div>
      </div>
    </footer>
  );
}
