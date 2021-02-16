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

    <EditRecordModal :editable-data="editableData" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditRecordModal from '@/components/Modals/EditRecordModal';

export default {
  name: 'DictionariesTableAdmin',
  components: { EditRecordModal },
  data: () => ({
    editableData: {},
    fields: ['index', 'id', 'phone', 'city', 'tariff', 'booked', 'actions'],
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
    }),
    handleEditButtonClick(item) {
      this.editableData = { ...item };
      this.$bvModal.show('editRecordModal');
    },
  },
  mounted() {
    this.getDictionaries();
  },
};
</script>
