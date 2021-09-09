// components/guide/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close () {
      wx.setStorageSync('close', true)
      let popup = {}
      this.setData({
        show: false
      })
      this.triggerEvent('close', popup)
    }
  }
})
