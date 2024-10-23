import type { TCurrntUser } from '@/types/user'
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

const axiosHeader = {
  headers: {
    'Content-Type': 'application/json',
  },
}

type TSignup = {
  email: string
  name: string
  password: string
}

export class UsersService {
  constructor() {}

  async getCurrentUser(): Promise<TCurrntUser> {
    try {
      const res = await axios.get('/cats', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })

      return res.data
    } catch (err) {
      console.error(err)
      throw new Error((err as Error).message)
    }
  }

  async isExistUser(email: string): Promise<boolean> {
    try {
      const res = await axios.post(`/cats/signup/check`, { email }, axiosHeader)

      return res.data
    } catch (err) {
      // err를 Error로 단언
      console.error('통신 중 오류 발생:', (err as Error).message)
      throw new Error('통신 실패')
    }
  }

  async createUser(inputs: TSignup): Promise<boolean> {
    try {
      const res = await axios.post('/cats/signup', inputs, axiosHeader)

      return res.data.result
    } catch (err) {
      console.error((err as Error).message)
      throw new Error('통신 실패')
    }
  }
}
