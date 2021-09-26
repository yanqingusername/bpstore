
const app = getApp();
const Api = require('../../../utils/api');
Page({
    data: {
        value: '',
        list: [], //个人标签
        listIds:[], //个人标签id
        listName:[], //个人标签name
        listtwo: [],
        number: 1, // 1.个人认证-个人标签 2.个人认证-自我介绍 3.个人认证-个人荣誉 4.个人认证-所属行业 
        introduce: '', //自我介绍
        honorImg: '', //个人荣誉图片
        honor:'', //个人荣誉
        industryIndex: -1, //所属行业index
        industry: ''
    },
    onLoad(options){
        wx.setNavigationBarTitle({ 
            title: options.title || ''
        });
        
        if(options && options.number){
            this.setData({
                number: options.number
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
				if(selectedData[i] == id){
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
        wx.setStorageSync('celebrityinfo_clabelIds', this.data.listIds);
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

            let listIds = wx.getStorageSync('celebrityinfo_clabelIds');
            if(listIds.length > 0){
                for(let i = 0; i< listIds.length; i++){
                    for(let j = 0; j< list.length; j++){
                        if(listIds[i] == list[j].id){
                            list[j].isShow = true;
                        }else{
                            list[j].isShow = false;
                        }
                    }
                }
            }
            that.setData({
                list: list,
                listIds: listIds
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
        Api.uploadAvatarImg('/upload/upUserAuthPic').then((res)=>{
            if(res.statusCode === 200) {
                let imgData = JSON.parse(res.data);
                if(imgData.code == 1){
                    this.setData({
                        honorImg: imgData.data.urlPath
                    });
                }
            }
        })
    },
    honor(e){
        this.setData({
            honor: e.detail.value
        });
    },
    clickHonor(){
        wx.setStorageSync('celebrityinfo_honor', this.data.honor);
        wx.setStorageSync('celebrityinfo_honorImg', this.data.honorImg);
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
})