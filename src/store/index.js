import Vue from 'vue';
import Vuex from 'vuex';

import favoriteModules from './favorite';

Vue.use(Vuex);
export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    types: ['car', 'motorbike'],
    brands: {
      car: [
        
        {name:'TOYOTA',url:'../assets/img/logo/toyota.png'},
       
        {name:'LEXUS',url:'https://i.imgur.com/wiA92xg.jpg'},
       
    ],




     
    },
    products: [],
    allProducts: [],
    selectedCategory: 'car',
    carts: {
      carts: [],
    },
    formTitle: '會員登入',
  },
  mutations: {
     LOADING(state, payload) {
      state.isLoading = payload;
    },
    ALLPRODUCTS(state, payload) {
      state.allProducts = payload;
    },
    
    CARTS(state, payload) {
      state.carts = payload;
    },
    CHANGECATEGORY(state, payload) {
      state.selectedCategory = payload;
    },
  },
  actions: {
    getAllProducts(context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`;
      context.commit('LOADING', true);
      axios.get(apiUrl).then((response) => {
        context.commit('ALLPRODUCTS', response.data.products);
        context.commit('LOADING', false);
      });
    },
    getCarts(context) {
      const apiUrl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      context.commit('LOADING', true);
      axios.get(apiUrl).then((response) => {
        context.commit('CARTS', response.data.data);
        context.commit('LOADING', false);
      });
    },
    changeCategory(context, payload) {
      context.commit('CHANGECATEGORY', payload);
    },
  },


  modules: {
   
    favoriteModules,
  },


});
