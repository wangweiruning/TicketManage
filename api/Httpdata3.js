export default class HttpUtils{
    static AjaxData(url,data,method="POST") {
        return new Promise(((resolve, reject) => {
            fetch(url+data,{
                method:method,
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                    
                },
            }).then(response=>{
                return response.json()
            })
            .then(result=>{
                resolve(result);
            })
            .catch(error=> {
                reject(error);
            })
        }));
    }
}