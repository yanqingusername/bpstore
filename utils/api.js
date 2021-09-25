

const imageUrl = 'https://bpimg.jianlet.com/images/'  //图片域名

const API_BASE_URL = 'https://bp.jianlet.com'; //小程序域名
const app = getApp();
const request = (url, method, data) => {
	let _url = API_BASE_URL + url;
	var userid = wx.getStorageSync("userid");
	var token = wx.getStorageSync("token");
	
	if (url != "/wxpub/wxlogin" && userid) {
		data.userid = data.userid || userid;
		data.token = data.token || token;
	}
	return new Promise((resolve, reject) => {
		wx.request({
			url: _url,
			method: method,
			data: data,
			header: {
				"Content-Type": "application/x-www-form-urlencoded"
			},
			success(request) {
				// if (request && request.data.code == 3) {
				// 	setTimeout(function() {
				// 		wx.navigateTo({
				// 			url: "/pages/authorize/index"
				// 		})
				// 	}, 300)
				// 	return new Promise((resolve, reject) => {})
				// }
				resolve(request.data);
			},
			fail(error) {
				reject(error);
			},
			complete(aaa) {
				// 加载完成
			}
		});
	});
}
/******************图片，视频的上传************** */
const uploadImg = imgUrl => {
	return new Promise((resolve, reject) => {
		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			sourceType: ["album", "camera"],
			success: res => {
				console.log(res)
				const tempFilePaths = res.tempFilePaths;
				wx.showLoading({
					title: "上传中",
					mask: true
				});
				console.log(tempFilePaths.length)
				var imgslen = tempFilePaths.length
				wx.uploadFile({
					url: API_BASE_URL + (imgUrl || "/upload/uploadGoodsImg"), // 仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: "file",
					formData: {
						userid: wx.getStorageSync("userid"),
						token: wx.getStorageSync("token")
					},
					success(resData) {
						wx.hideLoading();
						console.log(resData)
						resolve(resData);
					},
					fail(error) {
						console.log(12);
						wx.hideLoading();
						reject(error);
					}
				});
			}
		});
	});
};
/**************************** 上传头像*****************************/
const uploadAvatarImg = imgUrl => {
	return new Promise((resolve, reject) => {
		wx.chooseImage({
			count: 1,
			sizeType: ["original", "compressed"],
			sourceType: ["album", "camera"],
			success: res => {
				const tempFilePaths = res.tempFilePaths;
				wx.showLoading({
					title: "上传中"
				});
				console.log(res);
				wx.uploadFile({
					url: API_BASE_URL + imgUrl, // 仅为示例，非真实的接口地址
					filePath: tempFilePaths[0],
					name: "file",
					formData: {
						userid: wx.getStorageSync("userid"),
						token: wx.getStorageSync("token")
					},
					success(resData) {
						console.log(resData);
						wx.hideLoading();
						resolve(resData);
					},
					fail(error) {
						wx.hideLoading();
						reject(error);
					}
				});
			}
		});
	});
};
/******************图片，视频的上传************** */
const uploadVideo = (url) => {
	return new Promise((resolve, reject) => {
		wx.chooseVideo({
			sourceType: ["album", "camera"],
			compressed: true,
			maxDuration: 60,
			camera: "back",

			success: res => {
				const tempFilePath = res.tempFilePath;
				console.log(tempFilePath)
				console.log(res)
				if (res.duration > 120) {
					toast('时长超过两分钟')
					return
				}
				wx.showLoading({
					title: "上传中",
				});
				wx.uploadFile({
					url: API_BASE_URL + "/upload/" + url + "", // 仅为示例，非真实的接口地址
					filePath: tempFilePath,
					name: "file",
					formData: {
						userid: wx.getStorageSync("userid"),
						token: wx.getStorageSync("token"),
					},
					success(resData) {
						wx.hideLoading();
						console.log(resData)
						resolve(resData.data);
					},
					fail(error) {
						wx.hideLoading();
						reject(error);
					}
				});
			}
		});
	});
};
module.exports = {

	API_BASE_URL,
	uploadImg,
	uploadAvatarImg,
	uploadVideo,
	request,
	loginStore: data => { //登录
		return request("/wxpub/wxlogin", "post", data);
	},
	loginSilence: data => { //静默登录
		return request("/wxpub/loginSilence", "post", data);
	},
	getUserInfo: data => { //用户信息
		return request("/user/getUserInfo", "post", data);
	},
	getUserStatistics: data => { //主页信息（收藏，点赞等）
		return request("/user/getUserStatistics", "post", data);
	},
	getUserAuthStatistics: data => { //主页认证状态
		return request("/user/getUserAuthStatistics", "post", data);
	},
	getUserCollectionList: data => { //收藏列表
		return request("/user/getUserCollectionList", "post", data);
	},
	getUserFollowList: data => { //关注列表
		return request("/user/getUserFollowList", "post", data);
	},
	getUserFansList: data => { //粉丝列表
		return request("/user/getUserFansList", "post", data);
	},
	
	/* 首页 */
	getExpertRecommend: data => { // 达人推荐
		return request("/home/getRecCelebrityList", "post", data)
	}
};
