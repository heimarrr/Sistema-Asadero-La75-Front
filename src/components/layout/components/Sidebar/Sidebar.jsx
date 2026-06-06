import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  Truck,
  Tag,
  Box,
  ReceiptText,
  ShoppingCart,
  Settings,
  LogOut,
} from 'lucide-react'
import './Sidebar.css'

const mainNav = [
  { to: '/home', icon: LayoutDashboard, label: 'Dashboard', roles: [1, 2, 3] },
  { to: '/usuarios', icon: Users, label: 'Usuarios', roles: [1] },
  { to: '/roles', icon: ShieldCheck, label: 'Roles', roles: [1] },
  { to: '/proveedores', icon: Truck, label: 'Proveedores', roles: [1, 2] },
  { to: '/categorias', icon: Tag, label: 'Categorías', roles: [1, 2] },
  { to: '/productos', icon: Box, label: 'Productos', roles: [1, 2] },
  { to: '/ventas', icon: ReceiptText, label: 'Ventas', roles: [1, 3] },
  { to: '/compras', icon: ShoppingCart, label: 'Compras', roles: [1, 2] },
]

const systemNav = [
  { to: '/configuracion', icon: Settings, label: 'Configuración' },
]

export const Sidebar = ({ logout }) => {
  const { pathname } = useLocation()

  // 1. Obtenemos el usuario de forma segura con un bloque try/catch por si el localStorage está vacío
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem('user')) || null
    } catch (error) {
      return null
    }
  }

  const user = getUserData()
  
  // 2. Forzamos a que el rol sea un Número
  const role = user?.rol ? Number(user.rol) : null

  // 3. Filtrado de rutas por rol
  const filteredMainNav = mainNav.filter(item =>
    item.roles.includes(role)
  )

  return (
    <aside className="sb">
      <div className="sb-logo">
        <div className="sb-logo-icon">🔥</div>
        <div>
          <p className="sb-brand">Asadero La 75</p>
          <p className="sb-sub">Panel Admin</p>
        </div>
      </div>

      <div className="sb-sep" />
      <p className="sb-lbl">Menú</p>

      <nav className="sb-nav">
        {filteredMainNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`sb-a ${pathname === to ? 'on' : ''}`}
          >
            <Icon size={17} className="sb-ico" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="sb-sep" />
      <p className="sb-lbl">Sistema</p>

      <nav className="sb-nav">
        {systemNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`sb-a ${pathname === to ? 'on' : ''}`}
          >
            <Icon size={17} className="sb-ico" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-avatar">
            {/* El seed cambia según el nombre del usuario para generar un avatar único */}
            <img
              src={`https://api.dicebear.com/8.x/notionists/svg?seed=${user?.nombre || 'invitado'}`}
              alt="Avatar"
            />
          </div>
          <div>
            {/* Si no encuentra las propiedades, muestra textos de respaldo para que no rompa la app */}
            <p className="sb-uname">{user?.nombre || 'Usuario Anónimo'}</p>
            <p className="sb-uemail">{user?.correo || 'sin-correo@correo.com'}</p>
          </div>
        </div>

        <button className="sb-out" onClick={logout}>
          <LogOut size={17} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  )
}