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
        <b-button size="sm" variant="info" class="mr-1" @click="handleEditButtonClick(data.item)">Edit</b-button>
        <b-button size="sm" variant="danger" @click="handleRemoveButtonClick(data.item.id)">Remove</b-button>
      </template>
    </b-table>

    <EditRecordModal :editable-data="editableData" />
    <DeleteRecordModal :id="pendingRemovalId" />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import EditRecordModal from '@/components/Modals/EditRecordModal';
import DeleteRecordModal from '@/components/Modals/DeleteRecordModal';

export default {
  name: 'DictionariesTableAdmin',
  components: { DeleteRecordModal, EditRecordModal },
  data: () => ({
    editableData: {},
    pendingRemovalId: '',
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
    handleRemoveButtonClick(id) {
      this.pendingRemovalId = id;
      this.$bvModal.show('deleteRecordModal');
    },
  },
  mounted() {
    this.getDictionaries();
  },
};
</script>
