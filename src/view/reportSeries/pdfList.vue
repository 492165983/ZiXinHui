<template>
  <div class="warp" v-title :data-title="serieTitle.seriesName">
    <!-- <sec-nav :typeNum="3" :typeId.sync="typeId"></sec-nav> -->
    <div class="home_box">
      <div class="content">
        <div class="headline" v-if="serieTitle">
          <div class="title">
            <div class="lf_tit">
              <h6>{{serieTitle.seriesName}}</h6>
              <div class="info">
                <p>{{serieTitle.created}}</p>
                <div class="tbgs">
                  <p>
                    <img src="../../assets/icon_scan.png" alt />
                    <span>{{serieTitle.enroll}}人浏览</span>
                  </p>
                  <p>
                    <img src="../../assets/icon_type.png" alt />
                    <span>{{serieTitle.typeName}}</span>
                  </p>
                  <p>
                    <img
                      v-if="serieTitle.isCollect"
                      src="../../assets/icon_personal_collect_selected.png"
                      alt
                    />
                    <img
                      v-else
                      src="../../assets/icon_personal_collect_unselected.png"
                      alt
                      class="cursor"
                    />
                    <span
                      class="cursor"
                      @click="cancelCollectHandle"
                      v-if="serieTitle.isCollect"
                      style="color: #f57425"
                    >已收藏</span>
                    <span @click="handleCollect" class="cursor" v-else>收藏</span>
                  </p>
                </div>
              </div>
            </div>
            <div class="buy_btn">
              <span>¥{{serieTitle.price}}</span>
              <p
                @click="goBuy"
                :class="{buyOk: (watchMode == 2 && isVip) || serieTitle.isBuy}"
              >{{(watchMode == 2 && isVip) || serieTitle.isBuy ? '已购买' : '购买'}}</p>
            </div>
          </div>
          <div class="main">
            <div class="subtitle">【系列介绍】</div>
            <p v-html="serieTitle.h5Desc"></p>
          </div>
        </div>
        <template v-for="item in audioList">
          <div class="list" :key="item.id">
            <div class="item">
              <div class="icon_new">
                <img src="../../assets/icon_presentation_new.png" alt />
              </div>
              <div class="top_main">
                <div class="tit">{{item.name}}</div>
                <div class="type">{{item.typeName}}类</div>
                <div class="time">{{serieTitle.created}}</div>
                <div class="handle_btn">
                  <button class="bt1" v-if="!serieTitle.isBuy && !item.isTrail && !isVip">购后可阅</button>
                  <!-- <a :href="item.url" class="bt2" v-else-if="item.isTrail">免费试读</a>
                  <a :href="item.url" class="bt3" v-else-if="serieTitle.isBuy">在线阅读</a>-->
                  <p @click="goPdf(item.url)" class="bt2" v-else-if="item.isTrail && !isVip">免费试读</p>
                  <p @click="goPdf(item.url)" class="bt3" v-else-if="serieTitle.isBuy">在线阅读</p>
                  <p @click="goPdf(item.url)" class="bt3" v-else-if="watchMode == 2 && isVip">在线阅读</p>
                </div>
              </div>
            </div>
          </div>
        </template>
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
  </div>
</template>

<script>
// import secNav from "@/components/secNav.vue";
import httpRequest from "@/api/index.js";
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
export default {
  //   components: {
  //     secNav
  //   },
  data() {
    return {
      isVip: false,
      typeId: null,
      audioList: null,
      serieTitle: null,
      total: null,
      watchMode: null,
      pageNum: 1,
    };
  },
  watch: {
    typeId() {
      this.getAudioList();
    },
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  created() {
    this.typeId = parseInt(this.$route.query.id);
  },
  mounted() {
    if (this.userInfo) {
      this.isVip = this.userInfo.isVip;
    }
  },
  methods: {
    ...mapMutations(["CAHNGELOGINSHOW"]),
    goBuy() {
      if (!this.userInfo) {
        Toast("请先登录");
        this.CAHNGELOGINSHOW(true);
      } else if (this.userInfo) {
        if (
          (this.watchMode == 2 && this.userInfo.isVip) ||
          this.serieTitle.isBuy
        ) {
          console.log("1");
        } else {
          this.$router.push({
            name: "submitOrder",
            query: {
              id: this.serieTitle.commodityId,
            },
          });
        }
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getAudioList();
    },
    goPdf(url) {
      if (!this.userInfo) {
        Toast("请先登录");
        this.CAHNGELOGINSHOW(true);
      } else if (this.userInfo) {
        this.$router.push({
          name: "pdf",
          query: {
            url,
          },
        });
        // if (
        //   navigator.userAgent.match(
        //     /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
        //   )
        // ) {
        //   window.location.href = url;
        // } else {
        //   this.$router.push({
        //     name: "pdf",
        //     query: {
        //       url
        //     }
        //   });
        // }
      }
    },
    async cancelCollectHandle() {
      const res = await httpRequest.cancelCollectCommodity({
        id: this.serieTitle.commodityId,
      });
      if (res) {
        this.serieTitle.isCollect = false;
      }
    },
    async handleCollect() {
      const res = await httpRequest.collectCommodity({
        id: this.serieTitle.commodityId,
      });
      if (res) {
        this.serieTitle.isCollect = true;
      }
    },
    async getAudioList() {
      const res = await httpRequest.getListPdfOrAudioSeries({
        pageData: {
          pageNum: this.pageNum,
          pageSize: 6,
        },
        id: this.typeId,
      });
      if (res) {
        this.watchMode = res.data.watchMode;
        this.serieTitle = res.data.serie;
        if (res.data.commodities) {
          this.audioList = res.data.commodities.list;
          this.total = res.data.commodities.totalPage;
        } else {
          this.audioList = [];
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.home_box {
  background: #f8f8f8;
  padding: 20px 0 20px;
  .headline {
    background: #fff;
    border-radius: 4px;
    padding: 40px 30px 30px;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .lf_tit {
        h6 {
          font-size: 24px;
          color: rgba(40, 40, 40, 1);
          margin-bottom: 20px;
        }
        .info {
          display: flex;
          font-size: 12px;
          color: #b0b0b0;
          p {
            margin-left: 5px;
            display: flex;
            margin-right: 30px;
            align-items: center;
            img {
              margin-right: 7px;
            }
          }
          .tbgs {
            display: flex;
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
          &.buyOk {
            background: #4d4d4d;
            color: #a7a7a7;
            cursor: not-allowed;
          }
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
  .list {
    .item {
      margin-top: 20px;
      width: 100%;
      background: #fff;
      padding: 0px 20px;
      position: relative;
      .top_main {
        padding: 30px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
        position: relative;
        .tit {
          flex: 1;
        }
        .time {
          margin: 0 100px;
        }
        .handle_btn {
          .bt1 {
            padding: 0;
            cursor: not-allowed;
            box-sizing: border-box;
            border: none;
            width: 86px;
            height: 36px;
            background: rgba(217, 217, 217, 1);
            border-radius: 6px;
            font-size: 14px;
            font-weight: 400;
            white-space: nowrap;
            color: rgba(255, 255, 255, 1);
          }
          .bt2,
          .bt3 {
            cursor: pointer;
            padding: 0;
            white-space: nowrap;
            box-sizing: border-box;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 86px;
            height: 36px;
            border: 1px solid #b3b3b3;
            border-radius: 6px;
            font-size: 14px;
            font-weight: 400;
            color: #8d8d8d;
          }
        }
      }
      .bto_main {
        border-top: 1px solid #f4f4f4;
      }
      .icon_new {
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }
  .pagin_main {
    padding: 30px 0 40px;
    display: flex;
    justify-content: center;
  }
}
@media screen and (max-width: 1200px) {
  .home_box {
    background: #f8f8f8;
    padding: 20px 0 0;
    .headline {
      background: #fff;
      border-radius: 4px;
      padding: 0.4rem;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-direction: column;
        .lf_tit {
          h6 {
            font-size: 0.426667rem;
            margin-bottom: 0.4rem;
          }
          .info {
            font-size: 0.32rem;
            flex-direction: column;
            p {
              margin-right: 0.133333rem;
              margin-bottom: 0.233333rem;
              img {
                max-width: 0.373333rem;
              }
            }
          }
        }
        .buy_btn {
          // flex-direction: column;
          span {
            margin-right: 0.4rem;
            font-size: 0.56rem;
          }
          p {
            width: 1.8rem;
            height: 0.833333rem;
            border-radius: 0.08rem;
            font-size: 0.373333rem;
          }
        }
      }
      .main {
        margin-top: 0.266667rem;
        padding: 0.4rem;
        .subtitle {
          font-size: 0.426667rem;
          margin-bottom: 0.266667rem;
        }
        p {
          font-size: 0.32rem;
          line-height: 0.496667rem;
        }
      }
    }
    .list {
      .item {
        margin-top: 0.4rem;
        padding: 0px 0.3;
        .top_main {
          padding: 0.4rem 0px;
          align-items: flex-start;
          flex-direction: column;
          font-size: 0.373333rem;
          line-height: 0.45rem;
          .time {
            margin: 0.233333rem 0;
          }
          .handle_btn {
            .bt1,
            .bt2,
            .bt3 {
              white-space: nowrap;
              width: 1.6rem;
              height: 0.8rem;
              border-radius: 0.08rem;
              font-size: 0.32rem;
            }
          }
        }
      }
    }
    .pagin_main {
      padding: 30px 0 40px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
