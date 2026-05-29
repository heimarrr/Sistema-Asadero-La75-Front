import { X } from 'lucide-react'

function CompraDeleteModal({
  open,
  onClose,
  compraEliminar,
  confirmarEliminar,
}) {
  if (!open) return null

  return (
    <div
      className="pg-overlay"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="pg-modal">
        <div className="pg-modal-header">
          <h3>Anular Compra</h3>

          <button className="pg-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <div className="pg-modal-body">
          <p>
            ¿Deseas anular la compra{' '}
            <strong>#{compraEliminar?.id_compra}</strong>?
          </p>
        </div>

        <div className="pg-modal-footer">
          <button className="pg-btn-cancel" onClick={onClose}>
            Cancelar
          </button>

          <button className="pg-btn-danger" onClick={confirmarEliminar}>
            Confirmar
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompraDeleteModal
