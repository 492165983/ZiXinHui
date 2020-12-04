import Vue from 'vue';
import Router from 'vue-router';
import {
  Toast
} from 'vant'
import store from '@/store/index.js';
Vue.use(Router);

const router = new Router({
  // mode: 'history',
  routes: [{
      name: 'index',
      path: '',
      component: () => import('@/view/index.vue'),
      meta: {
        title: '博弈视界官网：财经综合服务平台，提供专业的财经、股票、期货、基金、外汇、黄金、贵金属、农产品、能源、数字货币等金融品种的交易技巧,一个最全面的财经综合服务平台，投资者教育平台_深圳资信科技有限公司'
      }
    },
    // 音频系列
    {
      name: 'audioSeries',
      path: '/audioSeries',
      component: () => import('@/view/audioSeries/home.vue'),
    },
    // 音频系列 详情
    {
      name: 'audioDetails',
      path: '/audioDetails',
      component: () => import('@/view/audioSeries/audioDetails.vue'),
    },
    // 音频系列
    {
      name: 'pdf',
      path: '/pdf',
      component: () => import('@/view/reportSeries/pdf.vue'),
    },
    // 音频系列
    {
      name: 'pdfList',
      path: '/pdfList',
      component: () => import('@/view/reportSeries/pdfList.vue'),
    },
    // 音频系列
    {
      name: 'contact',
      path: '/contact',
      component: () => import('@/view/contactUs/index.vue'),
    },
    // 全部课程
    {
      name: 'fullCourse',
      path: '/fullCourse',
      component: () => import('@/view/fullCourse/home.vue'),
    },
    {
      name: 'courseDetails',
      path: '/courseDetails',
      component: () => import('@/view/fullCourse/courseDetails.vue'),
    },
    {
      name: 'submitOrder',
      path: '/submitOrder',
      component: () => import('@/view/submitOrder/home.vue'),
      meta: {
        isLogin: true // 添加该字段，表示进入这个路由是需要登录的
      },
    },
    {
      name: 'reportSeries',
      path: '/reportSeries',
      component: () => import('@/view/reportSeries/home.vue'),
      meta: {
        keepAlive: true, //保存页面状态
      }
    },
    {
      name: 'newsCenter',
      path: '/newsCenter',
      component: () => import('@/view/newsCenter/home.vue'),
      meta: {
        keepAlive: true, //保存页面状态
      },
    },
    {
      name: 'thematicDetails',
      path: '/thematicDetails',
      component: () => import('@/view/newsCenter/thematicDetails.vue'),
    },
    {
      name: 'newsDetails',
      path: '/newsDetails',
      component: () => import('@/view/newsCenter/newsDetails.vue'),
    },
    {
      name: 'newsDetails2',
      path: '/newsDetails2',
      component: () => import('@/view/newsCenter/newsDetails2.vue'),
    },
    {
      name: 'aboutUs',
      path: '/aboutUs',
      component: () => import('@/view/aboutUs/index.vue')
    },
    {
      name: 'userInfo',
      path: '/userInfo',
      meta: {
        isLogin: true, // 添加该字段，表示进入这个路由是需要登录的
      },
      component: () => import('@/view/userInfo/home.vue'),
      children: [{
          name: 'courseProgress',
          path: 'courseProgress',
          component: () => import('@/view/userInfo/courseProgress.vue'),
        },
        {
          name: 'myCollection',
          path: 'myCollection',
          component: () => import('@/view/userInfo/myCollection.vue')
        },
        {
          name: 'borwseRecord',
          path: 'borwseRecord',
          component: () => import('@/view/userInfo/borwseRecord.vue')
        },
        {
          name: 'purchaseHistory',
          path: 'purchaseHistory',
          component: () => import('@/view/userInfo/purchaseHistory.vue')
        },
        {
          name: 'myVip',
          path: 'myVip',
          component: () => import('@/view/userInfo/myVip.vue')
        },
        {
          name: 'basicInfo',
          path: 'basicInfo',
          component: () => import('@/view/userInfo/basicInfo.vue')
        },
        {
          name: 'editPhone',
          path: 'editPhone',
          component: () => import('@/view/userInfo/editPhone.vue')
        },
      ]
    },
  ]
}) // 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.isLogin)) { //判断是否需要登录
    if (localStorage['token']) {
      next();
    } else {
      Toast.fail('请先登录')
      store.commit('CAHNGELOGINSHOW', true)
    }
  } else {
    next()
  }
  //判断是否需要缓存
  if (to.path === '/pdf' || to.path === '/newsDetails' || to.path === '/newsDetails2') {
    from.meta.keepAlive = true; // 让 列表页 缓存，即不刷新
    next();
  } else {
    from.meta.keepAlive = false; // 让 列表页 即不缓存，刷新
    next();
  }
  if (!window.initUrl) {
    window.initUrl = location.href.split('#')[0]
  } else {
    next()
  }
});
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    // 用路由的replace方法，并没有相当于F5刷新页面，失败的js文件并没有从新请求，会导致一直尝试replace页面导致死循环，而用 location.reload 方法，相当于触发F5刷新页面，虽然用户体验上来说会有刷新加载察觉，但不会导致页面卡死及死循环，从而曲线救国解决该问题
    location.reload();
    // const targetPath = $router.history.pending.fullPath;
    // $router.replace(targetPath);
  }

});



export default router