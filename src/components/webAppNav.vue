<template>
  <div class="app_warp">
    <div class="header">
      <div class="menu_bnt" @click="navShow = true">
        <img src="../assets/more.png" alt />
        <span>菜单</span>
      </div>
      <input type="text" v-model="searchType" hidden />
      <div class="logo">
        <img src="../assets/logo.png" alt />
      </div>
      <p>
        <span v-if="!userInfo" @click="loginHandle">登录|注册</span>
        <span
          v-else
          class="img"
          @click="userCenter"
          :style="`background-image: url(${userInfo.icon})`"
        ></span>
        <!-- <img v-else :src="userInfo.icon" alt /> -->
      </p>
    </div>
    <!-- <div class="search_box">
      <div class="drop_down_list">
        <div class="drop_title" @click.stop="searchTypeChange">
          <span>{{searchTypeText}}</span>
          <img src="../assets/button_home_choice.png" class="icon" />
        </div>
        <div class="list_box list_box_h" v-if="searchType">
          <template v-for="item in searchList">
            <span class="item" :key="item.id" @click="selectSearchType(item)">{{item.searchType}}</span>
          </template>
        </div>
      </div>
      <div class="input_box">
        <input type="text" @keyup.enter="handkeSearchCom" v-model="keyword" placeholder="输入搜索内容" />
      </div>
      <div class="comfirm_input" @click="handkeSearchCom">
        <img src="../assets/button_home_search.png" alt />
      </div>
    </div> -->
    <div class="app_nav" v-if="navShow" @click="navShow = false">
      <div class="main" @click.stop>
        <div class="tab_list">
          <ul>
            <template v-for="item in navList">
              <li :key="item.pathName" :class="{active: $route.path}">
                <div class="title" @click.stop="rouerTo(item)">
                  <span>{{item.pathName}}</span>
                  <div class="child_jt" v-if="item.childList">
                    <img src="../assets/button_home_next.png" alt />
                  </div>
                </div>
                <div class="child_item" v-if="item.childList && item.zd">
                  <template v-for="itemChild in item.childList">
                    <div
                      :key="itemChild.pathName"
                      class="item"
                      @click="rouerTo(itemChild),navShow=false"
                    >
                      <img v-if="itemChild.icon" :src="itemChild.icon" alt />
                      {{itemChild.pathName}}
                    </div>
                  </template>
                  <div
                    class="item zx"
                    v-if="userInfo && item.pathName === '个人中心'"
                    @click="rouerToZX(),navShow=false"
                  >注销登录</div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
    <transition name="fade">
      <login-box v-if="loginShow"></login-box>
    </transition>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { navParams } from "@/mixins/navParams.js";
export default {
  name: "HeadNav",
  data() {
    return {
      navShow: false
    };
  },
  computed: {
    ...mapState(["searchType"])
  },
  mixins: [navParams],
  methods: {
    ...mapMutations(["CHANGESERCHTYPE"]),
    searchTypeChange() {
      this.CHANGESERCHTYPE(!this.searchType);
    },
    selectSearchType(item) {
      this.searchTypeText = item.searchType;
      this.searchTypeId = item.id;
      if (this.searchType) {
        this.CHANGESERCHTYPE(false);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.app_warp {
  padding: 10px 15px;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .menu_bnt {
    width: 1.6rem;
    height: 0.4rem;
    display: flex;
    align-items: center;
    img {
      width: 0.48rem;
      height: 100%;
      margin-right: 0.133333rem;
    }
    span {
      font-size: 0.373333rem;
    }
  }
  .logo {
    img {
      width: 2.4rem;
    }
  }
  p {
    width: 1.6rem;
    text-align: right;
    font-size: 0.373333rem;
    color: #333;
    .img {
      display: inline-block;
      background-size: cover;
      background-repeat: no-repeat;
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 50%;
    }
  }
}
.search_box {
  margin-top: 0.266667rem;
  display: flex;
  align-items: center;
  width: 100%;
  height: 0.933333rem;
  border: 1px solid #e8e8e8;
  border-radius: 0.453333rem;
  padding: 0 0.4rem;
  .drop_down_list {
    position: relative;
    height: 100%;
    .drop_title {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 0.373333rem;
      color: #ababab;
      cursor: pointer;
      img {
        margin-left: 7px;
        background: #fff;
      }
    }
    .list_box {
      border: 1px solid rgba(248, 248, 248, 1);
      box-shadow: 2px 3px 8px 0px rgba(158, 158, 158, 0.1);
      position: absolute;
      font-size: 0.373333rem;
      top: 0.933333rem;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      color: #282828;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 2rem;
      max-height: 0;
      transition: all 0.4s;
      overflow: hidden;
      opacity: 0;
      .item {
        margin-top: 0.333333rem;
        cursor: pointer;
        &:hover {
          color: #f57425;
        }
        &:last-child {
          margin-bottom: 0.333333rem;
        }
      }
      &.list_box_h {
        max-height: 300px;
        opacity: 1;
        z-index: 3;
      }
    }
  }
  .input_box {
    flex: 1;
    padding: 0 0.4rem;
    height: 100%;
    display: flex;
    align-items: center;
    input {
      max-width: 100%;
      max-height: 100%;
      border: none;
      font-size: 0.373333rem;
      color: #282828;
      &::placeholder {
        font-size: 0.373333rem;
        color: #d2d2d2;
      }
    }
  }
  .comfirm_input {
    cursor: pointer;
  }
}
.app_nav {
  position: fixed;
  z-index: 4;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  left: 0;
  top: 0;
  width: 100vw;
  .main {
    width: 7rem;
    background: #fff;
    height: 100vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .tab_list {
    ul {
      display: flex;
      flex-direction: column;
      li {
        .title {
          padding: 0 0.4rem;
          margin-top: -1px;
          display: flex;
          height: 1.2rem;
          align-items: center;
          font-size: 0.426667rem;
          border-top: 1px solid #f8f8f8;
          border-bottom: 1px solid #f8f8f8;
          justify-content: space-between;
          .child_jt {
            img {
              transform: rotate(90deg);
              max-width: 0.4rem;
              max-height: 0.4rem;
            }
          }
        }
        .child_item {
          background: #f8f8f8;
          .item {
            font-size: 0.373333rem;
            padding: 0.366667rem 0.533333rem;
            img {
              max-width: 0.4rem;
            }
            &.zx {
              color: #f57425;
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .app_warp {
    display: none;
  }
}
@media screen and (max-width: 1200px) {
  .app_warp {
    display: block;
  }
}
</style>