import { useEffect, useState } from "react";
import api from "../api";
import toast, { Toaster } from "react-hot-toast";

function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    usuario: "",
    correo: "",
    contrasena: "",
    id_rol: 1,
    estado: 1,
  });

  const [editando, setEditando] = useState(false);
  const [idActual, setIdActual] = useState(null);

  const getUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data.usuarios);
    } catch {
      toast.error("Error al cargar usuarios");
    }
  };

  useEffect(() => {
    getUsuarios();
  }, []);

  // 🧩 manejar inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // 🧩 abrir modal crear
  const openCreate = () => {
    setForm({
      nombre: "",
      usuario: "",
      correo: "",
      contrasena: "",
      id_rol: 1,
      estado: 1,
    });
    setEditando(false);
    document.getElementById("modal_user").showModal();
  };

  // 🧩 abrir modal editar
  const openEdit = (user) => {
    setForm({
      nombre: user.nombre,
      usuario: user.usuario,
      correo: user.correo,
      contrasena: "",
      id_rol: user.id_rol,
      estado: user.estado,
    });
    setIdActual(user.id_usuario);
    setEditando(true);
    document.getElementById("modal_user").showModal();
  };

  // 🧩 guardar (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editando) {
        await api.put(`/usuarios/${idActual}`, form);
        toast.success("Usuario actualizado");
      } else {
        await api.post("/usuarios", form);
        toast.success("Usuario creado");
      }

      document.getElementById("modal_user").close();
      getUsuarios();

    } catch (error) {
      toast.error("Error en operación");
    }
  };

  // 🧩 eliminar
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

  // 🧩 toggle estado
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
    <div className="p-6 bg-base-200 min-h-screen">
      <Toaster />

      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Usuarios 👤</h1>

          <button className="btn btn-primary" onClick={openCreate}>
            + Nuevo Usuario
          </button>
        </div>

        {/* Tabla */}
        <div className="overflow-x-auto bg-base-100 p-4 rounded-xl shadow">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Usuario</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id_usuario}>
                  <td>{u.id_usuario}</td>
                  <td>{u.nombre}</td>
                  <td>{u.usuario}</td>
                  <td>{u.correo}</td>
                  <td>{u.rol?.nombre || u.id_rol}</td>

                  <td>
                    <span className={`badge ${u.estado ? "badge-success" : "badge-error"}`}>
                      {u.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  <td className="flex gap-2">

                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => openEdit(u)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => toggleEstado(u.id_usuario)}
                    >
                      Estado
                    </button>

                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(u.id_usuario)}
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
        <dialog id="modal_user" className="modal">
          <div className="modal-box">

            <h3 className="font-bold text-lg mb-4">
              {editando ? "Editar Usuario" : "Nuevo Usuario"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3">

              <input name="nombre" placeholder="Nombre" className="input input-bordered w-full" onChange={handleChange} value={form.nombre} />

              <input name="usuario" placeholder="Usuario" className="input input-bordered w-full" onChange={handleChange} value={form.usuario} />

              <input name="correo" placeholder="Correo" className="input input-bordered w-full" onChange={handleChange} value={form.correo} />

              <input name="contrasena" placeholder="Contraseña" type="password" className="input input-bordered w-full" onChange={handleChange} />

              <select name="id_rol" className="select select-bordered w-full" onChange={handleChange} value={form.id_rol}>
                <option value="1">Admin</option>
                <option value="2">Cajero</option>
                <option value="3">Compras</option>
              </select>

              <select name="estado" className="select select-bordered w-full" onChange={handleChange} value={form.estado}>
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
                  onClick={() => document.getElementById("modal_user").close()}
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

export default Usuarios;