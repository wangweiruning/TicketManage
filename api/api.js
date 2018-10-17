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

//编辑模板详情权限
export function editquanxian(data) {
    return Httpdata.post({
        url: url.editquanxian+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}
//查看模板详情权限 不可编辑内容
export function quanxian(data) {
    return Httpdata.post({
        url: url.findquanxian+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}
