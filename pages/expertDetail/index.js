const app = getApp();
const Api = require('../../utils/api');
Page({
  data: {
    id:'',
    userid: '',
    CelebrityInfo: '',
    CaseList: [],
    isUser: false
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
        this.getMyCelebrityInfo();
    }else{
        this.setData({
            isUser: false
        })
        this.getCelebrityInfo();
    }
    this.getOthersCaseList();
  },
  getMyCelebrityInfo(){
    let that = this;
    Api.getMyCelebrityInfo({}).then(function (res) {
        if (res.code != 1) {
            return;
        }
        console.log('---->:',res.data)
        wx.setNavigationBarTitle({ title: res.data.nickName });
        that.setData({
            CelebrityInfo: res.data
        });
        // that.setData({
        //     avatarUrl: res.data.avatarUrl,
        //     name: res.data.name,
        //     wx: res.data.wx,
        //     phone: res.data.phone,
        //     email: res.data.email,
        //     companyName: res.data.companyName,
        //     profession: res.data.profession,
        //     cityname: res.data.city,
        //     clabel: res.data.clabel.split(','),
        //     introduce: res.data.introduce,
        //     certificate: res.data.certificate,
        //     honor: res.data.honor,
        //     industry: res.data.industry,
        // });
    });
  },
  getCelebrityInfo(){
    let that = this;
    Api.getCelebrityInfo({
        ouserid: this.data.id
    }).then(function (res) {
        if (res.code != 1) {
            return;
        }
        console.log('---->:',res.data)
        wx.setNavigationBarTitle({ title: res.data.nickName });
        that.setData({
            CelebrityInfo: res.data
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
    let path = "/pages/expertDetail/index?id=" +  this.data.id ;
    return {
        title:this.data.CelebrityInfo.nickName,
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
            that.getMyCelebrityInfo();
            that.getOthersCaseList();
        }else{
            that.setData({
                isUser: false
            })
            that.getCelebrityInfo();
        }
    }).catch(() => {
       
    })
},
clickChat(e){
    let userid = e.currentTarget.dataset.userid
        let myuserId = wx.getStorageSync('userid');
		if (userid == myuserId) {
			wx.showToast({
				icon: 'none',
				title: '不能给自己发私信'
			});
			return;
		}
		
        wx.navigateTo({
			url: '/pages/im/chat?type=merchant&to=' + userid
		});
}
})