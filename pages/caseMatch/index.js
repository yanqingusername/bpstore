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

        id: '',
        ContestInfo: '',
        active: 0,
        AwardList: [],
        isShow: false,
        isRelease: false,
        CaseList:[],
        CaseListIds:[], 
        isSelectAll: false
  },
  onLoad(options){
    // this.setData({
    //     id: options.id
    // })
  },
  onShow(){
    this.getContestInfo();
    this.getMyCaseList();
  },
  getContestInfo(){
    var that = this;
    let data = {}
    Api.getContestInfo(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }

        that.setData({
            ContestInfo: res.data,
            id: res.data.id
        })
    }).catch(() => {
        that.setData({
            loading: false
        });
    })
  },
  onChange(event) {
    // tab 切换
    let that = this;
    let position =  event.detail.index
    switch (position) {
      case 0:
        that.setData({
            active: position,
            pageNum: 1
        })
        that.getContestInfo();
        that.getMyCaseList();
          break;
      case 1:
        that.setData({
            active: position,
            pageNum: 1
        })
        that.getContestPassList();
          break;
      case 2:
        that.setData({
            active: position,
            pageNum: 1
        })
        that.getContestAwardList();
          break;
      default:
        break;
    }
  },
  getContestPassList() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 14,
        id: this.data.id
    }
    Api.getContestPassList(data).then(function (res) {
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
getContestAwardList() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 3,
        id: this.data.id
    }
    Api.getContestAwardList(data).then(function (res) {
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
                AwardList: []
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
            AwardList: currentPage == 1 ? data.list : that.data.AwardList.concat(data.list)
        });

        setTimeout(()=>{
            let query = that.createSelectorQuery();
            query.select("#awardH").boundingClientRect()
            query.exec(function(res){
            console.log('ZHI',res);
            that.setData({
                awardHeight:res[0].height
            })
            })
        },200)
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
        if(that.data.active == 1){
            that.getContestPassList()
        }else if(that.data.active == 2){
            that.getContestAwardList();
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
    if(that.data.active == 1){
        that.getContestPassList()
    }else if(that.data.active == 2){
        // that.getContestAwardList();
    }
},
    handleRouter(e){
        this.setData({
            isShow: false,
        })
      wx.navigateTo({
          url: e.currentTarget.dataset.url
      });
  },
  clickRelease(){
      this.setData({
          isShow: true
      })
  },
  selectRelease(){
    this.setData({
        isShow: false,
        isRelease: true
    })
   },
   closePop(){
    this.setData({
        isShow: false
    })
   },
   closeRelease(){
    this.setData({
        isRelease: false
    })
   },
   getMyCaseList() {
    var that = this;
    var currentPage = that.data.pageNum;
    let data = {
        pageNum: currentPage,
        pageSize: 50,
        title: ''
    }
    Api.getMyCaseList(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }
        let list = res.data.list;

        if(list.length > 0){
            for(let i in list){
                list[i].isShow = false;
            }
        }

        that.setData({
            CaseList: list
        });
    }).catch(() => {
        that.setData({
            loading: false
        });
    });
},
clickSelect(e){
    let id = e.currentTarget.dataset.id;
        let index = e.currentTarget.dataset.index;
				
		let selectedData = this.data.CaseListIds || [];
		let item = this.data.CaseList[index];
		if(item.isShow){
			item.isShow = false;
			for (let i = 0; i < selectedData.length; i++) {
				if(selectedData[i] == id){
				    selectedData.splice(i, 1);
				}
			}
		} else {
			item.isShow = true;
			selectedData.push(id);
		}
		this.setData({
            CaseListIds: selectedData,
            CaseList: this.data.CaseList
        });
},
clickSelectAll(){
    let that = this;
    that.setData({
        isSelectAll: !this.data.isSelectAll
    },()=>{
        if(that.data.isSelectAll){
            let selectedData = [];
            let CaseList = that.data.CaseList;
            if(CaseList.length > 0){
                for(let i in CaseList){
                    CaseList[i].isShow = true;
                    selectedData.push(CaseList[i].id);
                }
            }
            that.setData({
                CaseList: CaseList,
                CaseListIds: selectedData,
            });
        }else{
            let CaseList = that.data.CaseList;
            if(CaseList.length > 0){
                for(let i in CaseList){
                    CaseList[i].isShow = false;
                }
            }
            that.setData({
                CaseList: CaseList,
                CaseListIds: [],
            });
        }
    })
},
clickSubmit(){
    var that = this;
    let data = {
        cid: this.data.CaseListIds,
        coid: this.data.id
    }
    Api.declContestCase(data).then(function (res) {
        that.setData({
            loading: false
        });
        if (res.code != 1) {
            return;
        }
        that.getContestInfo();
        that.getMyCaseList();
    }).catch(() => {
        that.setData({
            loading: false
        });
    });
}
})