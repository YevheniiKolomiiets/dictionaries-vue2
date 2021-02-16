<template>
  <b-modal :id="modal.id" :title="modal.title" centered @hide="hideModal">
    <b-alert variant="danger" :show="modal.error.length">
      {{ modal.error }}
    </b-alert>

    Do you want to delete record {{ id }} ?

    <template #modal-footer>
      <div class="d-flex justify-content-end">
        <b-button variant="secondary" size="sm" class="mr-2" @click="hideModal"> Cancel </b-button>
        <b-button variant="danger" size="sm" class="" @click="handleConfirmation" :disabled="loading">
          <b-icon v-if="loading" icon="circle-fill" animation="throb" font-scale="1" />
          Delete
        </b-button>
      </div>
    </template>
  </b-modal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DeleteRecordModal',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    modal: {
      id: 'deleteRecordModal',
      title: 'Delete record',
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
      removeDictionary: 'dictionaries/removeDictionary',
    }),
    async handleConfirmation() {
      try {
        await this.removeDictionary({ id: this.id });
        this.hideModal();
      } catch (e) {
        this.modal.error = e.response.data.message;
      }
    },
    hideModal() {
      this.$bvModal.hide(this.modal.id);
    },
  },
};
</script>
