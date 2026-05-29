import { useState } from "react";
import { Bell, Search, ChevronDown, User, LogOut, Settings } from "lucide-react";
import "./Navbar.css";

export const Navbar = ({ logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
              src="https://api.dicebear.com/8.x/notionists/svg?seed=admin"
              alt="Avatar de Admin"
            />
          </div>
          <span className="nb-user-name">Admin</span>
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
              <p className="nb-dd-name">Administrador</p>
              <p className="nb-dd-email">admin@asadero.com</p>
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