<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { UsersService } from '@/services/UsersService'

export default defineComponent({
  setup() {
    const router = useRouter()
    const usersService = new UsersService()

    const email = ref<string>('')
    const name = ref<string>('')
    const password = ref<string>('')

    const signup = async () => {
      try {
        const existResult = await usersService.isExistUser(email.value)

        if (existResult) {
          alert('이미 존재하는 이메일입니다, 다른이메일을 사용해주세요')
          return false
        }

        await usersService.createUser({
          email: email.value,
          name: name.value,
          password: password.value,
        })

        alert('회원가입 완료')

        gotoLogin()
      } catch (err) {
        console.error(err)
        alert('회원가입 실패')
      }
    }

    const gotoLogin = () => {
      router.push({ name: 'Login' })
    }

    return { email, name, password, signup, gotoLogin }
  },
})
</script>
<template>
  <div>
    <h1>회원가입 페이지</h1>
    <form @submit.prevent="signup">
      <input v-model="email" placeholder="이메일" />
      <input v-model="password" type="password" placeholder="비밀번호" />
      <input v-model="name" placeholder="이름" />
      <button type="submit" class="primary">회원가입</button>
      <button type="button" class="ghost" @click="gotoLogin">
        로그인하러 가기
      </button>
    </form>
  </div>
</template>
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;
  padding: 10px;

  * + * {
    margin-top: 5px;
  }
}
</style>
