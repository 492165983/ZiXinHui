<template>
  <div class="warp">
    <div class="thematic_list">
      <div class="content" v-if="newsDetailsData">
        <div class="lf">
          <div class="headline">
            <div class="mbx">
              <div class="tit">您所在的位置：</div>
              <p>
                <span>首页</span> >
                <span>{{newsDetailsData.title}}</span>
              </p>
            </div>
            <div class="title">
              <div class="lf_tit">
                <h6>{{newsDetailsData.title}}</h6>
                <div class="info">
                  <p>{{newsDetailsData.subtitle}}</p>
                  <p>
                    <img src="../../assets/icon_scan.png" alt />
                    <span>{{newsDetailsData.readTimes}}人浏览</span>
                  </p>
                  <!-- <p @click="shareBtn">
                    <img src="../../assets/icon_video_details_share.png" alt />
                    <span>分享</span>
                  </p>-->
                </div>
              </div>
            </div>
            <div class="main" v-if="newsDetailsData.content" v-html="newsDetailsData.content"></div>
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
import wx from "weixin-js-sdk";
// import { Toast } from "vant";
import httpRequest from "@/api/index.js";
export default {
  components: {},
  data() {
    return {
      fxS: false,
      newsId: null,
      newsDetailsData: null,
    };
  },
  mounted() {
    this.newsId = parseInt(this.$route.query.id);
    this.getNewsDetails();
    // const token = localStorage.getItem("token");
    // if (token) {
    //   this.getSigdate();
    // }
  },
  methods: {
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
          debug: true, // 开启调试模式,
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
            title: that.newsDetailsData.title, // 分享标题
            desc: that.newsDetailsData.subtitle, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.newsDetailsData.cover, // 分享图标
            success: function () {},
          });
          wx.updateTimelineShareData({
            title: that.newsDetailsData.title, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.newsDetailsData.cover, // 分享图标
            success: function () {},
          });
        });
      }
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
    async getNewsDetails() {
      const res = await httpRequest.getNewsById({
        id: this.newsId,
      });
      if (res) {
        this.newsDetailsData = res.data;
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
  margin-bottom: 30px;
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
  .content {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    .lf {
      flex: 1;
    }
  }
}
@media screen and (max-width: 1200px) {
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
          font-size: 0.48rem;
          margin-bottom: 0.266667rem;
        }
        .info {
          font-size: 0.32rem;
          p {
            margin-right: 0.4rem;
            img {
              max-width: 0.38rem;
            }
          }
        }
      }
    }
    .main {
      margin-top: 0.266667rem;
      .subtitle {
        font-size: 0.48rem;
        margin-bottom: 0.266667rem;
      }
      p {
        font-size: 0.373333rem;
        line-height: 0.533333rem;
      }
    }
  }
  .thematic_list {
    padding-top: 0;
  }
}
</style>