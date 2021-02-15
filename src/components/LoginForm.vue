<template>
  <b-form @submit.prevent="handleLogin" class="d-sm-flex px-2">
    <b-form-group label-for="username" class="mb-2 mb-sm-0">
      <b-form-input id="username" v-model="username" type="text" placeholder="username" required></b-form-input>
    </b-form-group>
    <b-form-group label-for="password" class="mb-2 mb-sm-0 ml-sm-2">
      <b-form-input id="password" v-model="password" type="password" placeholder="password" required></b-form-input>
    </b-form-group>

    <b-button type="submit" variant="outline-primary" class="ml-sm-2" :disabled="loading">
      <b-icon v-if="loading" icon="circle-fill" animation="throb" font-scale="1" />
      Login
    </b-button>
  </b-form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'LoginForm',
  data: () => ({
    username: '',
    password: '',
  }),
  computed: {
    ...mapGetters({
      loading: 'auth/loading',
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
