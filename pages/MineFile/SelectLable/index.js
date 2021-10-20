
const app = getApp();
const Api = require('../../../utils/api');
const Util = require('../../../utils/util');
Page({
    data: {
        titleString: '',
        value: '',
        list: [], //个人标签
        listIds:[], //个人标签id
        listName:[], //个人标签name
        listtwo: [],
        number: 1, // 1.个人认证-个人标签 2.个人认证-自我介绍 3.个人认证-个人荣誉 4.个人认证-所属行业 11.单位认证-公司性质列表
        introduce: '', //自我介绍
        honorImg: '', //个人荣誉图片
        honor:'', //个人荣誉
        industryIndex: -1, //所属行业index
        industry: '',
        nickName: '', //昵称
        CompanyNatureList: [], // 公司性质列表
        CompanyNatureIndex: -1, //公司性质列表index
        CompanyNature: '', //公司性质列表
        CompanyTradeList: [], //面向行业
        CompanyTradeListIds:[], //面向行业id
        CompanyTradeListName:[], //面向行业name
        partner1:0,//	合作伙伴-ISV伙伴
        partner2:0,//	合作伙伴-咨询伙伴
        partner3:0,//	合作伙伴-IT服务伙伴
        partner4:0,//	合作伙伴-分销伙伴

    },
    onLoad(options){
        wx.setNavigationBarTitle({ 
            title: options.title || ''
        });
        
        if(options && options.number){
            this.setData({
                number: options.number,
                titleString: options.title
            });
        }
        if(options && options.nickName){
            this.setData({
                nickName: options.nickName
            });
        }
        if(this.data.number == 1){
            this.getCelebrityLabelList();
        }else if(this.data.number == 2){
            let introduce =  wx.getStorageSync('celebrityinfo_introduce');
            this.setData({
                introduce: introduce
            });
        }else if(this.data.number == 3){
            let honor =  wx.getStorageSync('celebrityinfo_honor');
            let honorImg =  wx.getStorageSync('celebrityinfo_honorImg');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number == 4){
            this.getCelebrityTradeList();
            let industry =  wx.getStorageSync('celebrityinfo_industry');
            this.setData({
                industry: industry
            });
        }else if(this.data.number ==11){
            this.getCompanyNatureList();
            let CompanyNature =  wx.getStorageSync('CompanyNature');
            this.setData({
                CompanyNature: CompanyNature
            });
        }else if(this.data.number == 12){
            this.getCompanyTradeList();
        }else if(this.data.number == 13){
            this.getCompanyTechnologyList();
        }else if(this.data.number == 14){
            this.getCompanyLabelList();
        }else if(this.data.number == 15){
            let partner =  wx.getStorageSync('partner');
            let partner1 = partner.split(',');
            this.setData({
                partner1: partner1[0] || 0,
                partner2: partner1[1] || 0,
                partner3: partner1[2] || 0,
                partner4: partner1[3] || 0
            });
        }else if(this.data.number == 16){
            let honor =  wx.getStorageSync('qualifis');
            let honorImg =  wx.getStorageSync('qualifisImg');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number ==17){
            this.getCompanyTurnoverList();
            let CompanyNature = wx.getStorageSync('CompanyTurnover');
            this.setData({
                CompanyNature: CompanyNature
            });
        }else if(this.data.number ==18){
            this.getCompanyMarketList();
            let CompanyNature = wx.getStorageSync('CompanyMarket');
            this.setData({
                CompanyNature: CompanyNature
            });
        }else if(this.data.number ==19){
            this.getCompanyValuationList();
            let CompanyNature = wx.getStorageSync('CompanyValuation');
            this.setData({
                CompanyNature: CompanyNature
            });
        }else if(this.data.number ==20){
            this.getCompanyFinancingList();
            let CompanyNature = wx.getStorageSync('CompanyFinancing');
            this.setData({
                CompanyNature: CompanyNature
            });
        }else if(this.data.number ==21){
            this.getCompanyRegionList();
            let CompanyTrade = wx.getStorageSync('CompanyRegion');
            this.setData({
                CompanyTrade: CompanyTrade
            });
        }else if(this.data.number == 23){
            let honor =  wx.getStorageSync('highlights');
            let honorImg =  wx.getStorageSync('highlightspic');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number == 24){
            let honor =  wx.getStorageSync('scenario');
            let honorImg =  wx.getStorageSync('scenariopic');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number == 25){
            let honor =  wx.getStorageSync('partakes');
            let honorImg =  wx.getStorageSync('ptpic');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number == 26){
            let honor =  wx.getStorageSync('content');
            let honorImg =  wx.getStorageSync('cpic');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number == 27){
            let honor =  wx.getStorageSync('effect');
            let honorImg =  wx.getStorageSync('efpic');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number == 28){
            let honor =  wx.getStorageSync('evaluate');
            let honorImg =  wx.getStorageSync('evpic');
            this.setData({
                honor: honor,
                honorImg: honorImg
            });
        }else if(this.data.number == 29){
            this.getCaseTradeList();
            let CompanyTrade = wx.getStorageSync('CaseTrade');
            this.setData({
                CompanyTrade: CompanyTrade
            });
        }else if(this.data.number == 30){
            this.getCaseLabelList();
            let CompanyTrade = wx.getStorageSync('CaseLabel');
            this.setData({
                CompanyTrade: CompanyTrade
            });
        }
        
    },
    value(e){
        this.setData({
            value: e.detail.value
        });
    },
    clickItem(e){
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        let index = e.currentTarget.dataset.index;
				
		let selectedData = this.data.listIds || [];
        let listName = this.data.listName || [];
		let item = this.data.list[index];
		if(item.isShow){
			item.isShow = false;
			for (let i = 0; i < selectedData.length; i++) {
				if(listName[i] == name){
				    selectedData.splice(i, 1);
                    listName.splice(i, 1);
				}
			}
		} else {
			item.isShow = true;
			selectedData.push(id);
            listName.push(name);
		}
		this.setData({
            listIds: selectedData,
            listName: listName,
            list: this.data.list
        });
    },
    clickListItems(){
        console.log(this.data.listIds)
        wx.setStorageSync('celebrityinfo_clabel', this.data.listName);
        // wx.setStorageSync('celebrityinfo_clabelIds', this.data.listIds);
        wx.navigateBack({
            delta: 1
        });
    },
    getCelebrityLabelList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCelebrityLabelList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let list = res.data.list
            if(list.length > 0){
                for(let i in list){
                    list[i].isShow = false;
                }
            }

            let listName = wx.getStorageSync('celebrityinfo_clabel');
            if(listName.length > 0){
                
                for(let j = 0; j< list.length; j++){
                    for(let i = 0; i< listName.length; i++){
                        if(listName[i] == list[j].name){
                            list[j].isShow = true;
                            break;
                        }else{
                            list[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                list: list,
                listName: listName
            });
        })
    },
    onChange(e) {
        this.setData({
            introduce: e.detail
        });
    },
    clickIntroduce(){
        wx.setStorageSync('celebrityinfo_introduce', this.data.introduce);
        wx.navigateBack({
            delta: 1
        });
    },
    clickAddImg(){
        if(this.data.number ==3){
            Api.uploadAvatarImg('/upload/upUserAuthPic').then((res)=>{
                if(res.statusCode === 200) {
                    let imgData = JSON.parse(res.data);
                    console.log('---->:',imgData)
                    if(imgData.code == 1){
                        this.setData({
                            honorImg: imgData.data.urlPath
                        });
                    }else {
                        Util.showToast(imgData.msg)
                    }
                }
            })
        }else if(this.data.number == 16){
            Api.uploadAvatarImg('/upload/upUserAuthPic').then((res)=>{
                if(res.statusCode === 200) {
                    let imgData = JSON.parse(res.data);
                    if(imgData.code == 1){
                        this.setData({
                            honorImg: imgData.data.urlPath
                        });
                    }else {
                        Util.showToast(imgData.msg)
                    }
                }
            })
        }else if(this.data.number == 23 || this.data.number == 24 || this.data.number == 25 || this.data.number == 26 || this.data.number == 27 || this.data.number == 28){
            Api.uploadAvatarImg('/upload/upCaseSubsFile').then((res)=>{
                if(res.statusCode === 200) {
                    let imgData = JSON.parse(res.data);
                    if(imgData.code == 1){
                        this.setData({
                            honorImg: imgData.data.urlPath
                        });
                    }else {
                        Util.showToast(imgData.msg)
                    }
                }
            })
        }
    },
    honor(e){
        this.setData({
            honor: e.detail.value
        });
    },
    clickHonor(){
        if(this.data.number ==3){
            wx.setStorageSync('celebrityinfo_honor', this.data.honor);
            wx.setStorageSync('celebrityinfo_honorImg', this.data.honorImg);
        }else if(this.data.number == 16){
            wx.setStorageSync('qualifis', this.data.honor);
            wx.setStorageSync('qualifisImg', this.data.honorImg);
        }else if(this.data.number == 23){
            wx.setStorageSync('highlights', this.data.honor);
            wx.setStorageSync('highlightspic', this.data.honorImg);
        }else if(this.data.number == 24){
            wx.setStorageSync('scenario', this.data.honor);
            wx.setStorageSync('scenariopic', this.data.honorImg);
        }else if(this.data.number == 25){
            wx.setStorageSync('partakes', this.data.honor);
            wx.setStorageSync('ptpic', this.data.honorImg);
        }else if(this.data.number == 26){
            wx.setStorageSync('content', this.data.honor);
            wx.setStorageSync('cpic', this.data.honorImg);
        }else if(this.data.number == 27){
            wx.setStorageSync('effect', this.data.honor);
            wx.setStorageSync('efpic', this.data.honorImg);
        }else if(this.data.number == 28){
            wx.setStorageSync('evaluate', this.data.honor);
            wx.setStorageSync('evpic', this.data.honorImg);
        }
        wx.navigateBack({
            delta: 1
        });
    },
    getCelebrityTradeList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCelebrityTradeList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let list = res.data.list
            if(list.length > 0){
                for(let i in list){
                    list[i].isShow = false;
                }
            }
            that.setData({
                list: list
            });
        })
    },
    clickIndustryIndex(e){
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        let index = e.currentTarget.dataset.index;
				
		this.setData({
            industryIndex: index,
            industry: name
        });
    },
    industry(e){
        this.setData({
            industry: e.detail.value,
            industryIndex: -1
        });
    },
    clickIndustry(){
        wx.setStorageSync('celebrityinfo_industry', this.data.industry);
        wx.navigateBack({
            delta: 1
        });
    },
    nickName(e){
        this.setData({
            nickName: e.detail.value
        });
    },
    clicknickName(){
        let that = this;
        let data = {
            nickName: that.data.nickName
        }
        Api.upUserNickName(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.navigateBack({
                delta: 1
            });
        });
    },
    // 单位
    getCompanyNatureList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyNatureList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyNatureList = res.data.list
            if(CompanyNatureList.length > 0){
                for(let i in CompanyNatureList){
                    CompanyNatureList[i].isShow = false;
                }
            }
            that.setData({
                CompanyNatureList: CompanyNatureList
            });
        })
    },
    clickCompanyNatureIndex(e){
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        let index = e.currentTarget.dataset.index;
				
		this.setData({
            CompanyNatureIndex: index,
            CompanyNature: name
        });
    },
    CompanyNature(e){
        this.setData({
            CompanyNature: e.detail.value,
            CompanyNatureIndex: -1
        });
    },
    clickCompanyNature(){
        if(this.data.number == 11){
            wx.setStorageSync('CompanyNature', this.data.CompanyNature);
        }else if(this.data.number == 17){
            wx.setStorageSync('CompanyTurnover', this.data.CompanyNature);
        }else if(this.data.number == 18){
            wx.setStorageSync('CompanyMarket', this.data.CompanyNature);
        }else if(this.data.number == 19){
            wx.setStorageSync('CompanyValuation', this.data.CompanyNature);
        }else if(this.data.number == 20){
            wx.setStorageSync('CompanyFinancing', this.data.CompanyNature);
        }
        
        wx.navigateBack({
            delta: 1
        });
    },
    getCompanyTurnoverList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyTurnoverList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyNatureList = res.data.list
            if(CompanyNatureList.length > 0){
                for(let i in CompanyNatureList){
                    CompanyNatureList[i].isShow = false;
                }
            }
            that.setData({
                CompanyNatureList: CompanyNatureList
            });
        })
    },
    getCompanyMarketList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyMarketList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyNatureList = res.data.list
            if(CompanyNatureList.length > 0){
                for(let i in CompanyNatureList){
                    CompanyNatureList[i].isShow = false;
                }
            }
            that.setData({
                CompanyNatureList: CompanyNatureList
            });
        })
    },
    getCompanyValuationList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyValuationList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyNatureList = res.data.list
            if(CompanyNatureList.length > 0){
                for(let i in CompanyNatureList){
                    CompanyNatureList[i].isShow = false;
                }
            }
            that.setData({
                CompanyNatureList: CompanyNatureList
            });
        })
    },
    getCompanyFinancingList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyFinancingList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyNatureList = res.data.list
            if(CompanyNatureList.length > 0){
                for(let i in CompanyNatureList){
                    CompanyNatureList[i].isShow = false;
                }
            }
            that.setData({
                CompanyNatureList: CompanyNatureList
            });
        })
    },
    // 面向行业
    clickCompanyTradeList(e){
        let id = e.currentTarget.dataset.id;
        let name = e.currentTarget.dataset.name;
        let index = e.currentTarget.dataset.index;
				
		let selectedData = this.data.CompanyTradeListIds || [];
        let CompanyTradeListName = this.data.CompanyTradeListName || [];
		let item = this.data.CompanyTradeList[index];
		if(item.isShow){
			item.isShow = false;
			for (let i = 0; i < selectedData.length; i++) {
				if(selectedData[i] == id){
				    selectedData.splice(i, 1);
                    CompanyTradeListName.splice(i, 1);
				}
			}
		} else {
			item.isShow = true;
			selectedData.push(id);
            CompanyTradeListName.push(name);
		}
		this.setData({
            CompanyTradeListIds: selectedData,
            CompanyTradeListName: CompanyTradeListName,
            CompanyTradeList: this.data.CompanyTradeList,
            CompanyTrade: CompanyTradeListName.length > 0 ? CompanyTradeListName.join(",") : ''
        });
    },
    clickListCompanyTradeList(){
        if(this.data.number == 12){
            wx.setStorageSync('CompanyTrade', this.data.CompanyTradeListName);
        } else if(this.data.number == 13){
            wx.setStorageSync('CompanyTechnology', this.data.CompanyTradeListName);
        } else if(this.data.number == 14){
            wx.setStorageSync('CompanyLabel', this.data.CompanyTradeListName);
        }else if(this.data.number == 21){
            wx.setStorageSync('CompanyRegion', this.data.CompanyTradeListName);
        }else if(this.data.number == 29){
            wx.setStorageSync('CaseTrade', this.data.CompanyTradeListName);
        }else if(this.data.number == 30){
            wx.setStorageSync('CaseLabel', this.data.CompanyTradeListName);
        }
        
        wx.navigateBack({
            delta: 1
        });
    },
    CompanyTrade(e){
        if(this.data.number == 12){
            this.getCompanyTradeList();
        } else if(this.data.number == 13){
            this.getCompanyTechnologyList();
        } else if(this.data.number == 14){
            this.getCompanyLabelList();
        } else if(this.data.number == 21){
            this.getCompanyRegionList();
        } else if(this.data.number == 29){
            this.getCaseTradeList();
        }  else if(this.data.number == 30){
            this.getCaseLabelList();
        }
        
        this.setData({
            CompanyTrade: e.detail.value
        });
    },
    getCompanyTradeList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyTradeList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyTradeList = res.data.list
            if(CompanyTradeList.length > 0){
                for(let i in CompanyTradeList){
                    CompanyTradeList[i].isShow = false;
                }
            }

            let CompanyTradeListIds = wx.getStorageSync('CompanyTrade');
            if(CompanyTradeListIds.length > 0){
                
                for(let j = 0; j< CompanyTradeList.length; j++){
                    for(let i = 0; i< CompanyTradeListIds.length; i++){
                        if(CompanyTradeListIds[i] == CompanyTradeList[j].name){
                            CompanyTradeList[j].isShow = true;
                            break;
                        }else{
                            CompanyTradeList[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                CompanyTradeList: CompanyTradeList,
                CompanyTradeListIds: CompanyTradeListIds
            });
        })
    },
    getCompanyTechnologyList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyTechnologyList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyTradeList = res.data.list
            if(CompanyTradeList.length > 0){
                for(let i in CompanyTradeList){
                    CompanyTradeList[i].isShow = false;
                }
            }

            let CompanyTradeListIds = wx.getStorageSync('CompanyTechnology');
            if(CompanyTradeListIds.length > 0){
                
                for(let j = 0; j< CompanyTradeList.length; j++){
                    for(let i = 0; i< CompanyTradeListIds.length; i++){
                        if(CompanyTradeListIds[i] == CompanyTradeList[j].name){
                            CompanyTradeList[j].isShow = true;
                            break;
                        }else{
                            CompanyTradeList[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                CompanyTradeList: CompanyTradeList,
                CompanyTradeListIds: CompanyTradeListIds
            });
        })
    },
    getCompanyLabelList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyLabelList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyTradeList = res.data.list
            if(CompanyTradeList.length > 0){
                for(let i in CompanyTradeList){
                    CompanyTradeList[i].isShow = false;
                }
            }

            let CompanyTradeListIds = wx.getStorageSync('CompanyLabel');
            if(CompanyTradeListIds.length > 0){
                
                for(let j = 0; j< CompanyTradeList.length; j++){
                    for(let i = 0; i< CompanyTradeListIds.length; i++){
                        if(CompanyTradeListIds[i] == CompanyTradeList[j].name){
                            CompanyTradeList[j].isShow = true;
                            break;
                        }else{
                            CompanyTradeList[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                CompanyTradeList: CompanyTradeList,
                CompanyTradeListIds: CompanyTradeListIds
            });
        })
    },
    getCompanyRegionList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCompanyRegionList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyTradeList = res.data.list
            if(CompanyTradeList.length > 0){
                for(let i in CompanyTradeList){
                    CompanyTradeList[i].isShow = false;
                }
            }

            let CompanyTradeListIds = wx.getStorageSync('CompanyTechnology');
            if(CompanyTradeListIds.length > 0){
                
                for(let j = 0; j< CompanyTradeList.length; j++){
                    for(let i = 0; i< CompanyTradeListIds.length; i++){
                        if(CompanyTradeListIds[i] == CompanyTradeList[j].name){
                            CompanyTradeList[j].isShow = true;
                            break;
                        }else{
                            CompanyTradeList[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                CompanyTradeList: CompanyTradeList,
                CompanyTradeListIds: CompanyTradeListIds
            });
        })
    },
    getCaseTradeList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCaseTradeList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyTradeList = res.data.list
            if(CompanyTradeList.length > 0){
                for(let i in CompanyTradeList){
                    CompanyTradeList[i].isShow = false;
                }
            }

            let CompanyTradeListIds = wx.getStorageSync('CaseTrade');
            if(CompanyTradeListIds.length > 0){
                
                for(let j = 0; j< CompanyTradeList.length; j++){
                    for(let i = 0; i< CompanyTradeListIds.length; i++){
                        if(CompanyTradeListIds[i] == CompanyTradeList[j].name){
                            CompanyTradeList[j].isShow = true;
                            break;
                        }else{
                            CompanyTradeList[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                CompanyTradeList: CompanyTradeList,
                CompanyTradeListIds: CompanyTradeListIds
            });
        })
    },
    getCaseLabelList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCaseLabelList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let CompanyTradeList = res.data.list
            if(CompanyTradeList.length > 0){
                for(let i in CompanyTradeList){
                    CompanyTradeList[i].isShow = false;
                }
            }

            let CompanyTradeListIds = wx.getStorageSync('CaseLabel');
            if(CompanyTradeListIds.length > 0){
                
                for(let j = 0; j< CompanyTradeList.length; j++){
                    for(let i = 0; i< CompanyTradeListIds.length; i++){
                        if(CompanyTradeListIds[i] == CompanyTradeList[j].name){
                            CompanyTradeList[j].isShow = true;
                            break;
                        }else{
                            CompanyTradeList[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                CompanyTradeList: CompanyTradeList,
                CompanyTradeListIds: CompanyTradeListIds
            });
        })
    },
    partner1(e){
        this.setData({
            partner1: e.detail.value
        });
    },
    partner2(e){
        this.setData({
            partner2: e.detail.value
        });
    },
    partner3(e){
        this.setData({
            partner3: e.detail.value
        });
    },
    partner4(e){
        this.setData({
            partner4: e.detail.value
        });
    },
    clickCompanyPartner(){
        let partner = this.data.partner1 + ',' + this.data.partner2 + ',' + this.data.partner3 + ',' + this.data.partner4;
        wx.setStorageSync('partner', partner);
        
        wx.navigateBack({
            delta: 1
        });
    },
})