<template>
  <div class="warp">
    <div class="content">
      <div class="tit">账号</div>
      <div class="avatar">
        <div class="_img" :style="`background-image: url(${userInfo.icon})`"></div>
        <div class="name">
          <span class="s1">{{userInfo.nickName}}</span>
          <span class="s2">{{userInfo.mobile}}</span>
        </div>
      </div>
      <div class="bz">注：购买后不支持退款、转让，请确认后再提交订单</div>
      <div class="buy_content" v-if="buyContent">
        <h5>购买内容</h5>
        <div class="buy_details">
          <div class="lf">
            <div class="_img">
              <img :src="buyContent.cover" alt />
            </div>
            <div class="info">
              <div class="c_name">
                <span class="s1">{{buyContent.title}}</span>
                <span>¥ {{buyContent.price}}</span>
              </div>
              <span class="s2">有效期：自购买之日起{{buyContent.expired}}个月有效</span>
            </div>
          </div>
        </div>
      </div>
      <div class="payment" v-if="buyContent">
        <p>
          应付金额：¥
          <span>{{buyContent.price}}</span>
        </p>
        <div class="btn" @click="payoff">立即支付</div>
      </div>
    </div>
    <!-- <buy v-if="buyShow" :buyShow.sync="buyShow"></buy> -->
    <buy-order v-if="buyShow" :buyShow.sync="buyShow" :qrUrl="qrUrl" :price="buyContent.price"></buy-order>
  </div>
</template>

<script>
// import { Toast } from "vant";
import _wsSignalR from "./../../config/message";
import httpRequest from "@/api/index.js";
// import buy from "@/components/buy.vue";
import buyOrder from "@/components/buyOrder.vue";
import { pay } from "@/mixins/pay.js";
import { mapState } from "vuex";
import { Toast } from "vant";
export default {
  data() {
    return {
      buyShow: false,
      buyContent: null,
      qrUrl: ""
    };
  },
  mixins: [pay],
  computed: {
    ...mapState(["userInfo", "fromUrl", "payUrl"])
  },
  components: {
    // buy,
    buyOrder
  },
  mounted() {
    this.getDetails(parseInt(this.$route.query.id));
  },
  methods: {
    async getDetails(id) {
      const res = await httpRequest.getCommodityById({
        id
      });
      if (res) {
        this.buyContent = res.data;
      }
    },
    async payoff() {
      const res = await httpRequest.addOrder({
        id: parseInt(this.$route.query.id),
        orderType: 1
      });
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
};
</script>

<style lang="less" scoped>
.warp {
  background: #f8f8f8;
  padding: 20px 0 180px;
  .content {
    background: #fff;
    border-radius: 10px;
    padding: 40px 30px;
    .tit {
      font-size: 20px;
      font-weight: 400;
      color: rgba(40, 40, 40, 1);
      margin-bottom: 30px;
    }
    .avatar {
      display: flex;
      align-items: center;
      ._img {
        margin-right: 20px;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        overflow: hidden;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .name {
      font-size: 14px;
      font-weight: 400;
      display: flex;
      flex-direction: column;
      .s1 {
        margin-bottom: 10px;
        color: rgba(60, 60, 60, 1);
      }
      .s2 {
        color: rgba(182, 182, 182, 1);
      }
    }
    .bz {
      padding: 30px 0 40px;
      border-bottom: 1px solid #f1f1f1;
      font-size: 14px;
      font-weight: 400;
      color: rgba(182, 182, 182, 1);
    }
    .buy_content {
      margin-top: 40px;
      h5 {
        font-size: 20px;
        font-weight: 400;
        color: rgba(40, 40, 40, 1);
      }
      .buy_details {
        margin-top: 30px;
        border-bottom: 1px solid #f1f1f1;
        padding: 0 0 30px;
        display: flex;
        .lf {
          width: 100%;
          display: flex;
          align-items: center;
          ._img {
            margin-right: 20px;
            img {
              width: 182px;
              height: 116px;
              border-radius: 10px;
            }
          }
          .info {
            flex: 1;
            display: flex;
            flex-direction: column;
            .c_name {
              font-size: 16px;
              font-weight: 400;
              color: rgba(60, 60, 60, 1);
              display: flex;
              justify-content: space-between;
              width: 100%;
            }
            .s2 {
              margin-top: 20px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(182, 182, 182, 1);
            }
          }
        }
      }
    }
    .payment {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      p {
        margin: 20px 0 15px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
        span {
          font-size: 24px;
          font-weight: bold;
          color: rgba(245, 116, 37, 1);
        }
      }
      .btn {
        cursor: pointer;
        width: 194px;
        height: 54px;
        background: rgba(245, 116, 37, 1);
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .warp {
    background: #f8f8f8;
    padding: 0.4rem 0;
    .content {
      padding: 0.4rem;
      .tit {
        font-size: 0.48rem;
        margin-bottom: 0.4rem;
      }
      .avatar {
        ._img {
          margin-right: 0.266667rem;
          width: 1.12rem;
          height: 1.12rem;
          img {
            width: 1.12rem;
            height: 1.12rem;
          }
        }
      }
      .name {
        font-size: 0.373333rem;
        .s1 {
          margin-bottom: 0.233333rem;
        }
      }
      .bz {
        padding: 0.4rem 0;
        font-size: 0.373333rem;
      }
      .buy_content {
        margin-top: 0.4rem;
        h5 {
          font-size: 0.48rem;
        }
        .buy_details {
          margin-top: 0.4rem;
          padding: 0 0 0.4rem;
          .lf {
            ._img {
              margin-right: 0.266667rem;
              img {
                width: 2.72rem;
                height: 1.733333rem;
                border-radius: 0.133333rem;
              }
            }
            .info {
              .c_name {
                font-size: 0.373333rem;
                flex-direction: column;
                .s1 {
                  margin-bottom: 0.4rem;
                }
              }
              .s2 {
                margin-top: 0.4rem;
                font-size: 0.32rem;
              }
            }
          }
        }
      }
      .payment {
        flex-direction: row;
        justify-content: space-between;
        padding: 0.4rem 0 0;
        p {
          margin: 0.266667rem;
          font-size: 0.32rem;
          span {
            font-size: 0.4rem;
          }
        }
        .btn {
          width: 3.2rem;
          height: 1.2rem;
          border-radius: 0.106667rem;
          font-size: 0.373333rem;
        }
      }
    }
  }
}
</style>