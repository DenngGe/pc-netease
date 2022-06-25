<template>
  <div id="app" @click="judgeClickTarget">
    <Header id="header" />
    <router-view class="middle"></router-view>
    <Footer id="footer" />
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 检查用户登录信息
    this.$store.dispatch("getLoginState");
  },
  methods: {
    judgeClickTarget(e) {
      this.$bus.$emit("clickTarget", e.target.dataset);
    },
  },
};
</script>

<style lang="less">
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  box-sizing: border-box;
  min-width: 1000px;
  min-height: 700px;

  .middle {
    flex: 1;
  }
}
</style>
