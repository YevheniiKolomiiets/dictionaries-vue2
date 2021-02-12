<template>
  <main>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="username" type="text" />
      <input v-model="password" placeholder="password" type="password" />
      <button type="submit">login</button>
    </form>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'homepage',
  data: () => ({
    username: '',
    password: '',
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  methods: {
    ...mapActions({
      login: 'auth/login',
    }),
    async handleLogin() {
      await this.login({
        login: this.username,
        password: this.password,
      });
    },
  },
};
</script>
