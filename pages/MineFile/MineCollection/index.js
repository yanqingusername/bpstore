const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        product_list: [], // 收藏列表
        total: '', // 收藏总数
        loading: false, // loading状态 
        pageNum: 1,
        pages: 0,
        kerword: ''
    },
    onLoad() {
        wx.setNavigationBarTitle({
            title: '我的收藏'
        });
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
            title: this.data.kerword
        }
        Api.getUserCollectionList(data).then(function (res) {
            that.setData({
                loading: false
            });
            if (res.code != 1) {
                return;
            }
            let data = res.data;
            // var maxPage = data.pages;
            // that.setData({
            //     pages: maxPage
            // });

            if (data.pageNum == 1 && data.list.length == 0) {
                that.setData({
                    pageNum: 1,
                    product_list: []
                });
                return;
            }
            if(data.list.length > 0){
                let pageNum = that.data.pageNum;
                pageNum++
                that.setData({
                    pageNum: pageNum
                });
            }
            that.setData({
                product_list: currentPage == 1 ? data.list : that.data.product_list.concat(data.list)
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
        // var pageNum = that.data.pageNum;
        // if (pageNum >= that.data.pages) return;
        // pageNum += 1
        that.setData({
            loading: true,
            // pageNum: pageNum,
        });
        that.getList();
    },
    handleRouter(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },

})