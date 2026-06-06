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