// import wx from "weixin-js-sdk";
// import { Toast } from "vant";
export const pay = {
  data() {
    return {

    }
  },
  async mounted() {
    this.code = this.getUrlKey("code");
  },
  methods: {
    getUrlKey(name) {
      return (
        decodeURIComponent(
          (new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|$)").exec(
            location.href
          ) || [null, ""])[1].replace(/\+/g, "%20")
        ) || null
      );
    },
    // async handlePay(url, data) {
    //   window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx81e6411903b06328&redirect_uri=http://zxh.maymeng.com&response_type=code&scope=snsapi_base&state=123#wechat_redirect`


    //   wx.chooseWXPay({
    //     timestamp: res2.data.payResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
    //     nonceStr: res2.data.payResult.nonceStr, // 支付签名随机串，不长于 32 位
    //     package: res2.data.payResult.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
    //     signType: res2.data.payResult.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
    //     paySign: res2.data.payResult.paySign, // 支付签名
    //     success: async res => {
    //       const res3 = await that.PayResult({
    //         id: res2.data.payId
    //       });
    //       if (res3.code == 0) {
    //         Toast.success("支付成功");
    //         that.getUserData();
    //       } else {
    //         Toast.fail("支付失败");
    //       }
    //     },
    //     fail() {
    //       Toast.fail("支付失败");
    //     },
    //     complete() {
    //       that.show = false;
    //     }
    //   });
    // }
  }
}