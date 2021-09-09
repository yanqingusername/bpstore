/*
 * @Author: your name
 * @Date: 2021-03-12 10:22:33
 * @LastEditTime: 2021-03-12 13:54:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \well_medical_care\components\About\index.js
 */
const app = getApp()
const Api = require('../../utils/api')
const Utils = require('../../utils/util')

Component({
    // 接收父组件的参数
    properties: {
        Status: Boolean,
    },
    data: {
        show: true,
        over: false, // 控制页面是否可以滚动
       
    },
    lifetimes: {
        attached() {
            wx.setNavigationBarTitle({
                title: '关于我们'
            });
        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {
           
        },
    },
    methods: {
        onPull() {
            
        },
        get_user_finance(id) {
            const DATA = {
                user_id: id
            }
            wx.request({
                url: Api.get_user_finance,
                data: Utils.DATA_md5(DATA),
                method: 'POST',
                success: (result) => {
                    wx.hideLoading();
                    if (result.data.code == 90008) {
                        app.goLogin(result['data'].message)
                    } else if (result.data.code == 90011) {
                        app.goSystemMaintenance(result['data'].message)
                    }
                    app.globalData.user_cart_num = result.data.data.user_cart_num;

                    const A = result.data.data;
                    let User = this.data.userData;
                    User.fans = A.fans
                    User.coupon_sum = A.coupon_sum
                    User.red_packet_sum = A.red_packet_sum
                    User.income_sum = A.income_sum
                    User.rebate_sum = A.rebate_sum
                    User.user_balance = A.user_balance
                    User.user_gold = A.user_gold
                    User.user_midou = A.user_midou
                    User.vip_user_info = {
                        status: A.vip_user_info.status,
                        money: A.vip_user_info.money
                    }
                    User.user_gold = A.user_gold
                    User.user_credit = A.user_credit
                    User.grade_id = A.grade_id
                    User.user_balance_lock_num = A.user_balance_lock_num
                    User.user_gold_lock_num = A.user_gold_lock_num
                    User.grade_name = A.grade_name
                    User.next_grade_credit = A.login_info[0].next_grade_credit
                    User.identity_name = A.login_info[0].identity_name,
                        User.yesno_sign = A.login_info[0].yesno_sign
                    User.identity_id_array = A.login_info[0].identity_id_array
                    User.user_cart_num = A.user_cart_num
                    this.setData({
                        status_array: A.status_array ? A.status_array : [],
                        userData: User,
                        Percent: this.GetPercent(A.user_credit, User.next_grade_credit),
                    })
                    app.globalData.user_cart_num = A.user_cart_num;
                    this.triggerEvent('cart', '')
                    wx.setStorageSync('data', User);
                }
            });

        },
       
        handleContact(e) {

        }
    },

})