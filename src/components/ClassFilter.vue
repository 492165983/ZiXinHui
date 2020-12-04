<template>
  <div class="filter">
    <div class="filter_item">
      <div class="title">排序</div>
      <ul>
        <li :class="{active: typeSortNum === 2}" @click="sortHandle(2)">最近热播</li>
        <li :class="{active: typeSortNum === 1}" @click="sortHandle(1)">最新上架</li>
      </ul>
    </div>
    <div class="filter_item">
      <div class="title">地区</div>
      <ul>
        <li :class="{active: isFindAll}" @click="handleIsFindAll()">全部</li>
        <li
          :class="{active: typeId == item.id && !isFindAll}"
          v-for="item in classList"
          :key="item.id"
          @click="handleClassType(item.id)"
        >{{item.typeName}}</li>
      </ul>
    </div>
    <div class="filter_item">
      <div class="title">资费</div>
      <ul>
        <li :class="{active: feeType === 3}" @click="feeTypeHandle(3)">全部</li>
        <li :class="{active: feeType === 4}" @click="feeTypeHandle(4)">免费</li>
        <li :class="{active: feeType === 2}" @click="feeTypeHandle(2)">付费</li>
        <li :class="{active: feeType === 1}" @click="feeTypeHandle(1)">VIP</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "ClassFilter",
  props: {
    typeId: Number,
    feeType: Number,
    typeSortNum: Number,
    classList: Array,
    isFindAll: Boolean
  },
  methods: {
    handleIsFindAll() {
      this.$emit("update:isFindAll", true);
      this.$emit("handleClassType");
    },
    feeTypeHandle(e) {
      this.$emit("update:feeType", e);
      this.$emit("feeTypeHandle");
    },
    sortHandle(e) {
      this.$emit("update:typeSortNum", e);
      this.$emit("sortHandle");
    },
    handleClassType(e) {
      this.$emit("update:isFindAll", false);
      this.$emit("update:typeId", e);
      this.$emit("handleClassType");
    }
  }
};
</script>

<style lang="less" scope>
.filter {
  background: #f8f8f8;
  border-radius: 4px;
  padding-right: 20px;
  .filter_item {
    padding-left: 116px;
    position: relative;
    .title {
      width: 60px;
      height: 32px;
      background: #7f7f8c;
      border-radius: 0px 16px 16px 16px;
      font-size: 14px;
      text-align: center;
      line-height: 32px;
      color: #fff;
      position: absolute;
      top: 22px;
      left: 26px;
    }
    &:last-child ul {
      border-bottom: none;
    }
    ul {
      width: 100%;
      height: 100%;
      border-bottom: 1px solid #eee;
      font-size: 0;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      min-height: 72px;
      padding: 15px 0;
      li {
        display: inline-block;
        padding: 5px 8px;
        border-radius: 14px;
        margin-right: 10px;
        font-size: 14px;
        transition: background 0.3s;
        cursor: pointer;
        &.active,
        &:hover {
          background: #f7e9e1;
          color: #eb6519;
        }
      }
    }
  }
}
</style>
