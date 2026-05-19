function UsuarioForm({ form, roles, handleChange, handleSubmit, onClose, editando }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="pg-modal-body">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="pg-input" required />
        <input name="usuario" placeholder="Usuario" value={form.usuario} onChange={handleChange} className="pg-input" />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} className="pg-input" />
        <input name="contrasena" placeholder="Contraseña" value={form.contrasena} onChange={handleChange} className="pg-input" />
        <select name="id_rol" value={form.id_rol} onChange={handleChange} className="pg-select">
          {roles.map((rol) => (
            <option key={rol.id_rol} value={rol.id_rol}>
              {rol.nombre}
            </option>
          ))}
        </select>

        <select name="status" value={form.status ? '1' : '0'} onChange={handleChange} className="pg-select">
          <option value="1">Activo</option>
          <option value="0">Inactivo</option>
        </select>
      </div>

      <div className="pg-modal-footer">
        <button
          type="button" // <--- Importante para que no haga submit
          className="pg-btn-cancel"
          onClick={onClose} // <--- USA LA PROP QUE RECIBES
        >
          Cancelar
        </button>
        <button type="submit" className="pg-btn-save">
          {editando ? 'Actualizar' : 'Guardar'}
        </button>
      </div>
    </form>
  )
}

export default UsuarioForm