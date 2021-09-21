
const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '2021年度排行榜' });
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    
})