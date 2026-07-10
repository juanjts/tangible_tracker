function LoadingState({ message = 'Cargando...' }) {
  return (
    <div className="p-8 flex items-center justify-center text-neutral-400 text-sm">
      <span>{message}</span>
    </div>
  )
}

export default LoadingState
