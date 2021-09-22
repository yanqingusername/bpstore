
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        indexTable: 1
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的关注' });
        
        
    },
    handlerTable(e){
        let id = e.currentTarget.dataset.id;
        this.setData({
            indexTable: id
        })
    },
    
})