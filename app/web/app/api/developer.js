import axios from 'axios'
import md5 from 'md5'

export const ERR_OK = 'ok'

export async function regist(opts = {}) {
  opts.password = md5(opts.password)
  return await axios.post('/api/developer/regist', opts)
}

export async function login(opts = {}) {
  opts.password = md5(opts.password)
  return await axios.post('/api/developer/login', opts)
}