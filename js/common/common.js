/**
 * Created by jstarseven on 2016/4/6.
 * 前端js基本函数库
 */

//基础类函数

//判断对象属性值是否有空值
function hasPropertiesNull(param) {
    var names="";       
    for(var name in param){       
       values=param[name];  
        if (values == "" || null == values || values == undefined) {
         return true;
        }
    }  
    return false;
}


//判断对象属性值是否有空值
function isNullObject(param) {
    var names="";       
    for(var name in param){       
       values=param[name];  
        if (values != "" || null != values || values != undefined) {
           return false;
        }
    }  
    return true;
}

//判断参数值是否是空值
function isNullParam(param) {
  if (param == "" || null == param || param == undefined) {
           return true;
    }  
    return false;
}

//获取对象属性值
function displayProp(obj){    
    var names="";       
    for(var name in obj){       
       names+=name+": "+obj[name]+", ";  
    }  
    alert(names);  
}  

//获取url参数
function getUrlParamValue(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURIComponent(r[2]);
    return null;
}

/**
 * paramObj 将要转为URL参数字符串的对象
 * key URL参数字符串的前缀
 * encode true/false 是否进行URL编码,默认为true
 * js实现
 * return URL参数字符串
 */
var urlEncode = function (paramObj, key, encode) {
  if(paramObj==null) return '';
  var paramStr = '';
  var t = typeof (paramObj);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(paramObj) : paramObj);
  } else {
    for (var i in paramObj) {
      var k = key == null ? i : key + (paramObj instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += urlEncode(paramObj[i], k, encode);
    }
  }
  return paramStr;
};


// 将js对象转转成url jquery实现
var parseParam=function(paramObj, key){
  var paramStr="";
  if(paramObj instanceof String||paramObj instanceof Number||paramObj instanceof Boolean){
    paramStr+="&"+key+"="+encodeURIComponent(paramObj);
  }else{
    $.each(paramObj,function(i){
      var k=key==null?i:key+(paramObj instanceof Array?"["+i+"]":"."+i);
      paramStr+='&'+parseParam(this, k);
    });
  }
  return paramStr.substr(1);
};



// 获取url参数封装成对象
function GetUrlParam() {
  
  var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
        theRequest[strs[i].split("=")[0]]=decodeURIComponent((strs[i].split("=")[1]));
      }
   }
   return theRequest;
}

//  wdate日历控件实现日期选择控制
var Activity = {

    initTime: function (startTime, endTime) {
        var startId = $("#" + startTime).attr("id");
        var endId = $("#" + endTime).attr("id");
        $("#startTime").click(function () {
            WdatePicker({
                minDate: '%y-%M-%d', //当前时间
                minDate: '2000-01-01 00:00:00',
                maxDate: '#F{$dp.$D(' + endId + ')}'
            });
        });

        $("#endTime").click(function () {
            WdatePicker({
                dateFmt: 'yyyy-MM-dd HH:mm:ss',
                minDate: '#F{$dp.$D(' + startId + ')}'
            });
        });
    },
    initSingleTime: function (attrId) {
        $("#" + attrId).click(function () {
            WdatePicker({
                dateFmt: 'yyyy-MM-dd HH:mm:ss',
                minDate: '2000-01-01 00:00:00'
            });
        });
    }
};