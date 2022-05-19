<template>
  <div class="navbar">
    <div class="container">
      <!-- 左侧导航栏 -->
      <div class="aside">
        <ul class="title">
          <li
            @click="toPage(title)"
            :class="{ titleActive: currentIndex === title.id }"
            v-for="title in titleList"
            :key="title.id"
          >
            {{ title.titleName }}
          </li>
        </ul>
        <div class="mine-music">
          <span>我的音乐</span>
          <ul>
            <li
              @click="toPage(mine)"
              :class="{ mineMusicActive: currentIndex === mine.id }"
              v-for="mine in mineMusic"
              :key="mine.id"
            >
              <i class="iconfont" :class="mine.icon"></i>{{ mine.mineName }}
            </li>
          </ul>
        </div>
        <div class="created-playlist">
          <span>创建的歌单<i class="iconfont icon-yousanjiao"></i></span>
        </div>
        <div class="store-playlist">
          <span>收藏的歌单<i class="iconfont icon-yousanjiao"></i></span>
        </div>
      </div>
      <div class="main">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import titleList from "./localData/titleList.json";
import mineMusic from "./localData/mineMusic.json";
export default {
  name: "Navbar",
  data() {
    return {
      currentIndex: 0,
      titleList,
      mineMusic,
    };
  },
  methods: {
    toPage(item) {
      (this.currentIndex = item.id), this.$router.push(`/app/${item.to}`);
    },
  },
};
</script>

<style lang="less" scoped>
.navbar {
  .container {
    display: flex;
    height: 100%;
    box-sizing: border-box;
    .aside {
      width: 20%;
      border-right: 1px solid #444;
      padding: 10px 4px 10px 10px;
      .title {
        li {
          box-sizing: border-box;
          height: 38px;
          line-height: 38px;
          font-size: 14px;
          font-weight: 400;
          padding-left: 10px;
          &:hover {
            color: #fff;
            background-color: #333;
            cursor: pointer;
          }
        }
        .titleActive {
          font-size: 16px;
          font-weight: 700;
          background-color: #333;
        }
      }
      .mine-music {
        padding-top: 14px;
        span {
          color: #7c7c7c;
          font-size: 12px;
          padding-left: 10px;
        }
        ul {
          padding-top: 6px;
          li {
            box-sizing: border-box;
            height: 38px;
            line-height: 38px;
            font-size: 14px;
            font-weight: 400;
            padding-left: 10px;
            &:hover {
              color: #fff;
              background-color: #333;
              cursor: pointer;
            }
            .iconfont {
              color: #b5b5b5;
              font-size: 14px;
              padding-right: 6px;
            }
          }
          .mineMusicActive {
            background-color: #333;
          }
        }
      }
      .created-playlist {
        padding-top: 16px;
        span {
          color: #7c7c7c;
          font-size: 12px;
          padding-left: 10px;
          &:hover {
            cursor: default;
          }
          .iconfont {
            font-size: 14px;
            color: #555;
          }
        }
      }
      .store-playlist {
        padding-top: 20px;
        span {
          color: #7c7c7c;
          font-size: 12px;
          padding-left: 10px;
          &:hover {
            cursor: default;
          }
          .iconfont {
            font-size: 14px;
            color: #555;
          }
        }
      }
    }
    .main {
      width: 80%;
      min-width: 600px;
      max-width: 1000px;
      margin: 0 auto;
      box-sizing: border-box;
      overflow: auto;
      height: calc(100vh - 135px);
      padding-right: 20px;
      &::-webkit-scrollbar {
        width: 0 !important;
      }
      h1 {
        color: #fff;
      }
    }
  }
}
</style>
