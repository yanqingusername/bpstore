
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
        SearchRecordList: [],
        caseList:[],
        caseNum: 0,
        celebrityList: [],
        celebrityNum: 0,
        companyList:[],
        companyNum: 0
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
                  content: this.data.kerword,
                  pageNum: 1,
                  pageSize: 5
                }).then(function (res) {
                    if (res.code != 1) {
                        return;
                    }
                    that.setData({
                      isShow: false,
                      caseList: res.data.case,
                      caseNum: res.data.caseNum,
                      celebrityList: res.data.celebrity,
                      celebrityNum: res.data.celebrityNum,
                      companyList:res.data.company,
                      companyNum:res.data.companyNum
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
})