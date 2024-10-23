<script lang="ts">
import { AuthService } from '@/services/AuthService'
import { UsersService } from '@/services/UsersService'
import type { TCurrntUser } from '@/types/user'
import { defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const router = useRouter()
    const authService = new AuthService()
    const usersService = new UsersService()
    const currentUser = ref<TCurrntUser | null>(null)

    const getCurrentUser = async () => {
      try {
        const user: TCurrntUser = await usersService.getCurrentUser()
        console.log('current user : ', user)

        currentUser.value = user
      } catch (err) {
        console.error(err)
      }
    }

    const logout = async () => {
      try {
        authService.logout()
        router.push({ name: 'login' })
      } catch (err) {
        console.error(err)
      }
    }

    onMounted(() => {
      getCurrentUser()
    })
  },
})
</script>
<template>
  <div>
    <h1>메인페이지입니다</h1>

    <button type="button">로그아웃</button>
  </div>
</template>
<style scoped lang="scss"></style>
