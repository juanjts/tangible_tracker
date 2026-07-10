import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import httpClient from './services/httpClient'

function App() {
  useEffect(() => {
    httpClient.get('/health')
      .then((res) => console.log('[Health]', res.data))
      .catch((err) => console.warn('[Health]', err.message))
  }, [])

  return <RouterProvider router={router} />
}

export default App
