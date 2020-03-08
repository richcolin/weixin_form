//index.js
//获取应用实例
const app = getApp()
const cookieUtil = require('../../utils/cookie.js')
Page({
  data: {
    isAuthorized: false,
    showTopTips: false,
    userInfo:{},
    form_info:'',
  },
  onLoad: function () {
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/status',
      header: header,
      success: function (res) {
        var data = res.data.data
        if (data.is_authorized == 1) {
          that.setData({
            isAuthorized: true
          })
          that.updateData()
        } else {
          that.setData({
            isAuthorized: false
          })
          wx.showToast({
            title: '请先授权登录',
          })
        }
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var message=e.detail.value
    var that = this; 
      var header = {}
      if (this.data.isAuthorized) {
        const cookie = cookieUtil.getCookieFromStorage()
        header.Cookie = cookie
        header["content-type"] = "application/json";
      }
    wx.request({
      
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/service/grade',
      method: 'POST',
      header:header,
      // data: { 'name': 'jason' }, 
      data: {
        message: message.text_describe
      },
      success: function (res) {
        if(res.statusCode==405){
          console.log('请先登录')
        }else{
          console.log('写入成功')
        }
        
        wx.hideLoading()
      },
      fail:function(res){
        console.log(res)
      }
    })
  },
  updateData: function () {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.showToast({
      title: '授权成功',
    })
  },

  onPullDownRefresh: function () {
    var that = this
    var cookie = cookieUtil.getCookieFromStorage()
    var header = {}
    header.Cookie = cookie
    wx.request({
      url: app.globalData.serverUrl + app.globalData.apiVersion + '/auth/status',
      header: header,
      success: function (res) {
        var data = res.data.data
        if (data.is_authorized == 1) {
          that.setData({
            isAuthorized: true
          })
          that.updateData()
        } else {
          that.setData({
            isAuthorized: false
          })
          wx.showToast({
            title: '请先授权登录',
          })
        }
      }
    })
  },

})
