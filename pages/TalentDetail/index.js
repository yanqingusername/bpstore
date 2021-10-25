const app = getApp();
const Api = require('../../utils/api');
Page({
  data: {
    id:'',
    userid: '',
    CompanyInfo: '',
    CaseList: [],
    isUser: false,
    CompanyTrade: [],
            technology: [],
            ulabel: [],
            business: [],
            JoinCompanyList:[]
  },
  onLoad(options){
    let userid = wx.getStorageSync('userid');
    this.setData({
        userid: userid,
        id: options.id
    });
  },
  onShow(){
      
    if(this.data.userid == this.data.id){
        this.setData({
            isUser: true
        })
        this.getMyCompanyInfo();
    }else{
        this.setData({
            isUser: false
        })
        this.getCompanyInfo();
    }
    this.getOthersCaseList();
  },
  getMyCompanyInfo(){
    let that = this;
    Api.getMyCompanyInfo({}).then(function (res) {
        if (res.code != 1) {
            return;
        }
        console.log('---->:',res.data)
        wx.setNavigationBarTitle({ title: '自己公司' });
        that.setData({
            CompanyInfo: res.data,
            ulabel: res.data.ulabel.split(',')
        });
        that.getJoinCompanyList(res.data.companyName);
    });
  },
  getCompanyInfo(){
    let that = this;
    Api.getCompanyInfo({
        ouserid: this.data.id
    }).then(function (res) {
        if (res.code != 1) {
            return;
        }
        wx.setNavigationBarTitle({ title: res.data.companyShortName });
        that.setData({
            CompanyInfo: res.data,
            ulabel: res.data.ulabel.split(',')
        });
        that.getJoinCompanyList(res.data.companyName);
    });
  },
  getJoinCompanyList(companyName) {
    var that = this;
    let data = {
        pageNum: 1,
        pageSize: 3,
        companyName: companyName
    }
    Api.getJoinCompanyList(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }

        that.setData({
            JoinCompanyList: res.data.list
        });
    }).catch(() => {
        that.setData({
            loading: false
        });
    });
},
  getOthersCaseList() {
    var that = this;
    let data = {
        pageNum: 1,
        pageSize: 10,
        ouserid: this.data.id
    }
    Api.getOthersCaseList(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }

        that.setData({
            CaseList: res.data.list
        });
    }).catch(() => {
        that.setData({
            loading: false
        });
    });
},
handleRouter(e){
    
  wx.navigateTo({
      url: e.currentTarget.dataset.url
  });
},
onShareAppMessage (res) {
    this.setData({
        isShow: false
    })
    let path = "/pages/TalentDetail/index?id=" +  this.data.id ;
    return {
        title:this.data.CompanyInfo.companyName,
        path: path,
    }
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
        if(that.data.userid == that.data.id){
            that.setData({
                isUser: true
            })
            that.getMyCompanyInfo();
            that.getOthersCaseList();
        }else{
            that.setData({
                isUser: false
            })
            that.getCompanyInfo();
        }
    }).catch(() => {
       
    })
},
phoneTap(e) {
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone,
    });
  },
})