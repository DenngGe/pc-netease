import {
  reqLoginCountryCode,
  reqPhoneLogin,
  reqCheckLoginState,
  reqLogout,
} from "@/api";

const state = {
  loginCountryCodeList: [],
  loginInfo: {},
  userInfoNow: {},
};
const actions = {
  // 获取登陆界面国家编码列表
  async getLoginCountryCodeList({ commit }) {
    let result = await reqLoginCountryCode();
    if (result.data.code === 200) {
      commit("GETLOGINCOUNTRYCODELIST", result.data.data);
    }
  },
  // 获取手机登陆信息
  async getPhoneLoginInfo({ commit }, data) {
    let result = await reqPhoneLogin(data);
    if (result.data.code === 200) {
      commit("GETPHONELOGININFO", result.data);
    } else {
      return Promise.reject(new Error(result.data.msg));
    }
  },
  // 获取登录信息
  async getLoginState({ commit }) {
    let result = await reqCheckLoginState();
    if (result.data.data.code === 200) {
      commit("GETLOGINSTATE", result.data.data);
    }
  },
  // 退出登录
  async userLogout() {
    let result = await reqLogout();
    if (result.data.code === 200) {
      return "ok";
    }
  },
};
const mutations = {
  // 登陆界面国家编码列表
  GETLOGINCOUNTRYCODELIST(state, loginCountryCodeList) {
    state.loginCountryCodeList = loginCountryCodeList;
  },
  // 手机登陆信息
  GETPHONELOGININFO(state, loginInfo) {
    state.loginInfo = loginInfo;
  },
  // 查看登录信息
  GETLOGINSTATE(state, userInfoNow) {
    state.userInfoNow = userInfoNow;
  },
};
const getters = {
  userDetailInfo(state) {
    return state.userInfoNow || {};
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
