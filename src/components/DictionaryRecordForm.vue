<template>
  <b-form @submit.prevent="">
    <b-form-group label-for="phone" label="phone:">
      <b-form-input id="phone" v-mask="'+############'" size="sm" v-model="data.phone" />
    </b-form-group>
    <b-form-group label-for="city" label="city:">
      <b-form-select id="city" size="sm" v-model="data.city" :options="cityOptions" />
    </b-form-group>
    <b-form-group label-for="tariff" label="tariff:">
      <b-form-select id="tariff" size="sm" v-model="data.tariff" :options="tariffOptions" />
    </b-form-group>
    <b-form-group label-for="booked" label="booked:">
      <b-form-select id="booked" size="sm" v-model="data.booked" :options="bookedOptions" />
    </b-form-group>
  </b-form>
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  name: 'DictionaryRecordForm',
  directives: { mask },
  props: {
    data: {
      required: true,
    },
  },
  data: () => ({
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
};
</script>
