<script lang="ts">
import { AuthService } from '@/services/AuthService'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const authService = new AuthService()

    const email = ref<string>('')
    const password = ref<string>('')
    const loginErrorMessage = ref<string>('')

    const login = async () => {
      try {
        if (email.value.length < 1) {
          alert('이메일을 입력하세요')
          return false
        }

        if (password.value.length < 1) {
          alert('비밀번호를 입력하세요')
          return false
        }

        const accessToken = await authService.login({
          email: email.value,
          password: password.value,
        })

        if (accessToken) {
          localStorage.setItem('token', accessToken)
          router.push({ name: 'Main' })
        }
      } catch (err) {
        console.error(err)
        loginErrorMessage.value = (err as Error).message
        alert('로그인 실패')
      }
    }

    const gotoSignup = () => {
      router.push({ name: 'Signup' })
    }

    return { email, password, loginErrorMessage, login, gotoSignup }
  },
})
</script>
<template>
  <div>
    <h1>로그인 페이지</h1>
    <form @submit.prevent="login">
      <input v-model="email" type="email" placeholder="이메일" required />
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호"
        required
      />
      <span v-if="loginErrorMessage.length > 0" class="error">{{
        loginErrorMessage
      }}</span>
      <button type="submit" class="primary">로그인</button>
      <button type="button" class="success" @click="gotoSignup">
        회원가입
      </button>
    </form>
  </div>
</template>
<style scoped lang="scss">
form {
  display: flex;
  flex-direction: column;

  * + * {
    margin-top: 5px;
  }
}

.error {
  color: #fa5252;
}
</style>
