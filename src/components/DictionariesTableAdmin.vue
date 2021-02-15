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

      <template #cell(phone)="data">
        <b-form-input
          v-if="editableItemId === data.item.id"
          v-mask="'+## (###) ### ## ##'"
          size="sm"
          v-model="data.item.phone"
        />
        <span v-else> {{ data.item.phone }} </span>
      </template>

      <template #cell(city)="data">
        <b-form-select
          v-if="editableItemId === data.item.id"
          size="sm"
          v-model="data.item.city"
          :options="cityOptions"
        />
        <span v-else> {{ data.item.city }} </span>
      </template>

      <template #cell(tariff)="data">
        <b-form-select
          v-if="editableItemId === data.item.id"
          size="sm"
          v-model="data.item.tariff"
          :options="tariffOptions"
        />
        <span v-else> {{ data.item.tariff }} </span>
      </template>

      <template #cell(booked)="data">
        <b-form-select
          v-if="editableItemId === data.item.id"
          size="sm"
          v-model="data.item.booked"
          :options="bookedOptions"
        />
        <span v-else> {{ data.item.booked }} </span>
      </template>

      <template #cell(actions)="data">
        <b-button
          v-if="editableItemId === data.item.id"
          size="sm"
          variant="success"
          class="mr-1"
          @click="handleSaveButtonClick"
        >
          Save
        </b-button>
        <div v-else>
          <b-button size="sm" variant="info" class="mr-1" @click="handleEditButtonClick(data.item.id)"> Edit </b-button>
          <b-button size="sm" variant="danger"> Remove </b-button>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { mask } from 'vue-the-mask';

export default {
  name: 'DictionariesTableAdmin',
  directives: { mask },
  data: () => ({
    editableItemId: null,
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
    }),
    handleEditButtonClick(id) {
      this.editableItemId = id;
    },
    handleSaveButtonClick() {
      this.editableItemId = null;
    },
  },
  mounted() {
    this.getDictionaries();
  },
};
</script>
