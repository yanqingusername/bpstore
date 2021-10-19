
const app = getApp();
const Api = require('../../../utils/api');
const Util = require('../../../utils/util');
Page({
    data: {
        celebrityCityList: {}, //达人城市列表
        isFlag: false, //所在城市
        companyProperty: '',//公司性质
        logo: '',//企业logo
        companyName: '', //公司名称
        companyShortName: '', //公司简称
        CompanyTrade: [], //面向行业
        technology: [], //技术类型
        ulabel: [], //单位标签
        companyBusinessArea: '',//公司营业范围
        partner:'', //合作伙伴
        qualifis: '', //企业资质
        qualifisImg: '', //企业资质图片
        CompanyTurnover: '', //营业额
        CompanyMarket: '', //市值
        CompanyValuation: '', //估值
        CompanyFinancing: '', //融资情况
        cityname: '', //所在城市
        business: [], //业务分部区域
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '单位认证' });
        this.getCelebrityCityList();
        this.getMyCompanyInfo();
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
    onShow(){
        let companyProperty = wx.getStorageSync('CompanyNature') || '';
        let CompanyTrade = wx.getStorageSync('CompanyTrade') || [];
        let technology = wx.getStorageSync('CompanyTechnology') || [];
        let ulabel = wx.getStorageSync('CompanyLabel') || [];
        let partner = wx.getStorageSync('partner') || '';
        let qualifis = wx.getStorageSync('qualifis') || '';
        let qualifisImg = wx.getStorageSync('qualifisImg') || '';
        let CompanyTurnover = wx.getStorageSync('CompanyTurnover') || '';
        let CompanyMarket = wx.getStorageSync('CompanyMarket') || '';
        let CompanyValuation = wx.getStorageSync('CompanyValuation') || '';
        let CompanyFinancing = wx.getStorageSync('CompanyFinancing') || '';
        let business = wx.getStorageSync('CompanyRegion') || '';

        this.setData({
            companyProperty: companyProperty,
            CompanyTrade: CompanyTrade,
            technology: technology,
            ulabel: ulabel,
            partner: partner,
            qualifis: qualifis,
            qualifisImg: qualifisImg,
            CompanyTurnover: CompanyTurnover,
            CompanyMarket: CompanyMarket,
            CompanyValuation: CompanyValuation,
            CompanyFinancing: CompanyFinancing,
            business: business
        });
    },
    homeUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    routerUrl(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    clickAddImg(){
        Api.uploadAvatarImg('/upload/upLogo').then((res)=>{
            if(res.statusCode === 200) {
                let imgData = JSON.parse(res.data);
                if(imgData.code == 1){
                    this.setData({
                        logo: imgData.data.urlPath
                    });
                }
            }
        })
    },
    companyName(e){
        this.setData({
            companyName:e.detail.value
        });
    },
    companyShortName(e){
        this.setData({
            companyShortName:e.detail.value
        });
    },
    companyBusinessArea(e){
        this.setData({
            companyBusinessArea:e.detail.value
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
    setAddCompanyInfo() {
        if (this.data.companyProperty == '') {
            Util.showToast('单位性质不能为空');
            return;
        }
        if (this.data.logo == '') {
            Util.showToast('企业logo不能为空');
            return;
        }
        if (this.data.companyName == '') {
            Util.showToast('单位全称不能为空');
            return;
        }
        if (this.data.companyShortName == '') {
            Util.showToast('单位简称不能为空');
            return;
        }
        let tradeString = this.data.CompanyTrade.length > 0 ? this.data.CompanyTrade.join(",") : '';
        if (tradeString == ''){
            Util.showToast('面向行业不能为空');
            return;
        }

        let technologyString = this.data.technology.length > 0 ? this.data.technology.join(",") : '';
        if (technologyString == ''){
            Util.showToast('技术类型不能为空');
            return;
        }

        let ulabelString = this.data.ulabel.length > 0 ? this.data.ulabel.join(",") : '';
        if (ulabelString == ''){
            Util.showToast('单位标签不能为空');
            return;
        }

        if (this.data.companyBusinessArea == '') {
            Util.showToast('主营业务不能为空');
            return;
        }
        
        if (this.data.partner == '') {
            Util.showToast('生态伙伴不能为空');
            return;
        }

        if (this.data.qualifis == '' && this.data.qualifisImg == ''){
            Util.showToast('个人荣誉不能为空');
            return;
        }
        if (this.data.CompanyTurnover == ''){
            Util.showToast('营业额不能为空');
            return;
        }
        if (this.data.CompanyMarket == ''){
            Util.showToast('市值不能为空');
            return;
        }
        if (this.data.CompanyValuation == ''){
            Util.showToast('估值不能为空');
            return;
        }
        if (this.data.CompanyFinancing == ''){
            Util.showToast('融资情况不能为空');
            return;
        }

        if (this.data.cityname == '') {
            Util.showToast('所在城市不能为空');
            return;
        }

        let businessString = this.data.business.length > 0 ? this.data.business.join(",") : '';
        if (businessString == ''){
            Util.showToast('技术类型不能为空');
            return;
        }

        let data = {
            companyProperty: this.data.companyProperty,
            logo: this.data.logo,
            companyName: this.data.companyName,
            companyShortName: this.data.companyShortName,
            trade: tradeString,
            technology: technologyString,
            ulabel: ulabelString,
            companyBusinessArea: this.data.companyBusinessArea,
            partner: this.data.partner,
            qualifis: this.data.qualifis,
            qimg: this.data.qualifisImg,
            turnover: this.data.CompanyTurnover,
            market: this.data.CompanyMarket,
            valuation: this.data.CompanyValuation,
            financing: this.data.CompanyFinancing,
            city: this.data.cityname,
            business: businessString,
            location:'',
            phone:'',
            contact:'',
            username:'',
            roleType:'',
            companySize:'',
            companyYear:'',
            introduce:'',
            companyUrl:'',
            province:'',
            county:'',
            introduce:'',
            listing:''
        }
        Api.addCompanyInfo(data).then(function (res) {
            if (res.code != 1) {
                return;
            }
            wx.removeStorageSync('CompanyNature');
            wx.removeStorageSync('CompanyTrade');
            wx.removeStorageSync('CompanyTechnology');
            wx.removeStorageSync('CompanyLabel');
            wx.removeStorageSync('partner');
            wx.removeStorageSync('qualifis');
            wx.removeStorageSync('qualifisImg');
            wx.removeStorageSync('CompanyTurnover');
            wx.removeStorageSync('CompanyMarket');
            wx.removeStorageSync('CompanyValuation');
            wx.removeStorageSync('CompanyFinancing');
            wx.removeStorageSync('CompanyRegion');

            wx.reLaunch({
                url: '/pages/Tabbar/tabbar?current=3'
            });
        })
    },
    getMyCompanyInfo(){
        let that = this;
        Api.getMyCompanyInfo({}).then(function (res) {
            if (res.code != 1) {
                return;
            }
            if(res && res.data != null){
                that.setData({
                    companyProperty: res.data.companyProperty,
                    logo: res.data.logo,
                    companyName: res.data.companyName,
                    companyShortName: res.data.companyShortName,
                    CompanyTrade: res.data.trade.split(','),
                    technology: res.data.technology.split(','),
                    ulabel: res.data.ulabel.split(','),
                    companyBusinessArea: res.data.companyBusinessArea,
                    partner: res.data.partner,
                    qualifis: res.data.qualifis,
                    qualifisImg: res.data.qimg,
                    CompanyTurnover: res.data.turnover,
                    CompanyMarket: res.data.market,
                    CompanyValuation: res.data.valuation,
                    CompanyFinancing: res.data.financing,
                    cityname: res.data.city,
                    business: res.data.business.split(','),
                    location: res.data.location,
                    phone:res.data.phone,
                    contact:res.data.contact,
                    username:res.data.username,
                    roleType:res.data.roleType,
                    companySize:res.data.companySize,
                    companyYear:res.data.companyYear,
                    introduce:res.data.introduce,
                    companyUrl:res.data.companyUrl,
                    province:res.data.province,
                    county:res.data.county,
                    listing:res.data.listing,
                });
    
                wx.setStorageSync('CompanyNature', that.data.companyProperty);
                wx.setStorageSync('CompanyTrade', that.data.CompanyTrade);
                wx.setStorageSync('CompanyTechnology', that.data.technology);
                wx.setStorageSync('CompanyLabel', that.data.ulabel);
                wx.setStorageSync('partner', that.data.partner);
                wx.setStorageSync('qualifis', that.data.qualifis);
                wx.setStorageSync('qualifisImg', that.data.qualifisImg);
                wx.setStorageSync('CompanyTurnover', that.data.CompanyTurnover);
                wx.setStorageSync('CompanyMarket', that.data.CompanyMarket);
                wx.setStorageSync('CompanyValuation', that.data.CompanyValuation);
                wx.setStorageSync('CompanyFinancing', that.data.CompanyFinancing);
                wx.setStorageSync('CompanyRegion', that.data.business);
            }
        });
    }
})