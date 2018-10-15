
export default class HttpUtils{
    static get=(url)=>{
        return new  Promise(((resolve, reject) => {//resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled（完成）或rejected（失败）
            fetch(url)//默认是GET
                .then(response=>response.json())//把数据解析成json格式,然后取出
                .then(result=>{
                       resolve(result);//表示完成
                })
                .catch(error=>{
                        reject(error);//表示失败
                })
            })
        )
    };

    static post=(url,data)=>{
        
        return new Promise(((resolve, reject) => {
            fetch(url,{
                method:'POST',
                //(把你想提交得数据序列化为json字符串类型，然后提交)body中的数据就是我们需要向服务器提交的数据,比如用户名,密码等
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                // body:JSON.stringify({'form.user':'techlab','form.pass':'Whu2008'})
            })//返回 服务器处理的结果
                .then(response=>response.json())
                .then(result=>{
                    resolve(result);
                })
                .catch(error=> {
                    reject(error);
                })
            })
        )
    }
}//数据转换成字符串 JSON.stringify(params)      //将数据JSON化 JSON.parse(responseJSON)

function initUrl(url,data){
    url = url.split('?');

    var para = "";
    for(var a in data){
        para +=("&"+a+"=" + data[a]);
    }
    para = para.substr(1,para.length);

    url = url[0] + "?" + para + url.length>1 ?url[1] :"";
}