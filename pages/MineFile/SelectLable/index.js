
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        value: ''
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '' });
        
    },
    value(e){
        this.setData({
            value: e.detail.value
        });
    },
    
})