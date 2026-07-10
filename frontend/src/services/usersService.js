import httpClient from './httpClient'

export async function list() {
  const { data } = await httpClient.get('/users')
  return data.data
}
