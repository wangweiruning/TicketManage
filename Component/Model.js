import React from 'react';
import {View,Text,TouchableOpacity,FlatList,Modal,ToastAndroid} from 'react-native';
import {Checkbox} from 'antd-mobile-rn';


export default class Modals extends React.Component{
    constructor(props){
        super(props)
        this.state={
            show:false,
            data:this.props.data,
            active:null
        }
    }

    componentWillReceiveProps(nextProps){
        this.state.show=nextProps.show;
        this.state.data=nextProps.data
    }


    open(){
        let active = this.state.active;
        let datas = this.state.data;
        let name = null;
        let id = null
        for(let i=0;i<datas.length;i++){
            let data = datas[i];
            name = data.realname,
            id = data.userid
            if(active == null){
                return '请选择'
            }
            else if(active == id){
                return name
            }
        };
    }

    gazi(){
        let datas = this.state.data;
        let ds={};
        let active = this.state.active;
        for(let i=0;i<datas.length;i++){
            let data = datas[i];
            if(!data.userid)continue;
            if(data.userid == active)ds = data;
        };
        this.props.gets(ds,this.props.leixin,this.props.pagedata);
    }

    render(){

        const {
            data=[],
            show
        } = this.state;

        return(
            <View>
                <TouchableOpacity disabled={this.props.disabled} activeOpacity={.8} style={{...this.props.style}} onPress={()=>this.setState({show:true})}>
                    <Text style={{...this.props.textStyle}}>
                        {this.open()}
                    </Text>
                </TouchableOpacity>
                {show&&<Modal hardwareAccelerated={true} animationType='slide' onRequestClose={()=>{this.setState({show:!this.state.show});this.gazi()}} transparent={true}>
                    <View style={{backgroundColor:'rgba(0,0,0,.3)',width:'100%',height:'100%'}}>
                        <TouchableOpacity style={{width:'100%',height:'40%'}} onPress={()=>this.setState({show:false})}></TouchableOpacity>
                        <View style={{backgroundColor:'white',width:'100%',height:'60%',borderTopStartRadius:5,borderTopEndRadius:5}}>
                            <View style={{flexDirection:'row',padding:7,justifyContent:'flex-end',borderBottomColor:'grey',borderBottomWidth:1,borderStyle:'solid'}}>
                                <Text style={{textAlign:'center',width:50,color:'white',fontSize:15,elevation:3,backgroundColor:'#0390e8',borderRadius:5,padding:5}}
                                    onPress={()=>{this.setState({show:false});this.gazi()}}>确定</Text>
                            </View>
                            <FlatList style={{height:'100%',marginTop:8}} data = {data} keyExtractor={(item, index) => index.toString()}
                                renderItem={({item,index}) =>
                                    <View key={index} style={{marginBottom:8,marginLeft:9,flexDirection:'row',width:'95%',height:40,backgroundColor:'#e3e3e3',borderRadius:5,padding:5}}>
                                        <Checkbox checked={this.state.active == item.userid} onChange={(e)=>{
                                            this.state.active = item.userid;
                                            this.forceUpdate();
                                        }}>
                                            <Text style={{width:'100%',left:5,color:'black',fontSize:15}}>{item.realname}</Text></Checkbox>
                                    </View>}
                            />
                        </View>
                    </View>
                </Modal>}
            </View>
        )
    }
}