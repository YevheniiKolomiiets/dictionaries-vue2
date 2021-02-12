<template>
  <div id="app">
    <router-view :key="$route.name" />
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  min-height: 100vh;
}
</style>
