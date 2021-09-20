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
        handleContact(e) {

        }
    },

})