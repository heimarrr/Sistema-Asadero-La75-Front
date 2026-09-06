import { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, Download } from "lucide-react";
import "./Navbar.css";

// Mismo criterio que en el Sidebar: el rol se guarda como número en localStorage
const ROLES = {
  1: "Administrador",
  2: "Cajero",
  3: "Compras",
};

export const Navbar = ({ logout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  // Igual que en el Sidebar: obtenemos el usuario de forma segura
  const getUserData = () => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  };

  const user = getUserData();
  const role = user?.rol ? Number(user.rol) : null;
  const roleName = ROLES[role] || "Sin rol";

  const nombre = user?.nombre || "Usuario Anónimo";
  const correo = user?.correo || "sin-correo@correo.com";

  // =========================================================
  // ENLACE DEL APK
  // =========================================================
  // Cuando tengas el APK dentro del frontend, déjalo así:
  // /apk/Asadero-La-75.apk
  //
  // Si posteriormente decides usar Google Drive, solamente
  // reemplaza este valor por el enlace correspondiente.
  const APK_URL = "/apk/Asadero-La-75.apk";

  // Cierra el menú al hacer clic fuera o al presionar Escape
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const closeDropdown = () => setDropdownOpen(false);

  return (
    <header className="nb">
      <div className="nb-right">
        <div className="nb-user-menu">
          <button
            ref={triggerRef}
            type="button"
            id="nb-user-trigger"
            className="nb-user-btn"
            onClick={() => setDropdownOpen((o) => !o)}
            aria-expanded={dropdownOpen}
            aria-haspopup="menu"
            aria-controls="nb-user-dropdown"
          >
            <div className="nb-user-avatar">
              <img
                src={`https://api.dicebear.com/8.x/notionists/svg?seed=${encodeURIComponent(
                  nombre
                )}`}
                alt=""
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

          {dropdownOpen && (
            <div
              ref={menuRef}
              id="nb-user-dropdown"
              className="nb-dropdown"
              role="menu"
              aria-labelledby="nb-user-trigger"
            >
              <div className="nb-dd-header">
                <p className="nb-dd-name">{nombre}</p>
                <p className="nb-dd-email">{correo}</p>
                <span className="nb-dd-role-badge">{roleName}</span>
              </div>

              <div className="nb-dd-sep" />

              {/* =====================================================
                  DESCARGAR APK
              ====================================================== */}
              <a
                href={APK_URL}
                download="Asadero-La-75.apk"
                className="nb-dd-item"
                role="menuitem"
                onClick={closeDropdown}
              >
                <Download
                  size={17}
                  className="nb-dd-ico"
                  aria-hidden="true"
                />
                Descargar aplicación móvil
              </a>

              <div className="nb-dd-sep" />

              {/* =====================================================
                  CERRAR SESIÓN
              ====================================================== */}
              <button
                type="button"
                className="nb-dd-item danger"
                role="menuitem"
                onClick={() => {
                  closeDropdown();
                  logout?.();
                }}
              >
                <LogOut size={17} className="nb-dd-ico" aria-hidden="true" />
                Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

