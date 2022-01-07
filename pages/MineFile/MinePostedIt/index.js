
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        isShow: false,
        product_list: [], // 收藏列表
        total: '', // 收藏总数
        loading: false, // loading状态 
        pageNum: 1,
        pages: 0,
        kerword: '',
        id:''
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我发布的' });
        this.getMyCaseList();
    },
    gotoCaseDetail(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    deleteClick(e){
        this.setData({
            isShow: true,
            id: e.currentTarget.dataset.id
        });
    },
    onClose(e){
        this.setData({
            isShow: false
        });
    },
    searchChange(e){
        this.setData({
            kerword: e.detail
        });
    },
    onSearch(){
        this.getMyCaseList();
    },
    getMyCaseList() {
        var that = this;
        var currentPage = that.data.pageNum;
        let data = {
            pageNum: currentPage,
            pageSize: 14,
            title: this.data.kerword
        }
        Api.getMyCaseList(data).then(function (res) {
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
                    product_list: []
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
                product_list: currentPage == 1 ? data.list : that.data.product_list.concat(data.list)
            });
        }).catch(() => {
            that.setData({
                loading: false
            });
        });
    },
    //下拉加载
    onPullDownRefresh: function () {
        var that = this;
        setTimeout(() => {
            that.setData({
                pageNum: 1
            });
            that.getMyCaseList();
        }, 500);
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
        var that = this;
        var pageNum = that.data.pageNum;
        if (pageNum >= that.data.pages) return;
        pageNum += 1;
        that.setData({
            loading: true,
            pageNum: pageNum,
        });
        that.getMyCaseList();
    },
    deleteHandler(){
        var that = this;
        let data = {
            id: this.data.id
        }
        Api.delMyCase(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            that.setData({
                isShow: false
            })
            that.getMyCaseList();
        }).catch(() => {
            
        });
    },
    shareHandler(){

    },
    onShareAppMessage (res) {
        this.setData({
            isShow: false
        })
        let path = "/pages/caseDetail/index?id=" +  this.data.id ;
        return {
            title:"案例详情",
            path: path,
        }
    },
})