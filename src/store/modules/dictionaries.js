import DictionariesApi from '@/services/api/dictionaries.api';

const state = {
  dictionaries: [],
  loading: false,
  error: null,
  isFormValid: null,
};

const getters = {
  dictionaries: (state) => state.dictionaries,
  loading: (state) => state.loading,
  error: (state) => state.error,
  isFormValid: (state) => state.isFormValid,
};

const mutations = {
  setDictionaries(state, payload) {
    state.dictionaries = payload;
  },
  setLoading(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  updateDictionaries(state, payload) {
    state.dictionaries = state.dictionaries.map((dict) => (dict.id === payload.id ? payload : dict));
  },
  addDictionary(state, payload) {
    state.dictionaries = [...state.dictionaries, payload];
  },
  removeDictionary(state, payload) {
    state.dictionaries = state.dictionaries.filter(({ id }) => id !== payload.id);
  },
  setFormValidation(state, payload) {
    state.isFormValid = payload;
  },
};

const actions = {
  async getDictionaries({ commit }) {
    try {
      commit('setDictionaries', []);
      commit('setLoading', true);
      commit('setError', null);

      const response = await DictionariesApi.getDictionaries();

      commit('setDictionaries', response.data);
      commit('setLoading', false);

      return response.data;
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error);

      console.error(error);

      throw error;
    }
  },
  async editDictionary({ commit }, { id, ...payload }) {
    try {
      commit('setLoading', true);
      commit('setError', null);

      const response = await DictionariesApi.editDictionary({ id, payload });

      commit('updateDictionaries', response.data);
      commit('setLoading', false);

      return response.data;
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error);

      console.error(error);

      throw error;
    }
  },
  async addDictionary({ commit }, payload) {
    try {
      commit('setLoading', true);
      commit('setError', null);

      const response = await DictionariesApi.addDictionary(payload);

      commit('addDictionary', response.data);
      commit('setLoading', false);

      return response.data;
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error);

      console.error(error);

      throw error;
    }
  },
  async removeDictionary({ commit }, payload) {
    try {
      commit('setLoading', true);
      commit('setError', null);

      const response = await DictionariesApi.removeDictionary(payload);

      commit('removeDictionary', response.data);
      commit('setLoading', false);

      return response.data;
    } catch (error) {
      commit('setLoading', false);
      commit('setError', error);

      console.error(error);

      throw error;
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
