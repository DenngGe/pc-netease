<template>
  <div class="searchDetail">
    <div class="searchDetail-name">搜索 漠河舞厅</div>
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
    };
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
