
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
      
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '系统消息' });
        
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    
})