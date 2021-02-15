<template>
  <main class="p-4">
    <DictionariesTable />
  </main>
</template>

<script>
import DictionariesTable from '@/components/DictionariesTable';

export default {
  name: 'Homepage',
  components: { DictionariesTable },
};
</script>
