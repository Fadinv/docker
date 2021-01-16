<template>
  <div class="container">
    <div class="header">
      Записная книжка
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;1,200&display=swap');

.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.header {
  background: #264653;
  color: white;
  padding: 2em 3em;
  width: 70%;
  border-radius: .25em;
  box-shadow: 0 0 1px 1px black;
  text-align: left;
}
</style>
