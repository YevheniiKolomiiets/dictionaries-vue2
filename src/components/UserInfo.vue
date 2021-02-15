<template>
  <div>
    {{ user.login }}
    <b-button variant="outline-primary" @click="handleLogout">Logout</b-button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'UserInfo',
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
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
