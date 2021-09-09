function systemInfo() {
	var systemInfoType = ''
	wx.getSystemInfo({
        success(res) {
          if (res.platform == "ios") {
            //ios平台
			systemInfoType = 'ios'
          } else if (res.platform == "android") {
            //android平台
	
			systemInfoType = 'android'
          } else if (res.platform == "devtools") {
            //开发工具
		
			systemInfoType = ''
          }
        },
        fail(res) {}
    })
	return systemInfoType
}

module.exports = {
	systemInfo: systemInfo,
}