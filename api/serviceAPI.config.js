const url = 'http://59.172.204.182:8030/ttms/';
const URL ={
    userLogin:url+'common/login_checkuser.action',//用户登陆
    awaitdeteal:url+'ticketMng/ticketMng_searchUnhandle.action',//待处理流程接口
    correation:url+'ticketMng/ticketMng_searchOnline.action',//相关处理流程接口
    findquanxian:url+'baseInformation/templateMng_templateContentSearch.action',//查找时权限管理
    editquanxian:url+'ticketMng/ticketMng_searchEditPara.action',//编辑模板权限管理
    userlist:url+'home/home_showUserDatas.action',//用户信息
    TicketBasicInfo:url+'baseInformation/templateMng_templateContentSearch.action', //模板信息
    searchTicketBasicInfo:url+'ticketMng/ticketMng_searchTicketBasicInfo.action',//查询当前两票的基本信息
    searchTicketFlow:url+'ticketMng/ticketMng_searchTicketFlow.action',// 查询当前两票流程
    searchUserPower:url+'ticketMng/ticketMng_searchUserPower.action',// 验证当前类型流程的创建权限中是否包含该用户
    searchUserForRole:url+'ticketMng/ticketMng_searchUserForRole.action',// 查询流转目标
    newTiceketNum:url+'ticketMng/ticketMng_newTiceketNum.action',// 新建两票时生成两票编号
    moban:url+'baseInformation/templateMng_loadTree.action',//模板树
    ttmsTickets:url+'ticketMng/ticketMng_loadTemplate.action',//选择模板票
    searchFlowRecord:url+'ticketMng/ticketMng_searchFlowRecord.action',//根据id查询已经经过的流程
    searchTicketRecord:url+'ticketMng/ticketMng_searchTicketRecord.action',//将数据值填入页面
    findgroup:url+'systemMng/userMng_loadGrid.action',//获取组的成员+
    findbumen:url+'departmentMng/departmentMng_loadGrid.action',//获取部门：部门id 部门名称
    tijiao:url+'ticketMng/ticketMng_ticketCommit.action',//提交
    historys:url+'ticketMng/ticketMng_loadGrid.action',//历史流程
}
export default URL