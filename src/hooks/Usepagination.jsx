import { useState, useMemo } from 'react'

function usePagination(data = [], pageSize = 10) {
  const [page, setPage] = useState(1)

  const lastPage = Math.max(1, Math.ceil(data.length / pageSize))

  // Si la página actual quedó "fuera de rango" (ej: borraste el único
  // producto de la última página), la corregimos automáticamente.
  const safePage = Math.min(page, lastPage)

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  }, [data, safePage, pageSize])

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > lastPage) return
    setPage(newPage)
  }

  return {
    paginatedData,
    page: safePage,
    lastPage,
    onPageChange: handlePageChange,
  }
}

export default usePagination