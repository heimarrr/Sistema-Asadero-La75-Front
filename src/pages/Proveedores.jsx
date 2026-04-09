import { useEffect, useState } from "react";
import api from "../api";
import toast from "react-hot-toast";
import {
  Plus, Pencil, Trash2,
  ToggleLeft, ToggleRight,
  X, Truck
} from "lucide-react";

function Proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
    correo: "",
    status: true,
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);

  const getProveedores = async () => {
    try {
      const res = await api.get("/proveedores");
      setProveedores(res.data.data);
    } catch {
      toast.error("Error al cargar proveedores");
    }
  };

  useEffect(() => {
    getProveedores();
  }, []);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "status") value = value === "1";

    setForm({ ...form, [e.target.name]: value });
  };

  const openCreate = () => {
    setForm({
      nombre: "",
      telefono: "",
      direccion: "",
      correo: "",
      status: true,
    });
    setEditando(false);
    setModalOpen(true);
  };

  const openEdit = (p) => {
    setForm({
      nombre: p.nombre,
      telefono: p.telefono || "",
      direccion: p.direccion || "",
      correo: p.correo || "",
      status: p.status,
    });

    setIdActual(p.id_proveedor);
    setEditando(true);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/proveedores/${idActual}`, form);
        toast.success("Proveedor actualizado");
      } else {
        await api.post("/proveedores", form);
        toast.success("Proveedor creado");
      }

      setModalOpen(false);
      getProveedores();

    } catch (error) {
      toast.error(error.response?.data?.message || "Error");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar proveedor?")) return;

    try {
      await api.delete(`/proveedores/${id}`);
      toast.success("Proveedor eliminado");
      getProveedores();
    } catch {
      toast.error("Error al eliminar");
    }
  };

  const toggleEstado = async (id) => {
    try {
      await api.post(`/proveedores/${id}/toggle-estado`);
      toast.success("Estado actualizado");
      getProveedores();
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

        .pg-role {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pg-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #10b981;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pg-badge {
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
        }

        .active { background: #1f3d2b; color: #4ade80; }
        .inactive { background: #3a1f24; color: #f87171; }

        .pg-actions {
          display: flex;
          gap: 6px;
        }

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
          max-width: 420px;
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
            <h1 className="pg-title">Proveedores</h1>
            <p className="pg-sub">{proveedores.length} registrados</p>
          </div>

          <button className="pg-btn-new" onClick={openCreate}>
            <Plus size={16}/> Nuevo
          </button>
        </div>

        <div className="pg-card">
          <table className="pg-table">
            <thead>
              <tr>
                <th>Proveedor</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {proveedores.map(p => (
                <tr key={p.id_proveedor}>
                  <td>
                    <div className="pg-role">
                      <div className="pg-icon">
                        <Truck size={16}/>
                      </div>
                      {p.nombre}
                    </div>
                  </td>

                  <td>{p.telefono || "-"}</td>
                  <td>{p.correo || "-"}</td>
                  <td>{p.direccion || "-"}</td>

                  <td>
                    <span className={`pg-badge ${p.status ? "active" : "inactive"}`}>
                      {p.status ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  <td>
                    <div className="pg-actions">
                      <button className="pg-btn edit" onClick={()=>openEdit(p)}>
                        <Pencil size={14}/>
                      </button>

                      <button className="pg-btn toggle" onClick={()=>toggleEstado(p.id_proveedor)}>
                        {p.status ? <ToggleRight size={14}/> : <ToggleLeft size={14}/>}
                      </button>

                      <button className="pg-btn del" onClick={()=>handleDelete(p.id_proveedor)}>
                        <Trash2 size={14}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {modalOpen && (
          <div className="pg-overlay">
            <div className="pg-modal">
              <div className="pg-modal-header">
                <h3>{editando ? "Editar" : "Nuevo"} Proveedor</h3>
                <button onClick={()=>setModalOpen(false)}>
                  <X size={16}/>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="pg-modal-body">
                  <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="pg-input"/>
                  <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="pg-input"/>
                  <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} className="pg-input"/>
                  <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} className="pg-input"/>

                  <select name="status" value={form.status ? "1":"0"} onChange={handleChange} className="pg-select">
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

export default Proveedores;