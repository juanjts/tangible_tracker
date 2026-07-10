import { useState } from 'react'
import { identify } from '../services/identityService'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function IdentityPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const isEmailValid = EMAIL_REGEX.test(email)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')

    if (!isEmailValid) {
      setError('Ingresa un correo electrónico válido')
      return
    }

    setLoading(true)
    try {
      const user = await identify(email)
      console.log('Usuario activo:', user)
    } catch (err) {
      const message = err.response?.data?.error?.message || 'Error al conectar con el servidor'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-neutral-800">
            tangible_tracker
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Sistema de Gestión de Incidencias y Tareas
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6 space-y-4"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-1">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition cursor-pointer"
          >
            {loading ? 'Identificando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default IdentityPage
