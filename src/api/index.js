import service from './request'
export default {
  // 用户
  // 用户注册
  userRegist(data) {
    return service({
      url: '/user/regist',
      method: 'post',
      data
    })
  },
  // 用户登录
  userLogin(data) {
    return service({
      url: '/user/login',
      method: 'post',
      data
    })
  },
  // 获取签名
  getSignature(data) {
    return service({
      url: '/admin/getSignature',
      method: 'post',
      data
    })
  },
  // 查询用户/销售基本信息
  userGetUserBaseInfo(data) {
    return service({
      url: '/user/getUserBaseInfo',
      method: 'post',
      data
    })
  },
  // 修改用户信息
  userUpdateUser(data) {
    return service({
      url: '/user/updateUser',
      method: 'post',
      data
    })
  },
  // 修改用户密码
  userUpdateUserPwd(data) {
    return service({
      url: '/user/updateUserPwd',
      method: 'post',
      data
    })
  },
  // 首页
  // 获取首页轮播图
  getIndexBanner(data) {
    return service({
      url: '/mall/listCarousel',
      method: 'post',
      data
    })
  },
  // 根据关键词查询列表
  listCommodityByKeyword(data) {
    return service({
      url: '/mall/listCommodityByKeyword',
      method: 'post',
      data
    })
  },
  // 首页精品推荐
  listRecommendCommodity(data) {
    return service({
      url: '/mall/listRecommendCommodity',
      method: 'post',
      data
    })
  },
  // 查询新闻列表
  getNewsList(data) {
    return service({
      url: '/mall/listNews',
      method: 'post',
      data
    })
  },
  // 查询首页商品列表
  getIndexCommodity(data) {
    return service({
      url: '/mall/listIndexCommodity',
      method: 'post',
      data
    })
  },
  // 首页推荐资讯列表
  getListInfo(data) {
    return service({
      url: '/mall/listRecommendInfo',
      method: 'post',
      data
    })
  },
  // 添加订单
  addOrder(data) {
    return service({
      url: '/mall/addOrder',
      method: 'post',
      data
    })
  },
  // 获取音频 报告列表
  getListPdfOrAudioSeries(data) {
    return service({
      url: '/mall/listPdfOrAudioSeries',
      method: 'post',
      data
    })
  },
  // 获取音频 报告列表
  getClassificationList(data) {
    return service({
      url: '/mall/listCommodityType',
      method: 'post',
      data
    })
  },
  // 点赞视频
  addAdmire(data) {
    return service({
      url: '/mall/addAdmire',
      method: 'post',
      data
    })
  },
  // 收藏商品
  collectCommodity(data) {
    return service({
      url: '/mall/collectCommodity',
      method: 'post',
      data
    })
  },
  // 收藏商品列表
  getCollectCommodityList(data) {
    return service({
      url: '/mall/listCollectCommodities',
      method: 'post',
      data
    })
  },
  // 取消收藏商品
  cancelCollectCommodity(data) {
    return service({
      url: '/mall/cancelCollectCommodity',
      method: 'post',
      data
    })
  },
  // 获取视频课程列表
  getvideoListLesson(data) {
    return service({
      url: '/mall/listVideoLesson',
      method: 'post',
      data
    })
  },
  // 查询音频列表
  getlistAudioLesson(data) {
    return service({
      url: '/mall/listAudioLesson',
      method: 'post',
      data
    })
  },
  // 获取资讯列表
  getThematicList(data) {
    return service({
      url: '/mall/listInfo',
      method: 'post',
      data
    })
  },
  // 获取专题列表
  getInfoTopicDetail(data) {
    return service({
      url: '/mall/getInfoTopicDetail',
      method: 'post',
      data
    })
  },
  // 获取专题列表
  getArticleDetail(data) {
    return service({
      url: '/mall/getArticleDetail',
      method: 'post',
      data
    })
  },
  // 获取最近文章列表
  getRecentlyArticle(data) {
    return service({
      url: '/mall/getRecentlyArticle',
      method: 'post',
      data
    })
  },
  // 查询新闻列表详情
  getNewsById(data) {
    return service({
      url: '/mall/getNewsById',
      method: 'post',
      data
    })
  },
  // 查询课程详情
  getCommodityById(data) {
    return service({
      url: '/mall/getCommodityById',
      method: 'post',
      data
    })
  },
  // 获取关联课程
  listAssociateCommodity(data) {
    return service({
      url: '/mall/listAssociateCommodity',
      method: 'post',
      data
    })
  },
  // 查询会员套餐列表
  listMemberPackage(data) {
    return service({
      url: '/mall/listMemberPackage',
      method: 'post',
      data
    })
  },
  // 查询我的学习进度
  listLessonStudySchedule(data) {
    return service({
      url: '/mall/listLessonStudySchedule',
      method: 'post',
      data
    })
  },
  // 查询我的浏览记录
  listWatchHistory(data) {
    return service({
      url: '/mall/listWatchHistory',
      method: 'post',
      data
    })
  },
  // 上传文件
  uploadFile(data) {
    return service({
      url: '/uploadFile',
      method: 'post',
      data
    })
  },
  // 发送短信
  sendSms(data) {
    return service({
      url: '/user/sendSms',
      method: 'post',
      data
    })
  },
  // 商品订单列表
  listCommodityOrder(data) {
    return service({
      url: '/user/listCommodityOrder',
      method: 'post',
      data
    })
  },
  // VIP列表
  getListVip(data) {
    return service({
      url: '/mall/listVip',
      method: 'post',
      data
    })
  },
  // 忘记密码
  resetUserPwd(data) {
    return service({
      url: '/user/resetUserPwd',
      method: 'post',
      data
    })
  },
  // 忘记密码
  watchLesson(data) {
    return service({
      url: '/mall/watchLesson',
      method: 'post',
      data
    })
  },
  // 赠送商品
  donateCommodity(data) {
    return service({
      url: '/mall/donateCommodity',
      method: 'post',
      data
    })
  },
  // 赠送商品
  getPdfList(data) {
    return service({
      url: '/mall/listPdf',
      method: 'post',
      data
    })
  },
  getRankingList(data) {
    return service({
      url: '/mall/listRanking',
      method: 'post',
      data
    })
  },
  getFullVideo(data) {
    return service({
      url: '/mall/getFullscreen',
      method: 'post',
      data
    })
  },
  getListAi(data) {
    return service({
      url: '/mall/listAi',
      method: 'post',
      data
    })
  }
}
