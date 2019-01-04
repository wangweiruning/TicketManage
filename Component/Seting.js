import React from 'react';
import {View,Text,ToastAndroid} from 'react-native';
import Title from './Title';
import TouchID from 'react-native-touch-id';
import {Switch} from 'antd-mobile-rn';
import MySorage from '../api/storage';

export default class Seting extends React.Component{
    constructor(props){
        super(props)
        this.state={
            tou:false,
            checked:null
        }
    } 

    componentDidMount(){
        MySorage._load('seting',(res)=>{
            this.state.checked = res
            this.forceUpdate();
        })

        TouchID.isSupported().then(biometryType => {
            // Success code
          })
          .catch(error => {
           // Failure code
            this.setState({
              tou:true
            })
          });
    }

    change(e){
      this.setState({
        checked:e
      })
      MySorage._sava('seting',e)
      ToastAndroid.show('设置成功',ToastAndroid.SHORT)
    }


    render(){
        return(<View>
            <Title navigation={this.props.navigation} centerText={'设置'} />
            {this.state.tou&&<Text style={{marginLeft:10,marginTop:10,color:'grey',fontSize:10}}>本机不支持指纹功能或未开启指纹功能，指纹登录将无法使用</Text>}
            <View style={{marginTop:10,height:50,alignItems:'center',flexDirection:'row',width:'100%',backgroundColor:this.state.tou?'lightgrey':'white',borderColor:'grey',borderWidth:1,borderStyle:'solid'}}>
                <Text style={{color:this.state.tou?'#f5f5f5':'black',fontSize:18,marginLeft:10,flex:1}}>打开/关闭指纹录入</Text>
                <Switch disabled={this.state.tou} style={{marginRight:10}} checked={this.state.checked} onChange={(e)=>this.change(e)}/>
            </View>
            <Text style={{marginLeft:10,marginTop:10,color:'grey',fontSize:10}}>开启后可以使用指纹进行快捷登录，设置仅对本机生效，如需修改指纹，请在手机系统设置里面操作。</Text>
        </View>)
    }
}