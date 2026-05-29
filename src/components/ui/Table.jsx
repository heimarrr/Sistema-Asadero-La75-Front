import { ChevronLeft, ChevronRight } from 'lucide-react' // o el ícono que uses

function Table({
  columns,
  data,
  loading = false,
  rowKey = 'id',
  emptyMessage = 'No hay registros',
  page = 1,
  lastPage = 1,
  onPageChange = () => {},
}) {

  if (loading) {
    return <div className="pg-card pg-loading">Cargando...</div>
  }

  // Genera el array de páginas con "..." cuando hay muchas
  const getPages = () => {
    if (lastPage <= 7) {
      return Array.from({ length: lastPage }, (_, i) => i + 1)
    }
    const pages = []
    if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, '...', lastPage)
    } else if (page >= lastPage - 3) {
      pages.push(1, '...', lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage)
    } else {
      pages.push(1, '...', page - 1, page, page + 1, '...', lastPage)
    }
    return pages
  }

  return (
    <div className="pg-card table-wrapper">

      {/* TABLA */}
      <div className="pg-table-container">
        <table className="pg-table">

          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.accessor || col.id || col.header}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => {
                const currentKey = row[rowKey] !== undefined ? row[rowKey] : rowIndex
                return (
                  <tr key={currentKey}>
                    {columns.map((col) => (
                      <td key={col.accessor || col.id || col.header}>
                        {col.render ? col.render(row) : row[col.accessor] || '-'}
                      </td>
                    ))}
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: 'center' }}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* PAGINACIÓN */}
      {lastPage > 1 && (
        <div className="table-pagination">

          {/* ANTERIOR */}
          <button
            className="pagination-btn pagination-arrow"
            disabled={page === 1}
            onClick={() => onPageChange(page - 1)}
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} />
          </button>

          {/* NÚMEROS */}
          {getPages().map((p, i) =>
            p === '...' ? (
              <span key={`dots-${i}`} className="pagination-dots">···</span>
            ) : (
              <button
                key={p}
                className={`pagination-btn ${page === p ? 'active' : ''}`}
                onClick={() => onPageChange(p)}
                aria-label={`Página ${p}`}
                aria-current={page === p ? 'page' : undefined}
              >
                {p}
              </button>
            )
          )}

          {/* SIGUIENTE */}
          <button
            className="pagination-btn pagination-arrow"
            disabled={page === lastPage}
            onClick={() => onPageChange(page + 1)}
            aria-label="Página siguiente"
          >
            <ChevronRight size={16} />
          </button>

        </div>
      )}

    </div>
  )
}

export default Table