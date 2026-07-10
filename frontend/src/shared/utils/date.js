export function formatTaskDate(timestamp) {
  if (!timestamp || !timestamp._seconds) return '\u2014'
  const date = new Date(timestamp._seconds * 1000)
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
