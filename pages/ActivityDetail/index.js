
const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '双节大放送活动' });
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    routerUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
})