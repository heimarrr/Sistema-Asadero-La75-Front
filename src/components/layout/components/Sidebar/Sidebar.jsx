import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, Users, ShieldCheck, Truck,
  Tag, Box, ReceiptText, ShoppingCart, Settings, LogOut,
} from 'lucide-react';
import './Sidebar.css';

const mainNav = [
  { to: '/home',        icon: LayoutDashboard, label: 'Dashboard'    },
  { to: '/usuarios',    icon: Users,            label: 'Usuarios'     },
  { to: '/roles',       icon: ShieldCheck,      label: 'Roles'        },
  { to: '/proveedores', icon: Truck,            label: 'Proveedores'  },
  { to: '/categorias',  icon: Tag,              label: 'Categorías'   },
  { to: '/productos',   icon: Box,              label: 'Productos'    },
  { to: '/ventas',      icon: ReceiptText,      label: 'Ventas'       },
  { to: '/compras',     icon: ShoppingCart,     label: 'Compras'      }, // ✅ ícono distinto
];

const systemNav = [
  { to: '/configuracion', icon: Settings, label: 'Configuración' },
];

export const Sidebar = ({ logout }) => {
  const { pathname } = useLocation();

  return (
    <aside className="sb">
      <div className="sb-logo">
        <div className="sb-logo-icon" aria-hidden="true">🔥</div>
        <div>
          <p className="sb-brand">Asadero La 75</p>
          <p className="sb-sub">Panel Admin</p>
        </div>
      </div>

      <div className="sb-sep" />

      <p className="sb-lbl">Menú</p>

      <nav className="sb-nav" aria-label="Navegación principal">
        {mainNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`sb-a ${pathname === to ? 'on' : ''}`}
            aria-current={pathname === to ? 'page' : undefined}
          >
            <Icon size={17} className="sb-ico" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="sb-sep" style={{ marginTop: '0.75rem' }} />

      <p className="sb-lbl">Sistema</p>

      <nav className="sb-nav" aria-label="Sistema">
        {systemNav.map(({ to, icon: Icon, label }) => (
          <Link
            key={to}
            to={to}
            className={`sb-a ${pathname === to ? 'on' : ''}`}
            aria-current={pathname === to ? 'page' : undefined}
          >
            <Icon size={17} className="sb-ico" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-avatar">
            <img
              src="https://api.dicebear.com/8.x/notionists/svg?seed=admin"
              alt="Avatar de Administrador"
            />
          </div>
          <div style={{ minWidth: 0 }}>
            <p className="sb-uname">Administrador</p>
            <p className="sb-uemail">admin@asadero.com</p>
          </div>
        </div>

        <button className="sb-out" onClick={logout}>
          <LogOut size={17} className="sb-out-ico" aria-hidden="true" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};