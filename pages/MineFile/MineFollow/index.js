
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        indexTable: 1,
        follow_list: [], // 关注列表
        total: '', // 关注总数
        loading: false, // loading状态 
        pageNum: 1,
        pages: 0,
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的关注' });
        
        this.getList();
    },
    getList() {
        var that = this;
        var currentPage = that.data.pageNum;
        let data = {
            pageNum: currentPage,
            pageSize: 14,
            type: this.data.indexTable
        }
        Api.getUserFollowList(data).then(function (res) {
            that.setData({
                loading: false
            });
            if (res.code != 1) {
                return;
            }
            let data = res.data;
            var maxPage = data.pages;
            that.setData({
                pages: maxPage
            });

            if (data.pageNum == 1 && data.list.length == 0) {
                that.setData({
                    pageNum: 1,
                    follow_list: []
                });
                return;
            }
            if (maxPage < currentPage) {
                that.setData({
                    pageNum: maxPage
                });
                return;
            }
            that.setData({
                follow_list: currentPage == 1 ? data.list : that.data.follow_list.concat(data.list)
            });
        }).catch(() => {
            that.setData({
                loading: false
            });
        })
    },
    //下拉加载
    onPullDownRefresh: function () {
        var that = this;
        setTimeout(() => {
            that.setData({
                pageNum: 1
            });
            that.getList();
        }, 500)
        wx.stopPullDownRefresh()
    },
    onReachBottom: function () {
        var that = this
        var pageNum = that.data.pageNum;
        if (pageNum >= that.data.pages) return;
        pageNum += 1
        that.setData({
            loading: true,
            pageNum: pageNum,
        });
        that.getList();
    },
    handlerTable(e){
        var that = this;
        let id = e.currentTarget.dataset.id;
        this.setData({
            indexTable: id
        });
            that.setData({
                pageNum: 1,
                follow_list: []
            },()=>{
                that.getList();
            });
            
    },
    clickFollow(e){
        let fuserid = e.currentTarget.dataset.fuserid;
        var that = this;
        let data = {
            fuserid: fuserid,
            type: 2,
        }
        Api.upUserFollow(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            setTimeout(() => {
                that.setData({
                    pageNum: 1
                });
                that.getList();
            }, 500)
        }).catch(() => {
           
        })
    },
    handleRouter(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
})