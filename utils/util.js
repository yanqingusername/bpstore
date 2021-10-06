const formatTime = (dates,qu)=> {
  let date = new Date(dates*1000);
  const year = date.getFullYear()
  const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) :"0"+(date.getMonth() + 1)
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if(qu=="qu")return [year, month, day].map(formatNumber).join('/');
  else if ( qu=='xxx' ) return year + ',' + month + ',' + day
  else if (qu == "yueri") return month + "月" + day+"日";
  else return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const mg_formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  if (month == new Date().getMonth() + 1) {
    return {
      month_name: '本月',
      month_num: [year, month].map(formatNumber).join('-'),
      month: new Date().getMonth() + 1
    }
  }
}

const dayTime = (mss)=>{
  var days = parseInt(mss / (1000 * 60 * 60 * 24));
  var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = (mss % (1000 * 60)) / 1000;
  return days
}

// 获取 hour : minutes : second 格式的时间差
const time_difference = (mss) => {
  var hours = parseInt( mss / (1000 * 60 * 60  ));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = parseInt((mss % (1000 * 60)) / 1000);

  hours = hours / 10 < 1 ? '0' + hours : hours;
  minutes = minutes / 10 < 1 ? '0' + minutes : minutes;
  seconds = seconds / 10 < 1 ? '0' + seconds : seconds;
  // console.log(hours, minutes, seconds )
  return hours + ':' + minutes + ':' + seconds
}



//  版本号  对比
const edition = (curV, reqV)=>{
 // 当前版本号：curV；比较版本号：reqV
  if (curV && reqV) {
    //将两个版本号拆成数字
    var arr1 = curV.split('.'),
      arr2 = reqV.split('.');
    var minLength = Math.min(arr1.length, arr2.length),
      position = 0,
      diff = 0;
    //依次比较版本号每一位大小，当对比得出结果后跳出循环
    while (position < minLength && ((diff = parseInt(arr1[position]) - parseInt(arr2[position])) == 0)) {
      position++;
    }
    diff = (diff != 0) ? diff : (arr1.length - arr2.length);
    //若curV大于reqV，则返回true
    return diff > 0;
  } else {
    //输入为空
    console.log("版本号不能为空");
    return false;
  }
}

// 计算百分比
const GetPercent=(num, total) =>{
  num = parseFloat(num);
  total = parseFloat(total);
  if (isNaN(num) || isNaN(total)) {
    return "-";
  }
  return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00 + "%");
}

//乘法结果。 
function accMul(arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try { m += s1.split(".")[1].length;} catch (e) { }
  try { m += s2.split(".")[1].length;} catch (e) { }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}


const monthTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${month}月${day}日`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const PreView = (list = [], index) => {
  wx.previewImage({
    current: index || list[0],
    urls: list
  });
}
// ( 随机数 )
const RandomWord = (randomFlag, min, max) => {
  var str = "",
    range = min,
    arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
// ( 公共参数 Parameter : 需要加密的参数 AddParameter:不需要加密的参数)
const DATA_md5 = (Parameter = {}, AddParameter) => {
  const value = wx.getStorageSync('data')
  const agentId = wx.getStorageSync('agent_id') || 2;
  const DATA = {
    user_tokey: value ? value.user_tokey : '',
    from: Api.From,
    app_id: Api.App_id,
    timestamp: Date.parse(new Date()),
    version: Api.Version,
    nonce_str: RandomWord(true, 16, 16),
    agent_id: agentId
  }
  const P = Object.assign(DATA, Parameter);

//   var propNames = Object.getOwnPropertyNames(P);
//   for (var i = 0; i < propNames.length; i++) {
//     var propName = propNames[i];
//     if (P[propName] == null || P[propName] == undefined || P[propName] == '') {
//       P[propName] = "";
//     }
//   }
  
  const SIGN = SetPass(P)
  P.sign = SIGN
  return Object.assign(P, AddParameter)
}

// ( 参数 md 5 加密 )
const SetPass = data => {
  var newkey = Object.keys(data).sort()
  var newObj = ''
  for (var i = 0; i < newkey.length; i++) {
    newObj += `${newkey[i]}=${data[newkey[i]]}&`
  }
  var newData = hex_md5(newObj.substring(0, newObj.length - 1) + `&key=${Api.Appkey}`).toUpperCase()
  return newData
}

const showToast = (data)=>{
  wx.showToast({
    title: data,
    icon: "none",
    duration: 2000
  })
}

/**
 * 获取机型  适配
 */
const isPhoneBool = () =>{
    // 获取机型
    let phoneBool = false;
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1 || modelmes.search('iPhone XR') != -1 || modelmes.search('iPhone XS') != -1) {
            phoneBool = true;
        }
      }
    });
    return phoneBool;
}

// 页面渲染完成后 调用
const down = (totalSecond,type)=> {
  // let totalSecond = time - Date.parse(new Date())/1000;
    // 秒数
    let second = totalSecond;

    // 天数位
    let day = Math.floor(second / 3600 / 24);
    let dayStr = day.toString();
    // if (dayStr.length == 1) dayStr = '0' + dayStr;
    // 小时位
    let hr = Math.floor((second - day * 3600 * 24) / 3600);
    let hrStr;
    // if (day > 0) hrStr =(day * 24 + hr).toString();
    // else  hrStr = hr.toString();
      hrStr = hr.toString();
    if (hrStr.length == 1) hrStr = '0' + hrStr;

    // 分钟位
    let min = Math.floor((second - day * 3600 *24 - hr * 3600) / 60);
    let minStr = min.toString();
    if (minStr.length == 1) minStr = '0' + minStr;

    // 秒位
    var sec = second - day * 3600 * 24 - hr * 3600 - min*60;
    var secStr = sec.toString();
    if (secStr.length == 1) secStr = '0' + secStr;

  if (type == "shi") hrStr = hr + (day*24);

    let obj = { dayStr, hrStr, minStr, secStr, totalSecond }
    return obj;

}
const unique = (arr) => {
  let unique = {};
  arr.forEach(function(item){
    unique[JSON.stringify(item)]=item;//键名不会重复
  })
  arr = Object.keys(unique).map(function(u){ 
  //Object.keys()返回对象的所有键值组成的数组，map方法是一个遍历方法，返回遍历结果组成的数组.将unique对象的键名还原成对象数组
    return JSON.parse(u);
  })
  return arr;
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month].map(formatNumber).join('-') 
  // + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatDateYear = year => {
  let a = year.substring(0,4)
  let b = Math.floor(a)
  return b
}

const formatDateNumber = month => {
  let a = month.substring(5,7)
  let b = Math.floor(a)
  return b
}

const formatDateString = date => {
  let stringDate = date.substring(0,7)
  return stringDate
}

 /*
  handle:函数
  wait:规定在1.5秒钟内只能执行一次
 */
const throttle = (fn, gapTime) =>{
  if (gapTime == null || gapTime == undefined) {
      gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
      let _nowTime = + new Date()
      if (_nowTime - _lastTime > gapTime || !_lastTime) {
          fn.apply(this, arguments)   //将this和参数传给原函数
          _lastTime = _nowTime
      }
  }
}
/**
 * 中文、英文、数字包括下划线 正则
 */
const regular =(val)=>{
  let excet =/^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
  return excet.exec(val)
}

/**
 * 获取后三天
 */
const getDateStr = (today, addDayCount) => {
    var date;
    if(today) {
      date = new Date(today);
    }else{
      date = new Date();
    }
    date.setDate(date.getDate() + addDayCount);//获取AddDayCount天后的日期 
    var y = date.getFullYear();
    var m = date.getMonth() + 1;//获取当前月份的日期 
    var d = date.getDate();
    if(m < 10){
        m = '0' + m;
    };
    if(d < 10) {
        d = '0' + d;
    };
    console.log( y + "-" + m + "-" + d)
    return y + "-" + m + "-" + d;
}


// ( 方法返回 )
module.exports = {
  formatTime: formatTime,
  DATA_md5: DATA_md5,
  monthTime : monthTime,
  GetPercent,
  dayTime,
  time_difference,
  showToast,
  down,
  PreView,
  unique,
  formatDate: formatDate,
  formatDateNumber: formatDateNumber,
  formatDateString: formatDateString,
  throttle: throttle,
  mg_formatTime: mg_formatTime,
  formatDateYear: formatDateYear,
  edition,
  accMul,
  regular,
  isPhoneBool,
  getDateStr
}

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */

/*
 * Configurable variables. You may need to tweak these to be compatible with
 * the server-side, but the defaults work in most cases.
 */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */

/*
 * These are the functions you'll usually want to call
 * They take string arguments and return either hex or base-64 encoded strings
 */
function hex_md5(s) {
  return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}

function b64_md5(s) {
  return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}

function any_md5(s, e) {
  return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}

function hex_hmac_md5(k, d) {
  return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}

function b64_hmac_md5(k, d) {
  return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}

function any_hmac_md5(k, d, e) {
  return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
 * Perform a simple self-test to see if the VM is working
 */
function md5_vm_test() {
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
 * Calculate the MD5 of a raw string
 */
function rstr_md5(s) {
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
 * Calculate the HMAC-MD5, of a key and some data (raw strings)
 */
function rstr_hmac_md5(key, data) {
  var bkey = rstr2binl(key);
  if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16),
    opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
 * Convert a raw string to a hex string
 */
function rstr2hex(input) {
  try {
    hexcase
  } catch (e) {
    hexcase = 0;
  }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for (var i = 0; i < input.length; i++) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt((x >>> 4) & 0x0F) +
      hex_tab.charAt(x & 0x0F);
  }
  return output;
}

/*
 * Convert a raw string to a base-64 string
 */
function rstr2b64(input) {
  try {
    b64pad
  } catch (e) {
    b64pad = '';
  }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for (var i = 0; i < len; i += 3) {
    var triplet = (input.charCodeAt(i) << 16) |
      (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) |
      (i + 2 < len ? input.charCodeAt(i + 2) : 0);
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > input.length * 8) output += b64pad;
      else output += tab.charAt((triplet >>> 6 * (3 - j)) & 0x3F);
    }
  }
  return output;
}

/*
 * Convert a raw string to an arbitrary string encoding
 */
function rstr2any(input, encoding) {
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for (i = 0; i < dividend.length; i++) {
    dividend[i] = (input.charCodeAt(i * 2) << 8) | input.charCodeAt(i * 2 + 1);
  }

  /*
   * Repeatedly perform a long division. The binary array forms the dividend,
   * the length of the encoding is the divisor. Once computed, the quotient
   * forms the dividend for the next step. All remainders are stored for later
   * use.
   */
  var full_length = Math.ceil(input.length * 8 /
    (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for (j = 0; j < full_length; j++) {
    quotient = Array();
    x = 0;
    for (i = 0; i < dividend.length; i++) {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if (quotient.length > 0 || q > 0)
        quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for (i = remainders.length - 1; i >= 0; i--)
    output += encoding.charAt(remainders[i]);

  return output;
}

/*
 * Encode a string as utf-8.
 * For efficiency, this assumes the input is valid utf-16.
 */
function str2rstr_utf8(input) {
  var output = "";
  var i = -1;
  var x, y;

  while (++i < input.length) {
    /* Decode utf-16 surrogate pairs */
    x = input.charCodeAt(i);
    y = i + 1 < input.length ? input.charCodeAt(i + 1) : 0;
    if (0xD800 <= x && x <= 0xDBFF && 0xDC00 <= y && y <= 0xDFFF) {
      x = 0x10000 + ((x & 0x03FF) << 10) + (y & 0x03FF);
      i++;
    }

    /* Encode output as utf-8 */
    if (x <= 0x7F)
      output += String.fromCharCode(x);
    else if (x <= 0x7FF)
      output += String.fromCharCode(0xC0 | ((x >>> 6) & 0x1F),
        0x80 | (x & 0x3F));
    else if (x <= 0xFFFF)
      output += String.fromCharCode(0xE0 | ((x >>> 12) & 0x0F),
        0x80 | ((x >>> 6) & 0x3F),
        0x80 | (x & 0x3F));
    else if (x <= 0x1FFFFF)
      output += String.fromCharCode(0xF0 | ((x >>> 18) & 0x07),
        0x80 | ((x >>> 12) & 0x3F),
        0x80 | ((x >>> 6) & 0x3F),
        0x80 | (x & 0x3F));
  }
  return output;
}

/*
 * Encode a string as utf-16
 */
function str2rstr_utf16le(input) {
  var output = "";
  for (var i = 0; i < input.length; i++)
    output += String.fromCharCode(input.charCodeAt(i) & 0xFF,
      (input.charCodeAt(i) >>> 8) & 0xFF);
  return output;
}

function str2rstr_utf16be(input) {
  var output = "";
  for (var i = 0; i < input.length; i++)
    output += String.fromCharCode((input.charCodeAt(i) >>> 8) & 0xFF,
      input.charCodeAt(i) & 0xFF);
  return output;
}

/*
 * Convert a raw string to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */
function rstr2binl(input) {
  var output = Array(input.length >> 2);
  for (var i = 0; i < output.length; i++)
    output[i] = 0;
  for (var i = 0; i < input.length * 8; i += 8)
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32);
  return output;
}

/*
 * Convert an array of little-endian words to a string
 */
function binl2rstr(input) {
  var output = "";
  for (var i = 0; i < input.length * 32; i += 8)
    output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF);
  return output;
}

/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */
function binl_md5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;

  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
 * These functions implement the four basic operations the algorithm uses.
 */
function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

/*
 * Bitwise rotate a 32-bit number to the left.
 */
function bit_rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}