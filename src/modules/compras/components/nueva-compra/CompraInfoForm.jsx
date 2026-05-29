function CompraInfoForm({
  form,
  setForm,
  proveedores,
}) {

  return (

    <div className="cp-card">

      <h3 className="cp-card-title">
        Información General
      </h3>

      <div className="cp-form-group">

        <label className="cp-label">
          Proveedor
        </label>

        <select
          className="cp-select"
          value={form.id_proveedor}
          onChange={(e) =>
            setForm({
              ...form,
              id_proveedor:
                e.target.value,
            })
          }
        >

          <option value="">
            Seleccionar
          </option>

          {proveedores.map((p) => (

            <option
              key={p.id_proveedor}
              value={p.id_proveedor}
            >
              {p.nombre}
            </option>

          ))}

        </select>

      </div>

      <div className="cp-form-group">

        <label className="cp-label">
          Fecha
        </label>

        <input
          type="date"
          className="cp-input"
          value={form.fecha}
          onChange={(e) =>
            setForm({
              ...form,
              fecha: e.target.value,
            })
          }
        />

      </div>

    </div>
  )
}

export default CompraInfoForm