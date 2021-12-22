// pages/user/chats/list.js
import TIM from 'tim-wx-sdk';
// const WXAPIUser = require('../../wxapi/user');
const app = getApp();
let that;
Page({
  data: {
    conversationList: [],
    sysMesNum: 0, //系统通知
    list2:[],//list2推荐
    delBtnWidth: 110,
  },
  onLoad: function (options) {
    that = this
    let tim = app.globalData.tim;
    let sdkReady = wx.getStorageSync("sdkReady");
    if (sdkReady) {
      //   tim.getConversationList().then(function (resData) {
      //   var conversationList = that.data.conversationList
      //   resData.data.conversationList.forEach(item => {
      //     if (item.type == "C2C") {
      //       conversationList.push(item)
      //       that.setData({
      //         conversationList
      //       })
      //     }
      //   })
      // });
      tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
      // tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, (event) => {
      //   // console.log(event)
      //   var conversationList = that.data.conversationList
      //   event.data.forEach(item => {
      //     if (item.type == "C2C") {
      //       conversationList.push(item)
      //     }
      //     that.setData({
      //       conversationList
      //     })
      //   })
      // })
    } else {
      // tim.on(TIM.EVENT.SDK_READY, function () {
      // tim.getConversationList().then(function (resData) {
      //   console.log(resData,'111111111111111')
      //   var conversationList = that.data.conversationList
      //   resData.data.conversationList.forEach(item => {
      //     if (item.type == "C2C") {
      //       conversationList.push(item)
      //     }
      //     that.setData({
      //       conversationList
      //     })
      //   })

      // });
      // tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
      // tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
      // tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, (event) => {
      //   console.log(event, '222222222222222222222')
      //   var conversationList = that.data.conversationList
      //   event.data.forEach(item => {
      //     if (item.type == "C2C") {
      //       conversationList.push(item)
      //     }
      //     that.setData({
      //       conversationList
      //     })
      //   })
      // })
      // })
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
    // tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
    // tim.on(TIM.EVENT.CONVERSATION_LIST_UPDATED, (event) => {
    //   console.log(event, '33333333333333')
    //   event.data.forEach(item => {
    //       console.log(item)
    //     if (item.type == "C2C") {
    //       var conversationList = that.data.conversationList
    //       console.log(conversationList)
    //       conversationList.push(item)
    //       that.setData({
    //         conversationList
    //       })
    //     }

    //   })
    // })
    this.getSysMesNum()
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
  toConversation(e) {
    var uid = e.currentTarget.dataset.uid;
    var nick = e.currentTarget.dataset.nick;
    
    wx.navigateTo({
      url: '/pages/im/chat?type=merchant&to=' + uid + '&nickname=' + nick
    })
  },
  tomessage() {
    wx.navigateTo({
      url: '/pages/user/msgcenter/msgcenter',
    })
  },
  // getSysMesNum() {
  //   WXAPIUser.getSysMesNum({}).then(function (res) {
  //     console.log(res)
  //     if (res.code != 1) {
  //       return;
  //     }
  //     that.setData({
  //       sysMesNum: parseInt(res.data.sysMesNum)
  //     })
  //   })

  // },
  onUnload() {
    let tim = app.globalData.tim;
    tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
  },
  onHide() {
    let tim = app.globalData.tim;
    tim.off(TIM.EVENT.CONVERSATION_LIST_UPDATED, that.groupUpdate);
  },
  // position 为关闭时点击的位置
    // instance 为对应的 SwipeCell 实例
    // beforeClose({ position, instance }) {
    //   switch (position) {
    //     case 'left':
    //     case 'cell':
    //     case 'outside':
    //       instance.close();
    //       break;
    //     case 'right':
    //       Dialog.confirm({
    //         message: '确定删除吗？'
    //       }).then(() => {
    //         instance.close();
    //       });
    //       break;
    //   }
    // },
    drawStart: function (e) {
      var touch = e.touches[0]
      for (var index in that.data.conversationList) {
        var item = that.data.conversationList[index]
        item.right = 0
      }
      that.setData({
        conversationList: that.data.conversationList,
        startX: touch.clientX,
      })
      console.log(that.data.conversationList)
  
    },
    drawMove: function (e) {
      console.log(e)
      var touch = e.touches[0];
      let item = that.data.conversationList[e.currentTarget.dataset.index]
      var disX = that.data.startX - touch.clientX;
      if (disX >= 20) {
        if (disX > that.data.delBtnWidth) {
          disX = that.data.delBtnWidth
        }
        console.log(item)
        item.right = disX
        that.setData({
          conversationList: that.data.conversationList
        })
      } else {
        console.log(item.right)
        item.right = 0
        that.setData({
          conversationList: that.data.conversationList
        })
      }
    },
    drawEnd: function (e) {
      let item = that.data.conversationList[e.currentTarget.dataset.index]
      if (item.right >= that.data.delBtnWidth / 2) {
        item.right = that.data.delBtnWidth
        that.setData({
          conversationList: that.data.conversationList,
        })
      } else {
        item.right = 0
        that.setData({
          conversationList: that.data.conversationList,
        })
      }
    },
      // 删除信息
      listdel: function(e) {
        let that = this;
        var conversationID = e.currentTarget.dataset.uid;
        let tim = app.globalData.tim;
        let promise = tim.deleteConversation(conversationID);
        promise.then(function(imResponse) {
          //删除成功。
          const { conversationID } = imResponse.data;// 被删除的会话 ID
          var screenArr = that.data.conversationList.filter((item) => {
            return !conversationID.includes(item.conversationID)
          });
          that.setData({
            conversationList: screenArr
          })
          
        }).catch(function(imError) {
          console.warn('deleteConversation error:', imError); // 删除会话失败的相关信息
        });
      },
})