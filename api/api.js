import Httpdata from './Httpdata'


import url from './serviceAPI.config';
//登陆


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
