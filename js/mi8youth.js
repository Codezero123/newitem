"use strict";
var mi8_head = document.getElementById('mi8_head');
// 开关移入点击的时候停止轮播
var state = false;

// 头导航固定
window.onscroll = function () {
  var scrollTop = getScroll().scrollTop;
  if (scrollTop > 40) {
    mi8_head.style.top = 0;
    mi8_head.className = 'mi8-head ofixed';
  } else {
    mi8_head.className = 'mi8-head';
  }
}

// 轮播图
var uiHuge = document.getElementById('uiHuge');
var uiApager = document.getElementById('uiApager');
var uiApgChildren = uiApager.children;
var uiHgChildren = uiHuge.children;
uiApgChildren[0].className = 'ui-pager-item gliao';
uiHgChildren[0].className = 'huge0';

var len = uiHgChildren.length;
for (var i = 0; i < len; i++) {
  uiApgChildren[i].index = i;
  // 点击
  addEvent(uiApgChildren[i], "click", fnClick);
  // 移入移出高亮
  addEvent(uiApgChildren[i], "mouseover", fnMouseover);
  addEvent(uiApgChildren[i], "mouseout", fnMouseout)
}
// 点击轮播图
function fnClick() {
  for (var j = 0; j < uiApgChildren.length; j++) {
    uiApgChildren[j].className = 'ui-pager-item';
    uiApgChildren[j].style.opacity = 0.3;
  }
  this.className = "ui-pager-item gliao";
  this.style.opacity = 1;

  for (var j = 0; j < uiHgChildren.length; j++) {
    uiHgChildren[j].className = 'huge' + j + ' hide';
  }

  uiIndex = this.index;
  var oIndex = uiIndex;
  var me = 0.5;
  var timerId = setInterval(function () {
    if (me >= 1) {
      clearInterval(timerId);
      uiHgChildren[oIndex].style.opacity = 1;
    } else {
      uiHgChildren[oIndex].style.opacity = me;
    }
    me += 0.1;
  }, 100);
  uiHgChildren[this.index].className = 'huge' + this.index;

  if (state == true) {
    setInterval(timerIndex);
  }
}
// 移人高亮
function fnMouseover() {
  state = true;
  this.style.opacity = 1;

  clearInterval(timerIndex);

}
// 移出高亮
function fnMouseout() {
  state = false;
  var gliao = this.className;
  if (gliao.indexOf('gliao') === -1) {
    this.style.opacity = 0.3;
  } else {
    this.style.opacity = 1;
  }

  timerIndex = setInterval(function () {
    uiIndex++;
    if (uiIndex > 2) {
      uiApgChildren[0].click();
      uiIndex = 0;
    } else {
      uiApgChildren[uiIndex].click();
    }
  }, 3000);
}
// 自动  原版是点击停止，就不会动了直到页面刷新
var uiIndex = 0;
var timerIndex = setInterval(function () {
  uiIndex++;
  if (uiIndex > 2) {
    uiApgChildren[0].click();
    uiIndex = 0;
  } else {
    uiApgChildren[uiIndex].click();
  }
}, 3000);


// 弹出视频  
var play = document.getElementById("play");
var poppVideo = document.getElementsByClassName("poppVideo")[0];
var cheat = document.getElementsByClassName("cheat")[0];
play.onclick = function () {
  cheat.style.display = 'block';
  poppVideo.style.display = 'block';
  var sum = 30;
  var opa = 0.1;
  var timerPlay = setInterval(function () {
    sum += 1;
    opa += 0.05;
    if (sum == 50) {
      clearInterval(timerPlay);
    }
    cheat.style.opacity = opa;

    poppVideo.style.top = sum + "%";
    poppVideo.style.opacity = opa;
  }, 30)
}
var dlt = document.getElementById('dlt');
dlt.onclick = function () {
  var sum = 30;
  var opa = 0.1;
  // 给弹出视频加缓冲
  var timerdlt = setInterval(function () {
    sum -= 1;
    opa -= 0.05;
    if (sum <= 0) {
      clearInterval(timerdlt);
      cheat.style.display = 'none';
      poppVideo.style.display = 'none';
    }
    cheat.style.opacity = opa;

    poppVideo.style.top = sum + "%";
    poppVideo.style.opacity = opa;
  }, 30)



}

// 视频下方轮播图
var indexBd = document.getElementById('indexBd');
var indexHd = document.getElementById('indexHd');
var BdChildren = indexBd.children;
var HdChildren = indexHd.children;

BdChildren[0].style.display = 'block';
var Bdlen = BdChildren.length;
for (var i = 0; i < Bdlen; i++) {
  Hdindex = HdChildren[i].index = i;
  addEvent(HdChildren[i], "click", clickHdChildren);
  addEvent(HdChildren[i], "mouseover", moseoverHdChildren);
  addEvent(HdChildren[i], "mouseout", moseoutHdChildren);
}

function clickHdChildren() {
  for (var j = 0; j < Bdlen; j++) {
    HdChildren[j].className = 'index-item' + j;
    BdChildren[j].style.display = 'none';
  }
  this.className = 'index-item' + this.index + ' inhover';
  BdChildren[this.index].style.display = "block";
  if (state == true) {
    clearInterval(timerHdChildren);
  }
}

function moseoverHdChildren() {
  state = true;
}

function moseoutHdChildren() {
  state = false;
  timerHdChildren = setInterval(function () {
    HdChildren[Hdindex].click();
    Hdindex++;
    if (Hdindex > 2) {
      Hdindex = 0;
    }
  }, 1500);
}
var Hdindex = 0;
var timerHdChildren = setInterval(function () {
  HdChildren[Hdindex].click();
  Hdindex++;
  if (Hdindex > 2) {
    Hdindex = 0;
  }
}, 1500);






































// 获取页面滚动距离的浏览器兼容性问题
// 获取页面滚动出去的距离
function getScroll() {
  var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  }
}


// 给dom对象添加该事件类型的处理函数，更好的实现事件绑定兼容(给某对象添加多事件)
function addEvent(dome, type, handler) {
  if (dome.addEventListener) {
    dome.addEventListener(type, handler, false);
    addEvent = function (dome, type, handler) {
      dome.addEventListener(type, handler, false);
    }
  } else {
    dome.attachEvent('on' + type, handler);
    addEvent = function (dome, type, handler) {
      dome.attachEvent('on' + type, handler);
    }
  }

}