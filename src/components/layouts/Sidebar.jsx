import { Link, useLocation } from 'react-router-dom'
import {
    LayoutDashboard,
    Users,
    ShieldCheck,
    Truck,
    Tag,
    Box,
    ReceiptText,
    Settings,
    LogOut,
} from 'lucide-react'

const mainNav = [
    { to: '/home', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/usuarios', icon: Users, label: 'Usuarios' },
    { to: '/roles', icon: ShieldCheck, label: 'Roles' },
    { to: '/proveedores', icon: Truck, label: 'Proveedores' },
    { to: '/categorias', icon: Tag, label: 'Categorías' },
    { to: '/productos', icon: Box, label: 'Productos' },
    { to: '/ventas', icon: ReceiptText, label: 'Ventas' },
]

const systemNav = [
    { to: '/configuracion', icon: Settings, label: 'Configuración' },
]

export const Sidebar = ({ logout }) => {
    const location = useLocation()
    const isActive = (path) => location.pathname === path

    return (
        <>
            <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

  .sb { width: 280px; height: 100vh; background: #1e2028; border-right: 1px solid #2a2d36; display: flex; flex-direction: column; font-family: 'Inter', sans-serif; flex-shrink: 0; }

  .sb-logo       { display: flex; align-items: center; gap: 14px; padding: 2rem 1.6rem 1.4rem; }
  .sb-logo-icon  { width: 44px; height: 44px; border-radius: 12px; background: #2e3240; display: flex; align-items: center; justify-content: center; font-size: 20px; border: 1px solid #3a3f50; }
  .sb-brand      { font-size: 1.05rem; font-weight: 600; color: #e8eaf0; }
  .sb-sub        { font-size: 11px; color: #4a5068; letter-spacing: .12em; text-transform: uppercase; margin-top: 3px; }

  .sb-sep        { height: 1px; background: #272b36; margin: 0.3rem 1.4rem 1rem; }

  .sb-lbl        { font-size: 11px; font-weight: 500; letter-spacing: .12em; text-transform: uppercase; color: #3e4557; padding: 0 1.5rem 0.5rem; }

  .sb-nav        { display: flex; flex-direction: column; gap: 4px; padding: 0 0.9rem; }

  .sb-a          { display: flex; align-items: center; gap: 12px; padding: 11px 14px; border-radius: 10px; font-size: 14px; font-weight: 400; color: #6b7280; text-decoration: none; transition: all .15s ease; }
  .sb-a:hover    { background: #252832; color: #c4c8d4; }
  .sb-a.on       { background: #2a2f3e; color: #e8eaf0; font-weight: 500; }

  .sb-a .ico     { flex-shrink: 0; color: #3e4557; transition: color .15s; }
  .sb-a:hover .ico { color: #6b7280; }
  .sb-a.on .ico  { color: #818cf8; }

  .sb-foot       { margin-top: auto; border-top: 1px solid #272b36; padding: 1.4rem; }

  .sb-user       { display: flex; align-items: center; gap: 12px; margin-bottom: 1rem; }
  .sb-avatar     { width: 42px; height: 42px; border-radius: 50%; overflow: hidden; border: 1.5px solid #2e3240; }
  .sb-avatar img { width: 100%; height: 100%; object-fit: cover; }

  .sb-uname      { font-size: 14px; font-weight: 500; color: #c4c8d4; }
  .sb-uemail     { font-size: 11px; color: #3e4557; margin-top: 2px; }

  .sb-out        { display: flex; align-items: center; justify-content: center; gap: 8px; width: 100%; padding: 10px; border-radius: 10px; background: transparent; border: 1px solid #2a2d36; cursor: pointer; font-size: 13px; font-weight: 500; color: #4a5068; transition: all .15s; }

  .sb-out:hover  { background: #2a1f22; border-color: #4a2530; color: #f87171; }
  .sb-out:hover .out-ico { color: #f87171; }

  .out-ico       { color: #3e4557; transition: color .15s; }
`}</style>

            <aside className="sb hidden lg:flex">
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
                    {mainNav.map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`sb-a ${isActive(to) ? 'on' : ''}`}
                        >
                            <Icon size={15} className="ico" />
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="sb-sep" style={{ marginTop: '0.8rem' }} />

                <p className="sb-lbl">Sistema</p>
                <nav className="sb-nav">
                    {systemNav.map(({ to, icon: Icon, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`sb-a ${isActive(to) ? 'on' : ''}`}
                        >
                            <Icon size={18} className="ico" />
                            {label}
                        </Link>
                    ))}
                </nav>

                <div className="sb-foot">
                    <div className="sb-user">
                        <div className="sb-avatar">
                            <img
                                src="https://api.dicebear.com/8.x/notionists/svg?seed=admin"
                                alt="avatar"
                            />
                        </div>
                        <div>
                            <p className="sb-uname">Administrador</p>
                            <p className="sb-uemail">admin@asadero.com</p>
                        </div>
                    </div>
                    <button className="sb-out" onClick={logout}>
                        <LogOut size={16} className="out-ico" />
                        Cerrar sesión
                    </button>
                </div>
            </aside>
        </>
    )
}
