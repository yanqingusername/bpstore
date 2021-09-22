const app = getApp()
const Api = require('../../../utils/api')
const Utils = require('../../../utils/util')

Page({
    data: {
        SHOW: true,
        AuthStatus: true, // true: 手机号 false : 用户信息
        Tel: '', // 用户的手机号
        URL: '', // 需要跳转的页面
        openid : '',
        fans_id : '',
        ct : '',
        type_id : '',
        x_id : '',
        urlsm : '',
        oid : '',
        sid: '',
        atid: '',
        share_agent_id: 0
    },
    onLoad(options) {

         // 获取全局粉丝id
         let allFansId  = wx.getStorageSync('AllFansId');

        // 需要跳转的页面
        if( options.fans_id || allFansId){
            this.setData({
                fans_id : options.fans_id || allFansId,
            })
        }
        this.setData({
            URL: options.url ? options.url : '/pages/Tabbar/tabbar',
            x_id : options.x_id ? options.x_id : '',
            TYPE: options.type ? options.type : '',
            ct : options.ct ? options.ct : '',
            ct_id : options.ct_id ? options.ct_id : '',
            type_id : options.type_id ? options.type_id : '',
            fid : options.fid ? options.fid : '',
            op: options.op ? options.op : '',
            urlsm : options.urlsm ? options.urlsm : '',
            oid : options.oid ? options.oid : '',
            sid: options.sid ? options.sid : '',
            atid: options.atid ? options.atid : '',
            share_agent_id: options.share_agent_id ? options.share_agent_id : 0
        })
        if( options.type ){
            wx.showToast({
                title: options.type,
                icon: 'none',
                duration: 2500,
                mask: false,
            });
        }
        wx.setNavigationBarTitle({
            title: '微信授权登录'
        });
        // 获取授权的手机号 ( 如果有手机号代表手机授权成功了 )
        const value = wx.getStorageSync('tel')
        if ( value ) {
            this.setData({
                AuthStatus: false,
                Tel: value
            })
        }
        this.getOpenID(() => {});
        let lat = wx.getStorageSync('lat1');
        let log = wx.getStorageSync('log1');
        this.get_agent_id(lat, log)
    },
    get_agent_id(lat, lng){
        let data = {
            lat: lat,
            lng: lng
        }
        wx.request({
            url: Api.get_agent_id,
            data: Utils.DATA_md5(data),
            method: "GET",
            success: (res) => {
                wx.hideLoading();
                if (res.data.code === 1000) {
                    let agentId =  res.data.data.agent_id;
                    wx.setStorageSync('agent_id', agentId);
                } else if (res.data.code == 90008) {
                } else if (res.data.code == 90011) {
                }else {
                }
              },
              fail: () => wx.hideLoading()
        })
    },
    // 获取 openid
    getOpenID(success){
        wx.login({
            success : _Code => {
                const DATA = {
                    rs_code : _Code.code
                }
                wx.request({
                    url: Api.update_home_sessionkey,
                    data: Utils.DATA_md5(DATA),
                    method: 'POST',
                    success: (res) => {
                        wx.hideLoading();
                          
                        this.setData({
                            openid : res.data.data.openid
                        })
                        success()
                    }
                });
            }
        })
    },
    homeUrl(e) {
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    // 授权手机号
    bindPhoneNumber(e) {
        // 用户同意授权
        const OK = 'getPhoneNumber:ok'
        if (e.detail.errMsg == OK) {
            wx.showLoading({
                title: '加载中...',
                mask: true
            })
            // 判断 session_key 有无到期
            wx.checkSession({
                success : res => {
                    this.TEL(e)
                },
                fail: res => {
                    this.getOpenID(() => {
                        this.TEL(e)
                    })
                
                }
            })
        }
    },
  refuse(){
    wx.reLaunch({
      url: '/pages/Tabbar/tabbar'
    })
  },
    TEL(e){
        if( !this.data.openid ){
            wx.showToast({
                title: '由于网络原因,请点击重试.',
                icon: 'none',
            });
            this.getOpenID(() => {})
        } else {

            const DATA = {
                openid: this.data.openid,
                top_user_id : this.data.fans_id,
                encrypted_data: e.detail.encryptedData,
                iv: e.detail.iv
            }
            wx.request({
                url: Api.request_update_tel,
                data: Utils.DATA_md5(DATA),
                method: 'POST',
                success: (_RES) => {
                    wx.hideLoading();
                    if (_RES['data'].code == 1000) {
                        wx.setStorageSync('tel',_RES['data']['data'].user_tel)
                        if(  _RES['data'].data.user_id ){
                            Toast.success('授权成功');

                             // 清除全局粉丝id
                             wx.removeStorageSync("AllFansId");
                          
                            // 本地存储
                            wx.setStorageSync('data',_RES['data']['data']);
                            app.linkSocket();
                          wx.request({
                            url: Api.user_in,
                            data: Utils.DATA_md5({}),
                            method: "GET",
                            success: res => {
                            }
                          })

                          let record = {
                            app_type: 1
                          }
                          wx.request({
                            url: Api.messagenew_record_index,
                            data: Utils.DATA_md5(record),
                            method: "GET",
                            success: res => {
                                // 本地存储
                                wx.setStorageSync('is_has',res['data']['data'].is_has);
                            }
                          })

                            setTimeout(() => {
                                if( this.data.type_id != 4855 ) {
                                     // 跳转个人中心
                                     if (this.data.URL == 'User') {
                                         wx.reLaunch({
                                             url: '/pages/Tabbar/tabbar?current=3'
                                         });
                                     // 跳转家的成长
                                     } else if( this.data.URL == 1 ){
                                         wx.reLaunch({
                                             url: '/pages/Tabbar/tabbar?current=1'
                                         });
                                     } else if( this.data.URL == 2 ){
                                         wx.reLaunch({
                                             url: '/pages/Tabbar/tabbar?current=2'
                                         });
                                     } else if( this.data.URL == 3 ){
                                         wx.reLaunch({
                                             url: '/pages/Tabbar/tabbar?current=3'
                                         });
                                     }else if( this.data.URL == 119 ){ 
                                        wx.reLaunch({
                                            url: decodeURIComponent(this.data.urlsm)
                                        });
                                    } else if( this.data.op == 1 || this.data.op == 2 || this.data.op == 3 ){
                                         let u = decodeURIComponent(this.data.URL)
                                         wx.reLaunch({
                                            url: u
                                         });
                                    } else if( this.data.op == 4 ){
                                        let u = decodeURIComponent(this.data.URL)
                                        wx.redirectTo({
                                           url: u
                                        });
                                    }else {
                                         wx.reLaunch({
                                             url: this.data.URL
                                         });
                                     }
                                 } else {
                                     // 推广图跳转
                                     if( this.data.ct == 99 ){
                                        wx.reLaunch({
                                            url:`/Shopping/pages/assembleDetails/assembleDetails?choose=4&id=${this.data.ct_id}&oid=${this.data.oid}`
                                        });
                                     // 楼盘跳转
                                     } else if( this.data.ct==96 ) {
                                        wx.reLaunch({
                                            url: `/Index_/pages/estateDetails/estateDetails?id=${this.data.ct_id}&share_agent_id=${this.data.share_agent_id}`
                                        });
                                    // 商品
                                    } else if( this.data.ct==95 ) {
                                        wx.reLaunch({
                                            url: `/Shopping/pages/commodityDetails/commodityDetails?choose=3&id=${this.data.ct_id}&seckillId=${this.data.sid}&activtytype=${this.data.atid}`
                                        });
                                    // 众筹
                                    } else if( this.data.ct==94 ) {
                                        wx.reLaunch({
                                            url: `/Shopping/pages/commodityDetails/commodityDetails?choose=2&id=${this.data.ct_id}&fid=${this.data.fid}`
                                        });
                                    // 拼团
                                    } else if( this.data.ct==93 ) {
                                        wx.reLaunch({
                                            url: `/Shopping/pages/commodityDetails/commodityDetails?choose=1&id=${this.data.ct_id}`
                                        });
                                    } else if( this.data.ct==98 || this.data.ct==100 || this.data.ct==106) {
                                         wx.reLaunch({
                                             url: `${this.data.URL}?id=${this.data.x_id}&type=2`
                                         });
                                    } else if( this.data.ct== 111){
                                        wx.reLaunch({
                                            url: `/Shopping/pages/ShareMakeMoney/index`
                                        });
                                    }
                                 }
                             }, 1000)
                        }else {
                            this.setData({
                                AuthStatus: false,
                                Tel : _RES['data']['data'].user_tel
                            })
                            Toast.success('授权成功');
                        }

                    }  else if (_RES.data.code == 90011) {
                        
                      }else {
                        Toast(_RES['data'].message);
                    }
                },
                fail: () => wx.hideLoading()
            });
        }
    },
    // 授权用户信息
    bindGetUserInfo(e) {
        const OK = "getUserInfo:ok"
        if (e.detail.errMsg == OK) {
            wx.showLoading({
                title: '加载中...',
                mask: true
            })
            // 判断 session_key 有无到期
            wx.checkSession({
                success : res => {
                    this.USRE(e)
                },
                fail: res => {
                    this.getOpenID(() => {
                        this.USRE(e)
                    })
                }
            })
        } else {
            Toast('温馨提示:为了您更好的体验,请授权用户信息')
        }
    },
    USRE(e){
        const DATA = {
            openid: this.data.openid,
            encrypted_data: e.detail.encryptedData,
            iv: e.detail.iv,
            top_user_id : this.data.fans_id,
            user_wx_tel: this.data.Tel
        }
        wx.request({
            url: Api.user_login_wx,
            data: Utils.DATA_md5(DATA),
            method: 'POST',
            success: (_RES) => {
                wx.hideLoading();
                  
                if (_RES['data'].code == 1000) {
                    Toast.success('授权成功');

                     // 清除全局粉丝id
                     wx.removeStorageSync("AllFansId")

                    // 本地存储
                    wx.setStorageSync('data',_RES['data']['data']);
                    this.setData({
                        AuthStatus: false
                    })
                    app.linkSocket()
                    wx.request({
                        url: Api.user_in,
                        data: Utils.DATA_md5({}),
                        method: "GET",
                        success: res => {
                        }
                      })

                      let record = {
                        app_type: 1
                      }
                      wx.request({
                        url: Api.messagenew_record_index,
                        data: Utils.DATA_md5(record),
                        method: "GET",
                        success: res => {
                            // 本地存储
                            wx.setStorageSync('is_has',res['data']['data'].is_has);
                        }
                      })

                      setTimeout(() => {
                        if( this.data.type_id != 4855 ) {
                             // 跳转个人中心
                             if (this.data.URL == 'User') {
                                 wx.reLaunch({
                                     url: '/pages/Tabbar/tabbar?current=3'
                                 });
                             // 跳转家的成长
                             } else if( this.data.URL == 1 ){
                                 wx.reLaunch({
                                     url: '/pages/Tabbar/tabbar?current=1'
                                 });
                             } else if( this.data.URL == 2 ){
                                 wx.reLaunch({
                                     url: '/pages/Tabbar/tabbar?current=2'
                                 });
                             } else if( this.data.URL == 3 ){
                                 wx.reLaunch({
                                     url: '/pages/Tabbar/tabbar?current=3'
                                 });
                             }else if( this.data.URL == 119 ){ 
                                wx.reLaunch({
                                    url: decodeURIComponent(this.data.urlsm)
                                });
                            } else if( this.data.op == 1 || this.data.op == 2 || this.data.op == 3 ){
                                 let u = decodeURIComponent(this.data.URL)
                                 wx.reLaunch({
                                    url: u
                                 });
                            } else if( this.data.op == 4 ){
                                let u = decodeURIComponent(this.data.URL)
                                wx.redirectTo({
                                   url: u
                                });
                            }else {
                                 wx.reLaunch({
                                     url: this.data.URL
                                 });
                             }
                         } else {
                             // 推广图跳转
                             if( this.data.ct == 99 ){
                                wx.reLaunch({
                                    url:`/Shopping/pages/assembleDetails/assembleDetails?choose=4&id=${this.data.ct_id}&oid=${this.data.oid}`
                                });
                             // 楼盘跳转
                             } else if( this.data.ct==96 ) {
                                wx.reLaunch({
                                    url: `/Index_/pages/estateDetails/estateDetails?id=${this.data.ct_id}&share_agent_id=${this.data.share_agent_id}`
                                });
                            // 商品
                            } else if( this.data.ct==95 ) {
                                wx.reLaunch({
                                    url: `/Shopping/pages/commodityDetails/commodityDetails?choose=3&id=${this.data.ct_id}&seckillId=${this.data.sid}&activtytype=${this.data.atid}`
                                });
                            // 众筹
                            } else if( this.data.ct==94 ) {
                                wx.reLaunch({
                                    url: `/Shopping/pages/commodityDetails/commodityDetails?choose=2&id=${this.data.ct_id}&fid=${this.data.fid}`
                                });
                            // 拼团
                            } else if( this.data.ct==93 ) {
                                wx.reLaunch({
                                    url: `/Shopping/pages/commodityDetails/commodityDetails?choose=1&id=${this.data.ct_id}`
                                });
                            } else if( this.data.ct==98 || this.data.ct==100 || this.data.ct==106 ) {
                                 wx.reLaunch({
                                     url: `${this.data.URL}?id=${this.data.x_id}&type=2`
                                 });
                            } else if( this.data.ct== 111){
                                wx.reLaunch({
                                    url: `/Shopping/pages/ShareMakeMoney/index`
                                });
                            }
                         }
                     }, 1000)
                }else if (_RES.data.code == 90011) {
                }else {
                    Toast(_RES['data'].message);
                }
            },
            fail: () => wx.hideLoading()
        });
    },
})