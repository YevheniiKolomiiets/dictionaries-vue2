<template>
  <main class="p-4">
    <DictionariesTableAdmin />
  </main>
</template>

<script>
import DictionariesTableAdmin from '@/components/DictionariesTableAdmin';
export default {
  name: 'Admin',
  components: { DictionariesTableAdmin },
};
</script>
