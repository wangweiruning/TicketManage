const url = 'http://59.172.204.182:8030/ttms/';

const URL ={
    userLogin:url+'common/login_checkuser.action',//用户登陆
    awaitdeteal:url+'ticketMng/ticketMng_searchUnhandle.action',//待处理流程接口
    correation:url+'ticketMng/ticketMng_searchOnline.action',//相关处理流程接口
}
export default URL