/*
 * @Author: your name
 * @Date: 2021-03-12 10:22:34
 * @LastEditTime: 2021-03-12 13:23:53
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \well_medical_care\pages\systemMaintenance\systemMaintenance.js
 */

const app = getApp()
const Utils = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    titleMessage: '网站正在维护中请您稍后再来'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    wx.setNavigationBarTitle({
      title: '系统维护'
    });

    let titleMessage = options.titleMessage
    this.setData({
        titleMessage: titleMessage
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let DATA = {
    //     maintenance_type: 1
    //   }
    //   wx.request({
    //       url: Api.system_maintenance,
    //       data: Utils.DATA_md5(DATA),
    //       method: 'POST',
    //       success: (result) => {
    //         wx.hideLoading()
    //         if (result['data'].code == 1000) {
    //           console.log(result)
    //           let is_maintenance = result['data']['data'].is_maintenance
    //           // this.setData({
    //           //   is_maintenance: is_maintenance
    //           // })
    //         } else if (result.data.code == 90008) {
    //           app.goLogin(result['data'].message)
    //         } else {
    //           Toast(result['data'].message);
    //         }
    //       },
    //       fail: () => wx.hideLoading()
    //     });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  }
})
