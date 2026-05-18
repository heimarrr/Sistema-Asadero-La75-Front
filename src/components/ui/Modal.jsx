import { X } from 'lucide-react';

function Modal({
  open,
  onClose,
  title,
  children,
  width = '500px'
}) {

  if (!open) return null;

  return (
    <div
      className="pg-overlay bg-black/40 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="pg-modal bg-[#111] border border-white/10 rounded-xl shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
        style={{ width }}
      >

        <div className="pg-modal-header">
          <h3
            className="pg-title"
            style={{ fontSize: '1.2rem' }}
          >
            {title}
          </h3>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#6b7280',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="pg-modal-body">
          {children}
        </div>

      </div>
    </div>
  );
}

export default Modal;