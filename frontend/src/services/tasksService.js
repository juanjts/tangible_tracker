import httpClient from './httpClient'

export async function list() {
  const { data } = await httpClient.get('/tasks')
  return data.data
}

export async function getById(id) {
  const { data } = await httpClient.get(`/tasks/${id}`)
  return data.data
}

export async function create(taskData, userEmail) {
  const { data } = await httpClient.post('/tasks', taskData, {
    headers: { 'x-user-email': userEmail },
  })
  return data.data
}

export async function update(id, taskData) {
  const { data } = await httpClient.patch(`/tasks/${id}`, taskData)
  return data.data
}

export async function remove(id) {
  const { data } = await httpClient.delete(`/tasks/${id}`)
  return data.data
}
