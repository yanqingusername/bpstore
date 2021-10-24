const Api = require('../../utils/api')
const Util = require('../../utils/util');
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
    checkImage: '/assets/images/check.png',
    checkActiveImage: '/assets/images/check-active.png',
    isJoin: true,
    isJoin1: true,
      title: '',
      toppic: '',  // 首图
      backdrop: '',  // 案例背景
      backpic: '', // 案例背景图片
      highlights: '', // 案例亮点
      highlightspic: '', //	案例亮点图片
      scenario: '',  // 应用场景
      scenariopic: '', // 应用场景图片
      partakes: '', // 参与单位，多个逗号隔开
      ptpic: '', // 参与单位，多个逗号隔开
      content: '', // 内容
      cpic: '', // 内容图片，多个逗号隔开
      effect: '', // 应用成效
      efpic: '', // 成效图片，多个逗号隔开
      evaluate: '', // 评价
      evpic: '', // 评价图片，多个逗号隔开
      region: '', // 区域
      province: '', // 省
      city: '', // 市
      trade: [], // 面向行业
      lables: [], // 标签，多个逗号隔开
      remarks: '',  // 备注
    currentType: '',
    currentType1: '',
    area: false,
    areaList: [],
    celebrityCityList: {}, //达人城市列表
    isFlag: false, //所在城市
    isShowregion: false,
    isRelease: 2
  },
  onLoad(options){
    if(options && options.isRelease){
      this.setData({
        isRelease: options.isRelease
      })
    }
  },
  onShow() {
    this.getCityList();
    this.getAreaList();
    // this.getCaseTradeList()

    let highlights = wx.getStorageSync('highlights') || '';
    let highlightspic = wx.getStorageSync('highlightspic') || '';
    let scenario = wx.getStorageSync('scenario') || '';
    let scenariopic = wx.getStorageSync('scenariopic') || '';
    let partakes = wx.getStorageSync('partakes') || '';
    let ptpic = wx.getStorageSync('ptpic') || '';
    let content = wx.getStorageSync('content') || '';
    let cpic = wx.getStorageSync('cpic') || '';
    let effect = wx.getStorageSync('effect') || '';
    let efpic = wx.getStorageSync('efpic') || '';
    let evaluate = wx.getStorageSync('evaluate') || '';
    let evpic = wx.getStorageSync('evpic') || '';
    let trade = wx.getStorageSync('CaseTrade') || [];
    let lables = wx.getStorageSync('CaseLabel') || [];

    
    this.setData({
        highlights: highlights,
        highlightspic: highlightspic,
        scenario: scenario,
        scenariopic: scenariopic,
        partakes: partakes,
        ptpic: ptpic,
        content: content,
        cpic: cpic,
        effect: effect,
        efpic: efpic,
        evaluate: evaluate,
        evpic: evpic,
        trade: trade,
        lables: lables
    });
  },
  getCityList() {
    let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCityList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let proList = {}
            let cityList = {}
            for(let i = 0; i < res.data.length; i++){
                let cityItem = res.data[i];
                proList[cityItem.code] = cityItem.name;
            }

            for(let i = 0; i < res.data.length; i++){
                let appAreaList = res.data[i].appAreaList;
                for(let j = 0; j < appAreaList.length; j++){
                    cityList[appAreaList[j].code] = appAreaList[j].name;
                }
            }
            let araeList = {};
            araeList['province_list'] = proList;
            araeList['city_list'] = cityList
            that.setData({
                celebrityCityList: araeList
            });
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
  // getCaseTradeList() {
  //   Api.getCaseTradeList({
  //     pageNum: 1
  //   }).then(({ data }) => {
  //     this.setData({
  //       caseTradeList: data.list.map(item => item.name)
  //     })
  //   })
  // },
  onChange(e) {
    const { attribute } = e.currentTarget.dataset
    console.log('',attribute)
    this.setData({
        [attribute]: e.detail
    })
  },
  onInputbackdrop(e) {
    this.setData({
      backdrop: e.detail.value
    })
  },
  onInputremarks(e) {
    this.setData({
      remarks: e.detail.value
    })
  },
  handleUpdataFile(type = 'toppic') {
    Api.uploadAvatarImg('/upload/upCaseSubsFile').then(({statusCode, data}) => {
      if(statusCode === 200) {
        const imgData = JSON.parse(data)
        if(type !== 'toppic') {
          this.setData({
              backpic: imgData.data.urlPath
          })
        } else {
          this.setData({
              toppic: imgData.data.urlPath
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

    if(current == '首图' || current == '视频'){
      this.setData({
        currentType1: current
      });
    }

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
                toppic: imgData.data.urlPath
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
        let that = this;
        if (this.data.title == '') {
            Util.showToast('标题不能为空');
            return;
        }
        if (this.data.toppic == '') {
            Util.showToast('首图或视频不能为空');
            return;
        }
        if (this.data.backdrop == '' && this.data.backpic == '') {
            Util.showToast('案例背景或案例背景图片不能为空');
            return;
        }
        if (this.data.highlights == '' && this.data.highlightspic == '') {
          Util.showToast('案例亮点或案例亮点图片不能为空');
          return;
        }
        if (this.data.scenario == '' && this.data.scenariopic == '') {
          Util.showToast('应用场景或应用场景图片不能为空');
          return;
        }
        if (this.data.partakes == '' && this.data.ptpic == '') {
          Util.showToast('参与单位不能为空');
          return;
        }
        if (this.data.content == '' && this.data.cpic == '') {
          Util.showToast('内容或内容图片不能为空');
          return;
        }
        if (this.data.effect == '' && this.data.efpic == '') {
          Util.showToast('应用成效或应用成效图片不能为空');
          return;
        }
        if (this.data.evaluate == '' && this.data.evpic == '') {
          Util.showToast('评价或评价图片不能为空');
          return;
        }
        if (this.data.region == '') {
            Util.showToast('区域不能为空');
            return;
        }
        if (this.data.province == '' && this.data.city == '') {
          Util.showToast('省/市不能为空');
          return;
        }
        let tradeString = this.data.trade.length > 0 ? this.data.trade.join(",") : '';
        if (tradeString == ''){
            Util.showToast('面向行业不能为空');
            return;
        }
        let lablesString = this.data.lables.length > 0 ? this.data.lables.join(",") : '';
        if (lablesString == ''){
            Util.showToast('标签不能为空');
            return;
        }
        if (this.data.remarks == '') {
            Util.showToast('备注不能为空');
            return;
        }

        if (!this.data.isJoin1) {
          Util.showToast('请同意《BP数字产品平台》');
          return;
        }
        

        

        let data = {
          title: this.data.title,
          toppic: this.data.toppic,  // 首图
          backdrop: this.data.backdrop,  // 案例背景
          backpic: this.data.backpic, // 案例背景图片
          highlights: this.data.highlights, // 案例亮点
          highlightspic: this.data.highlightspic, //	案例亮点图片
          scenario: this.data.scenario,  // 应用场景
          scenariopic: this.data.scenariopic, // 应用场景图片
          partakes: this.data.partakes, // 参与单位，多个逗号隔开
          ptpic: this.data.ptpic, // 参与单位，多个逗号隔开
          content: this.data.content, // 内容
          cpic: this.data.cpic, // 内容图片，多个逗号隔开
          effect: this.data.effect, // 应用成效
          efpic: this.data.efpic, // 成效图片，多个逗号隔开
          evaluate: this.data.evaluate, // 评价
          evpic: this.data.evpic, // 评价图片，多个逗号隔开
          region: this.data.region, // 区域
          province: this.data.province, // 省
          city: this.data.city, // 市
          trade: tradeString, // 面向行业
          lables: lablesString, // 标签，多个逗号隔开
          remarks: this.data.remarks  // 备注
        }
        console.log('---->:',data)
        Api.releaseCase(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            
            wx.removeStorageSync('highlights');
            wx.removeStorageSync('highlightspic');
            wx.removeStorageSync('scenario');
            wx.removeStorageSync('scenariopic');
            wx.removeStorageSync('partakes');
            wx.removeStorageSync('ptpic');
            wx.removeStorageSync('content');
            wx.removeStorageSync('cpic');
            wx.removeStorageSync('effect');
            wx.removeStorageSync('efpic');
            wx.removeStorageSync('evaluate');
            wx.removeStorageSync('evpic');
            wx.removeStorageSync('CaseTrade');
            wx.removeStorageSync('CaseLabel');

            if(that.data.isRelease == 1){
              wx.navigateBack({
                delta: 1
              });
            }else{
              wx.reLaunch({
                url: '/pages/Tabbar/tabbar?current=3'
              });
            }
        })
    
  },
  routerUrl(e) {
    wx.navigateTo({
        url: e.currentTarget.dataset.url
    });
  },
  handleClickToShowSelectPanel(e) {
    this.setData({
      isShowregion: true
    })
  },
  onClose(e) {
    const { dataset } = e.currentTarget
    const { type } = dataset
    this.setData({
      isShowregion: false
    })
  },
  onConfirm(event) {
    const { type } = event.currentTarget.dataset
    const { picker, value, index } = event.detail
    
    this.setData({
        region: value,
        isShowregion: false
    })
  },
  selectArea: function () {
    this.setData({
        isFlag: true
    });
  },
  pickerClose: function () {
    this.setData({
        isFlag: false
    });
},
areaConfirm: function (e) {
    let value = e.detail.values;
    console.log(value)
    if(value.length > 0){
        if(value[0].name && value[1] != undefined){
            this.setData({
              isFlag: false,
                province: value[0].name, // 省
                city: value[1].name, // 市
            });
        } else{
          this.setData({
            isFlag: false,
              province: value[0].name, // 省
              city: value[0].name, // 市
          });
        }
    }
  },
  isJoinClick: function () {
    this.setData({
      isJoin: !this.data.isJoin
    });
  },
  isJoin1Click: function () {
    this.setData({
      isJoin1: !this.data.isJoin1
    });
  },
})