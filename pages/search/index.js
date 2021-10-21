
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
        isShow: true,
        HotSearchList: [],
        SearchRecordList: []
    },
    onLoad(){
        this.getHotSearchList();
        this.getUserSearchRecordList();
    },
    searchChange(e){
        this.setData({
            kerword: e.detail
        })
        // this.getUserSearch();
    },
    onSearch(){
        this.getUserSearch();
    },
    getHotSearchList(){
      let that = this;
                Api.getHotSearchList({}).then(function (res) {
                    if (res.code != 1) {
                        return;
                    }
                    that.setData({
                      HotSearchList: res.data
                    })
                }).catch(() => {
                    
                });
    },
    getUserSearchRecordList(){
      let that = this;
                Api.getUserSearchRecordList({}).then(function (res) {
                    if (res.code != 1) {
                        return;
                    }
                    that.setData({
                      SearchRecordList: res.data
                    })
                }).catch(() => {
                    
                });
    },
    clickDelete(){
      let that = this;
      Api.delUserSearchRecord({}).then(function (res) {
          if (res.code != 1) {
              return;
          }
          that.getUserSearchRecordList();
      }).catch(() => {
          
      });
    },
    clickSearchkeyWord(e){
      let item = e.currentTarget.dataset.item;
      this.setData({
        kerword: item
      },()=>{
        this.getUserSearch();
      })
    },
    getUserSearch(){
      let that = this;
                Api.getUserSearch({
                  content: this.data.kerword
                }).then(function (res) {
                    if (res.code != 1) {
                        return;
                    }
                    that.setData({
                      isShow: false,
                      SearchList: res.data
                    })
                }).catch(() => {
                    
                });
    },
    onCancel(){
      this.setData({
        isShow: true,
        kerword: ''
      })
    },
    handleRouter(e){
      wx.navigateTo({
        url: e.currentTarget.dataset.url
      });
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
    
})