// components/guide/base/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    content_title: {
      type: String
    },
    content_text: {
      type: String
    },
    titleColor: {
      type: String
    },
    affirm: {
      type: String
    },
    size: {
      type: String
    },
    show: {
      type: Boolean
    },
    submit: {
      type: Boolean,
      value: true
    },
    title: {
      type: String
    },
    color: {
      type: String
    },
    isShowTitleImg : {
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
    cancel(e){
      var res = e.currentTarget.dataset.status
      this.triggerEvent('cancel', res)
    },
    submitButton(e){
      var myEventOption = e.currentTarget.dataset.status
      this.triggerEvent('submitButton', myEventOption)
    }
  }
})
