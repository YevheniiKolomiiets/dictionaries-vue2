<template>
  <div class="page">
    <Header />
    <slot></slot>
  </div>
</template>

<script>
import Header from '@/components/Header';

export default {
  name: 'App',
  components: {
    Header,
  },
};
</script>
