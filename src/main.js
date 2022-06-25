import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import store from "@/store";
import CarouselPic from "@/components/CarouselPic";
import TitleClick from "@/components/TitleClick";
import SongList from "@/components/SongList";
import "@/assets/reset.css";

import {
  Slider,
  Progress,
  Carousel,
  CarouselItem,
  Button,
  Message,
} from "element-ui";

Vue.use(Slider);
Vue.use(Progress);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button);
Vue.component(CarouselPic.name, CarouselPic);
Vue.component(TitleClick.name, TitleClick);
Vue.component(SongList.name, SongList);
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

// 引入表单验证
import "@/plugins/validate";
import VueLazyload from "vue-lazyload";
import loading from "@/assets/loading.jpg";

// 引入dayjs
import dayjs from "dayjs";
Vue.prototype.$dayjs = dayjs;

// 注册插件
Vue.use(VueLazyload, {
  loading: loading,
});
new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
  router,
  store,
}).$mount("#app");
