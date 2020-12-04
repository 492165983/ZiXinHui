<template>
  <div class="rec_slide" @click="goDetails">
    <div class="_img">
      <img class="sign_vip" v-if="listInfo.watchMode == 2" src="../assets/icon_vip_subscript.png" alt />
      <img class="cover_img" :src="listInfo.cover" alt />
    </div>
    <div class="text">
      <h6 class="no_space">{{listInfo.title}}</h6>
      <p>
        <span class="num_people">{{listInfo.enroll}}人已报名</span>
        <span class="price">¥ {{listInfo.price}}</span>
      </p>
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
    goDetails(){
      this.$router.push({
        name: 'courseDetails',
        query: {
          id: this.listInfo.id,
          watchMode: this.listInfo.watchMode,
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rec_slide {
  margin: 0 1px 20px;
  max-width: 298px;
  cursor: pointer;
  padding: 10px 6px;
  background: #fff;
  border-radius: 10px;
  ._img {
    width: 286px;
    height: 182px;
    border-radius: 10px;
    overflow: hidden;
    position: relative;
    .sign_vip {
      position: absolute;
      left: 10px;
    }
    .cover_img {
      width: 100%;
      height: 100%;
    }
  }
  .text {
    width: 100%;
    h6 {
      font-size: 16px;
      color: #3c3c3c;
      margin: 15px 0;
    }
    p {
      display: flex;
      justify-content: space-between;
      .num_people {
        font-size: 14px;
        color: #8e8e8e;
      }
      .price {
        font-size: 16px;
        color: #f57425;
      }
    }
  }
  &:hover {
    box-shadow: 0px 4px 10px 0px rgba(150, 150, 150, 0.2);
  }
  &:nth-child(4n) {
    margin-right: 0;
  }
}
@media screen and (max-width: 1200px) {
.rec_slide {
  margin: 0 1px 15px;
  width: 100%;
  cursor: pointer;
  padding: 10px 6px;
  background: #fff;
  border-radius: 10px;
  ._img {
    width: 100%;
    height: 3rem;
    border-radius: .2rem;
  }
  .text {
    h6 {
      font-size: .373333rem;
      margin: 10px 0;
    }
    p {
      .num_people {
        font-size: .32rem;
      }
      .price {
        font-size: .32rem;
      }
    }
  }
}
  
}
</style>