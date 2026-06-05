import { X } from 'lucide-react'

function ConfirmarVentaModal({
  open,
  onClose,
  carrito,
  total,
  loading,
  onConfirmar,
}) {
  if (!open) return null

  return (
    <div className="pg-overlay">
      <div className="pg-modal">
        <div className="pg-modal-header">
          <h3>Confirmar venta</h3>

          <button
            type="button"
            onClick={onClose}
          >
            <X size={16} />
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '.5rem',
            marginBottom: '1rem',
          }}
        >
          {carrito.map((item) => (
            <div key={item.id_producto}>
              {item.nombre} × {item.cantidad}
            </div>
          ))}
        </div>

        <div className="vt-total">
          <span className="vt-total-label">
            Total
          </span>

          <span className="vt-total-amount">
            ${total.toLocaleString()}
          </span>
        </div>

        <button
          type="button"
          className="vt-btn-save"
          onClick={onConfirmar}
          disabled={loading}
        >
          {loading
            ? 'Guardando...'
            : 'Confirmar venta'}
        </button>
      </div>
    </div>
  )
}

export default ConfirmarVentaModal