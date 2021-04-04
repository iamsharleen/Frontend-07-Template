import HelloWorld from './HelloWorld.vue'
import Vue from 'vue'



new Vue({
  el: "#app",
  // template: "<HelloWorld/>",
  // component: { HelloWorld },
  render: h => h(HelloWorld)
})


