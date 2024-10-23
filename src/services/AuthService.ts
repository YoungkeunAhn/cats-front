import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
}

type TLogin = {
  email: string
  password: string
}

export class AuthService {
  constructor() {}

  async login(inputs: TLogin): Promise<string> {
    try {
      const res = await axios.post('/cats/login', inputs, axiosHeader)

      return res.data
    } catch (err) {
      throw new Error((err as Error).message)
    }
  }

  async logout() {
    try {
    } catch (err) {
      console.error(err)
    }
  }
}
