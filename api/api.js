import Httpdata from './Httpdata'


import URLs from './serviceAPI.config';

//登录验证
export function islogin(data){
    return Httpdata.post({ 
        url: URLs.islogin+data,
    });
}

//登陆
export function login(data) {
    return Httpdata.post({        
        url: URLs.userLogin+data,
    });
    
}
//待处理流程
export function awaitdeteal(data) {
    return Httpdata.post({
        url: URLs.awaitdeteal+data,
    });
}

//相关处理流程
export function correation(data) {
    return Httpdata.post({
        url: URLs.correation+data,
    });
}

//历史流程
export function historys(data) {
    return Httpdata.post({
        url: URLs.historys+data,
    });
}
//gethistory获取当前历史票信息
export function gethistory(data) {
    return Httpdata.post({
        url: URLs.gethistory+data,
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
        url: URLs.findquanxian+data,
    })
}

export function userlist(){
    return Httpdata.post({
        url: URLs.userlist,
    })
}

//模板基础信息
export function TicketBasicInfo(data) {
    return Httpdata.post({
        url: URLs.TicketBasicInfo+data,
    })
}
export function moban(data) {
    return Httpdata.post({
        url: URLs.moban+data,
    })
}

//查询当前两票的基本信息
export function searchTicketBasicInfo(data) {
    return Httpdata.post({
        url: URLs.searchTicketBasicInfo+data,
    })
}

//查询当前两票流程
export function searchTicketFlow(data) {
    return Httpdata.post({
        url: URLs.searchTicketFlow+data,
    })
}

//验证当前类型流程的创建权限中是否包含该用户
export function searchUserPower(data) {
    return Httpdata.post({
        url: URLs.searchUserPower+data,
    })
}

//查询流转目标
export function searchUserForRole(data) {
    return Httpdata.post({
        url: URLs.searchUserForRole+data,
    })
}

//新建两票时生成两票编号
export function newTiceketNum(data) {
    return Httpdata.post({
        url: URLs.newTiceketNum+data,
    })
}

export function ttmsTickets(data) {
    return Httpdata.post({
        url: URLs.ttmsTickets+data,
    })
}

//根据id查询已经经过的流程
export function searchFlowRecord(data) {
    return Httpdata.post({
        url: URLs.searchFlowRecord+data,
    })
}

//将数据值填入页面
export function searchTicketRecord(data) {
    return Httpdata.post({
        url: URLs.searchTicketRecord+data,
    })
}

//组成员
export function findgroup(data) {
    return Httpdata.post({
        url: URLs.findgroup+data,
    })
}

//部门
export function findbumen(data) {
    return Httpdata.post({
        url: URLs.findbumen+data,
    })
}

//提交接口
export function tijiao(data) {
    
    return Httpdata.post({
        url: URLs.tijiao+data,
        method: 'post',
        dataType: "json",
		contentType: "application/x-www-form-urlencoded;charset=UTF-8",
    })
}

export function AllMangerUser() {
    return Httpdata.post({
        url: URLs.AllMangerUser,
    })
}

export function ParaIdForTeam() {
    return Httpdata.post({
        url: URLs.ParaIdForTeam,
    })
}

export function AllDepartment() {
    return Httpdata.post({
        url: URLs.AllDepartment,
    })
}

export function ForDepartment(data) {
    
    return Httpdata.post({
        url: URLs.ForDepartment+data,
    })
}

export function Searchhistory(data){
    return Httpdata.post({
        url: URLs.Searchhistory+data,
    })
}
