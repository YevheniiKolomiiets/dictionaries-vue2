<template>
  <main>homepage</main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'Homepage',
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
    handleLogin() {
      this.login({
        login: this.username,
        password: this.password,
      });
    },
  },
};
</script>
