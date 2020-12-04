<template>
  <div class="warp">
    <div class="thematic_list">
      <div class="content">
        <div class="headline" v-if="serieTitle">
          <div class="mbx">
            <div class="tit">您所在的位置：</div>
            <p>
              <span>首页</span> >
              <span>资讯中心</span> >
              <span>专题</span> >
              <span>{{serieTitle.title}}</span>
            </p>
          </div>
          <div class="title">
            <div class="lf_tit">
              <h6>
                <span>专题</span>
                {{serieTitle.title}}
              </h6>
              <div class="info">
                <p>{{serieTitle.created}}</p>
                <p>
                  <img src="../../assets/icon_scan.png" alt />
                  <span>{{serieTitle.readTimes}}人浏览</span>
                </p>
                <!-- <p>
                  <img src="../../assets/icon_video_details_share.png" alt />
                  <span>分享</span>
                </p>-->
              </div>
            </div>
          </div>
          <div class="main">
            <div class="subtitle">【系列介绍】</div>
            <p v-html="serieTitle.h5Desc"></p>
          </div>
        </div>
      </div>
    </div>
    <div class="news_list">
      <div class="content">
        <template v-for="item in audioList">
          <div class="item" :key="item.id" @click="goDetails(item.id)">
            <div class="lf">
              <div class="tit">{{item.title}}</div>
              <p>{{item.subtitle}}</p>
              <div class="jj">
                <div class="lt">
                  <span>
                    <img src="../../assets/icon_scan.png" alt />
                    {{item.readTimes}}人阅读
                  </span>
                </div>
                <span>{{item.created}}</span>
              </div>
            </div>
            <div class="rg">
              <img :src="item.cover" alt />
            </div>
          </div>
        </template>
      </div>
      <div class="pagin_main" v-if="total > 1">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :pageSize="6"
          :pagerCount="5"
          :pageCount="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import wx from "weixin-js-sdk";
import httpRequest from "@/api/index.js";
export default {
  data() {
    return {
      audioList: null,
      serieTitle: null,
      total: null,
      tId: 0,
      pageNum: 1,
    };
  },
  mounted() {
    this.tId = parseInt(this.$route.query.id);
    const token = localStorage.getItem("token");
    if (token) {
      this.getSigdate();
    }
    this.getAudioList();
  },
  methods: {
    goDetails(id) {
      this.$router.push({
        name: "newsDetails",
        query: {
          id,
        },
      });
    },
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
            title: that.serieTitle.title, // 分享标题
            desc: that.serieTitle.profile, // 分享描述
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.serieTitle.cover, // 分享图标
            success: function () {},
          });
          wx.updateTimelineShareData({
            title: that.serieTitle.title, // 分享标题
            link: window.location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: that.serieTitle.cover, // 分享图标
            success: function () {},
          });
        });
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAudioList();
    },
    async handleCollect() {
      const res = await httpRequest.collectCommodity({
        id: this.serieTitle.commodityId,
      });
      if (res.code === 200) {
        this.serieTitle.isCollect = true;
      }
    },
    async getAudioList() {
      const res = await httpRequest.getInfoTopicDetail({
        pageData: {
          pageNum: this.pageNum,
          pageSize: 6,
        },
        id: this.tId,
      });
      if (res) {
        this.serieTitle = res.data.topic;
        this.audioList = res.data.articles.list;
        this.total = res.data.articles.totalPage;
      }
    },
  },
};
</script>

<style lang="less" scoped>
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
    background: rgba(246, 246, 246, 1);
    box-shadow: 0px 4px 10px 0px rgba(107, 107, 107, 0.18);
    padding: 30px 20px;
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
}
.news_list {
  background: #f8f8f8;
  padding: 30px 0;
  .item {
    cursor: pointer;
    margin: 0 0 10px 0;
    display: flex;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    padding: 30px;
    justify-content: space-between;
    .lf {
      flex: 1;
      margin-right: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .tit {
        font-size: 16px;
        font-weight: bold;
        color: rgba(40, 40, 40, 1);
      }
      p {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        line-height: 20px;
        font-size: 14px;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
      }
      .jj {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 12px;
        font-weight: 300;
        color: rgba(176, 176, 176, 1);
        .lt {
          display: flex;
          span {
            display: flex;
            align-items: center;
          }
          img {
            margin-right: 5px;
          }
          .zt {
            width: 46px;
            height: 26px;
            background: rgba(255, 229, 213, 1);
            border-radius: 4px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            font-weight: 400;
            color: rgba(245, 116, 37, 1);
          }
        }
      }
    }
    .rg {
      flex-shrink: 0;
      img {
        width: 190px;
        height: 118px;
        border-radius: 10px;
      }
    }
    &:hover {
      box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
    }
  }
}
@media screen and (max-width: 1200px) {
  .headline {
    padding: 0.4rem;
    .mbx {
      display: none;
    }
    .title {
      .lf_tit {
        h6 {
          span {
            width: 1rem;
            height: 0.6rem;
            font-size: 0.32rem;
            margin-right: 0.266667rem;
          }
          font-size: 0.426667rem;
          margin-bottom: 0.4rem;
        }
        .info {
          font-size: 0.32rem;
          p {
            margin-right: 0.4rem;
            img {
              margin-right: 0.066667rem;
              max-width: 0.36rem;
            }
          }
        }
      }
    }
    .main {
      margin-top: 0.4rem;
      padding: 0.4rem;
      .subtitle {
        font-size: 0.426667rem;
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
  .news_list {
    background: #f8f8f8;
    padding: 0.4rem 0;
    .item {
      width: 100%;
      margin: 0 0 0.266667rem 0;
      border-radius: 0.133333rem;
      padding: 0.4rem 0.266667rem;
      .lf {
        margin-right: 0.4rem;
        .tit {
          font-size: 0.373333rem;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
          overflow: hidden;
          line-height: 0.533333rem;
        }
        p {
          max-width: 100%;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          line-height: 0.45rem;
          font-size: 0.32rem;
        }
        .jj {
          font-size: 0.293333rem;
          .lt {
            .zt {
              width: 1.066667rem;
              height: 0.533333rem;
              font-size: 0.32rem;
            }
          }
        }
      }
      .rg {
        flex-shrink: 0;
        width: 3.226667rem;
        img {
          width: 3.226667rem;
          height: 2rem;
          border-radius: 0.133333rem;
        }
      }
      &:hover {
        box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
      }
    }
  }
}
</style>