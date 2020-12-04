<template>
  <div class="container1">
    <div class="nav_list">
      <div class="content">
        <div class="logo">
          <img src="./../assets/logo.png" alt />
        </div>
        <!-- <div class="search_box">
          <div class="drop_down_list">
            <div class="drop_title">
              <span>{{searchTypeText}}</span>
              <img src="../assets/button_home_choice.png" class="icon" />
            </div>
            <div class="list_box">
              <template v-for="item in searchList">
                <span
                  class="item"
                  @click="selectSearchType(item)"
                  :key="item.id"
                >{{item.searchType}}</span>
              </template>
            </div>
          </div>
          <div class="input_box">
            <input
              type="text"
              v-model="keyword"
              @keyup.enter="handkeSearchCom"
              placeholder="输入搜索内容"
            />
          </div>
          <div class="comfirm_input" @click="handkeSearchCom">
            <img src="../assets/button_home_search.png" alt />
          </div>
        </div> -->
        <div class="tab_list">
          <ul>
            <template v-for="item in navList">
              <li :key="item.pathName" :class="{active: item.url === $route.path}">
                <div class="title" @click="rouerTo(item)">{{item.pathName}}</div>
                <div class="child_jt" v-if="item.childList"></div>
                <div class="child_item" v-if="item.childList">
                  <template v-for="itemChild in item.childList">
                    <div :key="itemChild.pathName" class="item" @click="rouerTo(itemChild)">
                      <img v-if="itemChild.icon" :src="itemChild.icon" alt />
                      {{itemChild.pathName}}
                    </div>
                  </template>
                  <div class="item zx" v-if="userInfo && item.pathName === '个人中心'" @click="rouerToZX()">注销登录</div>
                </div>
              </li>
            </template>
          </ul>
        </div>
        <div class="user_center">
          <div class="login" @click="loginHandle" v-if="!userInfo">登录 | 注册</div>
          <div class="avatar" @click="userCenter" v-else :style="`background-image: url(${userInfo.icon})`">
            <!-- <img :src="userInfo.icon" alt /> -->
          </div>
        </div>
      </div>
    </div>
    <transition name="fade">
      <login-box v-if="loginShow"></login-box>
    </transition>
  </div>
</template>

<script>
import { navParams } from "@/mixins/navParams.js";
export default {
  name: "HeadNav",
  mixins: [navParams]
};
</script>

<style lang="less" scoped>
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translate3d(0, 100%, 0);
}

.nav_list {
  width: 100%;
  z-index: 2;
  position: relative;
  box-shadow: 0px 2px 4px 0px rgba(158, 158, 158, 0.1);
  .content {
    display: flex;
    align-items: center;
    height: 80px;
    .search_box {
      margin-left: 40px;
      display: flex;
      align-items: center;
      width: 370px;
      height: 46px;
      border: 1px solid #e8e8e8;
      border-radius: 23px;
      padding: 0 20px;
      .drop_down_list {
        position: relative;
        .drop_title {
          display: flex;
          align-items: center;
          font-size: 16px;
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
          font-size: 14px;
          top: 48px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          color: #282828;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 90px;
          max-height: 0;
          transition: all 0.4s;
          overflow: hidden;
          opacity: 0;
          .item {
            margin-top: 25px;
            cursor: pointer;
            &:hover {
              color: #f57425;
            }
            &:last-child {
              margin-bottom: 25px;
            }
          }
        }
        &:hover {
          .list_box {
            max-height: 300px;
            opacity: 1;
          }
        }
      }
      .input_box {
        flex: 1;
        padding: 0 15px;
        input {
          max-width: 100%;
          max-height: 100%;
          border: none;
          font-size: 16px;
          color: #282828;
          &::placeholder {
            font-size: 16px;
            color: #d2d2d2;
          }
        }
      }
      .comfirm_input {
        cursor: pointer;
      }
    }
    .tab_list {
      flex: 1;
      ul {
        display: flex;
        justify-content: flex-end;
        li {
          margin-right: 60px;
          height: 80px;
          display: flex;
          align-items: center;
          position: relative;
          .title {
            font-weight: 300;
            font-size: 16px;
            color: #282828;
            cursor: pointer;
          }
          .child_jt {
            transition: all 0.4s;
            content: "";
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            width: 22px;
            display: block;
            height: 8px;
            top: 83px;
            background-repeat: no-repeat;
            background-image: url("../assets/icon_home_triangle.png");
            background-size: contain;
            opacity: 0;
          }
          .child_item {
            transition: all 0.4s;
            font-size: 14px;
            opacity: 0;
            background: #fff;
            color: #282828;
            position: absolute;
            top: 90px;
            overflow: hidden;
            left: 50%;
            transform: translateX(-50%);
            max-height: 0;
            width: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            border: 1px solid rgba(248, 248, 248, 1);
            box-shadow: 2px 3px 8px 0px rgba(158, 158, 158, 0.1);
            border-radius: 10px;
            .item {
              margin-top: 25px;
              cursor: pointer;
              display: flex;
              align-items: center;
              img {
                margin-right: 3px;
              }
              &:last-child {
                margin-bottom: 25px;
              }
              &:hover {
                color: #f57425;
              }
              &.zx {
                color: #f57425;
              }
            }
          }
          &:hover {
            .title {
              font-weight: bold;
            }
            .child_jt {
              opacity: 1;
              transition: all 0.4s;
            }
            .child_item {
              max-height: 500px;
              opacity: 1;
              transition: all 0.4s;
            }
          }
          &.active {
            .title {
              font-weight: bold;
            }
          }
        }
      }
    }
    .user_center {
      .avatar {
        border-radius: 50%;
        width: 52px;
        height: 52px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        background-size: cover;
        background-repeat: no-repeat;
        // img {
        //   max-width: 100%;
        //   max-height: 100%;
        // }
      }
      .login {
        font-size: 16px;
        color: #f57425;
        cursor: pointer;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .nav_list {
    display: none;
  }
}
</style>