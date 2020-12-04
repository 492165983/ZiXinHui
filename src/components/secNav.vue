<template>
  <div class="warp">
    <div class="content">
      <div class="sec_list">
        <slot name="all"></slot>
        <template v-for="item in classList">
          <div
            class="item"
            :class="{active: item.active}"
            :key="item.id"
            @click="getTypeId(item)"
          >{{item.typeName}}</div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import httpRequest from "@/api/index.js";
export default {
  name: "secNav",
  data() {
    return {
      classList: null
    };
  },
  props: {
    typeNum: {
      type: Number
    },
    typeId: {
      type: Number
    },
    isAll: {
      type: Boolean,
      default: false
    },
    typeName: {
      type: String
    }
  },
  mounted() {
    this.getClassList();
  },
  methods: {
    async getClassList() {
      const res = await httpRequest.getClassificationList({
        type: this.typeNum
      });
      if (res) {
        this.classList = res.data.map(i => ({ ...i, active: false }));
        if (this.isAll) {
          this.classList = [
            { typeName: "全部", active: true },
            ...this.classList
          ];
        } else {
          if (this.typeId) {
            this.classList.forEach(item => {
              if (item.id === this.typeId) {
                item.active = true;
              }
            });
          } else {
            this.getTypeId({ id: this.classList[0].id });
            this.classList.forEach((item, index) => {
              if (index === 0) {
                item.active = true;
              }
            });
          }
        }
      }
    },
    getTypeId(item) {
      this.classList.forEach(e => (e.active = false));
      item.active = true;
      this.$emit("update:pageNum", 1);
      if (item.typeName === "全部") {
        this.$emit("update:typeName", "全部");
        this.$emit("update:typeId", null);
        this.$emit("fullAll");
      } else {
        this.$emit("update:typeName", "");
        this.$emit("update:typeId", item.id);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.warp {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 4px 0px rgba(158, 158, 158, 0.1);
}
.sec_list {
  display: flex;
  flex-wrap: wrap;
  .item {
    cursor: pointer;
    padding: 28px 0px 18px;
    margin: 0px 30px;
    font-size: 14px;
    color: #282828;
    font-weight: 300;
    position: relative;
    @media screen and (min-width: 1200px) {
      &:hover {
        color: rgba(245, 116, 37, 1);
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
    &.active {
      color: rgba(245, 116, 37, 1);
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
@media screen and (max-width: 1200px) {
  .sec_list {
    flex-wrap: nowrap;
    overflow-x: scroll;
    .item {
      white-space: nowrap;
      padding: 0.266667rem 0;
      margin: 0 0.4rem;
    }
  }
}
</style>