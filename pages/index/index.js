//index.js
//获取应用实例
var app = getApp()
const config = require('../../config')
var util = require('../../utils/util.js')
var time = Date.parse(new Date()) / 1000
var pageNo = 0
var totalPage = 1

Page({
  data: {
    carrouselsAr: [], /** 轮播 */
    list: [],  /** 要闻列表 */
    display: false,
    footer: false
  },
  /** 跳转要闻详情页面 */
  tapHotNewsCell: function (event) {
    console.log(event.currentTarget)
    var path = event.currentTarget.dataset.path;
    wx.navigateTo({
      url: "detail/detail?path=" + path
    })
    // wx.openUrl({
    //   url: "https://mp.weixin.qq.com/s/POsyP58AWa9dE1DeqF06mw",
    //   fail: (msg) => {
    //     console.log('fail:', msg)
    //   },
    //   success: (msg) => {
    //     console.log('success:', msg)
    //   }
    // })
  },

  /** 首页轮播请求 */
  requestAppinitData: function () {
    var that = this;
    let url = config.AppinitData

    var para = {
      "token": "5afcf9984408679ec128fc86552e0b77" + time,
      "cate": 1,
      'version': 1
    }

    wx.showLoading({ title: '加载中...' })

    util.RequestManager(url, para, function (res, fail) {
      console.log(res)
      wx.hideLoading()
      if (res.errno == app.globalData.res_success) {
        //成功
        that.setData({
          carrouselsAr: res.list,
          display: true
        })
      }
    })

  },

  /** 下拉刷新 */
  loadNewData: function () {
    pageNo = 1;
    this.requestData()

  },

  loadNewData_NextPage: function () {
    pageNo += 1;
    if (pageNo * 20 <= totalPage) {
      this.requestData();
    } else {
      this.setData({ footer: true })
    }
  },

  /** 请求数据 */
  requestData: function () {
    var that = this

    wx.request({
      url: config.GET_HOT_NEWS,
      data: {
        "token": "5afcf9984408679ec128fc86552e0b77" + time,
        "cate": 1,
        "page": pageNo,
        "limit": "20",
        'version': 1
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: { 'content-type': 'application/json' }, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        // success
        if (res.data.errno == 0) {
          totalPage = res.data.count
          if (pageNo == 1) {
            that.setData({ list: res.data.list })

          } else {
            that.setData({ list: that.data.list.concat(res.data.list) })
          }
          if (res.data.last < 1) {
            that.setData({ footer: true })

          }

          console.log(that.data.list)
        }

        if (res.data.errno == 410) {
          that.setData({ footer: true })
        }

      },
      fail: function (res) {
        // fail
        pageNo--;
      },
      complete: function (res) {
        // complete
        wx.stopPullDownRefresh()
      }
    })

  },


  onLoad: function () {
    console.log('onLoad')

    /** 请求首页轮播 */
    this.requestAppinitData();

    /** 请求要闻 */
    this.loadNewData();
  },

  //轮播点击
  onSwiperTap: function (event) {
    console.log(event.target)
    var path = event.target.dataset.path;
    wx.navigateTo({
      url: "detail/detail?path=" + path
    })
  },

  // 页面相关事件处理函数--监听用户下拉动作
  onPullDownRefresh: function () {
    this.loadNewData();
  },

  // 页面上拉触底事件的处理函数
  onReachBottom: function () {
    console.log("onReachBottom")

    this.loadNewData_NextPage()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }


})
