/**
 * Created by jstarseven on 2016/4/6.
 * jstarseven个人网站共用js
 */
// 本地服务器
var serverDomain = "http://127.0.0.1:8080/";
// 外网路径服务器
// var serverDomain = "http://www.jstarseven.com/";

// 用户注册事件
$("#btn-signup").click(function(){
    register(getSignUpParam(),serverDomain+"common/register");
});

// 用户登录事件
$("#btn-signin").click(function(){
    login(getSignInParam(),serverDomain+"common/login");
});

// 用户注销登录
$("#logout").click(function(){
    userLogout(serverDomain+"common/logout");    
});

// 用户注册
function register(param, url) {
    $.ajax({
        type: "POST",
        url: url,
        data: param,
        dataType: "jsonp",
        jsonp: "callbackparam",
        async: true,
        success: function (data) {
          if (data.status == "1") {
              alert("注册成功");
         }else{
           switch (data.errCode) {
                case "100":
                    alert("参数错误");
                    break;
                case "200":
                    alert("手机号格式错误");
                    break;
                case "300":
                    alert("用户名已经存在");
                    break;
                case "400":
                    alert("注册失败");
                    break;
                default:
                    alert("发生网络错误，请稍候再试。");
            }
         }
        },
        error: function () {
            alert("发生网络错误，请稍候再试。");
        }
    });
}

// 显示登录用户信息
function showUser(){
    var cookie_user=$.cookie('cookie_username');
    if(cookie_user == "" ||  cookie_user==null  || cookie_user == undefined){
       return;
    }
    $("[name = 'sign']").hide();
    if($("[name='user']").length>0){
        return ;
    }
    $(".navig").append("<li name='user'><a href='user.html' class='hvr-bounce-to-bottom'>"+cookie_user+"：Welcome</a></li>");
    $(".navig").append("<li name='user'><a href='javascript:userLogout();' class='hvr-bounce-to-bottom'>Logout</a></li>");
    $("#userid").val($.cookie('cookie_userid'));   
    $("#name").val($.cookie('cookie_username'));
    $("#sex").val($.cookie('cookie_usersex'));
    $("#phone").val($.cookie('cookie_userphone'));
    $("#email").val($.cookie('cookie_usermail'));

}

// 用户登录
function login(param, url) {
    $.ajax({
        type: "POST",
        url: url,
        data: param,
        dataType: "jsonp",
        jsonp: "callbackparam",
        async: true,
        success: function (data) {
          if (data.status == "1") {
              $.cookie('cookie_userid', data.user.id, { expires: 3 * 60 * 60, path: '/' });
              $.cookie('cookie_username', data.user.username, { expires: 3 * 60 * 60, path: '/' });
              $.cookie('cookie_usersex', data.user.sex, { expires: 3 * 60 * 60, path: '/' });
              $.cookie('cookie_userphone', data.user.phone, { expires: 3 * 60 * 60, path: '/' });
              $.cookie('cookie_usermail', data.user.mail, { expires: 3 * 60 * 60, path: '/' });
              showUser(); 
              window.location.reload();
         }else{
           switch (data.errCode) {
                case "100":
                    alert("参数错误");
                    break;
                case "200":
                    alert("用户不存在");
                    break;
                case "300":
                    alert("密码错误");
                    break;
                default:
                    alert("发生网络错误，请稍候再试。");
            }
         }
        },
        error: function () {
            alert("发生网络错误，请稍候再试。");
        }
    });
}

// 用户登录注销
function userLogout(url){
    $.ajax({
        type: "POST",
        url: serverDomain+"common/logout",
        data: {},
        dataType: "jsonp",
        jsonp: "callbackparam",
        async: true,
        success: function (data) {
            if (data.status == "1") {
              $.cookie('cookie_username', '', { expires: 0, path: '/' });
              $.cookie('cookie_usersex', '', { expires: 0, path: '/' });
              $.cookie('cookie_userphone', '', { expires: 0, path: '/' });
              $.cookie('cookie_usermail', '', { expires: 0, path: '/' });
              $("[name = 'sign']").show();
              $("[name = 'user']").hide();
              window.location.href="index.html";
            }else{
              alert("注销失败，请稍候再试。");    
            }
            
        },
        error: function () {
            alert("发生网络错误，请稍候再试。");
        }
    });
}

//获取用户注册参数
function getSignUpParam(){

    var paramSignUp={
          "userVo.username":$.trim($("#username-signup").val()),
          "userVo.sex":$.trim($("[name = 'sex-signup']:checked").val()),
          "userVo.phone":$.trim($("#phone-signup").val()),
          "userVo.mail":$.trim($("#mail-signup").val()),
          "userVo.password":$.trim($("#password-signup").val())
        };
      return paramSignUp;
}

// 获取用户登录参数
function getSignInParam(){
 
    var paramSignIn={
          "username":$.trim($("#username-signin").val()),
          "password":$.trim($("#password-signin").val()),
          "role":1
        };

    return paramSignIn;
}

