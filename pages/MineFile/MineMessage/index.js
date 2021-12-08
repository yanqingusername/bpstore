
const app = getApp();
const Api = require('../../../utils/api');
import TIM from 'tim-wx-sdk';
let that;
Page({
    data: {
        conversationList: [],
    },
    onLoad(){
        wx.setNavigationBarTitle({ title: '我的消息' });
        that = this
        let tim = app.globalData.tim;
        let sdkReady = wx.getStorageSync("sdkReady");
        if (sdkReady) {
            tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
        } else {
        
        }
    },
    onShow() {
        that = this;
        let tim = app.globalData.tim;
        tim.getConversationList().then(function (resData) {
          var conversationList = []
          resData.data.conversationList.forEach(item => {
            if (item.type == "C2C") {
              conversationList.push(item)
              that.setData({
                conversationList
              })
            }
          })
        });
        tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
        tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
      },
      groupUpdate({
        data: conversationList
      }) {
        var conversation = [];
        conversationList.forEach(msg => {
          if (msg.type == 'C2C') {
            conversation.push(msg);
            that.setData({
              conversationList: conversation
            })
          }
        })
      },
    routerUrl(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
        });
    },
    toConversation(e) {
      var uid = e.currentTarget.dataset.uid;
      wx.navigateTo({
        url: '/pages/im/chat?type=merchant&to=' + uid,
      })
    },
    onUnload() {
        let tim = app.globalData.tim;
        tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
      },
      onHide() {
        let tim = app.globalData.tim;
        tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
      },
    
})