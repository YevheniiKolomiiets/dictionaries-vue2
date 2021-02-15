import AuthApi from '@/services/api/auth.api';
import axios from 'axios';
import router from '@/router/router';

const state = {
  accessToken: null,
  user: {},
  isLoading: false,
  error: null,
};

const getters = {
  accessToken: (state) => state.accessToken,
  isLoggedIn: (state) => !!state.accessToken,
  user: (state) => state.user,
  isLoading: (state) => state.isLoading,
  error: (state) => state.error,
};

const mutations = {
  loginRequest(state) {
    state.accessToken = null;
    state.user = {};
    state.isLoading = true;
    state.error = null;
  },
  loginSuccess(state, { authToken, ...user }) {
    state.accessToken = authToken;
    state.user = user;
    state.isLoading = false;
  },
  authRequest(state) {
    state.isLoading = true;
    state.error = null;
  },
  authRequestError(state, errResponse) {
    state.isLoading = false;
    state.error = errResponse;
  },
  setPasswordSuccess(state) {
    state.isLoading = false;
  },
  changePasswordSuccess(state) {
    state.isLoading = false;
  },
  logout(state) {
    state.accessToken = null;
    state.user = {};
  },
};

const actions = {
  async login({ commit }, payload) {
    try {
      commit('loginRequest');
      const response = await AuthApi.login(payload);
      commit('loginSuccess', response.data);

      axios.defaults.headers.common.Authorization = `Bearer ${response.data.accessToken}`;
      await router.push('/admin');

      return response.data;
    } catch (error) {
      commit('authRequestError', error);

      console.error(error);

      throw error;
    }
  },

  async logout({ commit }) {
    commit('logout');
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
