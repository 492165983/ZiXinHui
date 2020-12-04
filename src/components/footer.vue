<template>
  <div>
    <footer>
      <div v-if="false" class="f_nav">
        <div class="content">
          <ul>
            <template v-for="(item,index) in navList">
              <li :key="index">
                <div class="tit">{{item.pathName}}</div>
                <div
                  class="item"
                  @click="rouerToa(itemS)"
                  v-for="(itemS, index) in item.childList"
                  :key="index"
                >{{itemS.pathName}}</div>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="content">
        <div class="lf">
          <div class="video_play">
            <img src="../assets/icon_copyright_information.png" alt />
          </div>
          <p class="company_profile">
            公司介绍：博弈视界以中国金融智能化为己任，旨在成为新金融的领军企业。
            它以金融科技为核心，以投资者教育为切入点，以社群关系为纽带，延伸到数据服务、资产配置服务并构筑基金经理孵化平台，完全打通金融生态中教育、数据、软件、社交、实战、游学等多种用户需求。其目标是打造成为全球最大的开放式金融综合服务平台，并将为中国金融业输送一万名优秀的基金经理。
            <br />深圳资信科技有限公司 版权所有 平台享有开放课程信息网络传播的专有使用权 未经书面允许，请勿转播
          </p>
          <div class="copyright" @click="beiAn">
            <div style="width:100%;margin:0 auto; padding:20px 0;">
              <a
                target="_blank"
                href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030602004278"
                style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
              >
                <img src="../assets/31297e598a8fa35a1b39a76c51dc295.png" style="float:left;" />
                <p
                  style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"
                >粤公网安备 44030602004278号</p>
              </a>
              <a
                target="_blank"
                style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
              >
                <p
                  style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"
                >粤ICP备19147825号-1</p>
              </a>
            </div>

            <!-- <div style="width:300px;margin:0 auto; padding:20px 0;">
              <a
                target="_blank"
                href=" "
                style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"
              >
                <img src="../assets/31297e598a8fa35a1b39a76c51dc295.png" style="float:left;" />
                <p
                  style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;"
                >粤公网安备 44030602004278号</p>
              </a>
            </div>-->
          </div>
        </div>
        <div class="rg">
          <div class="qr">
            <img src="../assets/qr.jpg" alt />
          </div>
          <span>关注官方微信公众号</span>
        </div>
      </div>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navList: [
        {
          // pathName: "资信科技",
          childList: [
            {
              pathName: "关于我们",
              url: "/aboutUs",
            },
            {
              pathName: "团队管理",
              url: "",
            },
            {
              pathName: "联系我们",
              url: "",
            },
          ],
        },
        {
          // pathName: "快捷链接",
          childList: [
            {
              pathName: "精品推荐",
              url: "",
            },
            {
              pathName: "视频课程",
              url: "",
            },
            {
              pathName: "最新报告",
              url: "",
            },
            {
              pathName: "资讯推荐",
              url: "",
            },
            {
              pathName: "活动新闻",
              url: "",
            },
          ],
        },
        {
          // pathName: "产品中心",
          childList: [
            {
              pathName: "视频课程",
              url: "/fullCourse",
            },
            {
              pathName: "投研报告",
              url: "/reportSeries",
            },
            {
              pathName: "音频课程",
              url: "/audioSeries",
            },
          ],
        },
        {
          // pathName: "资讯中心",
          url: "",
          childList: [
            {
              pathName: "专题",
              url: "",
            },
            {
              pathName: "热点掘金",
              url: "",
            },
            {
              pathName: "学习园地",
              url: "",
            },
          ],
        },
        {
          // pathName: "个人中心",
          url: "",
          childList: [
            {
              pathName: "我的收藏",
              url: "/userInfo/courseProgress",
            },
            {
              pathName: "浏览记录",
              url: "/userInfo/borwseRecord",
            },
            {
              pathName: "购买记录",
              url: "/userInfo/purchaseHistory",
            },
            {
              pathName: "安全设置",
              url: "/userInfo/editPhone",
            },
          ],
        },
      ],
    };
  },
  methods: {
    rouerToa(item) {
      if (item.url !== "" && this.$route.path !== item.url) {
        this.$router.push({ path: `${item.url}` });
      }
    },
    beiAn() {
      window.location.href =
        "http://gd.beian.miit.gov.cn/state/outPortal/loginPortal.action";
    },
  },
};
</script>

<style lang="less" scoped>
footer {
  width: 100%;
  .content {
    padding: 30px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .lf {
      display: flex;
      flex-direction: column;
      p.company_profile {
        font-size: 14px;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
        line-height: 32px;
        margin: 10px 0 5px;
      }
      p.copyright {
        font-size: 14px;
        font-weight: 400;
        color: rgba(128, 128, 128, 1);
        line-height: 32px;
      }
    }
    .rg {
      display: flex;
      flex-direction: column;
      align-items: center;
      img {
        max-width: 120px;
      }
      span {
        font-size: 12px;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
        line-height: 32px;
      }
    }
  }
  .f_nav {
    border-bottom: 2px solid #ebebeb;
    width: 100%;
    background: #f0f0f0;
    .content {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        display: none;
        width: 100%;
        height: 2px;
        background: #ebebeb;
        left: 0;
        top: 60px;
      }
    }
    ul {
      width: 100%;
      display: flex;
      justify-content: space-between;
      li {
        .tit {
          margin-bottom: 25px;
          color: #f57425;
          font-size: 20px;
          font-weight: bold;
        }
        .item,
        a {
          font-size: 14px;
          color: #282828;
          margin-bottom: 15px;
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  footer {
    .f_nav {
      .content {
        padding: 0.4rem;
        &::before {
          top: 1rem;
        }
      }
      ul {
        li {
          .tit {
            margin-bottom: 0.4rem;
            font-size: 0.373333rem;
          }
          .item {
            font-size: 0.32rem;
            margin-bottom: 0.266667rem;
          }
        }
      }
    }
    .content {
      padding: 0.4rem;
      flex-direction: column;
      .lf {
        p.company_profile {
          font-size: 0.373333rem;
          line-height: 0.533333rem;
        }
        p.copyright {
          font-size: 0.186667rem;
          line-height: 0.506667rem;
        }
      }
      .rg {
        margin-top: 0.4rem;
        img {
          max-width: 2.666667rem;
        }
      }
    }
  }
}
</style>