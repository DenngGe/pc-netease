<template>
  <div class="personal-commend">
    <div class="container">
      <CarouselPic />
      <div class="commend-playlist">
        <h1>推荐歌单<i class="iconfont icon-jiantouyou"></i></h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonalCommend",
  methods: {
    bbb() {
      console.log(this.$refs.aaa.ended);
    },
  },
};
</script>

<style lang="less" scoped>
.personal-commend {
  .container {
    .commend-playlist {
      h1 {
        font-size: 20px;
        font-weight: 700;
        .iconfont {
          padding-left: 4px;
        }
      }
    }
  }
}
</style>
