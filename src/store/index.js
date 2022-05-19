import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import home from "./home";
import findmusic from "./findmusic";
import header from "./header";
import footer from "./footer";
import singerDetailInfo from "./singerDetailInfo";
import singer from "./findmusic/singer";
export default new Vuex.Store({
  modules: {
    home,
    findmusic,
    header,
    footer,
    singer,
    singerDetailInfo,
  },
});
