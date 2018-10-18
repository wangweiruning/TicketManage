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

export function userlist(data) {
    return Httpdata.post({
        url: url.userlist+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//禁止操作
export function TicketBasicInfo(data) {
    return Httpdata.post({
        url: url.TicketBasicInfo+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//查询当前两票的基本信息
export function searchTicketBasicInfo(data) {
    return Httpdata.post({
        url: url.searchTicketBasicInfo+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//查询当前两票流程
export function searchTicketFlow(data) {
    return Httpdata.post({
        url: url.searchTicketFlow+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//验证当前类型流程的创建权限中是否包含该用户
export function searchUserPower(data) {
    return Httpdata.post({
        url: url.searchUserPower+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//查询流转目标
export function searchUserForRole(data) {
    return Httpdata.post({
        url: url.searchUserForRole+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//新建两票时生成两票编号
export function newTiceketNum(data) {
    return Httpdata.post({
        url: url.newTiceketNum+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}