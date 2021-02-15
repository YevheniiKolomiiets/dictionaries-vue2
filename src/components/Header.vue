<template>
  <header class="d-sm-flex justify-content-end p-2">
    <UserInfo v-if="isLoggedIn" />
    <LoginForm v-else />
  </header>
</template>

<script>
import { mapGetters } from 'vuex';
import LoginForm from '@/components/LoginForm';
import UserInfo from '@/components/UserInfo';

export default {
  name: 'Header',
  components: { UserInfo, LoginForm },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
};
</script>

<style lang="scss" scoped>
header {
  padding: 10px;
  background-color: $header-bg;
  box-shadow: 0 5px 5px $header-bg;
}
</style>
