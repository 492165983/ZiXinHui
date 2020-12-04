<template>
  <div class="menu_item">
    <div class="title">
      <span class="icon">
        <img :src="typeImg" alt />
      </span>
      <em>{{typeName}}</em>
    </div>
    <ul class="list">
      <li v-for="item in typeList" :key="item.id" @click="goDetails(item)">
        <a v-if="typeId === 4 " :href="item.videoUrl ">{{item.name}}</a>
        <a v-else href="javascript:void(0)">{{item.typeName}}</a>
      </li>
      <li class="more" v-if="typeId !== 4">
        <a href="javascript:void(0)" @click="goList">更多</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "IndexMenuItem",
  props: {
    typeName: String,
    typeImg: String,
    typeId: Number,
    typeList: Array,
  },
  methods: {
    goDetails(item) {
      if (this.typeId === 1) {
        this.$router.push({
          name: "fullCourse",
          query: {
            typeId: item.id,
            // watchMode: this.listInfo.watchMode
          },
        });
      } else if (this.typeId === 2) {
        this.$router.push({
          name: "audioSeries",
          query: {
            typeId: item.id,
            // watchMode: this.listInfo.watchMode
          },
        });
      } else if (this.typeId === 3) {
        this.$router.push({
          name: "reportSeries",
          query: {
            typeId: item.id,
          },
        });
      }
    },
    goList() {
      if (this.typeId === 1) {
        this.$router.push({
          name: "fullCourse",
        });
      } else if (this.typeId === 2) {
        this.$router.push({
          name: "audioSeries",
        });
      } else if (this.typeId === 3) {
        this.$router.push({
          name: "reportSeries",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.menu_item {
  // padding: 10px 5px 10px 15px;
  padding: 2px;
  margin-right: 5%;
  height: 100%;
  border: 2px solid rgba(248, 248, 248, 1);

  &:last-child {
    margin-right: 0;
  }
  .title {
    display: flex;
    align-items: center;
    // margin-bottom: 10px;
    .icon {
      width: 15px;
      height: 15px;
      margin-right: 7px;
      display: inline-block;
      .img {
        width: 100%;
        height: 14px;
      }
    }
    em {
      font-size: 12px;
      transform: scale(0.9);
      color: #222;
      line-height: 1;
      font-style: normal;
      font-weight: bold;
      white-space: nowrap;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    li {
      display: inline-block;
      margin-top: 10px;
      margin-right: 20px;
      a {
        font-size: 14px;
        line-height: 1;
        color: rgba(102, 102, 102, 1);
        transition: all 0.3s;
        &:hover {
          color: rgba(235, 101, 25, 1);
        }
      }
      &.more a {
        color: rgba(235, 101, 25, 1);
      }
    }
  }
}
</style>
