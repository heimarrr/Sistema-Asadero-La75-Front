import { useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Roles() {
  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    status: true,
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);

  // 🔥 Obtener roles
  const getRoles = async () => {
    try {
      const res = await api.get("/roles");
      setRoles(res.data.data);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Error al cargar roles");
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  // 🧩 Manejar inputs
  const handleChange = (e) => {
    let value = e.target.value;

    if (e.target.name === "status") {
      value = value === "1";
    }

    setForm({
      ...form,
      [e.target.name]: value,
    });
  };

  // 🧩 Abrir modal crear
  const openCreate = () => {
    setForm({
      nombre: "",
      descripcion: "",
      status: true,
    });

    setEditando(false);

    const modal = document.getElementById("modal_rol");
    if (modal) modal.showModal();
  };

  // 🧩 Abrir modal editar
  const openEdit = (rol) => {
    setForm({
      nombre: rol.nombre,
      descripcion: rol.descripcion || "",
      status: rol.status,
    });

    setIdActual(rol.id_rol);
    setEditando(true);

    const modal = document.getElementById("modal_rol");
    if (modal) modal.showModal();
  };

  // 🧩 Guardar
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/roles/${idActual}`, form);
        toast.success("Rol actualizado");
      } else {
        await api.post("/roles", form);
        toast.success("Rol creado");
      }

      const modal = document.getElementById("modal_rol");
      if (modal) modal.close();

      getRoles();

    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        error.response?.data?.message || "Error en operación"
      );
    }
  };

  // 🧩 Eliminar
  const handleDelete = async (id) => {
    if (!confirm("¿Eliminar rol?")) return;

    try {
      await api.delete(`/roles/${id}`);
      toast.success("Rol eliminado");
      getRoles();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Error al eliminar");
    }
  };

  // 🧩 Toggle estado
  const toggleEstado = async (id) => {
    try {
      await api.post(`/roles/${id}/toggle-estado`);
      toast.success("Estado actualizado");
      getRoles();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Error al cambiar estado");
    }
  };

  return (
    <div className="p-6 bg-base-200 min-h-screen">
      <Toaster />

      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Roles 🔐</h1>

          <button className="btn btn-primary" onClick={openCreate}>
            + Nuevo Rol
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-base-100 p-4 rounded-xl shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {roles.map((r) => (
                <tr key={r.id_rol}>
                  <td>{r.id_rol}</td>
                  <td>{r.nombre}</td>
                  <td>{r.descripcion}</td>

                  <td>
                    <span className={`badge ${r.status ? "badge-success" : "badge-error"}`}>
                      {r.status ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  <td className="flex gap-2">

                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openEdit(r)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => toggleEstado(r.id_rol)}
                    >
                      Estado
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(r.id_rol)}
                    >
                      Eliminar
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* MODAL */}
        <dialog id="modal_rol" className="modal">
          <div className="modal-box">

            <h3 className="font-bold text-lg mb-4">
              {editando ? "Editar Rol" : "Nuevo Rol"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input
                name="nombre"
                placeholder="Nombre"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.nombre}
              />

              <input
                name="descripcion"
                placeholder="Descripción"
                className="input input-bordered w-full"
                onChange={handleChange}
                value={form.descripcion}
              />

              <select
                name="status"
                className="select select-bordered w-full"
                onChange={handleChange}
                value={form.status ? "1" : "0"}
              >
                <option value="1">Activo</option>
                <option value="0">Inactivo</option>
              </select>

              <div className="flex justify-end gap-2 mt-4">
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>

                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("modal_rol").close()}
                >
                  Cancelar
                </button>
              </div>

            </form>

          </div>
        </dialog>

      </div>
    </div>
  );
}

export default Roles;