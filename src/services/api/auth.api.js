import axios from 'axios';

export default {
  login(payload) {
    const endpoint = `${process.env.VUE_APP_API_BASE}/auth/login`;
    return axios.post(endpoint, payload);
  },
};
