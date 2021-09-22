
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的消息' });
        
    },
    routerUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    
})