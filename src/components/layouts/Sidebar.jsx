import { Link, useLocation } from "react-router-dom";
// Usaremos iconos simples de SVG para un look profesional sin librerías extra
import { LayoutDashboard, Users, CircleDollarSign, Package, Settings, LogOut } from "lucide-react"; 

export const Sidebar = ({ logout }) => {
  const location = useLocation();

  // Función para determinar si una ruta está activa
  const isActive = (path) => location.pathname === path;

  // Estilos base y activos para los enlaces
  const navItemClasses = (path) => `
    flex items-center gap-3.5 px-4 py-3 rounded-lg font-medium transition-all duration-200
    ${isActive(path) 
      ? "bg-primary text-primary-content shadow-md" 
      : "hover:bg-base-200 text-base-content/80 hover:text-base-content"}
  `;

  return (
    <div className="drawer-side z-20">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      
      <aside className="menu p-5 w-72 min-h-full bg-base-100 border-r border-base-200 flex flex-col justify-between">
        <div>
          {/* Logo / Título con mejor espaciado */}
          <div className="flex items-center gap-2 px-3 py-1 mb-10">
            <span className="text-3xl">🍗</span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Asadero</h2>
              <p className="text-xs text-base-content/60 -mt-1">Panel de Control</p>
            </div>
          </div>

          {/* Navegación Principal */}
          <nav className="space-y-2">
            <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider">Menú Principal</p>
            
            <Link to="/home" className={navItemClasses("/home")}>
              <LayoutDashboard size={22} className={isActive("/home") ? "opacity-100" : "opacity-70"} />
              Dashboard
            </Link>

            <Link to="/usuarios" className={navItemClasses("/usuarios")}>
              <Users size={22} className={isActive("/usuarios") ? "opacity-100" : "opacity-70"} />
              Usuarios
            </Link>

            <Link to="/roles" className={navItemClasses("/roles")}>
              <CircleDollarSign size={22} className={isActive("/roles") ? "opacity-100" : "opacity-70"} />
              Roles
            </Link>

            <Link to="/proveedores" className={navItemClasses("/proveedores")}>
              <Package size={22} className={isActive("/proveedores") ? "opacity-100" : "opacity-70"} />
              Proveedores
            </Link>

            <Link to="/categorias" className={navItemClasses("/categorias")}>
              <CircleDollarSign size={22} className={isActive("/categorias") ? "opacity-100" : "opacity-70"} />
              Categorías
            </Link>

            <Link to="/productos" className={navItemClasses("/productos")}>
              <CircleDollarSign size={22} className={isActive("/productos") ? "opacity-100" : "opacity-70"} />
              Productos
            </Link>

            <Link to="/ventas" className={navItemClasses("/ventas")}>
              <CircleDollarSign size={22} className={isActive("/ventas") ? "opacity-100" : "opacity-70"} />
              Ventas
            </Link>

          </nav>

          {/* Separador y sección de Configuración */}
          <div className="divider my-8"></div>
          
          <nav className="space-y-2">
            <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider">Sistema</p>
            <Link to="#" className={navItemClasses("/configuracion")}>
              <Settings size={22} className={isActive("/configuracion") ? "opacity-100" : "opacity-70"} />
              Configuración
            </Link>
          </nav>
        </div>

        {/* Sección de usuario / Botón de cerrar sesión al final */}
        <div className="mt-auto border-t border-base-200 pt-6">
          <div className="flex items-center gap-3 px-3 mb-4">
            <div className="avatar placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <span>AD</span>
              </div>
            </div>
            <div>
              <p className="font-semibold">Administrador</p>
              <p className="text-sm text-base-content/60">admin@asadero.com</p>
            </div>
          </div>
          <button 
            className="btn btn-outline btn-error w-full gap-3 justify-center rounded-lg"
            onClick={logout}
          >
            <LogOut size={20} />
            Cerrar Sesión
          </button>
        </div>
      </aside>
    </div>
  );
};