import Httpdata from './Httpdata'


import url from './serviceAPI.config';
//登陆


export function GetUserInfo() {
    return new Promise((s1, s2) => {
        MySorage._load("dicuserinfo", (data) => {
            let res = JSON.parse(data);
            jconfig.userinfo.target= res.target;
            jconfig.userinfo.code = res.code;
            jconfig.userinfo.id = res.id;
            jconfig.userinfo.display = res.display;
            jconfig.userinfo.avatar = res.avatar;
            jconfig.userinfo.loginname = res.loginname;
            s1("设置数据成功 MySorage 设置jconfig");
        });
    });
}

export function login(data) {
    return Httpdata.post({
        url: url.userLogin+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    });
}
//待处理流程
export function awaitdeteal(data) {
    return Httpdata.post({
        url: url.awaitdeteal+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    });
}

//相关处理流程
export function correation(data) {
    return Httpdata.post({
        url: url.correation+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    });
}
