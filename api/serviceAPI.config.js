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
    searchUserPower:url+'ticketMng/ticketMng_searchUserPower.action.action',// 验证当前类型流程的创建权限中是否包含该用户
    searchUserForRole:url+'ticketMng/ticketMng_searchUserForRole.action',// 查询流转目标
    newTiceketNum:url+'ticketMng/ticketMng_newTiceketNum.action',// 新建两票时生成两票编号
    
}
export default URL