import React from 'react'
import MySorage from './api/storage';
import {islogin} from './api/api'
import TouchID from 'react-native-touch-id';
import {Image,StatusBar,View} from 'react-native';
MySorage._getStorage()
window.jconfig={
    userinfo:{}
}

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.checklogin()
      this.state={
        tou:false
      }
    }
  

    async checklogin(){
        let d = `?code=50ACD07A6C49F3B9E082EF40461AC6D1`;
        let ff = await islogin(d);
        if(ff.form.status==0&&window.jconfig.userinfo!=null){
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
          })
       this._bootstrapAsync();
    }

    _bootstrapAsync = async () => {
        try {
            MySorage._loadAll(["userinfo","history","seting"],(data)=>{
            let res = data[0];
            let info = data[1];
            let touch = data[2];
            window.jconfig.userinfo=JSON.parse(res);
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