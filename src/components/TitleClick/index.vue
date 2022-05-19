<template>
  <div class="container">
    <ul class="title">
      <li
        @click="toPage(title)"
        :class="{ active: currentIndex === title.id }"
        v-for="title in titleList"
        :key="title.id"
      >
        {{ title.titleName }}
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TitleClick",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["titleList", "queryMessage"],
  methods: {
    // 路由跳转
    toPage(item) {
      (this.currentIndex = item.id),
        this.$router.push({
          path: `/app/${item.to}`,
          query: this.queryMessage,
        });
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  .title {
    display: flex;
    align-items: center;
    li {
      font-size: 16px;
      margin: 20px 20px 20px 0px;
      position: relative;
      cursor: pointer;
    }
    .active {
      font-size: 20px;
      font-weight: 700;

      &::after {
        content: "";
        position: absolute;
        top: 116%;
        left: 10%;
        width: 80%;
        border-bottom: 3px solid #ec4141;
      }
    }
  }
}
</style>
