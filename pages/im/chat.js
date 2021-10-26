// pages/im/chat.js
import {
  emojiName,
  emojiMap,
  emojiUrl
} from './emoji';
import TIM from 'tim-wx-sdk';
const app = getApp();
let that;
const recordOptions = {
  duration: 60000,
  sampleRate: 44100,
  numberOfChannels: 1,
  encodeBitRate: 192000,
  format: 'mp3' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
}
const innerAudioContext = wx.createInnerAudioContext()
const recorderManager = wx.getRecorderManager()
Page({
  data: {
    messageContent: '', //文本内容
    isEmojiOpen: false, //表情

    conversation: {},
    messageKey: '',
    lastMsgTime: '',

    messageList: [],
    emojiName: emojiName,
    emojiMap: emojiMap,
    emojiUrl: emojiUrl,
    height: 0,
    sysInfo: {},
    safeBottom: 34,
    faceUrl: 'https://webim-1252463788.file.myqcloud.com/assets/face-elem/',
    emojiShow: true,
    bigEmojiShow: false,
    bigEmoji: ['tt01', 'tt02', 'tt03', 'tt04', 'tt05', 'tt06', 'tt07', 'tt08', 'tt09', 'tt10', 'tt11', 'tt12', 'tt13', 'tt14', 'tt15', 'tt16'],
    currentTime: 0,
    currentTimeID: '',

    toUserID: 0,
    toUserAvatar: '',
    userAvatar: '',
    tim: null,


    scroll_height: wx.getSystemInfoSync().windowHeight - 54,
    toView: '',
    nextReqMessageID: 0,
    isCompleted: false,
    recorderManager: null,
    canSend: false,
    isRecord: false,
    isTyping: false,
    audioNodeID: '',
    //语音
    sendLock: true,
    isRecording: false,
    startPoint: 0
  },
  groupUpdate({
    data: messageList
  }) {
    console.log(messageList, 'WWWWWWWWWWWW')
    messageList.forEach(msg => {
			if (msg.conversationType=='C2C' && msg.payload.text &&!msg.isSystemMessage) {
				var messageList = that.data.messageList;
				messageList.push(msg);
				that.setData({
					messageList
				}, function () {
          that.scrollTo(messageList.length - 1);
        })
			}
		})
      tim.setMessageRead({
        conversationID: convID
      });
  },
  onShow() {
    let tim = app.globalData.tim;
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, that.groupUpdate);
  },
  onUnload() {
    let tim = app.globalData.tim;
    tim.off(TIM.EVENT.MESSAGE_RECEIVED, that.groupUpdate);
  },
  onHide() {
    let tim = app.globalData.tim;
    tim.off(TIM.EVENT.MESSAGE_RECEIVED, that.groupUpdate);
  },
  onLoad: function(options) {
    that = this;
    let toUserID = options.to;
    // if(toUserID.indexOf('merchant') < 0 && toUserID.indexOf('buyers') < 0){
    //     toUserID = options.type=='merchant' ? ('merchant' + toUserID) : ('buyers' +  toUserID);
    // }
    let tim = app.globalData.tim;
    that.setData({
      tim,
      toUserID: toUserID
    });
    var convID = "C2C" + toUserID;
    var userid = wx.getStorageSync("userid");
    var userInfo = wx.getStorageSync("userInfo");
    that.setData({
      userAvatar: userInfo.avatarUrl
    });
    console.log(toUserID,convID);

    /*let promise2 = tim.getUserProfile({
      userIDList: ['buyers32849', 'merchant32849'] // 请注意：即使只拉取一个用户的资料，也需要用数组类型，例如：userIDList: 
    });
    promise2.then(function(imResponse) {
      console.log(imResponse.data); // 存储用户资料的数组 - [Profile]
    }).catch(function(imError) {
      console.warn('getUserProfile error:', imError); // 获取其他用户资料失败的相关信息
    });*/

    let promise = tim.getConversationProfile(convID); //会话列表的接口,默认保存7天
    promise.then(function(imResponse) {
      console.log(imResponse.data.conversation.userProfile)
      that.setData({
        toUserAvatar: imResponse.data.conversation.userProfile.avatar
      })
      wx.setNavigationBarTitle({
        title: imResponse.data.conversation.userProfile.nick
      })
    }).catch(function(imError) {
      console.warn('getConversationProfile error:', imError);
    });

    tim.getMessageList({
      conversationID: convID,
      count: 10
    }).then(imResponse => { //拉取历史消息
      let messageList = imResponse.data.messageList;
      let nextReqMessageID = imResponse.data.nextReqMessageID;
      let isCompleted = imResponse.data.isCompleted;
      that.setData({
        messageList,
        nextReqMessageID,
        isCompleted
      }, function() {
        that.scrollTo(messageList.length - 1);
      })
    });
    tim.setMessageRead({
      conversationID: convID
    }).then(console.log);

    recorderManager.onStop(function(res) {
      if (that.data.sendLock) return;
      if (res.duration < 1000) {
        that.getToast('录音时间太短', 1500);
        return;
      }
      var message = tim.createAudioMessage({
        to: toUserID + '',
        conversationType: TIM.TYPES.CONV_C2C,
        payload: {
          file: res
        },
        onProgress: function(event) {
          that.getToast('正在发送', 1500);
        }
      });
      tim.sendMessage(message).then(function() {
        let messageList = that.data.messageList;
        messageList.push(message);
        that.setData({
          messageList
        }, function() {
          wx.hideLoading();
          that.scrollTo(messageList.length - 1);
        });
      });
    })
    that.setData({      
      scroll_height:  wx.getSystemInfoSync().windowHeight  -  54    
    });
  },

  onMessageContent(e) {
    var content = e.detail.value;
    that.setData({
      messageContent: content,
      isTyping: content.length > 0
    });
  },
  send() { //发送文本
    var tim = that.data.tim;
    let message = tim.createTextMessage({
      to: that.data.toUserID + '',
      conversationType: TIM.TYPES.CONV_C2C,
      payload: {
        text: that.data.messageContent
      }
    });
    that.setData({
      isEmojiOpen: false
    });
    console.log(message)
    tim.sendMessage(message).then(() => {
      var messageList = that.data.messageList;
      messageList.push(message);
      that.setData({
        messageContent: '',
        messageList,
        isTyping: false
      }, function() {
        that.scrollTo(messageList.length - 1);
      });
    })
  },
  sendImg() { //发送图片
    // var tim = that.data.tim;
    let tim = app.globalData.tim;

    wx.chooseImage({
      sourceType: ['album'],
      count: 1,
      success: function(res) {
        let message = tim.createImageMessage({
          to: that.data.toUserID + '',
          conversationType: TIM.TYPES.CONV_C2C,
          payload: {
            file: res
          },
          onProgress: function(event) {
            that.getToast('正在发送', 1500);
          }
        });
        let promise = tim.sendMessage(message);
        promise.then(function(imResponse) {
          var messageList = that.data.messageList;
          messageList.push(message);
          that.setData({
            messageList,
            isTyping: false
          });
          that.scrollTo(messageList.length - 1);
          // wx.hideToast();
        }).catch(function(imError) {
          console.log('sendMessage error:', imError);
        });
      },
      fail: function(e) {
        console.log(e);
      }
    })
  },
  chooseEmoji(e) { //选择表情
    var item = e.currentTarget.dataset.name;
    that.setData({
      messageContent: that.data.messageContent + item,
      isTyping: true
    });
  },
  toggleEmoji() { //切换表情
    that.setData({
      isEmojiOpen: !that.data.isEmojiOpen
    });
  },
  toggleVoice() { //切换语音
    that.setData({
      isRecord: !that.data.isRecord
    });
  },
  /*********************************************语音***************************************************/
  startRecording(e) { //开始录音
    //longpress时触发
    that.setData({
      startPoint: e.touches[0],
      sendLock: false,
      isRecording: true
    })
    recorderManager.start(recordOptions);
    that.getToast('正在录音，上划取消发送', 6000)
  },
  handleRecordStop() {
    wx.hideToast(); //结束录音、隐藏Toast提示框
    recorderManager.stop(); //结束录音
    that.setData({
      startPoint: 0,
      isRecording: false
    })
  },
  handleTouchMove(e) {
    var moveLenght = e.touches[e.touches.length - 1].clientY - that.data.startPoint.clientY; //移动距离
    if (Math.abs(moveLenght) > 50) {
      that.getToast('松开手指,取消发送', 6000)
      that.setData({
        sendLock: true
      })
    } else {
      that.getToast('正在录音，上划取消发送', 6000)
      that.setData({
        sendLock: false
      })
    }
  },
  getStartRecording(e) {
    that.setData({
      isRecording: true,
      startPoint: e.touches[0],
      canSend: true
    });
    that.startRecording()
    wx.showToast({
      title: '正在录音',
      duration: 60000
    })
  },
  handleRecordStart() {
    wx.getSetting({
      success: (res) => {
        let auth = res.authSetting['scope.record']
        if (auth === false) { // 已申请过授权，但是用户拒绝
          wx.openSetting({
            success: function(res) {
              let auth = res.authSetting['scope.record'];
              that.getToast(auth ? '授权成功' : '授权失败', 1500);
            }
          })
        } else if (auth === true) { // 用户已经同意授权
          if (that.data.isRecording) {
            that.startRecording();
          }
        } else { // 第一次进来，未发起授权
          wx.authorize({
            scope: 'scope.record',
            success: () => {
              that.getToast('授权成功', 1500);
            }
          })
        }
      },
      fail: function() {
        that.getToast('授权失败', 1500);
      }
    })
  },
  showLoading(title, duration) {
    wx.showLoading({
      title: title,
    })
    setTimeout(function() {
      wx.hideLoading()
    }, duration)
  },

  handleTouchEnd() {
    wx.hideToast()
    recorderManager.stop()
  },
  play(e) {
    innerAudioContext.stop()
    var src = e.currentTarget.dataset.src;
    var id = e.currentTarget.dataset.id;
    console.log(src);
    innerAudioContext.autoplay = true
    innerAudioContext.src = src;
    innerAudioContext.onStop(() => {
      that.setData({
        audioNodeID: ''
      });
    })
    innerAudioContext.onEnded(() => {
      that.setData({
        audioNodeID: ''
      });
    })
    innerAudioContext.onPlay(() => {
      that.setData({
        audioNodeID: id
      });
    })
    innerAudioContext.play();
  },
  scrollTo(id) {
    console.log(id)
    that.setData({
      toView: 'row_' + id
    })
  },
  getToast(title, duration) {
    wx.showToast({
      title: title,
      duration: duration,
      icon: "none"
    })
  },
  getMore() {
    if (that.data.isCompleted) return;
    console.log("getting more")
    var tim = that.data.tim;
    let promise = tim.getMessageList({
      conversationID: 'C2C' + that.data.toUserID,
      count: 15,
      nextReqMessageID: that.data.nextReqMessageID
    });
    promise.then(function(imResponse) {
      var messageList = imResponse.data.messageList;
      const nextReqMessageID = imResponse.data.nextReqMessageID;
      const isCompleted = imResponse.data.isCompleted;
      messageList = messageList.concat(that.data.messageList);
      that.setData({
        messageList,
        nextReqMessageID,
        isCompleted
      }, function() {
        that.scrollTo(0)
      })
    });
  },
  previewImg: function(e) {
    var imgUrl = e.currentTarget.dataset.src;
    wx.previewImage({
      current: imgUrl,
      urls: [imgUrl]
    })
  }
})