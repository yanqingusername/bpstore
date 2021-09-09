const app = getApp()
const Api = require('../../utils/api')
const Utils = require('../../utils/util')

let weixin,uiformPayment;

Component({

 
  lifetimes: {
    attached() {// 在组件实例进入页面节点树时执行
    },

    moved() {},
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
    
  },
  /**
   * 组件的方法列表
   */
  methods: {
    route () {
      wx.reLaunch({
        url: '/pages/Tabbar/tabbar?current=0',
      })
    }
     
  }
})
