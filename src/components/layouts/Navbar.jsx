import { useState } from "react";
import { Bell, Search, ChevronDown, User, LogOut, Settings } from "lucide-react";

export const Navbar = ({ logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

        .nb {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          height: 60px;
          background: #1e2028;
          border-bottom: 1px solid #2a2d36;
          flex-shrink: 0;
          font-family: 'Inter', sans-serif;
          position: relative;
          z-index: 30;
        }

        /* SEARCH */
        .nb-search       { position: relative; width: 300px; }
        .nb-search-ico   { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #4b5563; pointer-events: none; }

        .nb-search-input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border: 1px solid #2f3441;
          border-radius: 10px;
          font-size: 13.5px;
          background: #181a20;
          color: #e5e7eb;
          outline: none;
          transition: all .15s ease;
        }

        .nb-search-input::placeholder { color: #6b7280; }

        .nb-search-input:focus {
          border-color: #818cf8;
          background: #1e2028;
        }

        /* RIGHT */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nb-icon-btn {
          position: relative;
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid #2f3441;
          background: #181a20;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #6b7280;
          transition: all .15s ease;
        }

        .nb-icon-btn:hover {
          background: #232633;
          color: #e5e7eb;
          border-color: #3b4252;
        }

        .nb-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #6366f1;
          color: #fff;
          font-size: 9px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #1e2028;
        }

        .nb-divider {
          width: 1px;
          height: 24px;
          background: #2a2d36;
          margin: 0 6px;
        }

        /* USER */
        .nb-user-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 10px 4px 4px;
          border-radius: 10px;
          border: 1px solid transparent;
          background: transparent;
          cursor: pointer;
          transition: all .15s ease;
        }

        .nb-user-btn:hover {
          background: #232633;
          border-color: #2f3441;
        }

        .nb-user-avatar {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          overflow: hidden;
          border: 1.5px solid #2f3441;
        }

        .nb-user-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .nb-user-name {
          font-size: 13.5px;
          font-weight: 500;
          color: #e5e7eb;
        }

        .nb-chevron {
          color: #6b7280;
          transition: transform .2s;
        }

        .nb-chevron.open {
          transform: rotate(180deg);
        }

        /* DROPDOWN */
        .nb-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 2rem;
          width: 220px;
          background: #232633;
          border: 1px solid #2f3441;
          border-radius: 12px;
          box-shadow: 0 12px 30px rgba(0,0,0,0.35);
          overflow: hidden;
          z-index: 50;
          animation: nb-fade .15s ease;
        }

        @keyframes nb-fade {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nb-dd-header {
          padding: 12px 14px 8px;
        }

        .nb-dd-name {
          font-size: 13.5px;
          font-weight: 500;
          color: #e5e7eb;
        }

        .nb-dd-email {
          font-size: 11.5px;
          color: #6b7280;
          margin-top: 2px;
        }

        .nb-dd-sep {
          height: 1px;
          background: #2a2d36;
          margin: 6px 0;
        }

        .nb-dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 9px 14px;
          font-size: 13.5px;
          color: #cbd5f5;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          transition: all .12s ease;
          text-align: left;
        }

        .nb-dd-item:hover {
          background: #2f3441;
          color: #fff;
        }

        .nb-dd-item.danger {
          color: #f87171;
        }

        .nb-dd-item.danger:hover {
          background: #3a1f24;
          color: #ef4444;
        }

        .nb-dd-ico {
          color: #6b7280;
        }

        .nb-dd-item:hover .nb-dd-ico {
          color: #9ca3af;
        }

        .nb-dd-item.danger .nb-dd-ico {
          color: #f87171;
        }
      `}</style>

      <header className="nb">

        <div className="nb-search">
          <Search size={15} className="nb-search-ico" />
          <input
            type="text"
            placeholder="Buscar..."
            className="nb-search-input"
          />
        </div>

        <div className="nb-right">

          <button className="nb-icon-btn" aria-label="Notificaciones">
            <Bell size={18} />
            <span className="nb-badge">3</span>
          </button>

          <div className="nb-divider" />

          <button
            className="nb-user-btn"
            onClick={() => setDropdownOpen((o) => !o)}
          >
            <div className="nb-user-avatar">
              <img
                src="https://api.dicebear.com/8.x/notionists/svg?seed=admin"
                alt="avatar"
              />
            </div>
            <span className="nb-user-name">Admin</span>
            <ChevronDown size={14} className={`nb-chevron ${dropdownOpen ? "open" : ""}`} />
          </button>
        </div>

        {dropdownOpen && (
          <>
            <div
              style={{ position: "fixed", inset: 0, zIndex: 40 }}
              onClick={() => setDropdownOpen(false)}
            />
            <div className="nb-dropdown">
              <div className="nb-dd-header">
                <p className="nb-dd-name">Administrador</p>
                <p className="nb-dd-email">admin@asadero.com</p>
              </div>

              <div className="nb-dd-sep" />

              <button className="nb-dd-item">
                <User size={15} className="nb-dd-ico" />
                Mi perfil
              </button>

              <button className="nb-dd-item">
                <Settings size={15} className="nb-dd-ico" />
                Ajustes
              </button>

              <div className="nb-dd-sep" />

              <button className="nb-dd-item danger" onClick={logout}>
                <LogOut size={15} className="nb-dd-ico" />
                Cerrar sesión
              </button>
            </div>
          </>
        )}

      </header>
    </>
  );
};