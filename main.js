import Vue from 'vue';
import App from './App';
// import './css/global.less';

import publictopBar from './components/topBar.vue';
import FooterComponent from './components/footer.vue';
import ProductItemComponent from './components/product-item.vue';
import Search from './components/search.vue';
import Discount from './components/discount.vue';
import GroupItemComponent from './components/group-item.vue';
import swiperCell from './components/swiper-cell.vue';

// import VantSwiperCell from "./wxcomponents/vant/swipe-cell/index.vue";
// import VantCell from "./wxcomponents/vant/cell/index.vue";
// import VantCellGroup from "./wxcomponents/vant/cell-group/index.vue";
Vue.component('publicTopBar',publictopBar);
Vue.component('v-footer', FooterComponent);
Vue.component('v-product-item', ProductItemComponent);
Vue.component('Search', Search);
Vue.component('Discount', Discount);
Vue.component('v-group-item',GroupItemComponent);
Vue.component('swiperCell',swiperCell);
// Vue.component('VantSwiperCell', VantSwiperCell);
// Vue.component('VantCell',VantCell);
// Vue.component('VantCellGroup',VantCellGroup);
Vue.config.productionTip = false;
App.mpType = 'app';

const app = new Vue({
	...App
})
app.$mount();
