/**
 * 小程序配置文件
 */

var host = "https://mp.weixin.com/api/news"  //API请求接口
var host_sh = "http://m.jointem.com"  //API请求接口
var host_iamge = "http://gov.jointem.com"     //图片拼接前

var config = {
  host,
  AppinitData: `${host}/getAppInitData`, /** 首页接口数据 - 轮播 */
  GET_HOT_NEWS: `${host}/getNews`,/** 获取新闻动态 */

  GET_NEWS_DETAIL: `${host}/getNewsDetail`,/** 获取新闻详情 */

  // 测试的请求地址
  requestUrl: `${host}/testRequest`,

  TOKEN:'123',
};

module.exports = config
