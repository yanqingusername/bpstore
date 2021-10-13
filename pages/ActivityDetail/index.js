
const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
        id: '',
        activityInfo: ''
    },
    onLoad(options){
        wx.setNavigationBarTitle({ title: '双节大放送活动' });
        this.setData({
            id: options.id
        });
        
    },
    onShow(){
        this.getAppActivityInfo(this.data.id);
    },
    routerUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    getAppActivityInfo(id){
        var that = this;
        let data = {
            id: id
        }
        Api.getAppActivityInfo(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            that.setData({
                activityInfo: res.data
            });
        })
    }
})