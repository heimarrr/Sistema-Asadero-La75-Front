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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .ml-root {
          display: flex;
          height: 100vh;
          background: #181a20;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        .ml-right {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 0;
          overflow: hidden;
        }

        .ml-main {
          flex: 1;
          overflow-y: auto;
          padding: 2rem 2.5rem;
          background: #181a20;
        }

        .ml-card {
          max-width: 1400px;
          margin: 0 auto;
          background: #232633;
          border-radius: 14px;
          border: 1px solid #2f3441;
          padding: 2rem 2.25rem;
          box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        }

        .ml-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 2.5rem;
          background: #1e2028;
          border-top: 1px solid #2a2d36;
          flex-shrink: 0;
        }

        .ml-footer-brand {
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #e5e7eb;
        }

        .ml-footer-copy {
          font-size: 0.75rem;
          color: #6b7280;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .ml-footer-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #4b5563;
          display: inline-block;
        }

        /* Scroll */
        .ml-main::-webkit-scrollbar { width: 6px; }
        .ml-main::-webkit-scrollbar-track { background: transparent; }
        .ml-main::-webkit-scrollbar-thumb {
          background: #2f3441;
          border-radius: 10px;
        }
        .ml-main::-webkit-scrollbar-thumb:hover {
          background: #3b4252;
        }
      `}</style>

      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#232633",
            color: "#e5e7eb",
            fontSize: "13.5px",
            fontFamily: "'Inter', sans-serif",
            border: "1px solid #2f3441",
            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          },
          success: { iconTheme: { primary: "#4ade80", secondary: "#232633" } },
          error:   { iconTheme: { primary: "#f87171", secondary: "#232633" } },
        }}
      />

      <div className="ml-root">
        <Sidebar logout={logout} />

        <div className="ml-right">
          <Navbar logout={logout} />

          <main className="ml-main">
            <div className="ml-card">
              <Outlet />
            </div>
          </main>

          <footer className="ml-footer">
            <span className="ml-footer-brand">Asadero La 75</span>
            <span className="ml-footer-copy">
              Panel de Administración
              <span className="ml-footer-dot" />
              {new Date().getFullYear()}
            </span>
          </footer>
        </div>
      </div>
    </>
  );
}

export default MainLayout;