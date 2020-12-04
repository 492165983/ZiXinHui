<template>
  <div class="warp">
    <div class="rec_slide" @click="goDetails">
      <div class="_img">
        <img class="sign_vip" src="../assets/icon_presentation_new.png" alt />
        <div class="text">
          <h6>{{listInfo.title}}</h6>
          <p>
            <span class="num_people">{{listInfo.created}}</span>
            <span class="price">{{listInfo.typeName}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    listInfo: {
      type: Object
    }
  },
  methods: {
    goDetails() {
      this.$router.push({
        name: "reportSeries",
        query: {
          id: this.listInfo.lessonType
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url("../style/global.less");
.rec_slide {
  cursor: pointer;
  border-radius: 10px;
  padding: 0px;
  border: 1px solid rgba(240, 240, 240, 1);
  ._img {
    position: relative;
    padding: 30px 20px;
    .sign_vip {
      position: absolute;
      top: 0;
      left: 0;
    }
    .text {
      display: flex;
      flex-direction: column;
      height: 100%;
      h6 {
        font-size: 18px;
        color: #3c3c3c;
        font-weight: 400;
        flex: 1;
        margin: 0;
        line-height: 24px;
        margin-bottom: 15px;
      }
      p {
        display: flex;
        flex-direction: column;
        .price,
        .num_people {
          margin: 5px 0;
          font-size: 16px;
          color: #a9a9a9;
        }
      }
    }
  }
  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
  }
}
@media screen and (max-width: 1200px) {
  .rec_slide {
    border-radius: 0.133333rem;
    ._img {
      padding: 0.6rem 0.266667rem;
      .text {
        h6 {
          font-size: 0.426667rem;
          line-height: 0.5rem;
          margin-bottom: 0.266667rem;
          .line_clamp(2);
        }
        p {
          .price,
          .num_people {
            margin: 5px 0;
            font-size: 0.373333rem;
            color: #a9a9a9;
          }
        }
      }
    }
    &:hover {
      box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
    }
  }
}
</style>