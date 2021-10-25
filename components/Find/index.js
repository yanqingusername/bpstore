const app = getApp()
const Api = require('../../utils/api')
const Utils = require('../../utils/util')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showPopup: {
            type: Boolean
        },
        item: { //----展示参数
            type: Object
        },
        types: { //---- 
            type: Number
        },
    },
    /**
     * 页面的初始数据
     */
    data: {
        indexTable: 1,
        product_list: [], // 收藏列表
        total: '', // 收藏总数
        loading: false, // loading状态 
        pageNum: 1,
        pages: 0,
        kerword: ''
    },

    lifetimes: {
        attached() { // 在组件实例进入页面节点树时执行
            wx.setNavigationBarTitle({
                title: ''
            });

            this.getAppActivityList();
        },
        moved() {

        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {
            this.getAppActivityList();
        },
        hide: function () { },
        resize: function () { },
    },
    methods: {
        navigationToPage(e) {
            const { page } = e.currentTarget.dataset
            wx.navigateTo({
                url: `/pages/${ page }/index`
            })
        },
        onPull() {
            var that = this;
            setTimeout(() => {
                that.setData({
                    pageNum: 1,
                    product_list: [],
                    kerword: ''
                });
                if(that.data.indexTable== 1){
                    that.getAppActivityList();
                } else if (that.data.indexTable ==2){
                    that.getAppRankingList();
                } else if (that.data.indexTable ==3){
                    that.getAppPrizeList();
                } else if (that.data.indexTable ==4){
                    that.getAppAtlasList();
                }
            }, 500)
            wx.stopPullDownRefresh()
        },
        homeLoad() {
            var that = this
            var pageNum = that.data.pageNum;
            if (pageNum >= that.data.pages) return;
            pageNum += 1
            that.setData({
                loading: true,
                pageNum: pageNum,
            });
            if(that.data.indexTable== 1){
                that.getAppActivityList();
            } else if (that.data.indexTable ==2){
                that.getAppRankingList();
            } else if (that.data.indexTable ==3){
                that.getAppPrizeList();
            } else if (that.data.indexTable ==4){
                that.getAppAtlasList();
            }
        },
        handlerTable(e){
            let id = e.currentTarget.dataset.id;
            this.setData({
                indexTable: id,
                pageNum: 1,
                product_list: [],
                kerword: ''
            });
            if(id== 1){
                this.getAppActivityList();
            } else if (id ==2){
                this.getAppRankingList();
            }else if (id ==3){
                this.getAppPrizeList();
            } else if (id ==4){
                this.getAppAtlasList();
            }
        },
        routerUrl(e){
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
            var that = this
            that.setData({
                pageNum: 1,
                product_list: []
            });
            if(that.data.indexTable== 1){
                that.getAppActivityList();
            } else if (that.data.indexTable ==2){
                that.getAppRankingList();
            } else if (that.data.indexTable ==3){
                that.getAppPrizeList();
            } else if (that.data.indexTable ==4){
                that.getAppAtlasList();
            }
        },
        // 活动列表
        getAppActivityList() {
            var that = this;
            var currentPage = that.data.pageNum;
            let data = {
                pageNum: currentPage,
                pageSize: 14,
                title: this.data.kerword
            }
            Api.getAppActivityList(data).then(function (res) {
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
            })
        },
        getAppRankingList() {
            var that = this;
            var currentPage = that.data.pageNum;
            let data = {
                pageNum: currentPage,
                pageSize: 14,
                title: this.data.kerword
            }
            Api.getAppRankingList(data).then(function (res) {
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
            })
        },
        getAppPrizeList() {
            var that = this;
            var currentPage = that.data.pageNum;
            let data = {
                pageNum: currentPage,
                pageSize: 14,
                title: this.data.kerword
            }
            Api.getAppPrizeList(data).then(function (res) {
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
            })
        },
        getAppAtlasList() {
            var that = this;
            var currentPage = that.data.pageNum;
            let data = {
                pageNum: currentPage,
                pageSize: 14,
                title: this.data.kerword
            }
            Api.getAppAtlasList(data).then(function (res) {
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
            })
        },
    }


})