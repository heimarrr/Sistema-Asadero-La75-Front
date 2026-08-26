import { useState, useMemo } from 'react'

function getNestedValue(obj, path) {
  return path.split('.').reduce((value, key) => {
    return value?.[key]
  }, obj)
}

function useSearch(data = [], searchKeys = []) {
  const [search, setSearch] = useState('')

  const filteredData = useMemo(() => {
    if (!search.trim()) return data

    const q = search.toLowerCase().trim()

    return data.filter((item) =>
      searchKeys.some((key) => {
        const value = getNestedValue(item, key)

        return String(value ?? '')
          .toLowerCase()
          .includes(q)
      })
    )
  }, [data, search, searchKeys])

  return {
    search,
    setSearch,
    filteredData,
  }
}

export default useSearch