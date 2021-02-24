<template>
  <b-modal :id="addModal.id" :title="addModal.title" centered @hide="hideModal">
    <b-alert variant="danger" :show="addModal.error.length">
      {{ addModal.error }}
    </b-alert>

    <DictionaryRecordForm :data="data" />

    <template #modal-footer>
      <div class="d-flex justify-content-end">
        <b-button variant="secondary" size="sm" class="mr-2" @click="hideModal"> Cancel </b-button>
        <b-button variant="primary" size="sm" class="" @click="handleConfirmation" :disabled="loading || !isFormValid">
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
  name: 'AddRecordModal',
  components: { DictionaryRecordForm },
  data: () => ({
    data: {
      phone: null,
      city: null,
      tariff: null,
      booked: false,
    },
    addModal: {
      id: 'addRecordModal',
      title: 'Add record',
      error: '',
    },
  }),
  computed: {
    ...mapGetters({
      loading: 'dictionaries/loading',
      isFormValid: 'dictionaries/isFormValid',
    }),
  },
  methods: {
    ...mapActions({
      addDictionary: 'dictionaries/addDictionary',
    }),
    async handleConfirmation() {
      try {
        await this.addDictionary(this.data);
        this.hideModal();
      } catch (e) {
        this.addModal.error = e.response.data.message;
      }
    },
    hideModal() {
      this.$bvModal.hide(this.addModal.id);
      this.data = {
        phone: null,
        city: null,
        tariff: null,
        booked: false,
      };
    },
  },
};
</script>
