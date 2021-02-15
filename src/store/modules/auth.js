import axios from 'axios';
import AuthApi from '@/services/api/auth.api';
import router from '@/router/router';

const state = {
  accessToken: null,
  user: {},
  loading: false,
  error: null,
};

const getters = {
  accessToken: (state) => state.accessToken,
  isLoggedIn: (state) => !!state.accessToken,
  user: (state) => state.user,
  loading: (state) => state.loading,
  error: (state) => state.error,
};

const mutations = {
  setAccessToken(state, payload) {
    state.accessToken = payload;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

const actions = {
  async login({ commit }, payload) {
    try {
      commit('setAccessToken', null);
      commit('setUser', {});
      commit('setLoading', true);
      commit('setError', null);

      const response = await AuthApi.login(payload);

      commit('setAccessToken', response.data.authToken);
      commit('setUser', response.data);
      commit('setLoading', false);

      axios.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
      await router.push('/admin');

      return response.data;
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error);

      console.error(error);

      throw error;
    }
  },

  async logout({ commit }) {
    commit('setAccessToken', null);
    commit('setUser', {});

    await router.push('/');

    localStorage.removeItem('vuex');
    delete axios.defaults.headers.common['Authorization'];
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
