/*
 * @Author: your name
 * @Date: 2021-03-12 10:22:33
 * @LastEditTime: 2021-03-12 16:43:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \well_medical_care\components\Other\index.js
 */
const app = getApp()
const Api = require('../../utils/api')
const Utils = require('../../utils/util')

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        showPopup: {
            type: Boolean
        },
        item: { //----展示参数
            type: Object
        },
        types: { //---- 
            type: Number
        },
    },
    /**
     * 页面的初始数据
     */
    data: {
        
    },

    lifetimes: {
        attached() { // 在组件实例进入页面节点树时执行
            wx.setNavigationBarTitle({
                title: 'BP数字产业平台'
            });
        },
        moved() {

        },
        detached() {
            // 在组件实例被从页面节点树移除时执行
        },
    },
    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show: function () {
           
        },
        hide: function () { },
        resize: function () { },
    },
    methods: {
        onPull() {
          
        },
        homeLoad() {
           
        },
    }


})