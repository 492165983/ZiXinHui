<template>
  <div class="warp">
    <div class="tit">基本信息</div>
    <div class="edit_info">
      <van-uploader :after-read="afterRead">
        <div class="avatar">
          <div class="txt">头像</div>
          <div class="_img" :style="`background-image: url(${headUrl ? headUrl : userInfo.icon})`">
            <!-- <img :src="userInfo.icon" alt /> -->
          </div>
        </div>
      </van-uploader>
      <div class="edit_name">
        <div class="txt">昵称</div>
        <div class="_input">
          <input type="text" v-model="nickName" placeholder="请填写昵称" />
        </div>
      </div>
      <div class="edit_sex">
        <div class="txt">性别</div>
        <div class="sex_list">
          <el-radio v-model="radio" :label="1">男</el-radio>
          <el-radio v-model="radio" :label="2">女</el-radio>
        </div>
      </div>
      <div class="submit_btn">
        <p @click="submitInfo">保存</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import { mapState, mapMutations } from "vuex";
import httpRequest from "@/api/index.js";
export default {
  data() {
    return {
      headUrl: "",
      nickName: "",
      radio: 1,
      fileList: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  mounted() {
    this.radio = this.userInfo.gender;
    this.nickName = this.userInfo.nickName;
    this.headUrl = this.userInfo.icon;
  },
  methods: {
    ...mapMutations(["CHANGEUSERINFO"]),
    async afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await httpRequest.uploadFile(formData);
      this.headUrl = res.data;
    },
    async submitInfo() {
      const res = await httpRequest.userUpdateUser({
        gender: this.radio,
        headUrl: this.headUrl,
        nickName: this.nickName
      });
      if (res) {
        Toast.success("修改成功");
        setTimeout(async () => {
          const userInfo = await httpRequest.userGetUserBaseInfo();
          this.CHANGEUSERINFO(userInfo.data);
        }, 1200);
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
      ._img {
        width: 86px;
        height: 86px;
        border-radius: 50%;
        overflow: hidden;
        border: 1px solid #f7f7f7;
        background-size: cover;
        background-repeat: no-repeat;
      }
    }
    .edit_name {
      margin-bottom: 45px;
      display: flex;
      align-items: center;
      ._input {
        input {
          box-sizing: border-box;
          width: 358px;
          height: 58px;
          background: rgba(247, 247, 247, 1);
          border-radius: 6px;
          border: none;
          padding: 0 20px;
          font-size: 16px;
          font-weight: 400;
          color: #282828;
          &::placeholder {
            font-size: 16px;
            color: rgba(186, 186, 186, 1);
          }
        }
      }
    }
    .edit_sex {
      margin-bottom: 80px;
      display: flex;
      align-items: center;
    }
    .submit_btn {
      p {
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
}
@media screen and (max-width: 1200px) {
  .warp {
    width: 100%;
    max-width: 100%;
    .tit {
      padding: 0 0.4rem 0.4rem;
      font-size: 0.426667rem;
    }
    .edit_info {
      width: 100%;
      padding: 0.4rem;
      border-radius: 10px;
      .txt {
        margin-right: 0.266667rem;
        font-size: 0.373333rem;
      }
      .avatar {
        margin-bottom: 0.4rem;
        ._img {
          width: 1.6rem;
          height: 1.6rem;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      .edit_name {
        margin-bottom: 0.8rem;
        ._input {
          input {
            width: 100%;
            height: 1.066667rem;
            padding: 0 0.266667rem;
            font-size: 0.373333rem;
            &::placeholder {
              font-size: 0.373333rem;
            }
          }
        }
      }
      .edit_sex {
        margin-bottom: 0.8rem;
      }
      .submit_btn {
        p {
          cursor: pointer;
          width: 1.866667rem;
          height: 0.8rem;
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