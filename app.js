const Api = require('./utils/api');
const Utils = require('./utils/util');


//app.js
App({

    /**
     * 主题颜色
     * 在修改此模块时, 请同时对应app.wxss中的theme样式进行修改
     */

    theme:{
        fontBlackColor: '#201E1D',       // 主题字体颜色 (黑)
        fontWhiteColor: '#ffffff'  // 主题字体颜色 (白)
    } ,

    // Socket 断线重连
    reconnect() {

    },
    onHide() {
        
    },
    initEventHandle() { 
       
    },
    onLaunch: function () {
       
        this.version()
    },
    version() {
        if( wx.canIUse('getUpdateManager') ) {
            const updateManager = wx.getUpdateManager()
            updateManager.onCheckForUpdate(function (res) {
                if (res.hasUpdate) {
                  updateManager.onUpdateReady(function () {
                    wx.showModal({
                      title: '更新提示',
                      showCancel: false,
                      content: '新版本已经准备好，是否重启应用？',
                      success: function (res) {
                        if (res.confirm) {
                          updateManager.applyUpdate()
                        }
                      }
                    })
                  })
                  updateManager.onUpdateFailed(function () {
                    wx.showModal({
                      title: '已经有新版本了哟~',
                      content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
                    })
                  })
                }
              })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
            })
        }
    },
    onShow() {
        wx.onNetworkStatusChange(function (res) { ///----监控网络变化
            if (res.networkType == "none" && !res.isConnected) {
                wx.reLaunch({
                    url: '/pages/noNetwork/noNetwork'
                })
            }
        })
        wx.getNetworkType({ //----进入页面获取 当前网络
            success(res) {
                const networkType = res.networkType
                if (res.networkType == "none") {
                    wx.reLaunch({
                        url: '/pages/noNetwork/noNetwork'
                    })
                }
            }
        })
    },
   
    goLogin: function (MESSAGE) {
        // 因代理商切换   导致数据问题   需不清楚缓存
        // wx.clearStorage();
        // wx.clearStorageSync();
        const Mess = '用户登录超时,请重新登录'
        wx.reLaunch({
            url: `/Home_/pages/Authorize/authorize?url=${"/pages/Tabbar/tabbar"}&type=${Mess}`,
        });
    },
    
    // 回到首页 
    handleClickToHome() {
        let info = wx.getStorageSync('data')
        let user = info.user_id
        if (user) {
            wx.reLaunch({
                url: '/pages/Tabbar/tabbar'
            })
        } else {
            wx.reLaunch({
                url: '/Home_/pages/Authorize/authorize?url=' + '/pages/Tabbar/tabbar'
            })
        }
    }
})
