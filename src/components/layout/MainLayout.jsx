import { useNavigate, Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Navbar } from "./components/Navbar/Navbar";
import { Sidebar } from "./components/Sidebar/Sidebar";
import "./MainLayout.css";

function MainLayout() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "10px",
            background: "#232633",
            color: "#e5e7eb",
            fontSize: "13.5px",
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
        </div>
      </div>
    </>
  );
}

export default MainLayout;