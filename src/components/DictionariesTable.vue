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
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'DictionariesTable',
  data: () => ({
    fields: ['index', 'phone', 'city', 'tariff'],
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
  },
  mounted() {
    this.getDictionaries();
  },
};
</script>
