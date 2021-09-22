
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的收藏' });
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    
})