const app = getApp();
const Api = require('../../utils/api');
Page({
  data: {
    indexNumber:0,
    follow_list: [], // 
        total: '', // 
        loading: false, //  
        pageNum: 1,
        pages: 0,
        kerword: '',
        searchmore: 2,
        keyword: '',
        ouserid: '',
        areaList:'',
        caseTradeList: [],
        tradeIndex: -1,
        trade: '',
        region:'',
        province: '',
        city: '',
        isSelectRegion: false,
        celebrityCityList: {}, //达人城市列表
    isFlag: false, //所在城市
    isSelectPop: false
  },
  onLoad(options){
    
    this.setData({
        searchmore: options.searchmore,
        keyword: options.keyword
    })
    if(this.data.searchmore == 1){
        wx.setNavigationBarTitle({ title: '搜索更多案例' });
        this.getUserSearchMore()
    } else if(this.data.searchmore == 3){
        wx.setNavigationBarTitle({ title: 'Ta发布的案例' });
        this.setData({
            ouserid: options.ouserid
        })
        this.getOthersCaseList()
    } else{
        wx.setNavigationBarTitle({ title: '经典案例' });
        this.getList();
    }
    this.getAreaList();
    this.getCaseTradeList();
    this.getCityList();
  },
  getUserSearchMore() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 14,
        content: this.data.keyword,
        type: 1
    }
    Api.getUserSearchMore(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }
        let data = res.data;
        var maxPage = data.pages;
        that.setData({
            pages: maxPage
        });

        if (data.pageNum == 1 && data.list.length == 0) {
            that.setData({
                pageNum: 1,
                follow_list: []
            });
            return;
        }
        if (maxPage < currentPage) {
            that.setData({
                pageNum: maxPage
            });
            return;
        }
        that.setData({
            follow_list: currentPage == 1 ? data.list : that.data.follow_list.concat(data.list)
        });

        console.log(that.data.follow_list)
    }).catch(() => {
        that.setData({
            loading: false
        });
    })
},
  getList() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 14,
        type: 1,
        trade: this.data.trade,
        region: this.data.region,
        province: this.data.province,
        city: this.data.city,
    }
    Api.getClassicCaseList(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }
        let data = res.data;
        var maxPage = data.pages;
        that.setData({
            pages: maxPage
        });

        if (data.pageNum == 1 && data.list.length == 0) {
            that.setData({
                pageNum: 1,
                follow_list: []
            });
            return;
        }
        if (maxPage < currentPage) {
            that.setData({
                pageNum: maxPage
            });
            return;
        }
        that.setData({
            follow_list: currentPage == 1 ? data.list : that.data.follow_list.concat(data.list)
        });

        console.log(that.data.follow_list)
    }).catch(() => {
        that.setData({
            loading: false
        });
    })
},
getOthersCaseList() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 14,
        ouserid:this.data.ouserid
    }
    Api.getOthersCaseList(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }
        let data = res.data;
        var maxPage = data.pages;
        that.setData({
            pages: maxPage
        });

        if (data.pageNum == 1 && data.list.length == 0) {
            that.setData({
                pageNum: 1,
                follow_list: []
            });
            return;
        }
        if (maxPage < currentPage) {
            that.setData({
                pageNum: maxPage
            });
            return;
        }
        that.setData({
            follow_list: currentPage == 1 ? data.list : that.data.follow_list.concat(data.list)
        });

    }).catch(() => {
        that.setData({
            loading: false
        });
    })
},
//下拉加载
onPullDownRefresh: function () {
    var that = this;
    setTimeout(() => {
        that.setData({
            pageNum: 1
        });
        if(that.data.searchmore == 1){
            that.getUserSearchMore()
        }else if(that.data.searchmore == 3){
            that.getOthersCaseList()
        }else{
            that.getList();
        }
    }, 500)
    wx.stopPullDownRefresh()
},
onReachBottom: function () {
    var that = this
    var pageNum = that.data.pageNum;
    if (pageNum >= that.data.pages) return;
    pageNum += 1
    that.setData({
        loading: true,
        pageNum: pageNum,
    });
    if(that.data.searchmore == 1){
        that.getUserSearchMore()
    }else if(that.data.searchmore == 3){
        that.getOthersCaseList()
    }else{
        that.getList();
    }
},

    handleClickToOpenItem(e) {
      let indexNumber = e.currentTarget.dataset.indexnumber;
      this.setData({
        indexNumber: indexNumber
      });
      if(indexNumber == 1 || indexNumber==2||indexNumber==3){
          this.setData({
            isSelectPop: !this.data.isSelectPop
          })
      }else{
        this.setData({
            isSelectPop: false
          })
      }
    },
    navigationToPage() {
        const { page } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/${ page }/index`
        })
    },
    handleRouter(e){
      wx.navigateTo({
          url: e.currentTarget.dataset.url
      });
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
      pageNum: 1,
      pageSize: 50
    }).then(({ data }) => {
      this.setData({
        caseTradeList: data.list.map(item => item.name)
      })
    })
  },
  clickTrade(e){
      let trade = e.currentTarget.dataset.item;
      let index = e.currentTarget.dataset.index;
        this.setData({
            tradeIndex :index,
            trade: trade
        })
  },
  clickSelectRegion(e){
    this.setData({
        isSelectRegion: !this.data.isSelectRegion
    })
},
clickRegion(e){
    let region = e.currentTarget.dataset.item;
      this.setData({
        region :region,
        isSelectRegion: false
      })
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
  clickClear(){
      this.setData({
        trade: '',
        region: '',
        province: '',
        city: '',
        pageNum: 1,
        isSelectPop: false,
        tradeIndex: -1,
      })
      
    this.getList();
  },
  clickSubmit(){
    this.setData({
        pageNum: 1,
        isSelectPop: false
    });
    this.getList();
  },
  onClose(){
    this.setData({
        isSelectPop: false
    });
  }
})