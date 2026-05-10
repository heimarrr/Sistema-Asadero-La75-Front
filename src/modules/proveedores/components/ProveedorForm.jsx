function ProveedorForm({ form, handleChange, handleSubmit, onClose, editando }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="pg-modal-body">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="pg-input" required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="pg-input" />
        <input name="correo" placeholder="Correo" value={form.correo} onChange={handleChange} className="pg-input" />
        <input name="direccion" placeholder="Dirección" value={form.direccion} onChange={handleChange} className="pg-input" />

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

export default ProveedorForm