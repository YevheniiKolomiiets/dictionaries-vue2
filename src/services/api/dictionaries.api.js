import axios from 'axios';

export default {
  getDictionaries() {
    const endpoint = `${process.env.VUE_APP_API_BASE}/dict/all`;
    return axios.get(endpoint);
  },
  addDictionary(payload) {
    const endpoint = `${process.env.VUE_APP_API_BASE}/dict`;
    return axios.post(endpoint, payload);
  },
  editDictionary({ payload, id }) {
    const endpoint = `${process.env.VUE_APP_API_BASE}/dict/${id}`;
    return axios.put(endpoint, payload);
  },
  removeDictionary({ id }) {
    const endpoint = `${process.env.VUE_APP_API_BASE}/dict/${id}`;
    return axios.delete(endpoint);
  },
};
