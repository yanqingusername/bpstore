
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的粉丝' });
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    
})