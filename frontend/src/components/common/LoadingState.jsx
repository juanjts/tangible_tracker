function LoadingState({ message = 'Cargando...' }) {
  return (
    <div className="p-8 flex items-center justify-center gap-3 text-neutral-400 text-sm">
      <span className="inline-block w-4 h-4 border-2 border-neutral-300 border-t-neutral-600 rounded-full animate-spin" />
      <span>{message}</span>
    </div>
  )
}

export default LoadingState
