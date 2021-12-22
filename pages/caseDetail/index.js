const app = getApp();
const Api = require('../../utils/api');
const Util = require('../../utils/util');
Page({
    data: {
        id: '',
        caseInfo: '',
        URL: "https://bpimg.jianlet.com/images/",
        lables:[],
        CaseCommentList: [],
        commentName: '',
        pageNum: 1,
        pageSize: 2,
    },
    onLoad(options){
        this.setData({
            id: options.id
        });
        
    },
    onShow(){
        this.getCaseInfo(this.data.id);
        this.getCaseCommentList();
    },
    getCaseInfo(id){
        var that = this;
        let data = {
            id: id
        }
        Api.getCaseInfo(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.setNavigationBarTitle({ title: res.data.title });
            that.setData({
                caseInfo: res.data,
                lables: res.data.lables.split(',')
            });
        })
    },
    getCaseCommentList() {
        var that = this;
        let data = {
            pageNum: this.data.pageNum,
            pageSize: this.data.pageSize,
            cid: this.data.id
        }
        Api.getCaseCommentList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            that.setData({
                CaseCommentList: res.data.list,
                totalSize: res.data.size || 0
            });
        }).catch(() => {
           
        })
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
            that.getCaseInfo(that.data.id);
        }).catch(() => {
           
        })
    },
    inputCommentName(e){
        this.setData({
            commentName: e.detail.value
        });
    },
    submitComment(){
        if (this.data.commentName == '') {
            Util.showToast('请输入评价内容～');
            return;
        }
        this.addCaseComment(this.data.commentName);
    },
    addCaseComment(commentName){
        var that = this;
        let data = {
            cid: that.data.id,
            content: commentName,
        }
        Api.addCaseComment(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            that.setData({
                commentName: ''
            });
            that.getCaseCommentList();
        }).catch(() => {
           
        })
    },
    clickFabulous(e){
        let typestring = e.currentTarget.dataset.typestring;
        var that = this;
        let data = {
            cid: that.data.id,
            type: typestring,
        }
        Api.addCaseFabulous(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            if(typestring==2){
                that.getCaseCommentList();
            }else{
                that.getCaseInfo(that.data.id);
            }
            
        }).catch(() => {
           
        })
    },
    clickCollectionCase(e){
        let iscollect = e.currentTarget.dataset.iscollect;
        var that = this;
        if(iscollect== 0){
            let data = {
                cid: that.data.id
            }
            Api.collectionCase(data).then(function (res) {
                if (res.code != 1) {
                    return;
                }
                that.getCaseInfo(that.data.id);
            }).catch(() => {
               
            })
        }else{
            let data = {
                cid: that.data.id
            }
            Api.upCollectionCase(data).then(function (res) {
                if (res.code != 1) {
                    return;
                }
                that.getCaseInfo(that.data.id);
            }).catch(() => {
               
            })
        }
    },
    clickCommitList(){
        this.setData({
            pageNum: 1,
            pageSize: 50,
        })
        this.getCaseCommentList();
    },
    onShareAppMessage (res) {
        let path = "/pages/caseDetail/index?id=" +  this.data.id ;
        return {
            title: this.data.caseInfo.title || "案例详情",
            path: path,
        }
    },
})