
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        isShow: false
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的收藏' });
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    deleteClick(e){
        this.setData({
            isShow: true
        })
    },
    onClose(e){
        this.setData({
            isShow: false
        })
    },
})