<template>
  <div class="warp">
    <div class="big_tab">
      <div class="item" :class="{active: commodityType === 1}" @click="commodityType = 1">视频课程</div>
      <div class="item" :class="{active: commodityType === 3}" @click="commodityType = 3">投研报告</div>
      <div class="item" :class="{active: commodityType === 2}" @click="commodityType = 2">音频课程</div>
    </div>
    <div class="status_tab">
      <div class="item" :class="{active: orderStatus === 3}" @click="orderStatus = 3">全部订单</div>
      <div class="item" :class="{active: orderStatus === 1}" @click="orderStatus = 1">待付款</div>
      <div class="item" :class="{active: orderStatus === 2}" @click="orderStatus = 2">已支付</div>
    </div>
    <div class="hos_list">
      <template v-for="item in list">
        <div class="item" :key="item.id">
          <div class="lf">
            <div class="img">
              <img :src="item.commodityPic" alt />
            </div>
            <div class="tag">
              <p>{{item.commodityName}}</p>
              <span>订单号：{{item.orderNo}}</span>
              <span>购买日期：{{item.created}}</span>
              <span>发布日期：{{item.publishDate}}</span>
            </div>
          </div>
          <div class="rg">
            <p class="jg">¥ {{item.payAmount}}</p>
            <p class="zf" :class="{ywc: item.status !== 1}">{{item.status | dad}}</p>
            <p
              class="btn"
              @click="ljzf(item)"
              :class="{ywc: item.status !== 1}"
            >{{item.status | dada}}</p>
          </div>
        </div>
      </template>
    </div>

    <div class="pagin_main" v-if="totalPage > 1">
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :pagerCount="5"
        :pageSize="6"
        layout="prev, pager, next"
        :pageCount="totalPage"
      ></el-pagination>
    </div>
    <buy-order v-if="buyShow" :buyShow.sync="buyShow" :qrUrl="qrUrl" :price="price"></buy-order>
  </div>
</template>
<script>
import _wsSignalR from "./../../config/message";
import { Toast } from "vant";
import httpRequest from "@/api/index.js";
import buyOrder from "@/components/buyOrder.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      buyShow: false,
      totalPage: null,
      list: [],
      pageNum: 1,
      commodityType: 1,
      orderStatus: 3,
      qrUrl: "",
      price: ""
    };
  },
  filters: {
    dad(val) {
      if (val == 1) {
        return "待支付";
      }
      if (val == 2) {
        return "已支付";
      }
      if (val == 3) {
        return "支付超时";
      }
    },
    dada(val) {
      if (val == 1) {
        return "待支付";
      }
      if (val == 2) {
        return "在线观看";
      }
      if (val == 3) {
        return "支付超时";
      }
    }
  },
  computed: {
    ...mapState(["userInfo", "fromUrl", "payUrl"])
  },
  components: {
    buyOrder
  },
  watch: {
    commodityType() {
      this.pageNum = 1;
      this.getList();
    },
    orderStatus() {
      this.pageNum = 1;
      this.getList();
    }
  },
  mounted() {
    this.getList();
  },
  methods: {
    ...mapMutations(["CHANGEFROMURL"]),
    async ljzf(item) {
      if (item.status === 1) {
        // this.buyShow = true;
        // Toast('暂未开通支付，请联系客服')
        this.price = item.payAmount;
        this.CHANGEFROMURL(location.href);
        const res = await httpRequest.addOrder({
          id: item.cid,
          orderType: 1
        });
        if (res) {
          if (
            navigator.userAgent.match(
              /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
            )
          ) {
            let fromUrl = encodeURIComponent(this.fromUrl);
            // window.location.href = `http://pay.maymeng.com/order/pay?orderNo=${res.data}&fromClient=1&userId=${this.userInfo.id}&fromUrl=${fromUrl}`;
            window.location.href = `${this.payUrl}/order/pay?orderNo=${res.data}&fromClient=1&userId=${this.userInfo.id}&fromUrl=${fromUrl}`;
          } else {
            _wsSignalR.UseWebSocket(this.userInfo.id, buyRes => {
              if (buyRes.code === 0 || buyRes.code === -1) {
                // Toast.success("购买成功");
                Toast.success(res.msg);
                setTimeout(() => {
                  this.$router.go(-1);
                }, 1000);
              }
            });
            this.buyShow = true;
            // this.qrUrl = `http://pay.maymeng.com/order/GetPayQrCode?orderNo=${res.data}&userId=${this.userInfo.id}`;
            this.qrUrl = `${this.payUrl}/order/GetPayQrCode?orderNo=${res.data}&userId=${this.userInfo.id}`;
          }
        }
      }
      if (item.status === 2) {
        if (this.commodityType === 1) {
          this.$router.push({
            name: `courseDetails`,
            query: {
              id: item.id
            }
          });
        }
        if (this.commodityType === 3) {
          this.$router.push({
            name: `reportSeries`,
            query: {
              id: item.lessonType
            }
          });
        }
        if (this.commodityType === 2) {
          this.$router.push({
            name: `audioSeries`,
            query: {
              id: item.lessonType
            }
          });
        }
      }
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    async getList() {
      const res = await httpRequest.listCommodityOrder({
        commodityType: this.commodityType,
        orderStatus: this.orderStatus,
        pageData: {
          pageNum: this.pageNum,
          pageSize: 6
        }
      });
      if (res) {
        this.list = res.data.list;
        this.totalPage = res.data.totalPage;
        console.log(res);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.warp {
  max-width: 900px;
}
.big_tab {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  .item {
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    color: rgba(60, 60, 60, 1);
    margin: 0 40px 0 0;
    &.active {
      color: #fff;
      background: rgba(245, 116, 37, 1);
      border-radius: 19px;
      padding: 10px 30px;
    }
  }
}
.status_tab {
  display: flex;
  align-items: center;
  .item {
    cursor: pointer;
    font-size: 16px;
    font-weight: 400;
    color: rgba(60, 60, 60, 1);
    margin-right: 60px;
    &.active {
      color: #f57425;
    }
  }
}
.hos_list {
  .item {
    margin-top: 25px;
    width: 900px;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    align-items: center;
    .lf {
      display: flex;
      align-items: center;
      .img {
        margin: 0 20px 0 0;
        img {
          width: 182px;
          height: 116px;
          border-radius: 10px;
        }
      }
      .tag {
        height: 110px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        p {
          margin-bottom: 5px;
          font-size: 16px;
          font-weight: 400;
          color: rgba(60, 60, 60, 1);
        }
        span {
          font-size: 14px;
          font-weight: 400;
          color: rgba(182, 182, 182, 1);
        }
      }
    }
    .rg {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      p {
        white-space: nowrap;
        margin-left: 60px;
        font-size: 16px;
        &.jg {
          font-size: 16px;
          font-weight: 400;
          color: rgba(60, 60, 60, 1);
        }
        &.zf {
          font-size: 16px;
          font-weight: 400;
          color: rgba(245, 116, 37, 1);
          &.ywc {
            font-size: 16px;
            font-weight: 400;
            color: rgba(60, 60, 60, 1);
          }
        }
        &.btn {
          cursor: pointer;
          width: 86px;
          height: 36px;
          background: rgba(245, 116, 37, 1);
          border-radius: 6px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
          font-size: 14px;
          &.ywc {
            border: 1px solid rgba(179, 179, 179, 1);
            border-radius: 6px;
            color: #8d8d8d;
            background: #fff;
          }
        }
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .warp {
    max-width: 100%;
    width: 100%;
    padding: 0 0.4rem;
  }
  .big_tab {
    margin-bottom: 0.4rem;
    .item {
      font-size: 0.373333rem;
      margin: 0 0.4rem 0 0;
      &.active {
        border-radius: 0.4rem;
        padding: 0.133333rem 0.4rem;
      }
    }
  }
  .status_tab {
    .item {
      font-size: 0.373333rem;
      margin-right: 0.8rem;
    }
  }
  .hos_list {
    width: 100%;
    .item {
      margin-top: 0.4rem;
      width: 100%;
      padding: 0.833333rem 0.266667rem 0.266667rem;
      border-radius: 0.133333rem;
      flex-direction: column;
      align-items: flex-start;
      position: relative;
      .lf {
        align-items: flex-start;
        .img {
          margin: 0 0.266667rem 0 0;
          img {
            width: 2.72rem;
            height: 1.733333rem;
            border-radius: 0.133333rem;
          }
        }
        .tag {
          height: auto;
          p {
            margin-bottom: 0.266667rem;
            font-size: 0.4rem;
          }
          span {
            margin-bottom: 0.166667rem;
            font-size: 0.32rem;
          }
        }
      }
      .rg {
        flex-direction: column;
        align-items: flex-end;
        width: 100%;
        p {
          margin-left: 0;
          font-size: 0.373333rem;
          &.jg {
            font-size: 0.373333rem;
          }
          &.zf {
            top: 0.266667rem;
            right: 0.266667rem;
            position: absolute;
            font-size: 0.373333rem;
            &.ywc {
              font-size: 0.373333rem;
            }
          }
          &.btn {
            margin-top: 0.133333rem;
            width: 1.866667rem;
            height: 0.746667rem;
            border-radius: 0.133333rem;
            font-size: 0.32rem;
            &.ywc {
              border-radius: 0.133333rem;
            }
          }
        }
      }
    }
  }
}
</style>