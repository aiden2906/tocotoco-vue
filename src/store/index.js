import Vue from 'vue';
import Vuex from 'vuex';
import $ from 'jquery';
const SETTING_ENDPOINT = 'https://api.tocotocotea.com/v1/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cart: [],
    products: [],
    collections: [],
  },
  mutations: {
    CHANGE_CART(state, payload) {
      state.cart = payload;
    },
    FETCH_COLLECTION(state, payload) {
      state.collections = payload;
    },
    FETCH_PRODUCT(state, payload) {
      state.products = payload;
    },
  },
  actions: {
    fetchCollection(state) {
      return $.get(SETTING_ENDPOINT, (resp) => {
        const setting = resp.mobile.south;
        state.commit(
          'FETCH_COLLECTION',
          setting.menu_screen.list_collections.filter((c) => c.col_id)
        );
      });
    },
    fetchProduct(state, payload) {
      const { colId } = payload;
      let url = `https://api.tocotocotea.com/v1/collections/<ID>/products`;
      url = url.replace('<ID>', colId);
      $.get(url, (data) => {
        state.commit('FETCH_PRODUCT', data.products);
      });
    },
    changeCart(state, payload) {
      state.commit('CHANGE_CART', payload);
    },
  },
});
