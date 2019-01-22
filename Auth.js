import React from 'react'
import MySorage from './api/storage';
// import {islogin} from './api/api'
import HttpUtils from './api/Httpdata3'
import TouchID from 'react-native-touch-id';
import {StatusBar} from 'react-native';
MySorage._getStorage()
window.jconfig={
    userinfo:{},
    netWorkIp:null
}

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state={
        http:jconfig.netWorkIp?jconfig.netWorkIp:'http://59.172.204.182:8030/ttms',
        tou:false
      }
    }
  

    // componentWillMount(){
    //     setTimeout(()=>this.checklogin(),1500) 
    // }

    async checklogin(){
        let token = `?code=50ACD07A6C49F3B9E082EF40461AC6D1`;
        let session = await HttpUtils.AjaxData(`${this.state.http}/common/login_checkSession.action`,token);
        if(session.form.status==0){
            this.props.navigation.navigate('Auth')
        }
      }


    componentDidMount(){
        TouchID.isSupported().then(biometryType => {
            // Success code
            }).catch(error => {
            // Failure code
            this.setState({
              tou:true
            })
          });

       this.checklogin();
       this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        try {
            MySorage._loadAll(["userinfo","history","seting","netWorkIp"],(data)=>{
            let res = data[0];
            let info = data[1];
            let touch = data[2];
            let netWorkIp = data[3];
            window.jconfig.userinfo=JSON.parse(res);
            window.jconfig.netWorkIp=netWorkIp
            if (!res) {
              let type = this.state.tou?"Auth":"Touch"
              if(!info) type ="Auth"
              else type = touch || touch == null?'Auth':'Touch'
              this.props.navigation.navigate(type);
            }
            else{
                this.props.navigation.navigate('App');
            }
          })
          }catch(e){
          return
         }
    }

    render() {
        return (<React.Fragment>
               <StatusBar backgroundColor='transparent' translucent={true} />
            </React.Fragment>);
      }
}