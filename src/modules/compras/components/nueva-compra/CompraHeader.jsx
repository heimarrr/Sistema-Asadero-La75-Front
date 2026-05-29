import { ArrowLeft } from 'lucide-react'

function CompraHeader({
  navigate,
}) {

  return (

    <div className="cp-header">

      <div>

        <h1 className="cp-title">
          Nueva Compra
        </h1>

        <p className="cp-sub">
          Registrar ingreso de productos
        </p>

      </div>

      <button
        className="cp-btn-back"
        onClick={() =>
          navigate('/compras')
        }
      >

        <ArrowLeft size={16} />

        Volver

      </button>

    </div>
  )
}

export default CompraHeader