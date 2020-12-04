<template>
  <div class="warp">
    <div class="collection_tab">
      <div class="item" :class="{active: typeVip === 1}" @click="typeVip = 1">VIP充值</div>
      <div class="item" :class="{active: typeVip === 2}" @click="typeVip = 2">我的VIP</div>
    </div>
    <div class="vip_tab" v-if="typeVip === 1">
      <template v-for="(item, index) in vipList" @click="descIndex = index">
        <div class="item" :key="index">
          <div class="top">
            <p>{{item.duration}}个月</p>
            <span>¥{{item.price}}</span>
          </div>
          <div class="bto" @click="handleBuy(item)">{{userInfo.isVip ? '立即续费' : "立即开通" }}</div>
        </div>
      </template>
    </div>
    <div class="vip_jj" v-if="typeVip === 1 && vipList" v-html="vipList[descIndex].desc"></div>
    <div class="hist_vip" v-if="typeVip === 2">
      <template v-for="item in listDate">
        <div class="item" :key="item.id" :class="{expired: !item.status}">
          <div class="icon" v-if="!item.tatus">
            <img src="../../assets/icon_vip_effective.png" alt />
          </div>
          <div class="icon" v-else>
            <img src="../../assets/icon_vip_noneffective.png" alt />
          </div>
          <div class="start_tiem txt">
            <p>开通时间</p>
            <p>{{item.created}}</p>
          </div>
          <div class="end_tiem txt">
            <p>到期时间</p>
            <p>{{item.expireDate}}</p>
          </div>
          <div class="remark txt">
            <p class="p1">权限说明</p>
            <p>{{item.desc}}</p>
          </div>
        </div>
      </template>
    </div>
    <buy-order v-if="buyShow" :buyShow.sync="buyShow" :qrUrl="qrUrl" :price="price"></buy-order>
  </div>
</template>

<script>
import _wsSignalR from "./../../config/message";
import buyOrder from "@/components/buyOrder.vue";
import { Toast } from "vant";
import httpRequest from "@/api/index.js";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      buyShow: false,
      typeVip: 1,
      vipList: null,
      descIndex: 0,
      listDate: null,
      qrUrl: "",
      price: "",
    };
  },
  components: {
    buyOrder,
  },
  mounted() {
    this.getVipList();
    this.getListVip();
  },
  computed: {
    ...mapState(["userInfo", "fromUrl", "payUrl"]),
  },
  methods: {
    ...mapMutations(["CHANGEFROMURL"]),
    async handleBuy(item) {
      this.price = item.price;
      this.CHANGEFROMURL(location.href);
      const res = await httpRequest.addOrder({
        id: item.id,
        orderType: 2,
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
        _wsSignalR.UseWebSocket(this.userInfo.id, (buyRes) => {
          if (buyRes.code === 0 || buyRes.code === -1) {
            // Toast.success("购买成功");
            Toast.success(res.msg);
            setTimeout(() => {
              this.$router.go(-1);
            }, 1000);
          }
        });
        console.log(res);

        this.buyShow = true;
        // this.qrUrl = `http://pay.maymeng.com/order/GetPayQrCode?orderNo=${res.data}&userId=${this.userInfo.id}`;
        this.qrUrl = `${this.payUrl}/order/GetPayQrCode?orderNo=${res.data}&userId=${this.userInfo.id}`;
      }
    },
    async getVipList() {
      const res = await httpRequest.listMemberPackage();
      if (res) {
        this.vipList = res.data;
      }
    },
    async getListVip() {
      const res = await httpRequest.getListVip({
        pageNum: 1,
        pageSize: 6,
      });
      if (res) {
        this.listDate = res.data.list;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.collection_tab {
  display: flex;
  padding: 20px 0;
  align-items: center;
  .item {
    cursor: pointer;
    margin-right: 40px;
    padding: 15px 0;
    position: relative;
    font-size: 20px;
    font-weight: 400;
    color: rgba(60, 60, 60, 1);
    &.active {
      color: #f57425;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-left: -12px;
        width: 24px;
        height: 4px;
        border-radius: 2px;
        background: #f57425;
        display: block;
      }
    }
  }
}
.vip_tab {
  display: flex;
  width: 900px;
  // justify-content: space-between;
  .item {
    margin-right: 20px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border: 1px solid #fff;
    border-radius: 10px;
    .top {
      width: 280px;
      height: 150px;
      background: rgba(255, 255, 255, 1);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        font-size: 22px;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
      }
      span {
        margin: 10px 0 0 0;
        font-size: 32px;
        font-weight: bold;
        color: rgba(245, 116, 37, 1);
      }
    }
    .bto {
      height: 50px;
      display: flex;
      background: #f57425;
      justify-content: center;
      align-items: center;
      font-size: 16px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    &:hover {
      border: 1px solid #f57425;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
.vip_jj {
  margin-top: 30px;
  width: 900px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  padding: 30px;
}
.hist_vip {
  .item {
    margin-top: 20px;
    width: 900px;
    padding: 30px;
    display: flex;
    justify-content: space-between;
    background: rgba(255, 255, 255, 1);
    p {
      font-size: 16px;
      font-weight: 400;
      color: #282828;
    }
    .txt {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 80px;
    }
    &.expired {
      p {
        color: #a1a1a1;
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .collection_tab {
    display: flex;
    padding: 0.4rem;
    align-items: center;
    .item {
      margin-right: 0.4rem;
      padding: 0.333333rem 0;
      font-size: 0.373333rem;
    }
  }
  .vip_tab {
    display: flex;
    overflow-x: scroll;
    width: 100%;
    padding-left: 0.4rem;
    .item {
      // flex-shrink: 0;
      width: 5.333333rem;
      overflow: hidden;
      margin-right: 0.4rem;
      border-radius: 0.133333rem;
      .top {
        width: 100%;
        height: 2.666667rem;
        p {
          font-size: 0.48rem;
        }
        span {
          margin: 0.266667rem 0 0 0;
          font-size: 0.666667rem;
        }
      }
      .bto {
        height: 1.066667rem;
        font-size: 0.373333rem;
      }
    }
  }
  .vip_jj {
    margin-top: 0.4rem;
    width: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 0;
    padding: 0.4rem;
  }
  .hist_vip {
    .item {
      margin-top: 0.4rem;
      width: 100%;
      padding: 0.4rem 0.4rem 0.4rem 1.6rem;
      position: relative;
      flex-direction: column;
      p {
        font-size: 0.346667rem;
        font-weight: 400;
        color: #282828;
      }
      .txt {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        height: auto;
        margin: 0;
        p {
          margin-right: 0.23333rem;
          line-height: 0.633333rem;
          &.p1 {
            white-space: nowrap;
          }
        }
      }
      &.expired {
        p {
          color: #a1a1a1;
        }
      }
      .icon {
        position: absolute;
        left: 0.266667rem;
        top: 0.4rem;
        width: 1.146667rem;
        height: 1.146667rem;
        img {
          max-width: 100%;
          max-height: 100%;
        }
      }
    }
  }
}
</style>