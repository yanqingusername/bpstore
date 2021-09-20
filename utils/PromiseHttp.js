const Utils = require('./util.js');
const Api = require('./api.js');
const app = getApp();

/**
 *  物业模块接口请求
 * @param {} params 
 */
const PromiseHttp = (params) => {
    if (params.isLoading) {
        wx.showLoading({
            title: '加载中...',
            mask: true,
            success: (result) => {
                wx.hideLoading();
            },
            fail: () => { wx.hideLoading(); },
            complete: () => { wx.hideLoading(); }
        });
    }

    return new Promise((resolve, reject) => {
        wx.request({
            url: params.url,
            data: Utils.DATA_md5(params.data),
            header: { 'content-type': 'application/json' },
            method: 'POST',
            dataType: 'json',
            responseType: 'text',
            success: function (res) {
                wx.hideLoading();
                if (res.data.code === 1000) {
                    resolve(res.data);
                } else if (res.data.code == 9001) {
                    resolve(res.data);
                } else if (res.data.code == 9002) {
                    resolve(res.data);
                } else if (res.data.code == 9003) {
                    resolve(res.data);
                } else if (res.data.code == 9004) {
                    resolve(res.data);
                } else if (res.data.code == 10019) {
                    resolve(res.data);
                } else if (res.data.code == 5001) {
                    resolve(res.data);
                } else if (res.data.code === 90008) {
                    app.goLogin();
                } else if (res.data.code == 90011) {
                } else {
                    Utils.showToast(res.data.message);
                    reject(res.data.message);
                }
            },
            fail: function (res) {
                wx.hideLoading();
            },
            complete: () => {
                wx.hideLoading();
            }
        });
    });
}





export {
    PromiseHttp
}