function Table({
  columns,
  data,
  loading = false,
  rowKey = 'id',
  emptyMessage = 'No hay registros',
}) {
  if (loading) {
    return (
      <div className="pg-card">
        Cargando...
      </div>
    )
  }

  return (
    <div className="pg-card table-wrapper">
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
              const currentKey = row[rowKey] !== undefined ? row[rowKey] : rowIndex;
              
              return (
                <tr key={currentKey}>
                  {columns.map((col) => (
                    <td key={col.accessor || col.id || col.header}>
                      {col.render
                        ? col.render(row)
                        : row[col.accessor] || '-'}
                    </td>
                  ))}
                </tr>
              );
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
  )
}

export default Table