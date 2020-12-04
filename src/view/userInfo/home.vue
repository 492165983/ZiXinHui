<template>
  <div class="container">
    <!-- 个人中心 -->
    <div class="content-wrapper">
      <div class="content">
        <!-- 个人中心左边列表 -->
        <div class="personal_center_left">
          <div class="user_msg">
            <div class="user_hander" :style="`background-image: url(${userInfo.icon})`">
              <!-- <img
                :src="userInfo.icon"
                alt
              />-->
            </div>
            <div class="user_name">{{userInfo.nickName}}</div>
          </div>
          <template v-for="item in menumList">
            <div class="msg_list" :key="item.titile">
              <div class="parent_list">
                <img :src="item.icon" alt />
                {{item.title}}
              </div>
              <div
                v-for="itemSon in item.arrList"
                :key="itemSon.titile"
                class="children_list"
                @click="toRight(itemSon)"
                :class="{selectedChildren: itemSon.path === currentRoute}"
              >
                <img :src="itemSon.path === currentRoute?itemSon.icon:itemSon.unIcon" alt />
                {{itemSon.title}}
              </div>
            </div>
          </template>
        </div>
        <!-- 分享记录-->
        <div class="personal_center_right">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import banner from "@/assets/banner.png";
// 我的产品
import icon_personal_product from "@/assets/icon_personal_product.png";
// 课程学习进度
import icon_personal_rate_selected from "@/assets/icon_personal_rate_selected.png";
import icon_personal_rate_unselected from "@/assets/icon_personal_rate_unselected.png";
// 我的收藏
import icon_personal_collect_selected from "@/assets/icon_personal_collect_selected.png";
import icon_personal_collect_unselected from "@/assets/icon_personal_collect_unselected.png";
// 浏览记录
import icon_personal_scan_selected from "@/assets/icon_personal_scan_selected.png";
import icon_personal_scan_unselected from "@/assets/icon_personal_scan_unselected.png";
// 我的订单
import icon_personal_order from "@/assets/icon_personal_order.png";
// 购买记录
import icon_personal_record_selected from "@/assets/icon_personal_record_selected.png";
import icon_personal_record_unselected from "@/assets/icon_personal_record_unselected.png";
// 我的VIP
import icon_personal_vip_selected from "@/assets/icon_personal_vip_selected.png";
import icon_personal_vip_unselected from "@/assets/icon_personal_vip_unselected.png";
// 账号设置
import icon_personal_setup from "@/assets/icon_personal_setup.png";
// 基本信息
import icon_personal_message_selected from "@/assets/icon_personal_message_selected.png";
import icon_personal_message_unselected from "@/assets/icon_personal_message_unselected.png";
// 安全设置
import icon_personal_safe_selected from "@/assets/icon_personal_safe_selected.png";
import icon_personal_safe_unselected from "@/assets/icon_personal_safe_unselected.png";
import { mapState } from "vuex";
export default {
  components: {},
  computed: {
    ...mapState(["userInfo"]),
    // eslint-disable-next-line vue/return-in-computed-property
    aafaf() {
      if (!this.userInfo) {
        this.$router.go(-1);
      }
    }
  },
  data() {
    return {
      banner,
      activePage: "",
      currentRoute: "",
      menumList: [
        {
          title: "我的产品",
          icon: icon_personal_product,
          arrList: [
            {
              title: "课程学习进度",
              path: "courseProgress",
              icon: icon_personal_rate_selected,
              unIcon: icon_personal_rate_unselected
            },
            {
              title: "我的收藏",
              path: "myCollection",
              icon: icon_personal_collect_selected,
              unIcon: icon_personal_collect_unselected
            },
            {
              title: "浏览记录",
              path: "borwseRecord",
              icon: icon_personal_scan_selected,
              unIcon: icon_personal_scan_unselected
            }
          ]
        },
        {
          title: "我的订单",
          icon: icon_personal_order,
          arrList: [
            {
              title: "购买记录",
              path: "purchaseHistory",
              icon: icon_personal_record_selected,
              unIcon: icon_personal_record_unselected
            },
            {
              title: "我的VIP",
              path: "myVip",
              icon: icon_personal_vip_selected,
              unIcon: icon_personal_vip_unselected
            }
          ]
        },
        {
          title: "账号设置",
          icon: icon_personal_setup,
          arrList: [
            {
              title: "基本信息",
              path: "basicInfo",
              icon: icon_personal_message_selected,
              unIcon: icon_personal_message_unselected
            },
            {
              title: "安全设置",
              path: "editPhone",
              icon: icon_personal_safe_selected,
              unIcon: icon_personal_safe_unselected
            }
          ]
        }
      ]
    };
  },
  mounted() {
    this.currentRoute = this.$router.currentRoute.name;
    if (!this.userInfo) {
      this.$router.go(-1);
    }
  },
  methods: {
    toRight(item) {
      if (this.currentRoute !== item.path) {
        this.currentRoute = item.path;
        this.$router.push({
          path: item.path
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content-wrapper {
  background: #f8f8f8;
  padding-top: 20px;
  padding-bottom: 131px;
}
.content {
  display: flex;
}
.personal_center_left {
  width: 250px;
  height: 788px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin-right: 50px;
  .user_msg {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    .user_hander {
      width: 118px;
      height: 118px;
      border-radius: 50%;
      margin-top: 30px;
      border: 1px solid #f7f7f7;
      background-size: cover;
      background-repeat: no-repeat;
      // img {
      //   width: 118px;
      //   height: 118px;
      //   border-radius: 50%;
      //   margin-top: 30px;
      // }
    }
    .user_name {
      // width: 100%;
      font-size: 20px;
      color: rgba(60, 60, 60, 1);
      margin-top: 30px;
      padding-bottom: 32px;
      border-bottom: 1px solid #f4f4f4;
    }
  }
  .msg_list {
    width: 100%;
    padding-left: 20px;

    .parent_list {
      display: flex;
      align-items: center;
      height: 52px;
      font-size: 18px;
      margin-top: 10px;

      font-weight: bold;
      color: rgba(60, 60, 60, 1);
    }
    .children_list {
      cursor: pointer;
      font-size: 16px;
      height: 52px;
      display: flex;
      align-items: center;
      padding-left: 60px;
      margin-left: -20px;
      color: rgba(158, 158, 158, 1);
    }
    .selectedChildren {
      color: #f57425;
      background: rgba(255, 241, 233, 1);
    }
    img {
      margin-right: 15px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .content-wrapper {
    background: #f8f8f8;
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }
  .content {
    display: flex;
  }
  .personal_center_left {
    display: none;
  }
  .personal_center_right {
    width: 100%;
  }
}
</style>
