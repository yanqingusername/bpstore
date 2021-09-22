const app = getApp()
const Api = require('../../utils/api')
const Utils = require('../../utils/util')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showPopup: {
            type: Boolean
        },
        item: { //----展示参数
            type: Object
        },
        types: { //---- 
            type: Number
        },
    },
    /**
     * 页面的初始数据
     */
    data: {
        userid: '',
        userInfo: {},
        userStatistics: {},
        userAuthStatistics: {}
    },

    lifetimes: {
        attached() { // 在组件实例进入页面节点树时执行
            wx.setNavigationBarTitle({
                title: 'BP数字产业平台'
            });
            this.getUserInfo();
            this.loginSilence();
        },
        moved() {

        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {
           this.getUserInfo();
           this.getUserStatistics();
           this.getUserAuthStatistics();
        },
        hide: function () { },
        resize: function () { },
    },
    methods: {
        onPull() {
          
        },
        homeLoad() {
           
        },
        handleContact (e) {

        },
        routerUrl(e){
            wx.navigateTo({
                url: e.currentTarget.dataset.url
            });
        },
        toLoginLink() {
            wx.getUserProfile({
                desc: '用于完善资料',
                success: (res) => {
                    this.bindGetUserInfo(res);
                }
            });
        },
        bindGetUserInfo(e) {
            let that = this;
            const OK = "getUserProfile:ok"
            if (e.errMsg == OK) {
                if (!e.userInfo) {
                    return;
                }
                if (app.globalData.isConnected) {
                    wx.setStorageSync('userInfo', e.userInfo)
                    wx.setStorageSync('userProfile', e)
                    that.toFree(e);
                } else {
                    wx.showToast({
                        title: '当前无网络',
                        icon: 'none',
                    })
                }
            } else {
                wx.showToast({
                    title: '温馨提示:为了您更好的体验,请授权用户信息',
                    icon: 'none',
                })
            }
        },
        toFree(e) {
            let that = this;
            wx.login({
                success: function (res) {
                    var param = {
                        code: res.code,
                        encryptedData: e.encryptedData,
                        iv: e.iv
                    };
                    wx.setStorageSync('code', res.code)
                    Api.loginStore(param).then(function (res) {
                        if (res.code != 1) {
                            wx.showModal({
                                title: '提示',
                                content: '无法登录，请重试',
                                showCancel: false
                            })
                            return;
                        }
                        that.setData({
                            userid: res.data.userid
                        });
                        wx.setStorageSync('userid', res.data.userid);
                        wx.setStorageSync('token', res.data.token);
                        // if (res.code == 1 && res.data.is_relation == 1) {
                        //     that.showDialog();
                        // } else if (res.code == 1 && res.data.is_relation == 2) {
                        //     app.navigateToLogin = false
                        //     createTim(app, res.data.userid);
                        //     that.getInit();
                        // } else {
                        //     Utils.showToast(res.msg)
                        //     return
                        // }
                    });
                }
            })
        },
        loginSilence(){
            let code = wx.getStorageSync('code');
            let data = {
                code: code
            }
            Api.loginSilence(data).then(function(res) {
                if (res.code != 1) {
                    return;
                }
                
            })
        },
        getUserInfo(){
            Api.getUserInfo({}).then(function(res) {
                if (res.code != 1) {
                    return;
                }
                this.setData({
                    userInfo: res.data,
                });
            })
        },
        getUserStatistics(){
            Api.getUserStatistics({}).then(function(res) {
                if (res.code != 1) {
                    return;
                }
                this.setData({
                    userStatistics: res.data,
                });
            })
        },
        getUserAuthStatistics(){
            Api.getUserAuthStatistics({}).then(function(res) {
                if (res.code != 1) {
                    return;
                }
                this.setData({
                    userAuthStatistics: res.data,
                });
            })
        },
    }


})