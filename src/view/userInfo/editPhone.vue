<template>
  <div class="warp">
    <div class="tit">修改密码</div>
    <div class="edit_info">
      <div class="avatar">
        <div class="txt">账号</div>
        <div class="acc txt">{{userInfo.mobile | changePhone}}</div>
      </div>
      <div class="form_box">
        <div class="input_list fs_vac">
          <div class="input_tit">验证码</div>
          <div class="in_b">
            <input type="text" v-model="code" placeholder="请输入验证码" />
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
          <input type="password" v-model="newPwd" placeholder="请输入登录密码" />
        </div>
        <div class="input_list">
          <div class="input_tit">确认密码</div>
          <input type="password" v-model="reNewPwd" placeholder="请输入登录密码" />
        </div>
      </div>
      <div class="submit_btn">
        <button @click="handleSaves" :disabled="saves">保存</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import httpRequest from "@/api/index.js";
import { mapState } from "vuex";
export default {
  data() {
    return {
      code: "",
      saves: false,
      password: "",
      newPwd: "",
      reNewPwd: "",
      num: 0,
      smsId: "",
      sendBtnStatus: false
    };
  },
  mounted() {
    this.getCountdownTime();
  },
  filters: {
    changePhone(val) {
      return `${val.slice(0, 3)}****${val.slice(7)}`;
    }
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    async handleSaves() {
      this.saves = true;
      setTimeout(() => {
        this.saves = false;
      }, 300);
      if (this.code === "") {
        Toast("验证码不能为空");
      } else if (this.newPwd === "") {
        Toast("密码不能为空");
      } else if (this.newPwd === this.reNewPwd) {
        const res = await httpRequest.userUpdateUserPwd({
          code: this.code,
          id: this.smsId,
          newPwd: this.newPwd,
          reNewPwd: this.reNewPwd
        });
        if (res) {
          Toast.success("修改成功");
        }
      } else {
        Toast("两次密码不一样");
      }
    },
    async handleSendSms(num) {
      if (num === 60) {
        const smsId = await httpRequest.sendSms({
          mobile: this.userInfo.mobile
        });
        if (smsId) {
          this.smsId = smsId.data.smsId;
        }
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
    }
  }
};
</script>

<style lang="less" scoped>
.warp {
  max-width: 900px;
  .tit {
    padding: 40px 0;
    font-size: 20px;
    font-weight: 400;
    color: rgba(40, 40, 40, 1);
  }
  .edit_info {
    width: 900px;
    background: #fff;
    padding: 30px 40px 90px;
    border-radius: 10px;
    .txt {
      margin-right: 40px;
      font-size: 16px;
      font-weight: 400;
      color: rgba(40, 40, 40, 1);
    }
    .avatar {
      margin-bottom: 45px;
      display: flex;
      align-items: center;
    }
    .submit_btn {
      button {
        border: none;
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
      }
    }
  }
  .form_box {
    margin-bottom: 50px;
    display: flex;
    flex-direction: column;
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
}
@media screen and (max-width: 1200px) {
  .warp {
    max-width: 1200%;
    .tit {
      padding: 0 0.4rem 0.4rem;
      font-size: 0.426667rem;
    }
    .edit_info {
      width: 100%;
      padding: 0.4rem;
      .txt {
        width: 1.8rem;
        flex-shrink: 0;
        margin-right: 0rem;
        font-size: 0.373333rem;
      }
      .avatar {
        margin-bottom: 0.4rem;
      }
      .submit_btn {
        p {
          width: 1.8rem;
          height: 0.9rem;
          border-radius: 6px;
          font-size: 0.32rem;
        }
      }
    }
    .form_box {
      margin-bottom: 0.533333rem;
      .input_list {
        margin: 0.4rem 0;
        width: 100%;
        .input_tit {
          font-size: 0.373333rem;
          white-space: nowrap;
          width: 1.8rem;
          flex-shrink: 0;
        }
        .in_b {
          width: 100%;
        }
        input {
          width: 100%;
          height: 1.2rem;
          padding: 0 0.266667rem;
          font-size: 0.373333rem;
          &::placeholder {
            font-size: 0.373333rem;
            color: #bababa;
          }
        }
        &.fs_vac {
          input {
            width: 100%;
          }
          .btn {
            width: 1.6rem;
            height: 1.2rem;
            font-size: 0.373333rem;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>

<style lang="less">
.el-radio__input.is-checked .el-radio__inner {
  border-color: #f57425;
  background: #f57425;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #f57425;
}
</style>