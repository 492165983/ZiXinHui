<template>
  <div class="warp">
    <div class="item" @click="getDetails">
      <div class="lf">
        <h6>{{recInfo.title}}</h6>
        <p>{{recInfo.subTitle}}</p>
        <div class="time">
          <span class="zt" v-if="recInfo.isTopic">专题</span>
          <span v-else>
            <img src="../assets/icon_help_sign.png" alt />
            {{recInfo.readTimes}}人阅读
          </span>
          <span>{{recInfo.created }}</span>
        </div>
      </div>
      <div class="rg_img">
        <img :src="recInfo.cover" alt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recInfo: {
      type: Object
    }
  },
  methods: {
    getDetails() {
      if (this.recInfo.isTopic) {
        this.$router.push({
          name: "thematicDetails",
          query: { id: this.recInfo.id }
        });
      } else {
        this.$router.push({
          name: "newsDetails",
          query: {
            id: this.recInfo.id
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../style/global.less");
.item {
  cursor: pointer;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 180px;
  padding: 30px;
  border: 1px solid rgba(235, 235, 235, 1);
  border-radius: 10px;
  .lf {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 30px;
    justify-content: space-between;
    h6 {
      font-size: 16px;
      font-weight: bold;
      color: rgba(40, 40, 40, 1);
    }
    p {
      font-size: 14px;
      font-weight: 300;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .time {
      display: flex;
      justify-content: space-between;
      span {
        font-size: 12px;
        font-weight: 300;
        color: rgba(176, 176, 176, 1);
        &:first-child {
          display: flex;
          align-items: center;
          img {
            width: 18px;
            height: 14px;
            margin-right: 10px;
          }
        }
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
  .rg_img {
    width: 190px;
    height: 118px;
    border-radius: 10px;
    flex-shrink: 0;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
  }
}
@media screen and (max-width: 1200px) {
  .item {
    margin-bottom: 0.4rem;
    height: auto;
    padding: 0;
    border: 0;
    border-radius: 0.133333rem;
    align-items: center;
    flex-direction: row-reverse;
    .lf {
      padding-right: 0;
      padding-left: 0.4rem;
      h6 {
        font-size: 0.373333rem;
        font-weight: 400;
        line-height: 0.476667rem;
        .line_clamp(1);
      }
      p {
        font-size: 0.32rem;
        font-weight: 300;
        color: rgba(102, 102, 102, 1);
        line-height: 0.4rem;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        margin: 0.266667rem 0;
      }
      .time {
        span {
          font-size: 0.293333rem;
          font-weight: 300;
          &:first-child {
            img {
              width: 0.266667rem;
              height: 0.213333rem;
              margin-right: 5px;
            }
          }
        }
      }
    }
    .rg_img {
      width: 3.226667rem;
      height: 2rem;
      border-radius: 0.133333rem;
      flex-shrink: 0;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:hover {
      box-shadow: none;
    }
  }
}
</style>