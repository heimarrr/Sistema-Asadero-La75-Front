import { Save } from 'lucide-react'

function CompraResumen({
  total,
  loading,
}) {

  return (

    <div className="cp-card">

      <h3 className="cp-card-title">
        Resumen
      </h3>

      <div className="cp-total">

        <p>
          TOTAL COMPRA
        </p>

        <h2>
          $
          {Number(
            total
          ).toLocaleString()}
        </h2>

      </div>

      <button
        type="submit"
        className="cp-btn-save"
        disabled={loading}
      >

        <Save size={16} />

        {loading
          ? ' Guardando...'
          : ' Guardar Compra'}

      </button>

    </div>
  )
}

export default CompraResumen