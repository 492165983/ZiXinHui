<template>
  <div class="warp_c">
    <div class="content">
      <ul>
        <li>
          <img src="./../../assets/images/1.png" alt />
          <p>
            地址:
            广东省深圳市西乡宝源路财富港大厦D座2002E
          </p>
        </li>
        <li>
          <img src="./../../assets/images/2.png" alt />
          <p>
            Email:
            support@blackwind.com
            help@blackwind.com
          </p>
        </li>
        <li>
          <img src="./../../assets/images/3.png" alt />
          <p>
            咨询热线:
            0755-23022230
          </p>
        </li>
      </ul>
      <div class="address">
        <img src="./../../assets/images/4.jpg" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>

<style lang="less">
.warp_c {
  padding: 80px 0;
  .content {
    display: flex;
    ul {
      width: 400px;
      height: 600px;
      background: #333;
      opacity: 1;
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 24px;
      li {
        // display: flex;   
        img {
          width: 32px;
          height: 32px;
          margin-top: 10px;
        }
        p {
          color: #fff;
          font-size: 16px;
        }
      }
    }
  }
}
</style>