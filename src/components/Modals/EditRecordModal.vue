<template>
  <b-modal :id="editModal.id" :title="editModal.title" centered @hide="hideEditModal">
    <b-alert variant="danger" :show="editModal.error.length">
      {{ editModal.error }}
    </b-alert>

    <DictionaryRecordForm :data="editableData" />

    <template #modal-footer>
      <div class="d-flex justify-content-end">
        <b-button variant="secondary" size="sm" class="mr-2" @click="hideEditModal"> Cancel </b-button>
        <b-button variant="primary" size="sm" class="" @click="handleEditConfirmation" :disabled="loading">
          <b-icon v-if="loading" icon="circle-fill" animation="throb" font-scale="1" />
          Save
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import DictionaryRecordForm from '@/components/DictionaryRecordForm';

export default {
  name: 'EditRecordModal',
  components: { DictionaryRecordForm },
  props: {
    editableData: {
      required: true,
    },
  },
  data: () => ({
    editModal: {
      id: 'editRecordModal',
      title: 'Edit record',
      error: '',
    },
  }),
  computed: {
    ...mapGetters({
      loading: 'dictionaries/loading',
    }),
  },
  methods: {
    ...mapActions({
      editDictionary: 'dictionaries/editDictionary',
    }),
    async handleEditConfirmation() {
      try {
        await this.editDictionary(this.editableData);
        this.hideEditModal();
      } catch (e) {
        this.editModal.error = e.response.data.message;
      }
    },
    hideEditModal() {
      this.$bvModal.hide(this.editModal.id);
    },
  },
};
</script>
