<template>
  <main><button @click="handleLogout">logout</button></main>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'admin',
  methods: {
    ...mapActions({
      logout: 'auth/logout',
    }),
    handleLogout() {
      this.logout();
    },
  },
};
</script>
