<template>
  <div class="header">
    <div class="container">
      <a href="#" class="logo">
        <img src="../assets/images/logo.png" alt />
      </a>
      <ul class="nav">
        <li>
          <router-link to="/">首页</router-link>
        </li>
        <li>
          <router-link to="/product">产品</router-link>
          <ul class="subnav">
            <li>
              <router-link to="/product">视频课程</router-link>
            </li>
            <li>
              <router-link to="/report">投研报告</router-link>
            </li>
            <li>
              <router-link to="/audio">音频课程</router-link>
            </li>
            <li>
              <router-link to="/product">AI</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/news">资讯中心</router-link>
          <ul class="subnav">
            <li>
              <router-link to="/news">专题</router-link>
            </li>
            <li>
              <router-link to="/news">热点掘金</router-link>
            </li>
            <li>
              <router-link to="/news">学习园地</router-link>
            </li>
            <li>
              <router-link to="/news">金融八卦</router-link>
            </li>
            <li>
              <router-link to="/news">活动新闻</router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link to="/about">个人中心</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less" scope>
.header {
  background: rgba(255, 255, 255, 0.9);
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 4px 10px rgba(51, 51, 51, 0.05);
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      width: 135px;
      height: 68px;
      line-height: 68px;
      display: flex;
      align-items: center;
      img {
        width: 100%;
        height: auto;
      }
    }
    .nav {
      &:after {
        content: '';
        overflow: hidden;
        clear: both;
      }
      & > li {
        padding: 0 40px;
        line-height: 68px;
        position: relative;
        float: left;
        & > a {
          font-size: 18px;
          color: rgba(51, 51, 51, 1);
          transition: color 0.3s linear;
        }
        &:hover {
          > a {
            font-weight: bold;
            color: rgba(235, 101, 25, 1);
          }
          .subnav {
            opacity: 1;
            height: auto;
          }
        }
        a.router-link-exact-active {
          font-weight: bold;
          color: rgba(235, 101, 25, 1);
        }
        .subnav {
          position: absolute;
          top: 68px;
          left: 50%;
          transform: translateX(-50%);
          background: #fff;
          width: 116px;
          box-shadow: 0 2px 10px rgba(51, 51, 51, 0.03);
          overflow: hidden;
          height: 0px;
          opacity: 0;
          transition: all 0.3s linear;
          li {
            height: 40px;
            line-height: 40px;
            font-size: 16px;
            &:first-child {
              border-top: 1px solid #f7f7f7;
            }
            a {
              display: block;
              text-align: center;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              width: 116px;
              padding: 0 10px;
              transition: all 0.3s linear;
              &:hover {
                color: rgba(235, 101, 25, 1);
                background: #f9f9f9;
              }
            }
          }
        }
      }
    }
  }
}
</style>
