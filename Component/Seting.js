import React from 'react';
import {View,Text} from 'react-native';
import Title from './Title';
import {ActivityIndicator,Toast,Switch} from 'antd-mobile-rn';
import MySorage from '../api/storage';

export default class Seting extends React.Component{
    constructor(props){
        super(props)
        this.state={
            checked:null
        }
    } 

    componentDidMount(){
        MySorage._load('seting',(res)=>{
            this.state.checked = res
            this.forceUpdate();
            console.log(res)
        })
    }


    render(){
        return(<View>
            <Title navigation={this.props.navigation} centerText={'设置'}/>
            <View style={{height:50,alignItems:'center',flexDirection:'row',width:'100%',backgroundColor:'white',borderColor:'grey',borderWidth:1,borderStyle:'solid'}}>
                <Text style={{fontSize:18}}>指纹验证</Text>
                <Switch checked={this.state.checked} />
            </View>
        </View>)
    }
}