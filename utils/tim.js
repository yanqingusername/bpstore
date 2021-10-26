/*
 */
import TIM from 'tim-wx-sdk';
import COS from 'cos-wx-sdk-v5';
const WXAPI = require('./api.js');


function createTim(app, userid) {
	console.log(userid)
	const tim = TIM.create({

		//测试sdk
		// SDKAppID: 1400328950
		//正式sdk
		SDKAppID: 1400330666
	})
	tim.registerPlugin({
		'cos-wx-sdk': COS
	});
	tim.on(TIM.EVENT.SDK_READY, onSDKReady)
	tim.setLogLevel(4);
	tim.on(TIM.EVENT.SDK_NOT_READY, onSDKNotReady, this);

	tim.on(TIM.EVENT.KICKED_OUT, kickOut, this)
	// 出错统一处理
	// tim.on(TIM.EVENT.ERROR, onError, this)
	app.globalData.tim = tim;
	console.log(app.globalData, 'HHHHHHHHHHHHHHHHHHHHHH')
	loginIM(app, userid).then(function() {
		console.log("logined");
		wx.setStorageSync("offline", false);
	})

}

function loginIM(app, userid) {
	const data = {
		identifier: userid
	};
	let tim = app.globalData.tim;
	let promise = WXAPI.request('/imps/getUserSig', "post", data);
	return promise.then(res => {
		console.log("logining");
		console.log(res)
		return tim.login({
			userID: userid+'',
			userSig: res.data
		});
	}, console.log("error in login"));
}

function imWrapper(app, userid) {
	let offline = wx.getStorageSync("offline");
	if (offline) {
		return loginIM(app, userid);
	} else {
		return new Promise(function(resolve, reject) {
			return resolve({});
		});
	}
}

function kickOut(e) {
	console.log("被踢下线");
	wx.setStorageSync("offline", true);
}

function onSDKReady(event) {
	wx.setStorageSync("sdkReady", true);
}

function onSDKNotReady() {
	wx.setStorageSync("sdkReady", false);
}

function timLogout() {
	tim.logout();
}
module.exports = {
	createTim,
	imWrapper
}
