/*
 * @Author: your name
 * @Date: 2021-03-12 10:22:35
 * @LastEditTime: 2021-03-12 14:04:26
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \well_medical_care\utils\api.js
 */
const domain = 'https://www.well-cn.cn'

module.exports = {
  domain: domain,
  version_m: '1.0', 
  App_id: 50001,
  Appkey: '041de238cd92c8cedc9df6552ac65848',
  AppId: 'wx230e2ed19742a8da',
  From: 'MiniPG',
  Version: 'v1.0',
  request_update_tel: `${domain}/request_update_tel`, // 授权手机号
  user_login_wx: `${domain}/user_login_wx`, // 授权用户信息
  user_get_wx_session: `${domain}/user_get_wx_session`, // 换取  openid sessionKey
  
  
}