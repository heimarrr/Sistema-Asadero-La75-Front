import { useNavigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./Navbar";
import { Sidebar } from "./Sidebar";

function MainLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="drawer lg:drawer-open">
      {/* Configuramos el Toaster para que se vea más elegante */}
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: '12px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-base-200/50"> {/* Fondo más suave */}
        <Navbar logout={logout} />
        
        {/* Ajustamos el padding y el ancho máximo para mejor lectura */}
        <main className="p-6 md:p-10 flex-grow">
          <div className="max-w-[1600px] mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer simple (opcional) */}
        <footer className="footer footer-center p-6 bg-base-100 text-base-content/60 border-t border-base-200">
          <div>
            <p className="text-sm">© 2024 Asadero La 75 - Gestión Interna.</p>
          </div>
        </footer>
      </div>

      <Sidebar logout={logout}/>
    </div>
  );
}

export default MainLayout;