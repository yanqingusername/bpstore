
const app = getApp();
const Api = require('../../utils/api');
Page({
    data: {
        id: '',
        name: '',
        wx: '',
        phone: '',
        companyName: '',
        profession: '',
    },
    onLoad(options){
        wx.setNavigationBarTitle({ title: '活动报名' });
        this.setData({
            id: options.id
        });
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    inputClick(e){
        let type = e.currentTarget.dataset.typestring;
        this.setData({
           [type]:e.detail.value
        });
    },
    // id	[string]	是	活动id		
	// userid	[string]	是	用户id		
	// name	[string]	是	名子		
	// wx	[string]	是	微信号		
	// phone	[string]	是	手机号		
	// companyName	[string]	是	公司名称		
	// profession  [string]	是	职位
	addActivityEnroll(){
        var that = this;
        let data = {
            id: that.data.id,
            name: that.data.name,
            wx: that.data.wx,
            phone: that.data.phone,
            companyName: that.data.companyName,
            profession: that.data.profession
        }
        Api.addActivityEnroll(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.navigateBack({
                delta: 1
            });
        })
    }
})