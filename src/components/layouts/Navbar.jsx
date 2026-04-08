import { Bell, Search, ChevronDown, User, LogOut, Settings } from "lucide-react";

export const Navbar = ({ logout }) => (
  // Clase 'sticky' y 'backdrop-blur' para efecto moderno
  <div className="navbar sticky top-0 z-10 bg-base-100/80 backdrop-blur-sm border-b border-base-200 px-4 lg:px-6">
    {/* Botón de menú para móvil */}
    <div className="flex-none lg:hidden">
      <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
      </label>
    </div>

    {/* Título solo visible en móvil (ya que está en el Sidebar en escritorio) */}
    <div className="flex-1 lg:hidden ml-2">
      <h1 className="text-lg font-bold">Asadero La 75 🍗</h1>
    </div>

    {/* Barra de búsqueda opcional para escritorio */}
    <div className="flex-1 hidden lg:flex">
      <div className="relative w-80">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" size={20} />
        <input 
          type="text" 
          placeholder="Buscar usuarios, ventas..." 
          className="input input-bordered w-full pl-12 rounded-full bg-base-200/50 border-base-300 focus:border-primary"
        />
      </div>
    </div>

    {/* Acciones de la derecha (Notificaciones y Usuario) */}
    <div className="flex-none gap-3">
      {/* Botón de Notificaciones */}
      <button className="btn btn-ghost btn-circle text-base-content/70 hover:text-primary">
        <div className="indicator">
          <Bell size={22} />
          <span className="badge badge-sm badge-primary indicator-item">3</span>
        </div>
      </button>

      {/* Menú desplegable de Usuario */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost flex items-center gap-2 px-2 hover:bg-base-200 rounded-full">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-base-200 ring-offset-base-100">
              <img src="https://api.dicebear.com/8.x/notionists/svg?seed=admin" alt="avatar" />
            </div>
          </div>
          <span className="font-medium text-sm hidden md:inline">Admin</span>
          <ChevronDown size={18} className="text-base-content/50" />
        </label>
        
        {/* Contenido del dropdown */}
        <ul tabIndex={0} className="dropdown-content z-20 menu p-2 shadow-2xl bg-base-100 rounded-xl w-56 mt-3 border border-base-200">
          <li className="menu-title px-4 py-3 text-xs font-bold text-base-content/50">CUENTA</li>
          <li><a className="gap-3 py-3"><User size={18}/> Mi Perfil</a></li>
          <li><a className="gap-3 py-3"><Settings size={18}/> Ajustes</a></li>
          <div className="divider my-1"></div>
          <li>
            <a className="gap-3 py-3 text-error hover:bg-error/10" onClick={logout}>
              <LogOut size={18}/> Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
);