const app = getApp()
const Api = require('../../utils/api')
const Utils = require('../../utils/util')
Page({
  data: {
    Menu: [{
        Name: "首页",
        Image: '../../utils/image/bp-icon-bottom-01.png',
        ImageActive: '../../utils/image/bp-icon-bottom-02.png'
      },
      {
        Name: '发现',
        Image: '../../utils/image/bp-icon-bottom-03.png',
        ImageActive: '../../utils/image/bp-icon-bottom-04.png'
      },
      {
        Name: '产业',
        Image: '../../utils/image/bp-icon-bottom-05.png',
        ImageActive: '../../utils/image/bp-icon-bottom-06.png'
      },
      {
        Name: '我的',
        Image: '../../utils/image/bp-icon-bottom-07.png',
        ImageActive: '../../utils/image/bp-icon-bottom-08.png'
      },
    ],
    phoneBool : false,
    current: 0,
    Loading: false,
    currentnum: null,
    userData: '',
    
  },
  onShow() {
    // 获取机型
    var that = this
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1 || modelmes.search('iPhone XR') != -1 || modelmes.search('iPhone XS') != -1) {
          that.setData({
            phoneBool: true
          })
        }
      }
    })
  },
  onLoad(options) {

    // 选中底部栏
    if (options.current) {
      this.menuActive(options.current, (options.userid ? options.userid : ''))
    }
    // 设置底部导航的(title)
    wx.setNavigationBarTitle({
      title: 'BP数字产业平台'
    });
    wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#ffffff'
    })

    let userid1 = wx.getStorageSync('userid');
    if (userid1) {

    }else{
      wx.hideShareMenu();
    }
   
  },
  // 下拉刷新
  onPullDownRefresh: function () {
    if (this.data.current == 0) this.selectComponent("#index").onPull();
    else if (this.data.current == 1) { this.selectComponent("#find").onPull(); } 
    else if (this.data.current == 2) this.selectComponent("#about").onPull();
    setTimeout(() => wx.stopPullDownRefresh(), 1000)
  },
  // 上拉刷新
  onReachBottom() {
    // 开启底部 loading
    // this.setData({
    //   Loading: true
    // })
    if (this.data.current == 0) this.selectComponent("#index").pullUp();
    else if (this.data.current == 1) this.selectComponent("#find").homeLoad();
    else if (this.data.current == 2) this.selectComponent("#about").homeLoad();
  },
  // 页面滚动
  onPageScroll (e) {
    if (this.data.current == 0) this.selectComponent("#index").onPageScroll(e);
    // if (this.data.current == 1) this.selectComponent("#service").onPageScroll(e);
  },
  // 底部导航选中
  menuActive(e, io) {
    app.version()
    let ID = (e.currentTarget != undefined) ? e.currentTarget.dataset.id : e;
    
    switch (parseInt(ID)) {
      case 0:
        wx.setNavigationBarTitle({
          title: '首页'
        });
        wx.setNavigationBarColor({
            frontColor: '#000000',
            backgroundColor: '#ffffff'
        })
        this.setData({
          current: ID
        })
        break;
        case 1:
            wx.setNavigationBarTitle({
              title: '发现'
            });
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
            this.setData({
              current: ID
            })
            break;
     
      case 2:
        
        wx.setNavigationBarTitle({
          title: '产业'
        });
        if (io) {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
        } else {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
        }
       
        this.setData({
          current: ID
        })
        break;
        case 3:
       
        
        wx.setNavigationBarTitle({
          title: '我的'
        });
        if (io) {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
        } else {
            wx.setNavigationBarColor({
                frontColor: '#000000',
                backgroundColor: '#ffffff'
            })
        }
        this.setData({
          current: ID
        })
        break;
     
    }
  },
  onShareAppMessage (res) {
    let path = '/pages/Tabbar/tabbar?current=' + this.data.current

    return {
        title:"首页",
        path: path,
    }
  },
})