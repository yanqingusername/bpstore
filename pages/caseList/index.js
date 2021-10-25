const app = getApp();
const Api = require('../../utils/api');
Page({
  data: {
    indexNumber:0,
    follow_list: [], // 
        total: '', // 
        loading: false, //  
        pageNum: 1,
        pages: 0,
        kerword: '',
        searchmore: 2,
        keyword: '',
        ouserid: ''
  },
  onLoad(options){
    
    this.setData({
        searchmore: options.searchmore,
        keyword: options.keyword
    })
    if(this.data.searchmore == 1){
        wx.setNavigationBarTitle({ title: '搜索更多案例' });
        this.getUserSearchMore()
    } else if(this.data.searchmore == 3){
        wx.setNavigationBarTitle({ title: 'Ta发布的案例' });
        this.setData({
            ouserid: options.ouserid
        })
        this.getOthersCaseList()
    } else{
        wx.setNavigationBarTitle({ title: '经典案例' });
        this.getList();
    }
  },
  getUserSearchMore() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 14,
        content: this.data.keyword,
        type: 1
    }
    Api.getUserSearchMore(data).then(function (res) {
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

        console.log(that.data.follow_list)
    }).catch(() => {
        that.setData({
            loading: false
        });
    })
},
  getList() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 14,
        type: 1
    }
    Api.getClassicCaseList(data).then(function (res) {
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

        console.log(that.data.follow_list)
    }).catch(() => {
        that.setData({
            loading: false
        });
    })
},
getOthersCaseList() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 14,
        ouserid:this.data.ouserid
    }
    Api.getOthersCaseList(data).then(function (res) {
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
        if(that.data.searchmore == 1){
            that.getUserSearchMore()
        }else if(that.data.searchmore == 3){
            that.getOthersCaseList()
        }else{
            that.getList();
        }
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
    if(that.data.searchmore == 1){
        that.getUserSearchMore()
    }else if(that.data.searchmore == 3){
        that.getOthersCaseList()
    }else{
        that.getList();
    }
},

    handleClickToOpenItem(e) {
      let indexNumber = e.currentTarget.dataset.indexnumber;
      this.setData({
        indexNumber: indexNumber
      });
    },
    navigationToPage() {
        const { page } = e.currentTarget.dataset
        wx.navigateTo({
            url: `/pages/${ page }/index`
        })
    },
    handleRouter(e){
      wx.navigateTo({
          url: e.currentTarget.dataset.url
      });
  },
  
})