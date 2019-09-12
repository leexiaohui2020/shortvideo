import md5 from 'md5'
import axios from 'axios'

export const ERR_OK = 'ok'

export async function login(opts = {}) {
  const { username, password } = opts
  return await axios.post('/api/admin/login', { username, password: md5(password) })
}
