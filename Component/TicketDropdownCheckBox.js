import React from 'react';
import {Checkbox} from 'antd-mobile-rn';
import {View,Text,Image,TouchableOpacity,Modal,TextInput,FlatList} from 'react-native';



export default class TicketDropdownCheckBox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            SelectData:this.props.SelectData,
            selected: '',
            show:false,
            text:'',
            activeItem:[],
            defaultChecked:false,
            datas:'',
            ischanges:false,
            activeItemObj:{},
        }
    }
    
    
    componentWillReceiveProps(nextProps){
        this.state.ischanges=nextProps.ischanges
        this.state.SelectData=nextProps.SelectData;
        if(this.props.banzu!="班组"&&this.state.ischanges){
            this.state.activeItem=[]
        }       
        this.forceUpdate()  
  }

    open(){
        let activeItem = this.state.activeItemObj;
        let display = [];
        if(this.props.ischanges&&this.props.banzu!=='班组'){
            activeItem ={};
        }
        for(let i in activeItem){
            if(activeItem[i]){
                display.push(activeItem[i]);
            }
        }
        if(display.length>0){
            return display.join(",");
        }else{
            return !this.props.isshow?'请选择':''
        }
    }

    onChanegeTextKeyword(text){
        if(!text){
            this.setState({
                SelectData:this.props.SelectData,
            });
            return;
        }
        let newData = [];
        for (var i = 0; i < this.props.SelectData.length; i++) {
          let ds = this.props.SelectData[i];
          if((ds.realname && ds.realname.indexOf(text)!=-1) || (ds.DepartmentName && ds.DepartmentName.indexOf(text)!=-1)){
                newData.push(ds)
          }
        }
    
        this.setState({
          SelectData:newData,
        });
        return
    }
    
    testBlur(){
        this.refs.inputWR.blur();
    }


    render(){
        if(!this.props){console.log('dsfgdfsֵ')}
        let {color,fontSize} = {...this.props.TextColor}
        return(<View>
            <TouchableOpacity disabled={this.props.isshow} onPress={()=>this.setState({visible:true})}>
            <View style={{flexDirection:'row',alignItems:'center',...this.props.style,backgroundColor:'white'}}>
                <Text style={{minWidth:'10%',maxWidth:'90%',paddingTop:5,paddingBottom:5,flexDirection:'row',color:color?color:'lightgray',fontSize:fontSize?fontSize:13}}>
                   {this.open()}
                </Text>
                   <Image source={require('../images/goto.png')} style={{width:20,height:20}}/>
            </View>
            </TouchableOpacity>
            {this.state.visible && <Modal animationType={'slide'} transparent={true} onRequestClose={()=>{this.testBlur();this.setState({visible:false,SelectData:this.props.SelectData})
            let activeItemObj = this.state.activeItemObj;
            let actives=[];
            for(let i in activeItemObj){
                if(!!activeItemObj[i]){
                    actives[i] = activeItemObj[i];
                }
            } 
            this.props.open(actives,this.props.leixin,this.props.banzu)}}>
            <View style={{backgroundColor:'rgba(0,0,0,.3)',width:'100%',height:'100%'}}>
            <TouchableOpacity style={{width:'100%',height:'40%'}} onPress={()=>{this.setState({visible:false,SelectData:this.props.SelectData});this.props.open(this.state.activeItem,this.props.leixin,this.props.banzu)}}></TouchableOpacity>
            <View style={{width:'100%',backgroundColor:'white',height:'60%',borderTopStartRadius:5,borderTopEndRadius:5}}>
            <View style={{flexDirection:'row',padding:7,justifyContent:'flex-end'}}>
            <Text style={{elevation:3,backgroundColor:'#0390e8',textAlign:'center',width:50,color:'white',borderRadius:5,fontSize:15,padding:5}} onPress={()=>{
             this.setState({visible:false,SelectData:this.props.SelectData})
             let activeItemObj = this.state.activeItemObj;
             let actives={};
             for(let i in activeItemObj){
                if(!!activeItemObj[i]){
                    actives[i] = activeItemObj[i];
                }
             } 
             this.props.open(actives,this.props.leixin,this.props.banzu)}}>
             确定
            </Text>
            </View>
            <View style={{width:'100%',height:45,justifyContent:'center',alignItems:'center',backgroundColor:'#0390e8'}}>
            <View style={{backgroundColor:'rgba(0,0,0,.3)',width:'97%',flexDirection:'row',borderRadius:15,alignItems:'center',height:30}}>
            <Image source={require('../images/ssserch.png')} style={{width:20,height:20,marginLeft:8,marginRight:5}}/>
            <TextInput onSubmitEditing={()=>this.testBlur()} ref="inputWR" underlineColorAndroid={'transparent'} autoFocus={false} onChangeText={(e)=>this.onChanegeTextKeyword(e)}
                style={{fontSize:13, color: '#f5f5f5',overflow:'hidden',width:'98%',height:'100%',padding:0}}
                placeholder="请输入" placeholderTextColor='#f5f5f5'
            />
            </View>
            </View>
            <FlatList style={{height:'100%',marginTop:8}} data = {this.state.SelectData} keyExtractor={(item, index) => index.toString()}
                renderItem={({item,index}) =>{
                    let isChecked = this.state.activeItemObj[item.userid || item.DepartmentID];
                    if(isChecked == undefined){
                        isChecked = this.state.activeItemObj[item.userid || item.DepartmentID] = false;
                    }
                    return(<View key={index} style={{marginLeft:9,marginBottom:8,flexDirection:'row',padding:5,width:'95%',height:40,borderRadius:5,backgroundColor:'#e3e3e3'}}>
                    <Checkbox checked={!!isChecked}
                    onChange={(e)=>{
                            let s = e.target.checked;
                            if(this.props.ParaName!="班组"){
                                this.state.ischanges=false;
                            }
                            this.state.activeItemObj[item.userid || item.DepartmentID] = s?(item.realname || item.DepartmentName):null;
                            this.forceUpdate();
                    }}>
                    <Text style={{width:'100%',left:5,color:'black',fontSize:fontSize?fontSize:18}}>{item.realname || item.DepartmentName}</Text></Checkbox>
                    </View>)
                }}
                />
            </View>
            </View>
            </Modal>}
        </View>
        )
    }
}