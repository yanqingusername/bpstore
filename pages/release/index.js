const Api = require('../../utils/api')

Page({
  data: {
    opitonList: [
      {
        icon: '/assets/images/photo.png',
        text: '首图'
      },
      {
        icon: '/assets/images/live.png',
        text: '视频'
      },
      {
        icon: '/assets/images/pic.png',
        text: '小图'
      },
      {
        icon: '/assets/images/compile.png',
        text: '文字'
      }
    ],
    introduceList: ['案例亮点', '应用场景', '参与单位', '内容详情', '应用成效', '用户评价'],
    checkImage: '/assets/images/check.png',
    checkActiveImage: '/assets/images/check-active.png',
    isJoin: true,
    formData: {
      title: '',
      toppic: '',  // 首图
      backdrop: '',  // 案例背景
      backpic: '', // 案例背景图片
      highlights: '', // 案例亮点
      scenario: '',  // 应用场景
      scenariopic: '', // 应用场景图片
      partakes: '', // 参与单位
      content: '', // 内容
      effect: '', // 应用成效
      evaluate: '', // 评价
      region: '', // 区域
      province: '', // 省
      city: '', // 市
      trade: '', // 面向行业
      lables: '', // 标签
      remarks: ''  // 备注
    },
    currentType: '',
  },
  onChange(e) {
    const { attribute } = e.currentTarget.dataset
    this.setData({
      formData: {
        ...this.data.formData,
        [attribute]: e.detail
      }
    })
  },
   handleUpdataFile() {
    const { statusCode, data } =  Api.uploadAvatarImg('/upload/upCaseSubsFile')

    if(statusCode === 200) {
      const imgData = JSON.parse(data)
      this.setData({
        formData: {
          ...this.data.formData,
          toppic: imgData.data.urlPath
        }
      })
    }
  },
   handleClickEvent(e) {
    const { current } = e.currentTarget.dataset
    this.setData({
      currentType: current
    })

    switch(current) {
      case '首图':
        this.handleUpdataFile()
        break;
      case '视频':
        const { statusCode, data } =  Api.uploadVideo('upCaseSubsFile')
        console.log('====', data, statusCode);
        if(statusCode === 200) {
          const imgData = JSON.parse(data)
          console.log('imgData', imgData);
          this.setData({
            formData: {
              ...this.data.formData,
              toppic: imgData.data.urlPath
            }
          })
        }
        break;
      case '小图':
        this.handleUpdataFile()
        break; 
    }
  },
  submit() {
    console.log('formData', this.data.formData);
  }
})