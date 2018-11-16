import Httpdata from './Httpdata'


import url from './serviceAPI.config';

//登录验证
export function islogin(data){
    return   Httpdata.post({       
                url: url.islogin+data,
                method: 'post',
                dataType: "json",
                contentType: "application/x-www-form-urlencoded",
            });
}

//登陆
export function login(data) {
    return   Httpdata.post({        url: url.userLogin+data,
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

//历史流程
export function historys(data) {
    return Httpdata.post({
        url: url.historys+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    });
}
//gethistory获取当前历史票信息
export function gethistory(data) {
    return Httpdata.post({
        url: url.gethistory+data,
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

export function userlist(){
    return Httpdata.post({
        url: url.userlist,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//模板基础信息
export function TicketBasicInfo(data) {
    return Httpdata.post({
        url: url.TicketBasicInfo+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}
export function moban(data) {
    return Httpdata.post({
        method:'post',
        url: url.moban+data,
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

export function ttmsTickets(data) {
    return Httpdata.post({
        url: url.ttmsTickets+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//根据id查询已经经过的流程
export function searchFlowRecord(data) {
    return Httpdata.post({
        url: url.searchFlowRecord+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//将数据值填入页面
export function searchTicketRecord(data) {
    return Httpdata.post({
        url: url.searchTicketRecord+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//组成员
export function findgroup(data) {
    return Httpdata.post({
        url: url.findgroup+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//部门
export function findbumen(data) {
    return Httpdata.post({
        url: url.findbumen+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

//提交接口
export function tijiao(data) {
    
    return Httpdata.post({
        url: url.tijiao+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    })
}

export function AllMangerUser() {
    
    return Httpdata.post({
        url: url.AllMangerUser,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

export function ParaIdForTeam() {
    
    return Httpdata.post({
        url: url.ParaIdForTeam,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

export function AllDepartment() {
    
    return Httpdata.post({
        url: url.AllDepartment,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}

export function ForDepartment(data) {
    
    return Httpdata.post({
        url: url.ForDepartment+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded",
    })
}
