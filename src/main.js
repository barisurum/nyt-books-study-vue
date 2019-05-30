import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip = false

Vue.directive('visible-half', (el, bind) => {
  el.style.opacity = bind.value ? '1' : '0.5';
  el.style.zIndex = bind.value ? '1' : '0';
});

Vue.directive('visible', (el, bind) => {
  el.style.opacity = bind.value ? '1' : '0';
  el.style.zIndex = bind.value ? '1' : '0';
});

new Vue({
  render: h => h(App),
}).$mount('#app')
