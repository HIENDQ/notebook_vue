<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  display: flex;
  flex-direction: row;
  height: 500px;
}
</style>
