<template>
  <div class="warp">
    <div class="content">
      <div class="tab">
        <!-- <div class="item" :class="{active: tab == 1}" @click="tab = 1">公司简介</div> -->
        <!-- <div class="item" :class="{active: tab == 2}" @click="tab = 2">公司文化</div> -->
      </div>
      <main>
        <h6>公司简介</h6>
        <div class="tx" v-html="content"></div>
      </main>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tab: 1,
      content: `<p class="MsoNormal">
	<b>资信科技简介：</b><b></b>
</p>
<p class="MsoNormal">
	<span>资信</span>科技<span>以中国金融智能化为己任，旨在成为新金融的领军企业。</span>
</p>
<p class="MsoNormal">
	<span><br />
</span>
</p>
<p class="MsoNormal">
	<span>它以金融科技为核心，以投资者教育为切入点，以社群关系为纽带，延伸到数据服务、资产配置服务并构筑基金经理孵化平台，完全打通金融生态中教育、数据、软件、社交、实战、游学等多种用户需求。其目标是打造成为全球最大的开放式金融综合服务平台，并将为中国金融业输送一万名优秀的基金经理。</span>
</p>
<p class="MsoNormal">
	&nbsp;
</p>
<p class="MsoNormal">
	<b>资信科技核心理念：</b><b></b>
</p>
<p class="MsoNormal">
	<b>文化：</b>每个自信人的故事汇集而成的文化
</p>
<p class="MsoNormal">
	<b>价值观：</b>就业、创业、创新
</p>
<p class="MsoNormal">
	<b>宗旨：</b>专业立足，以人为本
</p>
<p class="MsoNormal">
	<b>使命</b>：解决中国资本市场信心
</p>
<p class="MsoNormal">
	<b>愿景：</b>让每个投资者在资本市场长期获利
</p>
<p class="MsoNormal">
	<br />
</p>
<p class="MsoNormal">
	<b>顾问团队：</b><b></b>
</p>
<p class="MsoNormal">
	<span>顾问团队成员包括吉姆</span> · <span>罗杰斯、菲利克斯、本哈德 </span><span>· </span><span>冈辛等国际著名投资专家。其中吉姆 </span><span>· </span><span>罗杰斯是现代华尔街的风云人物，其于上世纪</span><span>70</span><span>年代和索罗斯共同创建的量子基金举世闻名，现在是黑风集团投资研究院经济委员会员。更与德国前总统、国际货币基金组织前</span>
</p>
<p class="MsoNormal">
	<span>总裁霍斯特</span> · <span>克勒有过深入交流，探讨世界经济形势，致力于改变世界经济环境，走向更好的发展道路。</span>
</p>
<p class="MsoNormal">
	&nbsp;
</p>
<p class="MsoNormal">
	<img style="max-width: 100%" src="http://pzojbkhiu.bkt.clouddn.com/2019/11/08/560c0699-0eeb-4b70-8e30-b33fb137559e.png" /><span><br />
</span>
</p>
<p class="MsoNormal">
	<span><br />
</span>
</p>
<p class="MsoNormal">
	吉姆 · 罗杰斯
</p>
<p class="MsoNormal">
	· &nbsp;<span>现代华尔街的风云人物。</span>
</p>
<p class="MsoNormal">
	· &nbsp;<span>被誉为最富远见的国际投资家。</span>
</p>
<p class="MsoNormal">
	· &nbsp;<span>是美国证券界最成功的实践家之一。</span>
</p>
<p class="MsoNormal">
	· &nbsp;1970<span>年和索罗斯共同创建量子基金，量子基金连续十年的年均收益率超过</span><span>50%</span><span>。</span>
</p>
<p class="MsoNormal">
	<span><br />
</span>
</p>
<p class="MsoNormal">
	<img style="max-width: 100%" src="http://pzojbkhiu.bkt.clouddn.com/2019/11/08/fba45fb1-e4db-440d-80b8-cc5068147bc5.png" /><span><br />
</span>
</p>
<p class="MsoNormal">
	<span><br />
</span>
<p class="MsoNormal">
	<span>霍斯特</span> · <span>克勒</span>
</p>
<p class="MsoNormal">
	· &nbsp;<span>是一位广受尊重的政治家、金融专家。</span>
</p>
<p class="MsoNormal">
	· &nbsp;<span>曾担任国际货币基金组织的第八任总裁兼执行董事会主席的职务。</span>
</p>
<p class="MsoNormal">
	· &nbsp;<span>在</span><span>2004</span><span>年首次出任德国总统，</span><span>2009</span><span>年连任。</span>
</p>
<p class="MsoNormal">
	&nbsp;
</p>
<p class="MsoNormal">
	<img style="max-width: 100%" src="http://pzojbkhiu.bkt.clouddn.com/2019/11/08/e5a23382-eaa7-402c-9ac3-4c382cf979b6.png"/><span><br />
</span>
</p>
<p class="MsoNormal">
	<span><br />
</span>
</p>
<p class="MsoNormal">
	<span>菲利克斯</span>
</p>
<p class="MsoNormal">
	· &nbsp;Delta<span>金融顾问公司董事长。</span>
</p>
<p class="MsoNormal">
	· &nbsp;<span>曾担任埃克森美孚、</span><span>IBM</span><span>和</span><span>Chinavasion</span><span>等公司高管。</span>
</p>
<p class="MsoNormal">
	&nbsp;
</p>
<p class="MsoNormal">
	<img style="max-width: 100%" src="http://pzojbkhiu.bkt.clouddn.com/2019/11/08/4c63223d-4154-4f45-a17c-9908f2c19ec1.jpg"/>&nbsp;
</p>
<p class="MsoNormal">
	<span><br />
</span>
</p>
<p class="MsoNormal">
	本哈德 · 冈辛
</p>
<p class="MsoNormal">
	· &nbsp;<span>英国林耐尔投资旗下香港</span><span>FX Stockbroker</span><span>外汇交易和</span><span>XHub</span>
</p>
<p class="MsoNormal">
	<span><span>·&nbsp;&nbsp;</span>数字资产证券交易所的大中华区总经理。</span>
</p>`
    };
  }
};
</script>

<style lang="less" scoped>
.warp {
  background: #f8f8f8;
  padding: 30px 0 60px;
  .tab {
    display: flex;
    width: 100%;
    background: #fff;
    margin-bottom: 20px;
    border-radius: 4px;
    .item {
      padding: 0 30px;
      font-size: 18px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #3c3c3c;
      position: relative;
      &.active {
        color: #f57425;
        &::after {
          content: "";
          position: absolute;
          display: block;
          width: 24px;
          height: 4px;
          background: rgba(245, 116, 37, 1);
          border-radius: 2px;
          bottom: 0;
          left: 50%;
          margin-left: -12px;
        }
      }
    }
  }
  main {
    box-sizing: border-box;
    background: #fff;
    border-radius: 4px;
    width: 100%;
    padding: 30px;
    h6 {
      font-size: 24px;
      color: #282828;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
}
@media screen and (max-width: 1200px) {
  .warp {
    padding: 0.4rem 0;
    .tab {
      margin-bottom: 0.266667rem;
      .item {
        height: 1.066667rem;
        padding: 0 0.4rem;
        font-size: 0.373333rem;
        &::after {
          width: 0.32rem;
          margin-left: -0.16rem;
        }
      }
    }
    main {
      padding: 0.4rem;
      h6 {
        font-size: 0.426667rem;
        margin-bottom: 0.266667rem;
      }
    }
  }
}
</style>