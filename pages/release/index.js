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
    introduceList: ['案例亮点', '应用场景', '参与单位', '应用成效', '用户评价'],
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
      celebrityinfo_clabel: '', // 标签
      remarks: ''  // 备注
    },
    currentType: '',
    area: false,
    areaList: [],
    trade: false,
    caseTradeList: [],
    multiArray: []
  },
  onShow() {
    this.getCityList()
    this.getAreaList()
    this.getCaseTradeList()
    this.getStorageData() // 赋值
  },
  getCityList() {
    Api.getCityList().then(res => {
      console.log('===>', res);
    })
  },
  getAreaList() {
    Api.getAreaList({
      pageNum: 1
    }).then(({ data }) => {
      this.setData({
        areaList: data.list.map(item => item.name)
      })
    })
  },
  getCaseTradeList() {
    Api.getCaseTradeList({
      pageNum: 1
    }).then(({ data }) => {
      this.setData({
        caseTradeList: data.list.map(item => item.name)
      })
    })
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
  handleUpdataFile(type = 'toppic') {
    Api.uploadAvatarImg('/upload/upCaseSubsFile').then(({statusCode, data}) => {
      if(statusCode === 200) {
        const imgData = JSON.parse(data)
        if(type !== 'toppic') {
          this.setData({
            formData: {
              ...this.data.formData,
              backpic: imgData.data.urlPath
            }
          })
        } else {
          this.setData({
            formData: {
              ...this.data.formData,
              toppic: imgData.data.urlPath
            }
          })
        }
      }
    })
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
        Api.uploadVideo('upCaseSubsFile').then(({statusCode, data}) => {
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
        })
        break;
      case '小图':
        this.handleUpdataFile('backpic')
        break; 
    }
  },
  submit() {
    console.log('formData', this.data.formData, this.data.multiArray);
  },
  handleClickToShowSelectPanel(e) {
    const { type } = e.currentTarget.dataset
    this.setData({
      [type]: true
    })
  },
  bindRegionChange(e) {
    this.setData({
      multiArray: e.detail.value
    })
  },
  onClose(e) {
    const { dataset } = e.currentTarget
    const { type } = dataset
    this.setData({
      [type]: false
    })
  },
  onConfirm(event) {
    const { type } = event.currentTarget.dataset
    const { picker, value, index } = event.detail
    
    this.setData({
      formData: {
        ...this.data.formData,
        [type]: value
      },
      [type]: false
    })
  },
  navigationToSelectPage(e) {
    const { number } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/MineFile/SelectLable/index?number=${ number }`
    })
  },
  getStorageData() {
    const list = ['celebrityinfo_clabel']
    let obj = {}

    list.forEach(key => {
      const val = wx.getStorageSync(key)
      if (val) {
        obj[key] = '已选择'
      }
    })

    console.log('this.data.formData,', this.data.formData, obj);
    this.setData({
      formData: {
        ...this.data.formData,
        ...obj
      }
    })
  }
})