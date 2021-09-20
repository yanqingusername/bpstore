
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '单位认证' });
        
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