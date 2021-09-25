
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        fans_list: [], // 收藏列表
        total: '', // 收藏总数
        loading: false, // loading状态 
        pageNum: 1,
        pages: 0,
        kerword: ''
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的粉丝' });
        this.getList();
    },
    homeUrl(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    searchChange(e){
        this.setData({
            kerword: e.detail
        })
    },
    onSearch(){
        this.getList();
    },
    getList() {
        var that = this;
        var currentPage = that.data.pageNum;
        let data = {
            pageNum: currentPage,
            pageSize: 14,
            name: this.data.kerword
        }
        Api.getUserFansList(data).then(function (res) {
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
                    fans_list: []
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
                fans_list: currentPage == 1 ? data.list : that.data.fans_list.concat(data.list)
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

    
})