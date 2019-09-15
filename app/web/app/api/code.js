import axios from 'axios'
import app from 'app/main'

export const ERR_OK = 'ok'
export const createHeaders = () => ({
  xRole: app.$store.state.user.role,
  xToken: app.$store.state.user.token
})

export async function addCode(opts = {}) {
  return await axios.post('/api/code/add', opts, { headers: createHeaders() })
}

export async function rmvCode(opts = {}) {
  return await axios.post('/api/code/rmv', opts, { headers: createHeaders() })
}

export async function modCode(opts = {}) {
  return await axios.post('/api/code/mod', opts, { headers: createHeaders() })
}

export async function lstCode(opts = {}) {
  return await axios.post('/api/code/lst', opts, { headers: createHeaders() })
}

export async function createCode(opts = {}) {
  return await axios.post('/api/code/create', opts, { headers: createHeaders() })
}
