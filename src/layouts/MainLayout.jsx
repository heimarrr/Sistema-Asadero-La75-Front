import { Link, useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function MainLayout({ children }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="drawer lg:drawer-open">
      <Toaster />

      {/* Toggle sidebar mobile */}
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">

        {/* Navbar */}
        <div className="navbar bg-base-100 shadow px-4">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className="btn btn-square btn-ghost">
              ☰
            </label>
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold">Asadero La 75 🍗</h1>
          </div>

          <button className="btn btn-error btn-sm" onClick={logout}>
            Cerrar sesión
          </button>
        </div>

        {/* Contenido */}
        <main className="p-6 bg-base-200 min-h-screen">
          {children}
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>

        <aside className="menu p-4 w-64 min-h-full bg-base-100">

          <h2 className="text-2xl font-bold mb-6">
            Panel ⚡
          </h2>

          <ul className="space-y-2">

            <li>
              <Link to="/home">📊 Dashboard</Link>
            </li>

            <li>
              <Link to="/usuarios">👤 Usuarios</Link>
            </li>

            <li>
              <Link to="#">💰 Ventas</Link>
            </li>

            <li>
              <Link to="#">📦 Productos</Link>
            </li>

          </ul>

        </aside>
      </div>
    </div>
  );
}

export default MainLayout;