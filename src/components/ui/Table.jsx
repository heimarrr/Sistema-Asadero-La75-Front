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
              <th key={col.header}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row[rowKey]}>
                {columns.map((col) => (
                  <td key={col.header}>
                    {col.render
                      ? col.render(row)
                      : row[col.accessor] || '-'}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
              >
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