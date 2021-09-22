
const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '活动报名' });
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    username(e){
        this.setData({
          name:e.detail.value
        })
      },
    
})