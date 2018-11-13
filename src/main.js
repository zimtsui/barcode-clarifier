import Vue from 'vue';
import Cube from 'cube-ui';
import App from './components/index.vue';

Vue.use(Cube);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
}).$mount('#app');
