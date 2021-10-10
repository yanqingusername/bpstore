

const imageUrl = 'https://bpimg.jianlet.com/images/'  //图片域名

const API_BASE_URL = 'https://bp.jianlet.com'; //小程序域名
const app = getApp();
const request = (url, method, data = {}) => {
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
				// if (res.duration > 120) {
				// 	wx.showToast({
				// 		title: '时长超过两分钟'
				// 	})
				// 	return
				// }
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
	getFabulousCaseList: data => { //点赞列表
		return request("/user/getFabulousCaseList", "post", data);
	},
	

	
	
	/* 首页 */
	getExpertRecommend: data => { // 达人推荐
		return request("/home/getRecCelebrityList", "post", data)
	},
	getBannerList: data => {  // banner
		return request("/home/getBannerList", "post", data)
	},
	getNewActivityList: data => { // 最新活动
		return request("/home/getNewActivityList", "post", data)
	},
	getCelebrityList: data => { // 行业达人
		return request("/home/getCelebrityList", "post", data)
	},
	getClassicCaseList: data => { // 经典案例
		return request("/home/getClassicCaseList", "post", data)
	},
	getCityList: data => {  // 城市列表
		return request("/attached/getCityList", "post", data)
	},
	getAreaList: data => {  // 区域列表
		return request("/attached/getCompanyRegionList", "post", data)
	},
	getCaseTradeList: data => {
		return request("/attached/getCaseTradeList", "post", data)
	},

	addCelebrityInfo: data => { //达人认证
		return request("/celebrity/addCelebrityInfo", "post", data);
	},
	getCelebrityLabelList: data => { //达人标签列表
		return request("/attached/getCelebrityLabelList", "post", data);
	},
	getCelebrityTradeList: data => { //达人行业列表
		return request("/attached/getCelebrityTradeList", "post", data);
	},
	getCelebrityCityList: data => { //达人城市列表
		return request("/attached/getCityList", "post", data);
	},
	getMyCelebrityInfo: data => { //达人信息(自己)
		return request("/celebrity/getMyCelebrityInfo", "post", data);
	},
	upUserNickName: data => { //修改昵称
		return request("/user/upUserNickName", "post", data);
	},




	addCompanyInfo: data => { //公司单位认证
		return request("/company/addCompanyInfo", "post", data);
	},
	getCompanyNatureList: data => { //公司性质列表
		return request("/attached/getCompanyNatureList", "post", data);
	},
	upLogo: data => { //上传logo
		return request("/upload/upLogo", "post", data);
	},
	getCompanyTradeList: data => { //公司面向行业列表
		return request("/attached/getCompanyTradeList", "post", data);
	},
	getCompanyTechnologyList: data => { //公司技术类型列表
		return request("/attached/getCompanyTechnologyList", "post", data);
	},
	getCompanyLabelList: data => { //公司标签列表
		return request("/attached/getCompanyLabelList", "post", data);
	},
	getCompanyTurnoverList: data => { //公司营业额列表
		return request("/attached/getCompanyTurnoverList", "post", data);
	},
	getCompanyMarketList: data => { //公司市值金额列表
		return request("/attached/getCompanyMarketList", "post", data);
	},
	getCompanyValuationList: data => { //公司估值额度列表
		return request("/attached/getCompanyValuationList", "post", data);
	},
	getCompanyFinancingList: data => { //公司融资金额列表
		return request("/attached/getCompanyFinancingList", "post", data);
	},
	getCompanyRegionList: data => { //区域列表
		return request("/attached/getCompanyRegionList", "post", data);
	},
	getMyCompanyInfo: data => { //单位信息(自己)
		return request("/company/getMyCompanyInfo", "post", data);
	},
	getMyCaseList: data => { //我发布的案例列表  title  
		return request("/case/getMyCaseList", "post", data);
	},
	delMyCase: data => { //删除案例  id  
		return request("/case/delMyCase", "post", data);
	},

	

	/**
	 * 以下接口都未调试
	 * @param {*} data 
	 * @returns 
	 */
	getCelebrityInfo: data => { //达人信息 ouserid 达人userid
		return request("/celebrity/getCelebrityInfo", "post", data);
	},
	collectionCase: data => { //收藏案例 cid 案例的id
		return request("/user/collectionCase", "post", data);
	},
	upCollectionCase: data => { //取消收藏（可多选） ids  收藏的id，多个逗号隔开
		return request("/user/upCollectionCase", "post", data);
	},
	upUserFollow: data => { //关注—取消关注 fuserid 关注userid  type 1公司单位，2达人
		return request("/user/upUserFollow", "post", data);
	},
	getCompanyInfo: data => { //单位信息 ouserid 单位userid
		return request("/company/getCompanyInfo", "post", data);
	},
	
	
	
};
