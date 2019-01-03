import Httpdata from './Httpdata'


import url from './serviceAPI.config';

//登录验证
export function islogin(data){
    return Httpdata.post({       
        url: url.islogin+data,
    });
}

//登陆
export function login(data) {
    return Httpdata.post({        
        url: url.userLogin+data,
    });
    
}
//待处理流程
export function awaitdeteal(data) {
    return Httpdata.post({
        url: url.awaitdeteal+data,
    });
}

//相关处理流程
export function correation(data) {
    return Httpdata.post({
        url: url.correation+data,
    });
}

//历史流程
export function historys(data) {
    return Httpdata.post({
        url: url.historys+data,
    });
}
//gethistory获取当前历史票信息
export function gethistory(data) {
    return Httpdata.post({
        url: url.gethistory+data,
    });
}

//编辑模板详情权限
export function editquanxian(data) {
    return Httpdata.post({
        url: url.editquanxian+data,
    })
}
//查看模板详情权限 不可编辑内容
export function quanxian(data) {
    return Httpdata.post({
        url: url.findquanxian+data,
    })
}

export function userlist(){
    return Httpdata.post({
        url: url.userlist,
    })
}

//模板基础信息
export function TicketBasicInfo(data) {
    return Httpdata.post({
        url: url.TicketBasicInfo+data,
    })
}
export function moban(data) {
    return Httpdata.post({
        url: url.moban+data,
    })
}

//查询当前两票的基本信息
export function searchTicketBasicInfo(data) {
    return Httpdata.post({
        url: url.searchTicketBasicInfo+data,
    })
}

//查询当前两票流程
export function searchTicketFlow(data) {
    return Httpdata.post({
        url: url.searchTicketFlow+data,
    })
}

//验证当前类型流程的创建权限中是否包含该用户
export function searchUserPower(data) {
    return Httpdata.post({
        url: url.searchUserPower+data,
    })
}

//查询流转目标
export function searchUserForRole(data) {
    return Httpdata.post({
        url: url.searchUserForRole+data,
    })
}

//新建两票时生成两票编号
export function newTiceketNum(data) {
    return Httpdata.post({
        url: url.newTiceketNum+data,
    })
}

export function ttmsTickets(data) {
    return Httpdata.post({
        url: url.ttmsTickets+data,
    })
}

//根据id查询已经经过的流程
export function searchFlowRecord(data) {
    return Httpdata.post({
        url: url.searchFlowRecord+data,
    })
}

//将数据值填入页面
export function searchTicketRecord(data) {
    return Httpdata.post({
        url: url.searchTicketRecord+data,
    })
}

//组成员
export function findgroup(data) {
    return Httpdata.post({
        url: url.findgroup+data,
    })
}

//部门
export function findbumen(data) {
    return Httpdata.post({
        url: url.findbumen+data,
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
    })
}

export function ParaIdForTeam() {
    return Httpdata.post({
        url: url.ParaIdForTeam,
    })
}

export function AllDepartment() {
    return Httpdata.post({
        url: url.AllDepartment,
    })
}

export function ForDepartment(data) {
    
    return Httpdata.post({
        url: url.ForDepartment+data,
    })
}

export function Searchhistory(data){
    return Httpdata.post({
        url:url.Searchhistory+data,
    })
}
