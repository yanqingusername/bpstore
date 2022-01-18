
const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
        follow_list: [], // 
        total: '', // 
        loading: false, //  
        pageNum: 1,
        pages: 0,
        kerword: '',
        searchmore: 2,
        keyword: ''
    },
    onLoad(options){
        wx.setNavigationBarTitle({ title: '单位列表' });
        this.setData({
            searchmore: options.searchmore,
            keyword: options.keyword
        })
       
        this.getUserSearchMore()
       
        
    },
    searchChange(e){
        // this.setData({
        //     kerword: e.detail
        // })
    },
    onSearch(){
        // this.getList();
    },
    getUserSearchMore() {
        var that = this;
        var currentPage = that.data.pageNum;
        let data = {
            pageNum: currentPage,
            pageSize: 14,
            content: this.data.keyword,
            type: 3
        }
        Api.getUserSearchMore(data).then(function (res) {
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
                    follow_list: []
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
                follow_list: currentPage == 1 ? data.list : that.data.follow_list.concat(data.list)
            });
    
            console.log(that.data.follow_list)
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
                that.getUserSearchMore()
           
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
            that.getUserSearchMore()
        
    },
    handleRouter(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    }
})