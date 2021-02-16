<template>
  <div>
    <b-table striped hover :items="dictionaries" :busy="loading" :fields="fields">
      <template #table-busy>
        <div class="text-center text-primary my-2">
          <b-spinner class="align-middle"></b-spinner>
          <strong>Loading...</strong>
        </div>
      </template>

      <template #cell(index)="data">
        {{ data.index + 1 }}
      </template>

      <template #cell(actions)="data">
        <b-button size="sm" variant="info" class="mr-1" @click="handleEditButtonClick(data.item)"> Edit</b-button>
        <b-button size="sm" variant="danger"> Remove</b-button>
      </template>
    </b-table>

    <b-modal :id="editModal.id" :title="editModal.title" centered @hide="hideEditModal">
      <b-alert variant="danger" :show="editModal.error.length">
        {{ editModal.error }}
      </b-alert>
      <b-form-group label-for="phone" label="phone:">
        <b-form-input id="phone" v-mask="'+############'" size="sm" v-model="editableData.phone" />
      </b-form-group>
      <b-form-group label-for="city" label="city:">
        <b-form-select id="city" size="sm" v-model="editableData.city" :options="cityOptions" />
      </b-form-group>
      <b-form-group label-for="tariff" label="tariff:">
        <b-form-select id="tariff" size="sm" v-model="editableData.tariff" :options="tariffOptions" />
      </b-form-group>
      <b-form-group label-for="booked" label="booked:">
        <b-form-select id="booked" size="sm" v-model="editableData.booked" :options="bookedOptions" />
      </b-form-group>
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mask } from 'vue-the-mask';

export default {
  name: 'DictionariesTableAdmin',
  directives: { mask },
  data: () => ({
    editModal: {
      id: 'editModal',
      title: 'Edit record',
      error: '',
    },
    editableData: {},
    fields: ['index', 'id', 'phone', 'city', 'tariff', 'booked', 'actions'],
    cityOptions: [
      { value: 'New City', text: 'New City' },
      { value: 'Big Town', text: 'Big Town' },
      { value: 'Megapolis', text: 'Megapolis' },
      { value: 'Riverside', text: 'Riverside' },
    ],
    tariffOptions: [
      { value: 'Basic', text: 'Basic' },
      { value: 'Express', text: 'Express' },
      { value: 'Premium', text: 'Premium' },
    ],
    bookedOptions: [
      { value: true, text: 'true' },
      { value: false, text: 'false' },
    ],
  }),
  computed: {
    ...mapGetters({
      dictionaries: 'dictionaries/dictionaries',
      loading: 'dictionaries/loading',
    }),
  },
  methods: {
    ...mapActions({
      getDictionaries: 'dictionaries/getDictionaries',
      editDictionary: 'dictionaries/editDictionary',
    }),
    handleEditButtonClick(item) {
      this.editableData = { ...item };
      this.$bvModal.show(this.editModal.id);
    },
    async handleEditConfirmation() {
      try {
        await this.editDictionary(this.editableData);
        this.$bvModal.hide(this.editModal.id);
      } catch (e) {
        this.editModal.error = e.response.data.message;
      }
    },
    hideEditModal() {
      this.editableData = {};
    },
  },
  mounted() {
    this.getDictionaries();
  },
};
</script>
