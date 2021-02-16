<template>
  <main class="p-4">
    <b-button variant="success" class="float-right mb-2" @click="handleAddButtonClick">Add record</b-button>
    <DictionariesTableAdmin />
    <AddRecordModal />
  </main>
</template>

<script>
import DictionariesTableAdmin from '@/components/DictionariesTableAdmin';
import AddRecordModal from '@/components/Modals/AddRecordModal';

export default {
  name: 'Admin',
  components: { AddRecordModal, DictionariesTableAdmin },
  methods: {
    handleAddButtonClick() {
      this.$bvModal.show('addRecordModal');
    },
  },
};
</script>
