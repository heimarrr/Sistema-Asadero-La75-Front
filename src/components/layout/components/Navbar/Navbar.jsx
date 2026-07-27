import { useState } from "react";
import { Bell, Search, ChevronDown, User, LogOut, Settings } from "lucide-react";
import "./Navbar.css";

// Mismo criterio que en el Sidebar: el rol se guarda como número en localStorage
const ROLES = {
  1: "Administrador",
  2: "Cajero",
  3: "Compras",
};

export const Navbar = ({ logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Igual que en el Sidebar: obtenemos el usuario de forma segura
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      return null;
    }
  };

  const user = getUserData();
  const role = user?.rol ? Number(user.rol) : null;
  const roleName = ROLES[role] || "Sin rol";

  const nombre = user?.nombre || "Usuario Anónimo";
  const correo = user?.correo || "sin-correo@correo.com";

  return (
    <header className="nb">
      <div className="nb-search">
        <Search size={17} className="nb-search-ico" aria-hidden="true" />
        <input
          type="search"
          placeholder="Buscar..."
          className="nb-search-input"
          aria-label="Buscar"
        />
      </div>

      <div className="nb-right">
        <button className="nb-icon-btn" aria-label="Notificaciones">
          <Bell size={19} />
          <span className="nb-badge" aria-label="3 notificaciones">3</span>
        </button>

        <div className="nb-divider" aria-hidden="true" />

        <button
          className="nb-user-btn"
          onClick={() => setDropdownOpen((o) => !o)}
          aria-expanded={dropdownOpen}
          aria-haspopup="menu"
        >
          <div className="nb-user-avatar">
            <img
              src={`https://api.dicebear.com/8.x/notionists/svg?seed=${nombre}`}
              alt={`Avatar de ${nombre}`}
            />
          </div>
          <div className="nb-user-info">
            <span className="nb-user-name">{nombre}</span>
            <span className="nb-user-role">{roleName}</span>
          </div>
          <ChevronDown
            size={16}
            className={`nb-chevron ${dropdownOpen ? "open" : ""}`}
            aria-hidden="true"
          />
        </button>
      </div>

      {dropdownOpen && (
        <>
          <div
            style={{ position: "fixed", inset: 0, zIndex: 40 }}
            onClick={() => setDropdownOpen(false)}
            aria-hidden="true"
          />

          <div className="nb-dropdown" role="menu">
            <div className="nb-dd-header">
              <p className="nb-dd-name">{nombre}</p>
              <p className="nb-dd-email">{correo}</p>
              <span className="nb-dd-role-badge">{roleName}</span>
            </div>

            <div className="nb-dd-sep" />

            <button className="nb-dd-item" role="menuitem">
              <User size={17} className="nb-dd-ico" aria-hidden="true" />
              Mi perfil
            </button>

            <button className="nb-dd-item" role="menuitem">
              <Settings size={17} className="nb-dd-ico" aria-hidden="true" />
              Ajustes
            </button>

            <div className="nb-dd-sep" />

            <button className="nb-dd-item danger" onClick={logout} role="menuitem">
              <LogOut size={17} className="nb-dd-ico" aria-hidden="true" />
              Cerrar sesión
            </button>
          </div>
        </>
      )}
    </header>
  );
};