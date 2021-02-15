<template>
  <div id="app">
    <component :is="layout">
      <router-view :key="$route.name" />
    </component>
  </div>
</template>

<script>
import BaseLayout from '@/layouts/BaseLayout';

export default {
  name: 'App',
  components: {
    BaseLayout,
  },
  computed: {
    layout() {
      return this.$route.meta.layout || 'BaseLayout';
    },
  },
};
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  background-color: $body-bg;
  color: $body-color;
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
