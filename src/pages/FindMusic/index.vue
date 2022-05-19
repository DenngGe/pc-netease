<template>
  <div class="findMusic">
    <TitleClick :titleList="titleList" />
  </div>
</template>

<script>
import titleList from "./localData/titleList.json";

export default {
  name: "FindMusic",
  data() {
    return {
      titleList,
    };
  },
};
</script>

<style lang="less" scoped></style>
