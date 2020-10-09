import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import Pagination from '@/components/Pagination.vue';

Vue.component("Pagination", Pagination);

Vue.use(BootstrapVue);
Vue.use(ElementUI, { locale });
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
