
const app = getApp();
const Api = require('../../../utils/api');
const Util = require('../../../utils/util');
Page({
    data: {
        name: '',//姓名
        wx: '',//微信号
        phone: '',//手机号
        email: '',//邮箱
        companyName: '',//公司名称
        profession: '',//职位
        cityname: '',
        celebrityCityList: {}, //达人城市列表
        isFlag: false, //所在城市
        clabel:'',
        introduce:'',
        certificate:'',
        honor:'',
        industry:''
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '达人认证' });
        this.getCelebrityCityList();
    },
    onShow(){
        let clabel = wx.getStorageSync('celebrityinfo_clabel') || '';
        let introduce = wx.getStorageSync('celebrityinfo_introduce') || '';
        let certificate = wx.getStorageSync('celebrityinfo_honorImg') || '';
        let honor = wx.getStorageSync('celebrityinfo_honor') || '';
        let industry = wx.getStorageSync('celebrityinfo_industry') || '';

        this.setData({
            clabel: clabel,
            introduce: introduce,
            certificate: certificate,
            honor: honor,
            industry: industry
        });

    },
    getCelebrityCityList(){
        let that = this;
        let data = {
            pageNum: 1,
            pageSize: 50
        }
        Api.getCelebrityCityList(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            let proList = {}
            let cityList = {}
            for(let i = 0; i < res.data.length; i++){
                let cityItem = res.data[i];
                proList[cityItem.code] = cityItem.name;
            }

            for(let i = 0; i < res.data.length; i++){
                let appAreaList = res.data[i].appAreaList;
                for(let j = 0; j < appAreaList.length; j++){
                    cityList[appAreaList[j].code] = appAreaList[j].name;
                }
            }
            let araeList = {};
            araeList['province_list'] = proList;
            araeList['city_list'] = cityList
            that.setData({
                celebrityCityList: araeList
            });
        })
    },
    name(e){
        this.setData({
            name: e.detail.value
        });
    },
    wx(e){
        this.setData({
            wx:e.detail.value
        });
    },
    phone(e){
        this.setData({
            phone:e.detail.value
        });
    },
    email(e){
        this.setData({
            email:e.detail.value
        });
    },
    companyName(e){
        this.setData({
            companyName:e.detail.value
        });
    },
    profession(e){
        this.setData({
            profession:e.detail.value
        });
    },
    getCelebrityLabelList(e){
        wx.navigateTo({
            url: '../SelectLable/index'
        })
    },
    setAddCelebrityInfo() {
        

        if (this.data.name == ''){
            Util.showToast('姓名不能为空');
            return;
        }
        if (this.data.wx == ''){
            Util.showToast('微信号不能为空');
            return;
        }
        let isMobile = /^[1][0-9]{10}$/;
        if (this.data.phone == '' || !isMobile.test(this.data.phone)) {
            Util.showToast('联系方式不正确');
            return;
        }
        if (this.data.email == ''){
            Util.showToast('邮箱不能为空');
            return;
        }
        if (this.data.clabel == ''){
            Util.showToast('个人标签不能为空');
            return;
        }
        if (this.data.introduce == ''){
            Util.showToast('自我介绍不能为空');
            return;
        }
        if (this.data.certificate == '' || this.data.honor == ''){
            Util.showToast('个人荣誉不能为空');
            return;
        }
        if (this.data.companyName == '') {
            Util.showToast('单位名称不能为空');
            return;
        }
        if (this.data.profession == '') {
            Util.showToast('职位名称不能为空');
            return;
        }
        if (this.data.industry == '') {
            Util.showToast('所属行业不能为空');
            return;
        }
        if (this.data.cityname == '') {
            Util.showToast('所在城市不能为空');
            return;
        }


        let data = {
            name: this.data.name,
            wx: this.data.wx,
            phone: this.data.phone,
            email: this.data.email,
            clabel: this.data.clabel,
            introduce: this.data.introduce,
            certificate: this.data.certificate,
            honor: this.data.honor,
            companyName: this.data.companyName,
            profession: this.data.profession,
            industry: this.data.industry,
            city: this.data.cityname
        }
        Api.addCelebrityInfo(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.removeStorageSync('celebrityinfo_clabel');
            wx.removeStorageSync('celebrityinfo_clabelIds');
            wx.removeStorageSync('celebrityinfo_introduce');
            wx.removeStorageSync('celebrityinfo_honorImg');
            wx.removeStorageSync('celebrityinfo_honor');
            wx.removeStorageSync('celebrityinfo_industry');
            
            wx.reLaunch({
                url: '/pages/Tabbar/tabbar?current=3'
            })
        })
    },
    routerUrl(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    selectArea: function () {
        this.setData({
            isFlag: true
        });
    },
    pickerClose: function () {
        this.setData({
            isFlag: false
        });
    },
    areaConfirm: function (e) {
        let value = e.detail.values;
        console.log(value)
        if(value.length > 0){
            if(value[0].name && value[1] != undefined){
                this.setData({
                    isFlag: false,
                    cityname: value[1].name
                });
            } else{
                this.setData({
                    isFlag: false,
                    cityname: value[0].name
                });
            }
        }
    },
})