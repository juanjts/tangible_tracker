function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center gap-3 mx-8 mt-8">
      <div className="flex items-center justify-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3 w-full">
        {message}
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-sm text-neutral-600 border border-neutral-300 rounded-lg px-4 py-2 hover:bg-neutral-50 transition cursor-pointer"
        >
          Intentar de nuevo
        </button>
      )}
    </div>
  )
}

export default ErrorState
