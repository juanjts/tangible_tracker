import httpClient from './httpClient'

export async function identify(email) {
  const { data } = await httpClient.post('/identity', { email })
  return data.data
}
