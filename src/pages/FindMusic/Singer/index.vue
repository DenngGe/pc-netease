<template>
  <div class="singer">
    <div class="container">
      <div class="choose">
        <dl class="language">
          <dt>语种：</dt>
          <dd
            @click="updateSingerList(languageItem)"
            :class="{ chooseActive: languageIndex === languageItem.area }"
            v-for="languageItem in language"
            :key="languageItem.area"
          >
            {{ languageItem.name }}
          </dd>
        </dl>
        <dl class="category">
          <dt>分类：</dt>
          <dd
            @click="updateSingerList(categoryItem)"
            :class="{ chooseActive: categoryIndex === categoryItem.type }"
            v-for="categoryItem in category"
            :key="categoryItem.type"
          >
            {{ categoryItem.name }}
          </dd>
        </dl>
        <dl class="screen">
          <dt>筛选：</dt>
          <div>
            <dd
              :initial="initial"
              @click="updateSingerList(screenItem)"
              :class="{ chooseActive: screenIndex === screenItem.initial }"
              v-for="screenItem in screen"
              :key="screenItem.id"
            >
              {{ screenItem.name }}
            </dd>
          </div>
        </dl>
      </div>
      <div class="singerShow">
        <ul class="singerShowList">
          <li v-for="singer in singerList" :key="singer.id">
            <img v-lazy="singer.img1v1Url" @click="goSingerDetail(singer)" />
            <div>
              <span @click="goSingerDetail(singer)">{{ singer.name }}</span>
              <i
                v-show="singer.accountId"
                class="iconfont icon-touxiang-daiyuankuang"
              ></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import language from "./localData/language.json";
import category from "./localData/category.json";
import screen from "./localData/screen.json";
import { mapState } from "vuex";

export default {
  name: "Singer",
  data() {
    return {
      language,
      category,
      screen,
      languageIndex: "-1",
      categoryIndex: "-1",
      screenIndex: "-1",
      area: "-1",
      type: "-1",
      initial: "-1",
    };
  },
  mounted() {
    this.updateSingerList({
      area: this.area,
      type: this.type,
      initial: this.initial,
    });
  },
  methods: {
    updateSingerList(item) {
      this.type = item.type ? item.type : this.type;
      this.area = item.area ? item.area : this.area;
      this.initial = item.initial ? item.initial : this.initial;
      if (item.area) {
        this.languageIndex = item.area;
        this.area = item.area;
      }
      if (item.type) {
        this.categoryIndex = item.type;
        this.type = item.type;
      }
      if (item.initial) {
        this.screenIndex = item.initial;
        this.initial = item.initial;
      }

      this.$store.dispatch("getSingerList", {
        area: this.area,
        type: this.type,
        initial: this.initial,
      });
    },
    goSingerDetail(singer) {
      let location = {
        name: "singerdetailinfo",
        query: {
          id: singer.id,
        },
      };
      this.$router.push(location);
    },
  },
  computed: {
    ...mapState({
      singerList: (state) => state.singer.artistsList,
    }),
  },
};
</script>

<style lang="less" scoped>
.singer {
  .container {
    margin: 0px 10px;
    .choose {
      dl {
        margin: 12px 0px;
        display: flex;
        color: #d0d0d0;
        &:last-child {
          div {
            flex: 1;
            display: flex;
            flex-wrap: wrap;
            dd {
              margin-bottom: 14px;
              width: 64px;
            }
          }
        }
        dt {
          width: 40px;
          cursor: default;
        }
        dd {
          width: 76px;
          text-align: center;
          color: #878787;
          border-right: 1px solid #343434;
          cursor: pointer;
          &:nth-child(2) {
            width: 64px;
          }
          &:last-child {
            border: none;
          }
          &:hover {
            color: #d0d0d0;
          }
        }
        .chooseActive {
          color: #ec4141;
        }
      }
    }
    .singerShow {
      .singerShowList {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        li {
          width: 18%;
          img {
            width: 100%;
            display: block;
            border-radius: 8px;
            cursor: pointer;
          }
          div {
            height: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2px;
            padding-bottom: 14px;
            span {
              font-size: 14px;
              cursor: pointer;
            }
            .iconfont {
              color: #f34942;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}
</style>
