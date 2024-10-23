<script setup lang="ts">
import { ref } from 'vue'
const count = ref<number>(0)
</script>

<template>
  <div id="app">
    <header>Cats 프로젝트</header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;

  header {
    padding: 10px;
  }

  main {
    flex: 1;
  }
}

input {
  padding: 5px;
}

button {
  cursor: pointer;
  border: none;
  padding: 5px;
}

button.primary {
  background-color: #228be6;
  color: white;
}

button.success {
  background-color: #12b886;
  color: white;
}
</style>
