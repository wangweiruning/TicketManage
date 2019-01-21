const urls='http://59.172.204.182:8030/ttms/'

export default URLs = {
    islogin:urls+'common/login_checkSession.action',//登录判断
    userLogin:urls+'common/login_checkuser.action',//用户登陆
    awaitdeteal:urls+'ticketMng/ticketMng_searchUnhandle.action',//待处理流程接口
    correation:urls+'ticketMng/ticketMng_searchOnline.action',//相关处理流程接口
    findquanxian:urls+'baseInformation/templateMng_templateContentSearch.action',//查找时权限管理
    editquanxian:urls+'ticketMng/ticketMng_searchEditPara.action',//编辑模板权限管理
    userlist:urls+'home/home_showUserDatas.action',//用户信息
    TicketBasicInfo:urls+'baseInformation/templateMng_templateContentSearch.action', //模板信息
    searchTicketBasicInfo:urls+'ticketMng/ticketMng_searchTicketBasicInfo.action',//查询当前两票的基本信息
    searchTicketFlow:urls+'ticketMng/ticketMng_searchTicketFlow.action',// 查询当前两票流程
    searchUserPower:urls+'ticketMng/ticketMng_searchUserPower.action',// 验证当前类型流程的创建权限中是否包含该用户
    searchUserForRole:urls+'ticketMng/ticketMng_searchUserForRole.action',// 查询流转目标
    newTiceketNum:urls+'ticketMng/ticketMng_newTiceketNum.action',// 新建两票时生成两票编号
    moban:urls+'baseInformation/templateMng_loadTree.action',//模板树
    ttmsTickets:urls+'ticketMng/ticketMng_loadTemplate.action',//选择模板票
    searchFlowRecord:urls+'ticketMng/ticketMng_searchFlowRecord.action',//根据id查询已经经过的流程
    searchTicketRecord:urls+'ticketMng/ticketMng_searchTicketRecord.action',//将数据值填入页面
    findgroup:urls+'systemMng/userMng_loadGrid.action',//获取组的成员+
    findbumen:urls+'departmentMng/departmentMng_loadGrid.action',//获取部门：部门id 部门名称
    tijiao:urls+'ticketMng/ticketMng_ticketCommit.action',//提交
    historys:urls+'ticketMng/ticketMng_loadGrid.action',//历史流程
    gethistory:urls+'ticketSearch/previousTicketSearch_sendParameter.action',//获取票信息
    AllMangerUser:urls+'ticketMng/ticketMng_searchAllMangerUser.action', //所有工作负责人
    ParaIdForTeam:urls+'ticketMng/ticketMng_searchParaIdForTeam.action', //班组班组成员id
    AllDepartment:urls+'ticketMng/ticketMng_searchAllDepartment.action',  //查询所有部门
    ForDepartment:urls+'ticketMng/ticketMng_searchUserForDepartment.action',  //根据部门id查班组成员
    Searchhistory:urls+'ticketMng/ticketMng_onGridSearch.action' //搜索
}