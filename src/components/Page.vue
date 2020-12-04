<template>
  <div class="page">
    <ul class="page_list">
      <li class="prev disabled">
        <a href="#">上一页</a>
      </li>
      <li class="active">
        <a href="#">1</a>
      </li>
      <li class>
        <a href="#">2</a>
      </li>
      <li class>
        <a href="#">3</a>
      </li>
      <li class>
        <a href="#">4</a>
      </li>
      <li class>
        <a href="#">5</a>
      </li>
      <li class="next">
        <a href="#">下一页</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Page'
}
</script>

<style lang="less" scope>
.page {
  text-align: center;
  .page_list {
    font-size: 0;
    display: inline-block;
    li {
      display: inline-block;
      font-size: 14px;
      padding: 12px 10px;
      line-height: 1;
      margin-right: 10px;
      background: #f8f8f8;
      color: #111;
      border-radius: 2px;
      min-width: 34px;
      cursor: pointer;
      transition: all 0.3s;
      &.active,
      &:hover {
        background: #eb6519;
        a {
          color: #fff;
        }
      }
      &.disabled a {
        pointer-events: none;
        color: #999;
      }
      &.disabled {
        pointer-events: none;
        a {
          color: #999;
        }
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
