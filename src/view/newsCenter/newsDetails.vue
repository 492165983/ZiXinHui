<template>
  <div class="warp" v-title :data-title="artilcData.title">
    <div class="thematic_list">
      <div class="content">
        <div class="lf">
          <div class="headline" v-if="artilcData">
            <div class="mbx">
              <div class="tit">您所在的位置：</div>
              <p>
                <span @click="routerGo('')">首页</span> >
                <span @click="routerGo('newsCenter')">资讯中心</span> >
                <span>{{artilcData.title}}</span>
              </p>
            </div>
            <div class="title">
              <div class="lf_tit">
                <h6>{{artilcData.title}}</h6>
                <div class="info">
                  <p>{{artilcData.created}}</p>
                  <p>
                    <img src="../../assets/icon_scan.png" alt />
                    <span>{{artilcData.readTimes}}人浏览</span>
                  </p>
                  <p @click="shareBtn">
                    <img src="../../assets/icon_video_details_share.png" alt />
                    <!-- <vshare :vshareConfig="vshareConfig"></vshare> -->
                    <span>分享</span>
                  </p>
                </div>
              </div>
            </div>
            <aplayer
              v-if="artilcData.audioUrl"
              :music="{
                  src: artilcData.audioUrl,
                }"
            />
            <div class="main" v-html="artilcData.content"></div>
          </div>
        </div>
        <div class="rg">
          <h5>最近文章</h5>
          <div class="list">
            <template v-for="item in recentlyArticleList">
              <div class="item" :key="item.id" @click="gozjwz(item)">
                <p>{{item.title}}</p>
                <span>{{item.created}}</span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="fx" v-if="fxS" @click="fxS = false">
      <img src="./../../assets/icon_share.png" alt />
    </div>
  </div>
</template>

<script>
// import vshare from "vshare";
import wx from "weixin-js-sdk";
// import { Toast } from "vant";
import Aplayer from "vue-aplayer";
import httpRequest from "@/api/index.js";
export default {
  components: {
    Aplayer,
    // vshare
  },
  data() {
    return {
      fxS: false,
      aid: null,
      artilcData: null,
      recentlyArticleList: null,
    };
  },
  beforeRouteUpdate(to, from, next) {
    this.aid = to.query.id;
    this.getArticleData();
    this.getRecentlyArticleList();
    next();
  },
  watch: {},
  mounted() {
    if (this.$route.query.id) {
      this.aid = parseInt(this.$route.query.id);
    }
    if (this.$route.query.aesUserId) {
      localStorage.setItem("aesUserId", this.$route.query.aesUserId);
    }
    // const token = localStorage.getItem("token");
    // if (token) {
    //   this.getSigdate();
    // }
    this.getArticleData();
    this.getRecentlyArticleList();
    window.addEventListener("scroll", this.scrollToTop);
  },
  methods: {
    appSource() {},
    async getSigdate() {
      const isiOS = !!navigator.userAgent.match(
        /\(i[^;]+;( U;)? CPU.+Mac OS X/
      ); //ios终端
      const res = await httpRequest.getSignature({
        userType: 1,
        url: encodeURIComponent(
          isiOS ? window.initUrl : location.href.split("#")[0]
        ),
      });
      if (res) {
        wx.config({
          // debug: true, // 开启调试模式,
          appId: res.data.appid, // 必填，企业号的唯一标识，此处填写企业号corpid
          timestamp: res.data.timeStamp, // 必填，生成签名的时间戳
          nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
          signature: res.data.signature, // 必填，签名，见附录1
          jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"],
        });
        let that = this;
        wx.ready(function () {
          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: that.artilcData.title, // 分享标题
            desc: that.artilcData.profile, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.artilcData.cover, // 分享图标
            success: function () {},
          });
          wx.updateTimelineShareData({
            title: that.artilcData.title, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.artilcData.cover, // 分享图标
            success: function () {},
          });
        });
      }
    },
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
    },
    shareBtn() {
      if (
        navigator.userAgent.match(
          /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        )
      ) {
        this.fxS = true;
      } else {
        console.log(1);
      }
    },
    async getArticleData() {
      const res = await httpRequest.getArticleDetail({
        aid: this.aid,
      });
      if (res) {
        this.artilcData = res.data;
      }
    },
    routerGo(path) {
      this.$router.push({ name: path });
    },
    gozjwz(item) {
      let timer = setInterval(() => {
        let ispeed = Math.floor(-this.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          this.scrollTop + ispeed;
        if (this.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
      this.$router.push({ name: "newsDetails", query: { id: item.id } });
    },
    async getRecentlyArticleList() {
      const res = await httpRequest.getRecentlyArticle({
        aid: this.aid,
      });
      if (res) {
        this.recentlyArticleList = res.data;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.fx {
  z-index: 4;
  position: fixed;
  padding: 0.533333rem;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  img {
    max-width: 4rem;
  }
}
.headline {
  background: #fff;
  border-radius: 4px;
  padding: 40px 30px 30px;
  .mbx {
    padding: 20px 0;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    border-bottom: 1px solid #f8f8f8;
    .tit {
      font-size: 12px;
      color: #b0b0b0;
    }
    p {
      font-size: 12px;
      color: #676666;
      span {
        cursor: pointer;
      }
    }
  }
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .lf_tit {
      h6 {
        display: flex;
        align-items: center;
        span {
          width: 54px;
          height: 30px;
          background: rgba(245, 116, 37, 1);
          border-radius: 4px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 16px;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          margin-right: 20px;
        }
        font-size: 24px;
        color: rgba(40, 40, 40, 1);
        margin-bottom: 20px;
      }
      .info {
        display: flex;
        font-size: 12px;
        color: #b0b0b0;
        p {
          display: flex;
          margin-right: 30px;
          align-items: center;
        }
      }
    }
    .buy_btn {
      display: flex;
      align-items: center;
      span {
        margin-right: 20px;
        font-size: 30px;
        font-weight: 400;
        color: rgba(245, 116, 37, 1);
      }
      p {
        cursor: pointer;
        width: 86px;
        height: 36px;
        background: rgba(245, 116, 37, 1);
        border-radius: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  .main {
    margin-top: 20px;
    // background: rgba(246, 246, 246, 1);
    // box-shadow: 0px 4px 10px 0px rgba(107, 107, 107, 0.18);
    // padding: 30px 20px;
    .subtitle {
      font-size: 18px;
      font-weight: bold;
      color: rgba(40, 40, 40, 1);
      margin-bottom: 15px;
    }
    p {
      font-size: 14px;
      font-weight: 300;
      line-height: 22px;
      color: rgba(40, 40, 40, 1);
    }
    ::v-deep img {
      max-width: 100%;
    }
  }
}
.thematic_list {
  background: #f8f8f8;
  padding-top: 40px;
  padding-bottom: 40px;
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .lf {
      max-width: 840px;
      flex: 1;
    }
    .rg {
      background: #fff;
      border-radius: 10px;
      width: 340px;
      padding: 40px 30px 0;
      h5 {
        font-size: 20px;
        font-weight: bold;
        color: rgba(60, 60, 60, 1);
      }
      .item {
        cursor: pointer;
        padding: 20px 0;
        border-bottom: 1px solid #f8f8f8;
        p {
          font-size: 14px;
          font-weight: 400;
          color: rgba(60, 60, 60, 1);
          line-height: 22px;
          margin-bottom: 10px;
        }
        span {
          font-size: 12px;
          font-weight: 400;
          color: rgba(181, 181, 181, 1);
        }
      }
    }
  }
}
@media screen and (min-width: 320px) and (max-width: 650px) {
  .thematic_list {
    padding-top: 0;
    .content {
      flex-direction: column;
      .lf {
        max-width: 100%;
        width: 100%;
        flex: 1;
        .headline {
          background: #fff;
          border-radius: 4px;
          padding: 0.4rem;
          .mbx {
            display: none;
          }
          .title {
            .lf_tit {
              h6 {
                font-size: 0.426667rem;
                margin-bottom: 0.266667rem;
              }
              .info {
                font-size: 0.32rem;
                p {
                  margin-right: 0.4rem;
                }
              }
            }
          }
          .main {
            margin-top: 0.266667rem;
            line-height: 25px;
            .subtitle {
              font-size: 0.426667rem;
              margin-bottom: 0.266667rem;
            }
            p {
              line-height: 25px !important;
            }
            ::v-deep img {
              max-width: 100% !important;
              display: block;
              margin: 0 auto;
            }
          }
        }
      }
      .rg {
        width: 100%;
        padding: 0.4rem;
        h5 {
          font-size: 0.48rem;
        }
        .item {
          cursor: pointer;
          padding: 0.266667rem 0;
          p {
            font-size: 0.373333rem;
            line-height: 0.533333rem;
            margin-bottom: 10px;
          }
          span {
            font-size: 0.32rem;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.aplayer .aplayer-body .aplayer-info .aplayer-music {
  display: none !important;
}
.aplayer .aplayer-body .aplayer-info {
  padding: 25px 7px 0 10px !important;
}
.aplayer {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0), 0 1px 5px 0 rgba(0, 0, 0, 0) !important;
}
.aplayer-pic {
  background-image: none !important;
}
.aplayer-controller .aplayer-time .aplayer-icon.inactive {
  display: none;
}
.aplayer-controller .aplayer-time .aplayer-volume-wrap {
  display: none;
}
.aplayer-pic .aplayer-pause {
  width: 26px !important;
  height: 26px !important;
  border: 2px solid #fff !important;
  bottom: 50% !important;
  right: 50% !important;
  margin: 0 -15px -15px 0 !important;
}
.aplayer-pic .aplayer-pause .aplayer-icon-pause {
  top: 5px !important;
  left: 5px !important;
  width: 15px !important;
  height: 15px !important;
}
.aplayer-played {
  background: #f57425 !important;
}
.aplayer-thumb {
  border-color: #f57425 !important;
}
</style>