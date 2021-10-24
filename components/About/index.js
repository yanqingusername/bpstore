const app = getApp()
const Api = require('../../utils/api')
const Utils = require('../../utils/util')

Component({
    /**
     * 关闭组件样式屏蔽 ( 组件的样式是对外屏蔽的, 就引用不到app.wxss(已废弃全局设置)中设置的主题色, 所以需要在这里打开 ) (禁止随意开启此属性!)
     */
    options: {
        styleIsolation: 'shared',
    },


    // 接收父组件的参数
    properties: {
        Loading: Boolean,
        Status: Boolean,
        changeAgent: {
            type: String
        },
    },
    data: {
        product_list: [], 
        total: '', // 
        loading: false, // loading状态 
        pageNum: 1,
        pages: 0,
        companyProperty: "", //公司性质		
                trade: "", //面向行业		
                technology: "", //技术类型		
                ulabel: "", //标签		
                turnover: "", //营业额		
                partner: "", //合作伙伴		
                listing: "", //上市情况		
                market: "", //市值		
                financing: "", //融资		
                valuation: "", //估值		
                city: "", //城市
    },
    lifetimes: {
        // 在组件实例进入页面节点树时执行
        attached() {
            this.getCompanyList()
        },
        /**
         * 当组件从节点中移除  -- ( 清除所有的计时器以及延时的异步操作 )
         * 注:如果需要完全的离开此组件时就调用, 需要在hide函数中也操作一遍
         */
        detached() {
        },
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数 ( 只会加载一次 )
        show:  function () {
            this.getCompanyList()
        },
        /**
         * 组件所在页面的关闭函数
         */
        hide() {
          
        },

    },
    methods: {
			navigationToPage(e) {
                const { page } = e.currentTarget.dataset
				wx.navigateTo({
					url: `/pages/${ page }/index`
				})
			},
        /**
         * 公共路由跳转方法
         * @param {String/Obejct} url 传入string即跳转, 传入事件对象默认取dataset中的 url 参数
         * @param {String} method 跳转方式, 默认navigateTo
         * @param {String} key    dataset中存放url的键值, 默认'url'
       
         */
        handleRouter: Utils.throttle((url = '', method = 'navigateTo', key = 'url') => {

            if (typeof url !== 'string') {
                // 取出事件对象中的method参数作为跳转方式 (需要在url重置之前)
                method = url.currentTarget.dataset['method'] || method;

                // 如果传入的是事件对象, 即取出他url参数作为url值
                url = url.currentTarget.dataset[key];
            }
            if (!wx[method]) {
                // console.error('方法输入错误');
                return;
            }


            wx[method]({
                url: url
            })
        }),

        /**
         * 数据缓存
         * @param {String} StorageName 所需要从缓存中取出的键名
         * @param {String} stateName 所需要存在data中的键名, 如果没有默认name
         */
        bufferCache(StorageName = '', stateName = '') {
            if (StorageName) {

                // 如果未设置stateName, 则默认取name的值
                stateName = stateName || StorageName;

                const buffer = wx.getStorageSync(StorageName);
                if (buffer && stateName) {
                    this.setData({
                        [stateName]: buffer
                    })
                }
            } else {
                throw new Error('参数必须填写')
            }
        },
        /**
         * 判断用户是否已登录
         * @param {String} URL 跳转地址
         */
        IS_Login(URL) {
            // 当没有用户信息为未授权,跳转去授权
            if (!this.data.is_login) {
                const urls = '/pages/Tabbar/tabbar'
                wx.navigateTo({
                    url: `/Home_/pages/Authorize/authorize?url=${urls}`,
                });
            } else {
                wx.navigateTo({
                    url: URL
                });
            }
        },
        /**
         * 监听滚动事件
         */
        onPageScroll(e) {
            // 节流阀  => 50 毫秒监听一次
            if (this.throttle) return;

            this.throttle = setTimeout(() => {
                clearTimeout(this.throttle);
                this.throttle = null;
            }, 50)
           

        },
        /**
         * 监听下拉事件
         */
        onPull() {
            var that = this;
            setTimeout(() => {
                that.setData({
                    pageNum: 1,
                    product_list: []
                });
                that.getCompanyList()
            }, 500)
            wx.stopPullDownRefresh()
        },
        // 上拉加载
        pullUp() {
            var that = this
            var pageNum = that.data.pageNum;
            if (pageNum >= that.data.pages) return;
            pageNum += 1
            that.setData({
                loading: true,
                pageNum: pageNum,
            });
            this.getCompanyList()
        },
         getCompanyList() {
            var that = this;
            var currentPage = that.data.pageNum;
            let data = {
                pageNum: currentPage,
                pageSize: 14,
                companyProperty: this.data.companyProperty, //公司性质		
                trade: this.data.trade, //面向行业		
                technology: this.data.technology, //技术类型		
                ulabel: this.data.ulabel, //标签		
                turnover: this.data.turnover, //营业额		
                partner: this.data.partner, //合作伙伴		
                listing: this.data.listing, //上市情况		
                market: this.data.market, //市值		
                financing: this.data.financing, //融资		
                valuation: this.data.valuation, //估值		
                city: this.data.city, //城市
            }
            Api.getCompanyList(data).then(function (res) {
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
                        product_list: []
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
                    product_list: currentPage == 1 ? data.list : that.data.product_list.concat(data.list)
                });
            }).catch(() => {
                that.setData({
                    loading: false
                });
            })
        },
    },
    created: function () { },
    onUnload: function () {

    },

})