
const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
        follow_list: [], // 
        total: '', // 
        loading: false, //  
        pageNum: 1,
        pages: 0,
        kerword: ''
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '行业达人' });
        this.getList();
        
    },
    searchChange(e){
        // this.setData({
        //     kerword: e.detail
        // })
    },
    onSearch(){
        // this.getList();
    },
    getList() {
        var that = this;
        var currentPage = that.data.pageNum;
        let data = {
            pageNum: currentPage,
            pageSize: 14
        }
        Api.getCelebrityList(data).then(function (res) {
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
    clickFollow(e){
        
    },
    
})