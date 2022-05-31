<template>
  <div class="carousel" v-if="carouselList.length > 0">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="(item, index) in carouselList" :key="index">
        <img v-lazy="item.imageUrl" @click="switchToPage(item)" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CarouselPic",
  mounted() {
    this.$store.dispatch("getFindMusicCarouselList");
  },
  computed: {
    ...mapState({
      carouselList: (state) => state.PersonalCommend.findMusicCarouselList,
    }),
  },
  methods: {
    switchToPage(item) {
      let type = item.targetType;
      switch (type) {
        case 1:
          this.$bus.$emit("getSongId", item.targetId);
          break;
        case 10:
          alert("歌单还没做");
          break;
        case 3000:
          window.open(item.url);
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.carousel {
  padding: 20px 0;
}
img {
  border-radius: 8px;
  max-width: 100%;
  height: auto;
  background: center;
}
</style>
<style>
.el-carousel__mask {
  display: none;
}
.el-carousel__button {
  width: 8px;
  height: 8px;
  background-color: #2e3033;
  border-radius: 50%;
}
</style>
