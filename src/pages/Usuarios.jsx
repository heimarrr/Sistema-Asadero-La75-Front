import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import {
  Plus, Pencil, Trash2, ToggleLeft,
  ToggleRight, X, Users
} from "lucide-react";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    nombre: "", usuario: "", correo: "",
    contrasena: "", id_rol: "", estado: true,
  });
  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);

  const getUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data.data);
    } catch {
      toast.error("Error al cargar usuarios");
    }
  };

  const getRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data.data);
    } catch {
      toast.error("Error al cargar roles");
    }
  };

  useEffect(() => {
    getUsuarios();
    getRoles();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "estado") value = value === "1";
    if (e.target.name === "id_rol") value = parseInt(value);
    setForm({ ...form, [e.target.name]: value });
  };

  const openCreate = () => {
    setForm({
      nombre: "", usuario: "", correo: "",
      contrasena: "",
      id_rol: roles[0]?.id_rol || "",
      estado: true
    });
    setEditando(false);
    setModalOpen(true);
  };

  const openEdit = (user) => {
    setForm({
      nombre: user.nombre,
      usuario: user.usuario,
      correo: user.correo,
      contrasena: "",
      id_rol: user.id_rol,
      estado: user.estado
    });
    setIdActual(user.id_usuario);
    setEditando(true);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = { ...form };
      if (!dataToSend.contrasena) delete dataToSend.contrasena;

      if (editando) {
        await api.put(`/usuarios/${idActual}`, dataToSend);
        toast.success("Usuario actualizado");
      } else {
        await api.post("/usuarios", dataToSend);
        toast.success("Usuario creado");
      }

      setModalOpen(false);
      getUsuarios();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error en operación");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar usuario?")) return;
    try {
      await api.delete(`/usuarios/${id}`);
      toast.success("Usuario eliminado");
      getUsuarios();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const toggleEstado = async (id) => {
    try {
      await api.post(`/usuarios/${id}/toggle-estado`);
      toast.success("Estado actualizado");
      getUsuarios();
    } catch {
      toast.error("Error al cambiar estado");
    }
  };

  return (
    <>
      <style>{`
        .pg { font-family: 'Inter', sans-serif; color: #e5e7eb; }

        .pg-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .pg-title {
          font-size: 1.6rem;
          font-weight: 600;
          color: #fff;
        }

        .pg-sub {
          font-size: 13px;
          color: #6b7280;
        
        }

        .pg-btn-new {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 10px;
          background: #6366f1;
          color: white;
          border: none;
          cursor: pointer;
        }

        .pg-btn-new:hover { background: #4f46e5; }

        .pg-card {
          background: #232633;
          border-radius: 14px;
          border: 1px solid #2f3441;
          overflow: hidden;
        }

        .pg-table {
          width: 100%;
          border-collapse: collapse;
        }

        .pg-table thead {
          background: #1e2028;
        }

        .pg-table th {
          padding: 12px;
          text-align: left;
          font-size: 11px;
          color: #6b7280;
        }

        .pg-table td {
          padding: 14px;
          border-top: 1px solid #2f3441;
        }

        .pg-table tr:hover td {
          background: #2a2f3e;
        }

        .pg-user {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .pg-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #6366f1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .pg-username { font-size: 12px; color: #6b7280; }

        .pg-role {
          background: #2f3441;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 11px;
        }

        .pg-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
        }

        .active { background: #1f3d2b; color: #4ade80; }
        .inactive { background: #3a1f24; color: #f87171; }

        .pg-actions { display: flex; gap: 6px; }

        .pg-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #2f3441;
          background: #181a20;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .pg-btn:hover { background: #232633; }

        .pg-btn.del:hover { background: #3a1f24; color: #f87171; }
        .pg-btn.edit:hover { background: #1e3a5f; color: #60a5fa; }
        .pg-btn.toggle:hover { background: #1f3d2b; color: #4ade80; }

        .pg-empty {
          text-align: center;
          padding: 3rem;
          color: #6b7280;
        }

        .pg-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pg-modal {
          background: #232633;
          border-radius: 14px;
          border: 1px solid #2f3441;
          width: 100%;
          max-width: 480px;
        }

        .pg-modal-header {
          display: flex;
          justify-content: space-between;
          padding: 1rem;
          border-bottom: 1px solid #2f3441;
        }

        .pg-modal-body {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .pg-input, .pg-select {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid #2f3441;
          background: #181a20;
          color: white;
        }

        .pg-modal-footer {
          padding: 1rem;
          display: flex;
          justify-content: flex-end;
          gap: 8px;
        }

        .pg-btn-save {
          background: #6366f1;
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
        }

        .pg-btn-cancel {
          border: 1px solid #2f3441;
          padding: 8px 16px;
          border-radius: 8px;
        }
      `}</style>

      <div className="pg">

        <div className="pg-header">
          <div>
            <h1 className="pg-title">Usuarios</h1>
            <p className="pg-sub">{usuarios.length} usuarios</p>
          </div>

          <button className="pg-btn-new" onClick={openCreate}>
            <Plus size={16} /> Nuevo
          </button>
        </div>

        <div className="pg-card">
          <table className="pg-table">
            <thead>
              <tr>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="pg-empty">
                      <Users size={32} />
                      <p>No hay usuarios</p>
                    </div>
                  </td>
                </tr>
              ) : (
                usuarios.map(u => (
                  <tr key={u.id_usuario}>
                    <td>
                      <div className="pg-user">
                        <div className="pg-avatar">
                          {u.nombre?.charAt(0)}
                        </div>
                        <div>
                          {u.nombre}
                          <div className="pg-username">@{u.usuario}</div>
                        </div>
                      </div>
                    </td>
                    <td>{u.correo}</td>
                    <td><span className="pg-role">{u.rol?.nombre}</span></td>
                    <td>
                      <span className={`pg-badge ${u.estado ? "active" : "inactive"}`}>
                        {u.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td>
                      <div className="pg-actions">
                        <button className="pg-btn edit" onClick={() => openEdit(u)}><Pencil size={14} /></button>
                        <button className="pg-btn toggle" onClick={() => toggleEstado(u.id_usuario)}>
                          {u.estado ? <ToggleRight size={14}/> : <ToggleLeft size={14}/>}
                        </button>
                        <button className="pg-btn del" onClick={() => handleDelete(u.id_usuario)}><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <div className="pg-overlay">
            <div className="pg-modal">
              <div className="pg-modal-header">
                <h3>{editando ? "Editar" : "Nuevo"} usuario</h3>
                <button onClick={() => setModalOpen(false)}><X size={16}/></button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="pg-modal-body">
                  <input name="nombre" placeholder="Nombre" onChange={handleChange} value={form.nombre} className="pg-input"/>
                  <input name="usuario" placeholder="Usuario" onChange={handleChange} value={form.usuario} className="pg-input"/>
                  <input name="correo" placeholder="Correo" onChange={handleChange} value={form.correo} className="pg-input"/>
                  <input type="password" name="contrasena" placeholder="Contraseña" onChange={handleChange} className="pg-input"/>

                  <select name="id_rol" onChange={handleChange} value={form.id_rol} className="pg-select">
                    {roles.map(r => (
                      <option key={r.id_rol} value={r.id_rol}>{r.nombre}</option>
                    ))}
                  </select>

                  <select name="estado" onChange={handleChange} value={form.estado ? "1":"0"} className="pg-select">
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                  </select>
                </div>

                <div className="pg-modal-footer">
                  <button type="button" className="pg-btn-cancel" onClick={()=>setModalOpen(false)}>Cancelar</button>
                  <button type="submit" className="pg-btn-save">Guardar</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default Usuarios;