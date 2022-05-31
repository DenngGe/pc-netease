<template>
  <header>
    <div class="container">
      <div class="header-body">
        <!-- logo和搜索框 -->
        <div class="header-body-left">
          <div id="logo">
            <a><i class="iconfont icon-logView"></i></a>
          </div>
          <div id="search">
            <a><i class="iconfont icon-jiantouzuo"></i></a>
            <a><i class="iconfont icon-jiantouyou"></i></a>
            <a><i class="iconfont icon-sousuo"></i></a>
            <input
              type="text"
              :placeholder="defaultSearchKeyword.showKeyword"
              data-searchPageControl="true"
              @focus="updateSearchInfo"
              v-model="searchInfo.keyword"
              @keydown.enter="saveSearchHistory"
            />
            <a><i class="iconfont icon-tinggeshiqu"></i></a>
          </div>
        </div>
        <!-- 用户和设置 -->
        <div class="header-body-right">
          <div id="userInfo">
            <i
              @click="loginAboutInfo.showLoginPage = true"
              v-if="!loginAboutInfo.isLogin"
              class="iconfont icon-touxiang"
            ></i>
            <img
              v-if="loginAboutInfo.isLogin"
              :src="userDetailInfo.profile.avatarUrl"
            />
          </div>
          <div class="member-setting">
            <div id="member-setting-name">
              <span
                @click="loginAboutInfo.showLoginPage = true"
                v-if="!loginAboutInfo.isLogin"
                >未登录</span
              >
              <span
                v-if="loginAboutInfo.isLogin"
                @click="changeShowDetailUserInfo"
                data-detailuserinfopagecontrol="true"
                >{{ userDetailInfo.profile.nickname }}</span
              >
              <i
                @click="changeShowDetailUserInfo"
                data-detailuserinfopagecontrol="true"
                v-if="loginAboutInfo.isLogin"
                class="iconfont icon-gequshenhe"
              ></i>
              <i class="iconfont icon-xiasanjiao"></i>
            </div>
          </div>
          <ul class="other-setting">
            <li><i class="iconfont icon-weikaitongvip"></i></li>
            <li><i class="iconfont icon-pifu"></i></li>
            <li><i class="iconfont icon-shezhi"></i></li>
            <li><i class="iconfont icon-xiaoxi"></i></li>
          </ul>
        </div>
      </div>
      <!-- 用户登陆页面 -->
      <div
        v-if="loginAboutInfo.showLoginPage"
        class="user-login"
        @click="closeCountryCodePage"
      >
        <div class="top-icon">
          <i class="iconfont icon-saomadenglu1"></i>
          <i
            @click="loginAboutInfo.showLoginPage = false"
            class="iconfont icon-shanchushaixuanxiang"
          ></i>
        </div>
        <div class="login-info">
          <div class="login-info-input">
            <div class="login-info-input-phone">
              <div
                class="countries"
                @click="loginAboutInfo.showCountryCodePage = true"
              >
                <i
                  data-countryCodeControl="true"
                  class="iconfont icon-shouji"
                ></i>
                <span data-countryCodeControl="true"
                  >+{{ loginAboutInfo.loginCountryCode
                  }}<i
                    data-countryCodeControl="true"
                    class="iconfont icon-xiasanjiao"
                  ></i
                ></span>
              </div>
              <input
                :class="{ invalid: errors.has('phone') }"
                v-validate="{ required: true, regex: /^1\d{10}$/ }"
                name="phone"
                placeholder="请输入手机号"
                v-model="loginAboutInfo.phone"
              />

              <ul v-if="loginAboutInfo.showCountryCodePage">
                <li
                  v-for="countryCode in countryCodeList"
                  :key="countryCode.code"
                  @click="loginAboutInfo.loginCountryCode = countryCode.code"
                >
                  <span class="countries-name">{{ countryCode.zh }}</span
                  ><span class="countries-num">+{{ countryCode.code }}</span>
                </li>
              </ul>
            </div>
            <div class="login-info-input-password">
              <i class="iconfont icon-jiesuo"></i>
              <input
                type="password"
                placeholder="请输入密码"
                v-model="loginAboutInfo.password"
              />
              <span>重设密码</span>
            </div>
          </div>
          <div class="login-info-setting">
            <div class="login-auto">
              <input type="checkbox" v-model="loginAboutInfo.agreeAutoLogin" />
              <span>自动登录</span>
              <span class="error-msg">{{ errors.first("phone") }}</span>
            </div>
            <div class="login-btn">
              <el-button class="login-click-btn" :plain="true" @click="login"
                >登录</el-button
              >
              <p>注册</p>
            </div>
          </div>
        </div>
        <div class="bottom-icon">
          <i class="iconfont icon-weixin"></i>
          <i class="iconfont icon-qq"></i>
          <i class="iconfont icon-sina"></i>
          <i class="iconfont icon-wangyi"></i>
        </div>
        <div class="agree">
          <input type="checkbox" v-model="loginAboutInfo.agreePolicy" />
          <span
            >同意
            <a>《服务条款》</a>
            <a>《隐私政策》</a>
            <a>《儿童隐私政策》</a></span
          >
        </div>
      </div>
      <!-- 大搜索框 -->
      <div
        class="searchbox"
        v-show="searchInfo.showSearchPage"
        data-searchPageControl="true"
      >
        <div
          class="search-history"
          data-searchPageControl="true"
          v-if="searchInfo.historyList.length > 0"
        >
          <div class="search-history-title" data-searchPageControl="true">
            <span class="left" data-searchPageControl="true"
              >搜索历史<i
                class="iconfont icon-icon"
                data-searchPageControl="true"
                @click="removeAllKeyword"
              ></i
            ></span>
            <span
              class="right"
              data-searchPageControl="true"
              @click="checkAllSearchHistory"
              v-show="searchInfo.showCheckAll"
              >查看全部</span
            >
          </div>
          <ul
            ref="searchHistory"
            class="search-history-container"
            :class="{ 'search-history-checkAll': !searchInfo.checkAll }"
            data-searchPageControl="true"
          >
            <li
              class="search-history-container-item"
              v-for="(searchHistory, index) in searchHistoryList"
              :key="index"
            >
              {{ searchHistory }}
              <i
                class="iconfont icon-chacha"
                data-searchPageControl="true"
                @click="deleteCurrentSearchHistory(searchHistory)"
              ></i>
            </li>
          </ul>
        </div>
        <div class="hot-search-list">
          <div class="hot-search-list-title" data-searchPageControl="true">
            <span data-searchPageControl="true">热搜榜</span>
          </div>
          <ul class="hot-search-list-container">
            <li
              class="hot-search-list-item"
              v-for="(item, index) in hotSearch"
              :key="index"
            >
              <span
                class="item-num"
                :class="{ colorRed: index === 0 || index === 1 || index === 2 }"
                >{{ index + 1 }}</span
              >
              <div class="item-detail">
                <div class="item-detail-title">
                  <span class="title-name">{{ item.searchWord }}</span>
                  <span class="title-score">{{ item.score }}</span>
                  <img :src="item.iconUrl" class="title-icon" />
                </div>
                <span class="item-detail-content" v-show="item.content">
                  {{ item.content }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 用户信息大框 -->
      <div
        v-show="detailUserAboutinfo.showDetailUserInfo"
        class="detailUserInfoBox"
      >
        <div class="socail-contact">
          <ul>
            <li>
              <p class="num">0</p>
              <p class="word">动态</p>
            </li>
            <li>
              <p class="num">4</p>
              <p class="word">关注</p>
            </li>
            <li>
              <p class="num">5</p>
              <p class="word">粉丝</p>
            </li>
          </ul>
        </div>
        <div class="check-in">
          <button
            data-detailuserinfopagecontrol="true"
            v-if="!detailUserAboutinfo.isCheckedIn"
            @click="changeIsCheckedIn"
          >
            签到
          </button>
          <button v-if="detailUserAboutinfo.isCheckedIn" class="checkedIn">
            已签到
          </button>
        </div>
        <div class="detailUserInfoSetting">
          <ul>
            <li>
              <div>
                <span class="left"
                  ><i class="iconfont icon-huiyuan"></i>我的会员</span
                ><span class="right"
                  >2022.03.20到期<i class="iconfont icon-jiantouyou-copy"></i
                ></span>
              </div>
            </li>
            <li>
              <div>
                <span class="left"
                  ><i class="iconfont icon-31huiyuan"></i>等级</span
                ><span class="right"
                  ><i class="iconfont icon-dengjizhongxin"></i>8<i
                    class="iconfont icon-jiantouyou-copy"
                  ></i
                ></span>
              </div>
            </li>
            <li>
              <div>
                <span class="left"
                  ><i class="iconfont icon-shouye"></i>商城</span
                ><span class="right"
                  ><i class="iconfont icon-jiantouyou-copy"></i
                ></span>
              </div>
            </li>
            <li>
              <div>
                <span class="left"
                  ><i class="iconfont icon-gerenzhongxin-gerenxinxi"></i
                  >个人信息设置</span
                >
                <span class="right"
                  ><i class="iconfont icon-jiantouyou-copy"></i
                ></span>
              </div>
            </li>
            <li>
              <div>
                <span class="left"
                  ><i class="iconfont icon-bangding"></i>绑定社交帐号</span
                >
                <span class="right"
                  ><i class="iconfont icon-sina"></i
                  ><i class="iconfont icon-jiantouyou-copy"></i
                ></span>
              </div>
            </li>
            <li>
              <div>
                <span class="left"
                  ><i class="iconfont icon-kefu1"></i>我的客服</span
                >
                <span class="right"
                  ><i class="iconfont icon-jiantouyou-copy"></i
                ></span>
              </div>
            </li>
            <li @click="userLogout">
              <div>
                <span class="left"
                  ><i class="iconfont icon-tuichu"></i>退出登录</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      loginAboutInfo: {
        isLogin: false,
        showLoginPage: false,
        showCountryCodePage: false,
        loginCountryCode: "86",
        phone: "",
        password: "",
        agreePolicy: true,
        agreeAutoLogin: false,
      },
      detailUserAboutinfo: {
        isCheckedIn: false,
        showDetailUserInfo: false,
      },
      searchInfo: {
        showSearchPage: false,
        keyword: "",
        historyList: [],
        checkAll: false,
        showCheckAll: true,
      },
    };
  },
  mounted() {
    // 获取国家编号
    this.$store.dispatch("getLoginCountryCodeList");
    this.updateDefaultSearchKeyword();
    this.$bus.$on("clickTarget", this.closeTargetPage);
    this.getSearchHistory();
  },
  computed: {
    ...mapState({
      countryCodeList: (state) =>
        state.header.loginCountryCodeList[0].countryList,
      defaultSearchKeyword: (state) => state.header.defaultSearchKeyword,
      hotSearch: (state) => state.header.hotSearch,
    }),
    ...mapGetters(["userDetailInfo"]),
    searchHistoryList() {
      return [...this.searchInfo.historyList].reverse();
    },
  },
  methods: {
    // 改变签到状态
    changeIsCheckedIn() {
      setTimeout(() => {
        this.detailUserAboutinfo.isCheckedIn = true;
      }, 0);
    },
    // 判断是否需要关闭点击页面
    closeTargetPage(target) {
      if (!target.detailuserinfopagecontrol) {
        this.detailUserAboutinfo.showDetailUserInfo = false;
      }
      if (!target.searchpagecontrol) {
        this.searchInfo.showSearchPage = false;
      }
    },
    // 关闭国家编码页面
    closeCountryCodePage(e) {
      // 判断是否点击到国家编码显示框
      if (!e.target.dataset.countrycodecontrol) {
        this.loginAboutInfo.showCountryCodePage = false;
      }
    },
    // 登录按钮
    async login() {
      try {
        let { phone, password } = this.loginAboutInfo;
        // 判断是否勾选同意政策
        if (this.loginAboutInfo.agreePolicy) {
          await this.$store.dispatch("getPhoneLoginInfo", {
            phone,
            password,
          });
          this.loginAboutInfo.showLoginPage = false;
          this.$store.dispatch("getLoginState");
        } else {
          // 没有勾选则弹出提示框
          this.$message({
            message: "请先勾选同意《服务条款》、《隐私政策》、《儿童隐私政策》",
            type: "error",
            offset: 165,
            duration: 2000,
          });
        }
      } catch (error) {
        // 如果密码错误弹出提示框
        this.$message({
          message: "手机号或密码错误",
          type: "error",
          offset: 165,
          duration: 2000,
        });
      }
    },
    // 退出登录
    async userLogout() {
      await this.$store.dispatch("userLogout");
      this.$store.dispatch("getLoginState");
    },
    // 显示用户信息设置
    changeShowDetailUserInfo() {
      this.detailUserAboutinfo.showDetailUserInfo = true;
    },
    // 更新默认搜索关键词
    updateDefaultSearchKeyword() {
      this.$store.dispatch("getDefaultSearchKeyword");
    },
    // 更新热搜详情
    updateHotSearch() {
      this.$store.dispatch("getHotSearch");
    },
    // 更新搜索框内容
    updateSearchInfo() {
      this.updateDefaultSearchKeyword();
      this.updateHotSearch();
      this.searchInfo.showSearchPage = true;
      this.searchInfo.checkAll = false;
      this.getSearchHistoryHeight();
    },
    // 保存搜索记录
    saveSearchHistory(e) {
      if (e && this.searchInfo.keyword === "") {
        this.searchInfo.keyword = e.target.placeholder;
      }
      const arr = new Set(this.searchInfo.historyList);
      arr.delete(this.searchInfo.keyword);
      if (this.searchInfo.keyword !== "") {
        arr.add(this.searchInfo.keyword);
      }
      this.searchInfo.historyList = Array.from(arr);
      localStorage.setItem(
        "keyword",
        JSON.stringify(this.searchInfo.historyList)
      );
      this.searchInfo.keyword = "";
      this.searchInfo.showSearchPage = false;
      if (e) {
        e.target.blur();
      }
    },
    // 获取搜索记录
    getSearchHistory() {
      this.searchInfo.historyList = JSON.parse(
        localStorage.getItem("keyword") || "[]"
      );
    },
    // 删除选中历史记录
    deleteCurrentSearchHistory(history) {
      let delIndex = this.searchInfo.historyList.findIndex(
        (item) => item === history
      );
      this.searchInfo.historyList.splice(delIndex, 1);
      this.saveSearchHistory();
      this.searchInfo.showSearchPage = true;
    },
    // 清空历史记录
    removeAllKeyword() {
      localStorage.removeItem("keyword");
      this.searchInfo.historyList = [];
    },
    // 查看所有搜索记录
    checkAllSearchHistory() {
      this.searchInfo.checkAll = true;
      this.searchInfo.showCheckAll = false;
    },
    // 更新搜索记录高度判断是否展示查看全部
    getSearchHistoryHeight() {
      this.$nextTick(() => {
        if (this.$refs.searchHistory) {
          let osHeight = `${this.$refs.searchHistory.offsetHeight}px`;
          let mHeight = window.getComputedStyle(
            this.$refs.searchHistory
          ).maxHeight;
          if (osHeight === mHeight) {
            this.searchInfo.showCheckAll = true;
          } else {
            this.searchInfo.showCheckAll = false;
          }
        }
      });
    },
  },
  watch: {
    userDetailInfo: {
      deep: true,
      handler(newValue) {
        this.loginAboutInfo.isLogin =
          this.userDetailInfo.profile !== null ? true : false;
      },
    },
  },
};
</script>

<style lang="less" scoped>
header {
  background-color: #222225;
  box-sizing: border-box;
  border-bottom: 1px solid #991919;
  .container {
    margin: 0 auto;
    height: 60px;
    position: relative;
    padding-right: 20px;
    .header-body {
      line-height: 60px;
      display: flex;
      justify-content: space-between;
      .header-body-left {
        display: flex;
        #logo {
          height: 60px;
          .icon-logView {
            font-size: 42px;
            color: #fff;
          }
        }
        #search {
          padding-left: 64px;
          a {
            position: relative;
            .icon-jiantouzuo,
            .icon-jiantouyou {
              font-size: 12px;
              padding: 0 10px;
              color: #7c7c7c;
            }
            .icon-sousuo {
              font-size: 14px;
              color: #d5d5d5;
              position: absolute;
              left: 22px;
              cursor: default;
            }
            .icon-tinggeshiqu {
              color: #d5d5d5;
              padding-left: 16px;
              font-size: 14px;
            }
          }
          input {
            box-sizing: border-box;
            width: 160px;
            height: 34px;
            margin-left: 12px;
            padding-left: 32px;
            line-height: 34px;
            border: 0;
            border-radius: 17px;
            background-color: #2b2b2e;
            font-size: 12px;
            color: #fff;
          }
        }
      }
      .header-body-right {
        display: flex;
        & > * {
          padding: 0 4px;
        }
        #userInfo {
          .icon-touxiang {
            font-size: 30px;
            vertical-align: middle;
          }
          img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            vertical-align: middle;
          }
          &:hover {
            cursor: pointer;
          }
        }
        .member-setting {
          cursor: pointer;
          #member-setting-name {
            span {
              padding-right: 6px;
              vertical-align: middle;
            }
            .icon-gequshenhe {
              color: #ff5555;
              padding-right: 2px;
              vertical-align: middle;
            }
            .icon-xiasanjiao {
              font-size: 12px;
              color: #909295;
              vertical-align: middle;
            }
          }
        }
        .other-setting {
          display: flex;
          li {
            .iconfont {
              color: #ccc;
              cursor: pointer;
              vertical-align: middle;
            }
            .icon-pifu {
              font-size: 18px;
            }
            .icon-weikaitongvip {
              font-size: 24px;
            }
            .icon-shezhi {
              font-size: 18px;
            }
            .icon-xiaoxi {
              font-size: 18px;
            }
            & + li {
              padding-left: 24px;
            }
          }
        }
      }
    }
    .user-login {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translateX(-50%);
      width: 350px;
      height: 530px;
      background: url(./images/login-background.png);
      z-index: 999;
      .top-icon {
        position: relative;
        height: 60px;
        .iconfont {
          position: absolute;
        }
        .icon-saomadenglu1 {
          font-size: 56px;
          color: #000;
          top: -2px;
          left: -2px;
          cursor: pointer;
        }
        .icon-shanchushaixuanxiang {
          font-size: 26px;
          top: 0px;
          right: 4px;
        }
      }
      .login-info {
        margin: auto;
        margin-top: 140px;
        width: 260px;
        height: 200px;
        box-sizing: border-box;
        .login-info-input {
          box-sizing: border-box;

          height: 80px;
          margin: auto;
          background-color: #fff;
          display: flex;
          flex-direction: column;
          border: 1px solid #d8d8d8;
          border-radius: 4px;
          .login-info-input-phone {
            position: relative;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            border-bottom: 1px solid #d8d8d8;
            .countries {
              width: 80px;
              line-height: 36px;
              border-right: 1px solid #d8d8d8;
              display: flex;
              justify-content: space-around;
              align-items: center;
              .iconfont {
                color: #999;
              }
              .icon-shouji {
                font-size: 20px;
              }
              span {
                color: #000;
                .icon-xiasanjiao {
                  font-size: 12px;
                  padding: 0px 8px;
                }
              }
            }
            input {
              margin: 0 8px;
              height: 100%;
              border: 0;
            }
            ul {
              color: #000;
              background-color: #fff;
              position: absolute;
              top: 36px;
              width: 100%;
              z-index: 999;
              border: 1px solid #d8d8d8;
              li {
                height: 26px;
                line-height: 26px;
                padding: 0 10px;
                cursor: pointer;
                span {
                  height: 26px;
                }
                .countries-name {
                  float: left;
                }
                .countries-num {
                  float: right;
                }
                &:hover {
                  background-color: #e4e5e7;
                }
              }
            }
          }
          .login-info-input-password {
            box-sizing: border-box;
            line-height: 40px;
            display: flex;
            justify-content: space-around;
            .iconfont {
              font-size: 18px;
              color: #999;
              margin-left: -2px;
            }
            input {
              border: 0;
            }
            span {
              color: #b3b3b3;
            }
          }
        }
        .login-info-setting {
          .login-auto {
            line-height: 40px;
            display: flex;
            align-items: center;
            position: relative;
            input {
              margin: 0 6px;
            }
            span {
              display: inline-block;
              color: #666666;
            }
            span:nth-child(3) {
              color: red;
              position: absolute;
              right: 0;
            }
          }
          .login-btn {
            box-sizing: border-box;
            .login-click-btn {
              display: block;
              color: #fff;
              width: 100%;
              height: 36px;
              background-color: #ea4848;
              border: 0;
              border-radius: 4px;
              font-size: 16px;
              cursor: pointer;
            }
            p {
              font-size: 12px;
              text-align: center;
              line-height: 40px;
              color: #333;
              text-decoration: underline;
              cursor: pointer;
            }
          }
        }
      }
      .bottom-icon {
        text-align: center;
        .iconfont {
          font-size: 40px;
          padding: 0 14px;
          cursor: pointer;
        }
        .icon-weixin {
          color: #67b633;
        }
        .icon-qq {
          color: #34a0df;
        }
        .icon-sina {
          color: #ea4848;
        }
        .icon-wangyi {
          color: #d8544c;
        }
      }
      .agree {
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 90px;
        span {
          padding-left: 4px;
          color: #cf9fcf;
          cursor: default;
          a {
            color: #507daf;
            cursor: pointer;
          }
        }
      }
    }
    .searchbox {
      overflow: auto;
      padding: 14px 0;
      position: absolute;
      z-index: 999;
      left: 200px;
      top: 68px;
      width: 356px;
      height: 80vh;
      box-sizing: border-box;
      background-color: #363636;
      border-radius: 8px;
      box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      .search-history {
        padding: 0 20px;
        .search-history-title {
          display: flex;
          justify-content: space-between;
          margin-bottom: 12px;
          span {
            color: #909090;
          }
          .left {
            font-size: 14px;
            .icon-icon {
              padding-left: 4px;
              font-size: 14px;
            }
          }
          .icon-icon:hover,
          .right:hover {
            color: #aeaeae;
            cursor: pointer;
          }
        }
        .search-history-container {
          display: flex;
          flex-wrap: wrap;
          .search-history-container-item {
            height: 8px;
            line-height: 8px;
            margin: 1px 10px 12px 0;
            padding: 8px 16px;
            border: 1px solid #515151;
            border-radius: 12px;
            cursor: pointer;
            position: relative;
            &:hover {
              .icon-chacha {
                opacity: 1;
              }
            }
            .icon-chacha {
              position: absolute;
              top: 9px;
              font-size: 10px;
              color: #676767;
              opacity: 0;
              &:hover {
                color: #8c8c8c;
              }
            }
          }
        }
        .search-history-checkAll {
          max-height: 79px;
          overflow: hidden;
        }
      }
      .hot-search-list {
        .hot-search-list-title {
          margin: 4px 0 18px 0;
          padding: 0 20px;
          span {
            font-size: 14px;
            color: #909090;
          }
        }
        .hot-search-list-container {
          .hot-search-list-item {
            padding: 0 20px;
            box-sizing: border-box;
            height: 56px;
            display: flex;
            align-items: center;
            cursor: pointer;
            &:hover {
              background-color: #333;
              padding: 0 -50px;
            }
            .item-num {
              font-size: 14px;
              padding-right: 26px;
              color: #5e5e5e;
            }
            .colorRed {
              color: #ff3a3a;
            }
            .item-detail {
              display: flex;
              flex-direction: column;
              .item-detail-title {
                display: flex;
                align-items: center;
                .title-name {
                  font-size: 14px;
                  padding-right: 8px;
                }
                .title-score {
                  font-size: 10px;
                  padding-right: 8px;
                  color: #575757;
                }
                img {
                  height: 14px;
                }
              }
              .item-detail-content {
                color: #6e6e6e;
              }
            }
          }
        }
      }
    }
    .detailUserInfoBox {
      z-index: 999;
      position: absolute;
      right: 5vw;
      box-sizing: border-box;
      width: 280px;
      height: 420px;
      background-color: #363636;
      border-radius: 8px;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.7);
      .socail-contact {
        padding: 0 16px;

        ul {
          height: 70px;
          display: flex;
          justify-content: space-around;
          text-align: center;
          align-items: center;
          li {
            font-weight: 600;
            cursor: pointer;

            &:hover {
              .num {
                color: #fff;
              }
              .word {
                color: #b8b8b8;
              }
            }
            .num {
              font-size: 20px;
              color: #d6d6d6;
            }
            .word {
              color: #909090;
            }
          }
        }
      }
      .check-in {
        height: 50px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        button {
          color: #d5d5d5;
          width: 80px;
          line-height: 30px;
          background-color: transparent;
          border-radius: 15px;
          border: 1px solid #5e5e5e;
          cursor: pointer;
          &:hover {
            background-color: #444443;
          }
        }
        .checkedIn {
          background-color: #444443;
          color: #7b7b7b;
          cursor: default;
        }
      }
      .detailUserInfoSetting {
        ul {
          li {
            line-height: 40px;
            font-size: 14px;
            padding: 0 16px;
            cursor: pointer;
            &:hover {
              background-color: #414141;
            }
            &:nth-child(1) div,
            &:nth-child(4) div,
            &:nth-child(6) div,
            &:nth-child(7) div {
              border-top: 1px solid #484848;
            }
            div {
              display: flex;
              justify-content: space-between;
              .left {
                color: #d6d6d6;
                .iconfont {
                  padding-right: 6px;
                  font-size: 16px;
                }
              }
              .right {
                color: #7b7b7b;
                font-size: 12px;
                .icon-dengjizhongxin {
                  font-size: 16px;
                  padding-right: 4px;
                }
                .icon-sina {
                  color: #9a9a9a;
                  font-size: 16px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.el-message {
  width: 350px;
  min-width: 0;
}
</style>
