
const app = getApp();
const Api = require('../../utils/api');
const Util = require('../../utils/util');
Page({
    data: {
        id: '',
        activityInfo: '',
        indexTable: 2,
        URL: "https://bpimg.jianlet.com/images/",
        deschtml: ''
    },
    onLoad(options){
        this.setData({
            id: options.id,
            indexTable: options.indexTable
        });
    },
    onShow(){
        if(this.data.indexTable == 2){
            this.getAppRankingInfo(this.data.id);
        } else if(this.data.indexTable == 3){
            this.getAppPrizeInfo(this.data.id);
        } else {
            this.getAppAtlasInfo(this.data.id);
        }
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    getAppRankingInfo(id){
        var that = this;
        let data = {
            id: id
        }
        Api.getAppRankingInfo(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.setNavigationBarTitle({ title: res.data.title });
            let deschtml = res.data.content || '';
            that.setData({
                activityInfo: res.data,
                deschtml: deschtml
            });
        })
    },
    getAppPrizeInfo(id){
        var that = this;
        let data = {
            id: id
        }
        Api.getAppPrizeInfo(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.setNavigationBarTitle({ title: res.data.title });
            let deschtml = res.data.content || '';
            that.setData({
                activityInfo: res.data,
                deschtml: deschtml
            });
        })
    },
    getAppAtlasInfo(id){
        var that = this;
        let data = {
            id: id
        }
        Api.getAppAtlasInfo(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.setNavigationBarTitle({ title: res.data.title });
            let deschtml = res.data.content || '';
            that.setData({
                activityInfo: res.data,
                deschtml: deschtml
            });
        })
    },
    onShareAppMessage (res) {
        let path = "/pages/caseDetail/index?id=" +  this.data.id + '&indexTable=' + this.data.indexTable;
        return {
            title:"排行榜详情",
            path: path,
        }
    },
})