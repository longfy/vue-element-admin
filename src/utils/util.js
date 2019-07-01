export default class Util {
  constructor() {

  }
  // 计算tagsView，type：1添加、2删除、3删除其他、4删除所有
  computeTagsView(record, tagsView, type = 1) {
    let newTagsView, routeItem;
    switch (type) {
      case 1:
        let pathArr = [];
        newTagsView = tagsView;
        tagsView.forEach((v, i) => {
          pathArr.push(v.path);
        });
        if (pathArr.indexOf(record.path) === -1) {
          record.affix = false;
          newTagsView.unshift(record);
        }
        break;
      case 2:
        newTagsView = tagsView.filter((item, index, arr) => {
          if (item.path == record.path) {
            routeItem = arr[index + 1] || arr[index - 1];
          }
          return item.path !== record.path;
        });
        break;
      case 3:
        newTagsView = tagsView.filter((item, index, arr) => {
          return item.path === record.path || item.affix;
        });
        break;
      case 4:
        newTagsView = tagsView.filter((item, index, arr) => {
          return item.affix;
        });
        break;
      default:
        return;
    }
    return type !== 2 ? newTagsView : { newTagsView, routeItem };
  }
  // 根据路由currItem获取面包屑路径pathArr
  getBreadcrumbPath = (currItem, asideMenu) => {
    let pathArr = [currItem];
    function getParentObj(pid, arr) {
      arr.forEach((item, index) => {
        if (item.id == pid) {
          pathArr.unshift(item);
          getParentObj(item.pid, asideMenu, pathArr);
        } else {
          if (item.children) {
            getParentObj(pid, item.children, pathArr);
          }
        }
      })
    }
    getParentObj(currItem.pid, asideMenu);
    return pathArr;
  }
  //数组中删除一个元素
  removeItem = (arr, item) => {
    var index = arr.indexOf(item);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  //数组对象去重
  dedupe = Arr => {
    let hash = {};
    let allArr = Arr.reduce(function (item, next) {
      hash[next.numbers] ? "" : (hash[next.numbers] = true && item.push(next));
      return item;
    }, []);
    return allArr;
  }
  //数组去重
  removeRepeatArray = arr => {
    return arr.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
    //es6
    //return Array.from(new Set(arr))
  }
  //数组最小值
  minArr = arr => {
    return Math.min(...arr);
  }
  //数组最大值
  maxArr = arr => {
    return Math.max(...arr);
  }
  //数字或数组求和
  sum = arr => {
    return [...arr].reduce((acc, val) => acc + val, 0);
  }
  //求数字或数组的平均值
  average = (...arr) => {
    const nums = [].concat(...arr);
    return nums.reduce((acc, val) => acc + val, 0) / nums.length;
  }
  //判断一个元素是否在一个数组中
  contains = (arr, val) => {
    return arr.indexOf(val) != -1 ? true : false;
  }
  //数组顺序打乱
  upsetArr = arr => {
    return arr.sort(function () {
      return Math.random() - 0.5
    });
  }
  // 数组排序(js自带函数sort)
  sort = (arr, type = 0) => { // type：0倒序，1顺序
    return arr.sort((a, b) => {
      return type ? b - a : a - b;
    })
  }
  // 数组排序(冒泡排序)
  bubbleSort = (arr, type) => { // type：0倒序，1顺序
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (type ? arr[i] > arr[j] : arr[i] < arr[j]) {
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
      }
    }
    return arr;
  }
  //判断对象是否为空
  isEmptyObject = obj => {
    if (!obj || typeof obj !== "object" || Array.isArray(obj)) return false;
    return !Object.keys(obj).length;
  }
  //清除对象中值为空的属性
  filterParams = obj => {
    let _newPar = {};
    for (let key in obj) {
      if (
        obj[key] !== 0 &&
        obj[key] &&
        obj[key].toString().replace(/(^\s*)|(\s*$)/g, "") !== ""
      ) {
        _newPar[key] = obj[key];
      }
    }
    return _newPar;
  }
  //递归实现对象的深拷贝，深复制
  deepcopy = obj => {
    var newobj = {};
    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newobj[key] = deepcopy(obj[key]); //递归，核心代码
      } else {
        newobj[key] = obj[key];
      }
    }
    return newobj;
  }
  //检验字符串超出显示省略号
  CutParagraph(str, size) {
    var newStr;
    if (str.length > size) {
      newStr = str.substring(0, size) + "...";
      return newStr;
    } else {
      return str;
    }
  }
  //去除字符串空格 type 1-所有空格  2-前后空格  3-前空格 4-后空格
  trim = (str, type) => {
    switch (type) {
      case 1:
        return str.replace(/\s+/g, "");
      case 2:
        return str.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return str.replace(/(^\s*)/g, "");
      case 4:
        return str.replace(/(\s*$)/g, "");
      default:
        return str.replace(/\s+/g, "");
    }
  }
  //使用 *遮蔽字符串，默认最后4位放开
  maskStr = (str, num = 4, mask = "*") => {
    return ("" + str).slice(0, -num).replace(/./g, mask) + ("" + str).slice(-num);
  }
  //&#x 转汉字
  toChinese = str => {
    return unescape(str.replace(/&#x/g, "%u").replace(/;/g, ""));
  }
  //去除字符串中的汉字
  removeCN = str => {
    return str.replace(/[\u4e00-\u9fa5]/g, "");
  }
  //大写每个单词的首字母
  capitalizeEveryWord = str => {
    return str.replace(/\b[a-z]/g, char => char.toUpperCase());
  }
  //金额大写转换
  digitUppercase = n => {
    var fraction = ["角", "分"];
    var digit = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
    var unit = [["元", "万", "亿"], ["", "拾", "佰", "仟"]];
    var head = n < 0 ? "欠" : "";
    n = Math.abs(n);
    var s = "";
    for (var i = 0; i < fraction.length; i++) {
      s += (
        digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]
      ).replace(/零./, "");
    }
    s = s || "整";
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = "";
      for (var j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, "").replace(/^$/, "零") + unit[0][i] + s;
    }
    return (
      head +
      s
        .replace(/(零.)*零元/, "元")
        .replace(/(零.)+/g, "零")
        .replace(/^整$/, "零元整")
    );
  }
  //转义html标签
  htmlEncode = text => {
    return text.replace(/&/g, '&').replace(/\"/g, '"').replace(/</g, '<').replace(/>/g, '>');
  }
  //还原html标签
  htmlDecode = text => {
    return text.replace(/&/g, '&').replace(/"/g, '\"').replace(/</g, '<').replace(/>/g, '>');
  }
  //获取 url 参数
  getURLParameters = url => {
    return url.match(/([^?=&]+)(=([^&]*))/g).reduce((a, v) => ((a[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a), {});
  }
  //设置 url 参数
  setUrlPrmt = obj => {
    var _rs = [];
    for (var p in obj) {
      if (obj[p] != null && obj[p] != "") {
        _rs.push(p + "=" + obj[p]);
      }
    }
    return _rs.join("&");
  }
  //检测密码强度
  checkPwd = str => {
    var nowLv = 0;
    if (str.length < 6) {
      return nowLv;
    }
    if (/[0-9]/.test(str)) {
      nowLv++;
    }
    if (/[a-z]/.test(str)) {
      nowLv++;
    }
    if (/[A-Z]/.test(str)) {
      nowLv++;
    }
    if (/[\.|-|_]/.test(str)) {
      nowLv++;
    }
    return nowLv;
  }
  //正则验证字符串
  checkType = (str, type) => {
    switch (type) {
      case "email": //邮箱
        return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
      case "phone": //手机
        return /^1[3|4|5|7|8][0-9]{9}$/.test(str);
      case "tel": //电话
        return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
      case "number": //数字
        return /^[0-9]$/.test(str);
      case "english": //英文
        return /^[a-zA-Z]+$/.test(str);
      case "chinese": //中文
        return /^[\u4E00-\u9FA5]+$/.test(str);
      case "lower": //小写
        return /^[a-z]+$/.test(str);
      case "upper": //大写
        return /^[A-Z]+$/.test(str);
      case "isIdCard": //身份证
        return /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
          str
        );
      case "isUrl": //是否是网址
        return /[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i.test(
          str
        );
      default:
        return true;
    }
  }
  //获取十六进制随机颜色
  getRandomColor = () => {
    return '#' + (function (h) {
      return new Array(7 - h.length).join("0") + h;
    })((Math.random() * 0x1000000 << 0).toString(16));
  }
  //生成随机颜色
  randomColor = () => {
    return (
      "#" +
      Math.random()
        .toString(16)
        .substring(2)
        .substr(0, 6)
    );
  }
  //随机数生成
  randomNumber(n1, n2) {
    return Math.round(n1 + Math.random() * (n2 - n1));
  }
  //判断数据类型
  typeOf = obj => {
    const toString = Object.prototype.toString;
    const map = {
      '[object Boolean]': 'boolean',
      '[object Number]': 'number',
      '[object String]': 'string',
      '[object Function]': 'function',
      '[object Array]': 'array',
      '[object Date]': 'date',
      '[object RegExp]': 'regExp',
      '[object Undefined]': 'undefined',
      '[object Null]': 'null',
      '[object Object]': 'object'
    };
    return map[toString.call(obj)];
  }
  //数据类型判断
  istype = (o, type) => {
    if (type) {
      var _type = type.toLowerCase();
    }
    switch (_type) {
      case "string":
        return Object.prototype.toString.call(o) === "[object String]";
      case "number":
        return Object.prototype.toString.call(o) === "[object Number]";
      case "boolean":
        return Object.prototype.toString.call(o) === "[object Boolean]";
      case "undefined":
        return Object.prototype.toString.call(o) === "[object Undefined]";
      case "null":
        return Object.prototype.toString.call(o) === "[object Null]";
      case "function":
        return Object.prototype.toString.call(o) === "[object Function]";
      case "array":
        return Object.prototype.toString.call(o) === "[object Array]";
      case "object":
        return Object.prototype.toString.call(o) === "[object Object]";
      case "nan":
        return isNaN(o);
      case "elements":
        return Object.prototype.toString.call(o).indexOf("HTML") !== -1;
      default:
        return Object.prototype.toString.call(o);
    }
  }
  //刷新当前页面
  refreash = () => {
    window.location.href = window.location.href;
  }
  //复制到剪贴板
  copyToClipboard = str => {
    const el = document.createElement("textarea");
    el.value = str;
    el.setAttribute("readonly", "");
    el.style.position = "absolute";
    el.style.left = "-9999px";
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }
  //根据keycode获得键名
  getKeyName = keycode => {
    let keyCodeMap = {
      8: "Backspace", 9: "Tab", 13: "Enter", 16: "Shift", 17: "Ctrl", 18: "Alt", 19: "Pause", 20: "Caps Lock", 27: "Escape", 32: "Space", 33: "Page Up", 34: "Page Down", 35: "End", 36: "Home", 37: "Left", 38: "Up", 39: "Right", 40: "Down", 42: "Print Screen", 45: "Insert", 46: "Delete", 48: "0", 49: "1", 50: "2", 51: "3", 52: "4", 53: "5", 54: "6", 55: "7", 56: "8", 57: "9", 65: "A", 66: "B", 67: "C", 68: "D", 69: "E", 70: "F", 71: "G", 72: "H", 73: "I", 74: "J", 75: "K", 76: "L", 77: "M", 78: "N", 79: "O", 80: "P", 81: "Q", 82: "R", 83: "S", 84: "T", 85: "U", 86: "V", 87: "W", 88: "X", 89: "Y", 90: "Z", 91: "Windows", 93: "Right Click", 96: "Numpad 0", 97: "Numpad 1", 98: "Numpad 2", 99: "Numpad 3", 100: "Numpad 4", 101: "Numpad 5", 102: "Numpad 6", 103: "Numpad 7", 104: "Numpad 8", 105: "Numpad 9", 106: "Numpad *", 107: "Numpad +", 109: "Numpad -", 110: "Numpad .", 111: "Numpad /", 112: "F1", 113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7", 119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Num Lock", 145: "Scroll Lock", 182: "My Computer", 183: "My Calculator", 186: ";", 187: "=", 188: ",", 189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
    };
    if (keyCodeMap[keycode]) {
      return keyCodeMap[keycode];
    } else {
      console.log("Unknow Key(Key Code:" + keycode + ")");
      return "";
    }
  }
  //时间戳转换为时分秒
  timetrans = date => {
    var date = new Date(date * 1000); //如果date为13位不需要乘1000
    var Y = date.getFullYear() + "-";
    var M = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
    var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
    var h = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
    var m = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
    var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
  }
  //倒计时
  getEndTime = endTime => {
    var startDate = new Date(); //开始时间，当前时间
    var endDate = new Date(endTime); //结束时间，需传入时间参数
    var t = endDate.getTime() - startDate.getTime(); //时间差的毫秒数
    var d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor((t / 1000 / 60 / 60) % 24);
      m = Math.floor((t / 1000 / 60) % 60);
      s = Math.floor((t / 1000) % 60);
    }
    return "剩余时间" + d + "天 " + h + "小时 " + m + " 分钟" + s + " 秒";
  }
  //距现在的已过时间
  formatPassTime = startTime => {
    var currentTime = Date.parse(new Date()),
      time = currentTime - startTime,
      day = parseInt(time / (1000 * 60 * 60 * 24)),
      hour = parseInt(time / (1000 * 60 * 60)),
      min = parseInt(time / (1000 * 60)),
      month = parseInt(day / 30),
      year = parseInt(month / 12);
    if (year) return year + "年前";
    if (month) return month + "个月前";
    if (day) return day + "天前";
    if (hour) return hour + "小时前";
    if (min) return min + "分钟前";
    else return "刚刚";
  }
  //距现在的剩余时间
  formatRemainTime = endTime => {
    var startDate = new Date(); //开始时间
    var endDate = new Date(endTime); //结束时间
    var t = endDate.getTime() - startDate.getTime(); //时间差
    var d = 0,
      h = 0,
      m = 0,
      s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor((t / 1000 / 60 / 60) % 24);
      m = Math.floor((t / 1000 / 60) % 60);
      s = Math.floor((t / 1000) % 60);
    }
    return d + "天 " + h + "小时 " + m + "分钟 " + s + "秒";
  }
  // 设置cookie
  setCookie = (name, value, days = 30) => {
    let exp = new Date();
    exp.setTime(exp.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
  }

  // 获取cookie
  getCookie = name => {
    let arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) {
      return arr[2];
    } else {
      return "";
    }
  }

  // 删除cookie
  delCookie = name => {
    let exp = new Date();
    exp.setTime(exp.getTime() - 1);
    let cval = this.getCookie(name);
    if (cval != null) {
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
    }
  }
  //设置sessionStorage
  setSessionStorage = (key, value) => {
    if (window.sessionStorage) {
      window.sessionStorage.setItem(key, window.JSON.stringify(value));
    }
  }
  //获取sessionStorage
  getSessionStorage = key => {
    var json = "";
    if (window.sessionStorage) {
      json = window.sessionStorage.getItem(key);
    }
    return window.JSON.parse(json);
  }
  //设置localStorage
  setLocalStorage = (key, value) => {
    if (window.localStorage) {
      window.localStorage.setItem(key, window.JSON.stringify(value));
    }
  }
  //获取localStorage
  getLocalStorage = key => {
    var json = "";
    if (window.localStorage) {
      json = window.localStorage.getItem(key);
    }
    return window.JSON.parse(json);
  }
  //判断浏览器是否支持 webP 格式图片
  isSupportWebP = () => {
    return (
      !![].map &&
      document
        .createElement("canvas")
        .toDataURL("image/webp")
        .indexOf("data:image/webp") == 0
    );
  }
  isWeixin = () => {
    //判断是否是微信
    var ua = navigator.userAgent.toLowerCase();
    return ua.match(/MicroMessenger/i) == "micromessenger";
  }
  //检测设备类型
  detectDeviceType = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "手机" : "电脑";
  }
  //手机类型判断
  browserInfo = type => {
    switch (type) {
      case "android":
        return navigator.userAgent.toLowerCase().indexOf("android") !== -1;
      case "iphone":
        return navigator.userAgent.toLowerCase().indexOf("iphone") !== -1;
      case "ipad":
        return navigator.userAgent.toLowerCase().indexOf("ipad") !== -1;
      case "weixin":
        return navigator.userAgent.toLowerCase().indexOf("micromessenger") !== -1;
      default:
        return navigator.userAgent.toLowerCase();
    }
  }
  //获取浏览器类型和版本
  getExplore = () => {
    var sys = {},
      ua = navigator.userAgent.toLowerCase(),
      s;
    (s = ua.match(/rv:([\d.]+)\) like gecko/))
      ? (sys.ie = s[1])
      : (s = ua.match(/msie ([\d\.]+)/))
        ? (sys.ie = s[1])
        : (s = ua.match(/edge\/([\d\.]+)/))
          ? (sys.edge = s[1])
          : (s = ua.match(/firefox\/([\d\.]+)/))
            ? (sys.firefox = s[1])
            : (s = ua.match(/(?:opera|opr).([\d\.]+)/))
              ? (sys.opera = s[1])
              : (s = ua.match(/chrome\/([\d\.]+)/))
                ? (sys.chrome = s[1])
                : (s = ua.match(/version\/([\d\.]+).*safari/))
                  ? (sys.safari = s[1])
                  : 0;
    // 根据关系进行判断
    if (sys.ie) return "IE: " + sys.ie;
    if (sys.edge) return "EDGE: " + sys.edge;
    if (sys.firefox) return "Firefox: " + sys.firefox;
    if (sys.chrome) return "Chrome: " + sys.chrome;
    if (sys.opera) return "Opera: " + sys.opera;
    if (sys.safari) return "Safari: " + sys.safari;
    return "Unkonwn";
  }
  //获取操作系统类型
  getOS = () => {
    var userAgent =
      ("navigator" in window &&
        "userAgent" in navigator &&
        navigator.userAgent.toLowerCase()) ||
      "";
    var vendor =
      ("navigator" in window &&
        "vendor" in navigator &&
        navigator.vendor.toLowerCase()) ||
      "";
    var appVersion =
      ("navigator" in window &&
        "appVersion" in navigator &&
        navigator.appVersion.toLowerCase()) ||
      "";
    if (/mac/i.test(appVersion)) return "MacOSX";
    if (/win/i.test(appVersion)) return "windows";
    if (/linux/i.test(appVersion)) return "linux";
    if (
      /iphone/i.test(userAgent) ||
      /ipad/i.test(userAgent) ||
      /ipod/i.test(userAgent)
    )
      "ios";
    if (/android/i.test(userAgent)) return "android";
    if (/win/i.test(appVersion) && /phone/i.test(userAgent))
      return "windowsPhone";
  }
  //获取滚动条距顶部的距离
  getScrollTop = () => {
    return (
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop
    );
  }
  //元素的距离顶部的位置
  offset = ele => {
    var pos = {
      left: 0,
      top: 0
    };
    while (ele) {
      pos.left += ele.offsetLeft;
      pos.top += ele.offsetTop;
      ele = ele.offsetParent;
    }
    return pos;
  }
  //平滑滚动
  scrollTo = (to, duration) => {
    if (duration < 0) {
      this.setScrollTop(to);
      return;
    }
    var diff = to - this.getScrollTop();
    if (diff === 0) return;
    var step = (diff / duration) * 10;
    requestAnimationFrame(function () {
      if (Math.abs(step) > Math.abs(diff)) {
        this.setScrollTop(this.getScrollTop() + diff);
        return;
      }
      this.setScrollTop(this.getScrollTop() + step);
      if (
        (diff > 0 && this.getScrollTop() >= to) ||
        (diff < 0 && this.getScrollTop() <= to)
      ) {
        return;
      }
      this.scrollTo(to, duration - 16);
    });
  }
  //设置滚动条距顶部的距离
  setScrollTop = value => {
    window.scrollTo(0, value);
    return value;
  }
  //回到页面顶部
  backTop = () => {
    const sTop = document.documentElement.scrollTop || document.body.scrollTop;
    const duration = 1000;//动画时间
    scrollTop(window, sTop, 0, duration);
    function scrollTop(el, from = 0, to, duration = 500, endCallback) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = (
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback) {
            return window.setTimeout(callback, 1000 / 60);
          }
        );
      }
      const difference = Math.abs(from - to);
      const step = Math.ceil(difference / duration * 50);
      function scroll(start, end, step) {
        if (start === end) {
          endCallback && endCallback();
          return;
        }

        let d = (start + step > end) ? end : start + step;
        if (start > end) {
          d = (start - step < end) ? end : start - step;
        }

        if (el === window) {
          window.scrollTo(d, d);
        } else {
          el.scrollTop = d;
        }
        window.requestAnimationFrame(() => scroll(d, end, step));
      }
      scroll(from, to, step);
    }
  }
  //适配 rem
  getFontSize = _client => {
    var doc = document,
      win = window;
    var docEl = doc.documentElement,
      resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
      recalc = function () {
        var clientWidth = docEl.clientWidth;
        if (!clientWidth) return;
        //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
        if (clientWidth > _client) {
          clientWidth = _client
        }
        //设置根元素font-size大小
        docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
      };
    //屏幕大小改变，或者横竖屏切换时，触发函数
    win.addEventListener(resizeEvt, recalc, false);
    //文档加载完成时，触发函数
    doc.addEventListener('DOMContentLoaded', recalc, false);
  }
}