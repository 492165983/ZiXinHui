/* eslint-disable no-console */
<template>
  <div class="mask" @click="closeLogin">
    <div class="box" @click.stop>
      <div class="close" @click="closeLogin">
        <img src="../assets/button_popup_delete.png" alt />
      </div>
      <div class="login_ok">
        <p>请联系客服进行购买，添加微信号heifengjituan2019</p>
        <img src="../assets/cc43379cda67d98ff6fa674aff9552f.jpg" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    closeLogin(){
      this.$emit('update:buyShow', false)
    }
  }
};
</script>

<style lang="less" scoped>
.mask {
  z-index: 3;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  .box {
    background: #fff;
    width: 650px;
    border-radius: 10px;
    padding: 30px;
    .close {
      cursor: pointer;
    }
    .login_ok {
      display: flex;
      flex-direction: column;
      align-items: center;
      h6 {
        font-size: 22px;
        font-weight: 400;
        color: rgba(40, 40, 40, 1);
      }
      p {
        font-size: 14px;
        font-weight: 400;
        color: rgba(165, 165, 165, 1);
        margin: 20px 0;
      }
      img {
        width: 160px;
        height: 160px;
      }
      span {
        margin: 20px 0 0;
        font-size: 14px;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
      }
    }
  }
}
@media screen and (max-width: 1200px) {
  .mask {
    .box {
      padding: 0.4rem;
      max-width: 100%;
      .close {
        margin: 0 0 0.4rem;
      }
      .login_ok {
        h6 {
          font-size: 0.426667rem;
        }
        p {
          font-size: 0.373333rem;
          font-weight: 400;
          margin: 0.4rem 0;
        }
        img {
          width: 2.133333rem;
          height: 2.133333rem;
        }
        span {
          margin: 0.4rem 0 0;
          font-size: 0.373333rem;
        }
      }
    }
  }
}
</style>