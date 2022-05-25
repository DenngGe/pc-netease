<template>
  <div class="personal-commend">
    <div class="container">
      <CarouselPic />
      <div class="commend-playlist">
        <h1>推荐歌单<i class="iconfont icon-jiantouyou"></i></h1>
        <div class="playerShow">
          <ul class="playerShowList">
            <li v-for="player in personalCommendList" :key="player.id">
              <img v-lazy="player.picUrl" />
              <span>{{ player.name }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "PersonalCommend",
  methods: {},
  mounted() {
    this.$store.dispatch("getPersonalCommend");
  },
  computed: {
    ...mapState({
      personalCommendList: (state) => state.PersonalCommend.personalCommendList,
    }),
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
      .playerShow {
        .playerShowList {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          li {
            padding: 12px 0;
            width: 18.5%;
            display: flex;
            flex-direction: column;
            img {
              width: 100%;
              border-radius: 8px;
              cursor: pointer;
            }
            span {
              font-size: 15px;
            }
          }
        }
      }
    }
  }
}
</style>
