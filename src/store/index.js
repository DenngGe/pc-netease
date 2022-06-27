import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import home from "./home";
import header from "./header";
import footer from "./footer";
import singerDetailInfo from "./singerDetailInfo";
import searchDetailInfo from "./searchDetailInfo";
import playListDetailInfo from "./playListDetailInfo";
import albumDetailInfo from "./albumDetailInfo";
import PersonalCommend from "./findmusic/PersonalCommend";
import singer from "./findmusic/singer";
export default new Vuex.Store({
  modules: {
    home,
    header,
    footer,
    PersonalCommend,
    singer,
    singerDetailInfo,
    searchDetailInfo,
    playListDetailInfo,
    albumDetailInfo,
  },
});
