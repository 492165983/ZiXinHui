/* eslint-disable no-console */
<template>
  <div class="mask" @click="closeLogin">
    <div class="box" @click.stop>
      <div class="close" @click="closeLogin">
        <img src="../assets/button_popup_delete.png" alt />
      </div>
      <div class="login_nav" v-if="formId ===1 || formId === 2">
        <div
          v-for="item in loginNav"
          :key="item.id"
          class="item"
          :class="{active: item.active}"
          @click="handleNav(item)"
        >{{item.text}}</div>
      </div>
      <div class="form_box" v-if="formId ===1 || formId === 2">
        <div class="input_list">
          <div class="input_tit">手机号</div>
          <input type="text" v-model="mobile" placeholder="请输入手机号码" />
        </div>
        <div class="input_list fs_vac" v-if="formId === 2">
          <div class="input_tit">验证码</div>
          <div class="in_b">
            <input type="text" v-model="validateCode" placeholder="请输入短信验证码" />
            <button
              class="btn"
              :class="{sends: sendBtnStatus}"
              :disabled="sendBtnStatus"
              @click="handleSendSms(60)"
            >{{num > 0 ? num : '发送'}}</button>
          </div>
        </div>
        <div class="input_list">
          <div class="input_tit">密码</div>
          <input type="password" v-model="password" :placeholder="formId === 1?'请输入登录密码':'请设置登录密码'" />
        </div>
        <p class="wjmm" v-if="formId ===1" @click="wjmm">忘记密码</p>
      </div>
      <div class="login_ok" v-if="formId === 3">
        <h6>注册成功！</h6>
        <p>请关注官方微信公众号，即可随时登录查看~</p>
        <img src="../assets/qr.jpg" alt />
        <span>扫一扫关注公众号</span>
      </div>
      <div class="edit_info" v-if="formId === 4">
        <div class="form_box">
          <div class="input_list">
            <div class="input_tit">账号</div>
            <input type="text" v-model="ePhone" placeholder="请输入账号" />
          </div>
          <div class="input_list fs_vac">
            <div class="input_tit">验证码</div>
            <div class="in_b">
              <input type="text" v-model="eCode" placeholder="请输入验证码" />
              <button
                class="btn"
                :class="{sends: sendBtnStatus}"
                :disabled="sendBtnStatus"
                @click="handleSendSms(60)"
              >{{num > 0 ? num : '发送'}}</button>
            </div>
          </div>
          <div class="input_list">
            <div class="input_tit">新密码</div>
            <input type="password" v-model="ePwd" placeholder="请输入登录密码" />
          </div>
          <div class="input_list">
            <div class="input_tit">确认密码</div>
            <input type="password" v-model="eRePwd" placeholder="请输入登录密码" />
          </div>
        </div>
      </div>
      <div class="submit_btn">
        <button class="btn" :disabled="saves" @click="loginSave">{{formId | btnText}}</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import httpRequest from "@/api/index.js";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      ePhone: "",
      eCode: "",
      ePwd: "",
      eRePwd: "",
      saves: false,
      mobile: "",
      validateCode: "",
      num: 0,
      password: "",
      smsId: "",
      sendBtnStatus: false,
      loginNav: [
        {
          text: "登录",
          active: true,
          id: 1
        },
        {
          text: "注册",
          active: false,
          id: 2
        }
      ],
      formId: 1
    };
  },
  filters: {
    btnText(val) {
      if (val === 1) {
        return "登录";
      }
      if (val === 2) {
        return "注册";
      } else {
        return "保存";
      }
    }
  },
  created() {
    this.getCountdownTime();
    const mobile = localStorage.getItem("mobile");
    const password = localStorage.getItem("password");
    if (mobile && password) {
      this.mobile = mobile;
      this.password = password;
    }
  },
  methods: {
    ...mapMutations(["CHANGEUSERINFO", "CAHNGELOGINSHOW"]),
    closeLogin() {
      this.CAHNGELOGINSHOW(false);
    },
    wjmm() {
      localStorage.setItem("mobile", "");
      localStorage.setItem("password", "");
      this.mobile = "";
      this.password = "";
      this.formId = 4;
    },
    async handleSendSms(num) {
      if (!/^1[3456789]\d{9}$/.test(this.mobile || this.ePhone) && num === 60) {
        Toast("手机号码格式错误");
        return false;
      } else if (num === 60) {
        const smsId = await httpRequest.sendSms({
          mobile: this.mobile || this.ePhone
        });
        this.smsId = smsId.data.smsId;
      }
      this.num = num;
      this.sendBtnStatus = true;
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.num -= 1;
        let dateSecond = Date.now();
        localStorage.setItem("countdown", this.num);
        localStorage.setItem("countdownSecond", dateSecond);
        if (this.num === 0) {
          clearInterval(this.timer);
          this.sendBtnStatus = false;
        }
      }, 1000);
    },
    getCountdownTime() {
      let dateSecond = Date.now();
      let countdownSecond = localStorage.getItem("countdownSecond");
      let num = localStorage.getItem("countdown");
      let exitTime = parseInt((dateSecond - countdownSecond) / 1000);
      if (exitTime >= num) {
        this.num = 0;
      } else {
        this.handleSendSms(num - exitTime);
      }
    },
    handleNav(item) {
      if (!item.active) {
        this.loginNav.forEach(i => {
          i.active = false;
        });
        this.formId = item.id;
        item.active = true;
      }
    },
    async resetUserPwd() {
      switch ("") {
        case this.ePhone:
          Toast("请输入手机号");
          break;
        case this.eCode:
          Toast("请输入验证码");
          break;
        case this.ePwd:
          Toast("请输入密码");
          break;
        case this.eRePwd:
          Toast("请确认密码");
          break;
        default:
          if (this.ePwd === this.eRePwd) {
            const res = await httpRequest.resetUserPwd({
              userType: 1,
              id: this.smsId,
              mobile: this.ePhone,
              code: this.eCode,
              newPwd: this.ePwd,
              reNewPwd: this.eRePwd
            });
            if (res) {
              Toast("修改成功");
              setTimeout(() => {
                this.formId = 1;
              }, 300);
            }
          } else {
            Toast("两次密码不一样");
          }
      }
    },
    async userLogin() {
      const res = await httpRequest.userLogin({
        userType: 1,
        mobile: this.mobile,
        password: this.password
      });
      if (res) {
        localStorage.setItem("mobile", this.mobile);
        localStorage.setItem("password", this.password);
        localStorage.setItem("token", res.data.token);
        const userInfo = await httpRequest.userGetUserBaseInfo();
        this.CHANGEUSERINFO(userInfo.data);
        window.location.reload();
      }
      return res;
    },
    async userRegist() {
      return await httpRequest.userRegist({
        aesUserId: localStorage.getItem("aesUserId")
          ? localStorage.getItem("aesUserId")
          : "",
        userType: 1,
        mobile: this.mobile,
        password: this.password,
        validateCode: this.validateCode,
        validateCodeId: this.smsId
      });
    },
    async loginSave() {
      this.saves = true;
      setTimeout(() => {
        this.saves = false;
      }, 300);
      let res;
      switch (this.formId) {
        case 1:
          res = await this.userLogin();
          if (res) {
            this.closeLogin();
          }
          break;
        case 2:
          res = await this.userRegist();
          if (res) {
            this.formId = 3;
            this.userLogin();
          }
          break;
        case 3:
          res = await this.userLogin();
          if (res) this.closeLogin();
          break;
        case 4:
          this.resetUserPwd();
          break;
      }
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
      margin: 0 0 15px;
      cursor: pointer;
    }
    .login_nav {
      width: 100%;
      margin-bottom: 30px;
      display: flex;
      justify-content: space-around;
      .item {
        cursor: pointer;
        font-size: 20px;
        color: #9e9e9e;
        padding: 15px 0;
        position: relative;
        &.active {
          color: #282828;
          &::after {
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -12px;
            width: 24px;
            height: 4px;
            display: block;
            background: rgba(245, 116, 37, 1);
            border-radius: 2px;
            content: "";
          }
        }
      }
    }
    .form_box {
      display: flex;
      flex-direction: column;
      align-items: center;
      .input_list {
        margin: 30px 0;
        display: flex;
        align-items: center;
        width: 430px;
        justify-content: space-between;
        .input_tit {
          font-size: 16px;
          color: #282828;
        }
        .in_b {
          display: flex;
        }
        input {
          box-sizing: border-box;
          width: 358px;
          height: 58px;
          padding: 0 20px;
          font-size: 16px;
          color: #282828;
          background: rgba(247, 247, 247, 1);
          border-radius: 6px;
          border: none;
          &::placeholder {
            font-size: 16px;
            color: #bababa;
          }
        }
        &.fs_vac {
          input {
            width: 285px;
            border-radius: 6px 0px 0px 6px;
          }
          .btn {
            width: 74px;
            height: 58px;
            background: rgba(255, 119, 72, 1);
            border-radius: 0px 6px 6px 0px;
            cursor: pointer;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            box-sizing: border-box;
            border: none;
          }
          .sends {
            cursor: not-allowed;
            background: #d9d9d9;
          }
        }
      }
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
    .submit_btn {
      margin: 30px 0px;
      display: flex;
      justify-content: center;
      .btn {
        border: none;
        cursor: pointer;
        width: 86px;
        height: 36px;
        background: rgba(255, 119, 72, 1);
        border-radius: 6px;
        font-size: 14px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }
}
.wjmm {
  margin-top: -10px;
  font-size: 16px;
  color: rgba(255, 119, 72, 1);
  width: 430px;
  text-align: right;
}
@media screen and (max-width: 1200px) {
  .mask {
    .box {
      padding: 0.4rem;
      max-width: 100%;
      .close {
        margin: 0 0 0.4rem;
      }
      .login_nav {
        width: 100%;
        margin-bottom: 0.4rem;
        .item {
          font-size: 0.373333rem;
          padding: 0.4rem 0;
        }
      }
      .form_box {
        .input_list {
          margin: 0.4rem 0;
          width: 430px;
          max-width: 100%;
          .input_tit {
            font-size: 0.373333rem;
            flex-shrink: 0;
            width: 1.6rem;
          }
          .in_b {
            display: flex;
          }
          input {
            max-width: 100%;
            width: 7.6rem;
            flex-shrink: 0;
            height: 1.2rem;
            padding: 0 0.266667rem;
            font-size: 0.373333rem;
          }
          &.fs_vac {
            input {
              width: 5.5rem;
            }
            .btn {
              width: 2.1rem;
              height: 1.2rem;
              font-size: 0.32rem;
              white-space: nowrap;
            }
          }
        }
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
      .submit_btn {
        margin: 0.4rem 0px;
        .btn {
          width: 2.133333rem;
          height: 0.933333rem;
          font-size: 0.373333rem;
        }
      }
    }
  }
  .wjmm {
    max-width: 100%;
    font-size: 0.373333rem;
    margin-top: 0;
  }
}
</style>