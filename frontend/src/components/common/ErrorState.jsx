function ErrorState({ message }) {
  return (
    <div className="p-8 flex items-center justify-center text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg mx-8 mt-8">
      {message}
    </div>
  )
}

export default ErrorState
