import Vue from 'vue';
import Cube from 'cube-ui';
import App from './components/index.vue';

Vue.use(Cube);

Vue.config.productionTip = false;

Cube.createAPI(Vue, Cube.ImagePreview, ['change']);

new Vue({
    render: h => h(App),
}).$mount('#app');
