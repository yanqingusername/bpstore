const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
        show: true,
        pass_status : false,
        version : Api.version_m
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '设置' });
        const DATA = wx.getStorageSync('data');
        if( DATA.yesno_set_pay_psw == "yes" ){
            this.setData({
                pass_status : true
            })
        }
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    clearStorageButton(e){
        wx.showModal({
            title: '提示',
            content: '此功能会清除您的缓存',
            success: res => {
                if (res.confirm) {
                    wx.clearStorage();
                    wx.clearStorageSync();
                    app.globalData.user_cart_num = 0;
                    this.triggerEvent('cart', '')
                    setTimeout(()=>{
                        wx.reLaunch({
                            url: '/pages/Tabbar/tabbar'
                        });
                    },500);
                }
            }
        });
    }
})