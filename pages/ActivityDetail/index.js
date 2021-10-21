
const app = getApp();
const Api = require('../../utils/api');
const Util = require('../../utils/util');
Page({
    data: {
        id: '',
        activityInfo: '',
        URL: "https://bpimg.jianlet.com/images/"
    },
    onLoad(options){
        
        this.setData({
            id: options.id
        });
        
    },
    onShow(){
        this.getAppActivityInfo(this.data.id);
    },
    routerUrl(e){
        if(this.data.activityInfo.type == 1){
            wx.navigateTo({
                url: e.currentTarget.dataset.url
            });
        }else{
            Util.showToast('该活动暂未开启报名');
        }
        
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
            wx.setNavigationBarTitle({ title: res.data.title });
            that.setData({
                activityInfo: res.data
            });
        })
    }
})