import Vue from 'vue';
import 'bootstrap';
import $ from 'jquery';

import axios from 'axios';
import VueAxios from 'vue-axios';

import VueScrollReveal from 'vue-scroll-reveal';


import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

// import VeeValidate from 'vee-validate';
import * as VeeValidate from 'vee-validate';
import zhTW from 'vee-validate/dist/locale/zh_TW';
import VueI18n from 'vue-i18n';


import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import ZoomHover from 'vue-zoom-on-hover';
import dateFilter from '@/filters/date';
import currencyFilter from './filters/currency';


import './bus';


import App from './App.vue';


import router from './router';
import store from './store';


import '../node_modules/hover.css/css/hover-min.css';


import './assets/main.scss';

Vue.use(VueAxios, axios);
window.axios = axios;
window.$ = $;

Vue.component('Loading', Loading);


Vue.filter('currency', currencyFilter);
Vue.filter('date', dateFilter);
Vue.use(ZoomHover);
Vue.use(VueSweetalert2);


Vue.use(VueScrollReveal, {
  class: 'v-scroll-reveal', 
  duration: 2000, 
  reset: false,
  
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  distance: '500px',
  mobile: true,
});



axios.defaults.withCredentials = true;
Vue.config.productionTip = false;

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: 'zhTW',
});

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');


Vue.use(VeeValidate, {
  i18n,
  dictionary: {
    zhTW,
  },
});

router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth) {
     const api = `${process.env.VUE_APP_APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
