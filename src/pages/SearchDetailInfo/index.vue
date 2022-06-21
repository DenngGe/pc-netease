<template>
  <div class="searchDetail">
    <div class="searchDetail-name">搜索 {{ keyword }}</div>
    <TitleClick
      :titleList="titleList"
      :queryMessage="$route.query"
    ></TitleClick>
  </div>
</template>

<script>
import titleList from "./localData/titleList.json";
export default {
  name: "SearchDetailInfo",
  data() {
    return {
      titleList,
      keyword: this.$route.query.keyword,
      local: {
        keyword: this.keyword,
        titleList,
      },
    };
  },
  watch: {
    $route() {
      this.keyword = this.$route.query.keyword;
    },
  },
};
</script>

<style lang="less" scoped>
.searchDetail {
  .searchDetail-name {
    padding-top: 20px;
    font-size: 20px;
    font-weight: 700;
  }
}
</style>
