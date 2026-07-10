const STATUSES = ['To Do', 'In Progress', 'Done']
const PRIORITIES = ['Low', 'Medium', 'High']

function TaskFilters({ filters, onFilterChange }) {
  function update(key, value) {
    onFilterChange({ ...filters, [key]: value })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => update('search', e.target.value)}
        placeholder="Buscar por titulo..."
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
      />
      <select
        value={filters.status}
        onChange={(e) => update('status', e.target.value)}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition cursor-pointer"
      >
        <option value="">Todos los estados</option>
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
      <select
        value={filters.priority}
        onChange={(e) => update('priority', e.target.value)}
        className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition cursor-pointer"
      >
        <option value="">Todas las prioridades</option>
        {PRIORITIES.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
    </div>
  )
}

export default TaskFilters
