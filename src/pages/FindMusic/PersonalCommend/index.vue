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
              <span class="playerDetail">{{ player.name }}</span>
              <span class="playerCount"
                ><i class="iconfont icon-24gl-play"></i
                >{{ showPlayCount(player.playCount) }}</span
              >
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
    showPlayCount() {
      return function (playCount) {
        let playCountStr = playCount.toString();
        let countLength = playCountStr.length;
        let showCount = "";
        if (countLength <= 5) {
          showCount = playCountStr;
        } else if (countLength <= 8) {
          showCount = `${playCountStr.slice(0, -4)}万`;
        } else {
          showCount = `${playCountStr.slice(0, -8)}亿`;
        }
        return showCount;
      };
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
        cursor: pointer;
        display: inline-block;
        &:hover {
          color: #fff;
        }
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
            margin: 12px 0;
            width: 18.5%;
            display: flex;
            flex-direction: column;
            position: relative;
            img {
              width: 100%;
              border-radius: 8px;
              cursor: pointer;
            }
            .playerDetail {
              font-size: 15px;
              cursor: pointer;
              &:hover {
                color: #fff;
              }
            }
            .playerCount {
              font-size: 12px;
              color: #fff;
              position: absolute;
              right: 8px;
              top: 2px;
              cursor: pointer;
              .iconfont {
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
