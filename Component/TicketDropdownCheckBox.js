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
            activeItem:new Array(this.props.SelectData.length).fill(""),
            defaultChecked:false,
            datas:'',
            ischanges:false,
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
        let activeItem = this.state.activeItem;
        let display = [];
        if(this.props.ischanges&&this.props.banzu!=='班组'){
            activeItem =[];
        }
        for(let i in activeItem){
            if(activeItem[i]){
                display.push(activeItem[i]);
            }
        }
        if(display.length>0){
            return display.join(",");
        }else{
            return '==请选择=='
        }
    }

    onChanegeTextKeyword(text){
        this.timeA(text);
    }

    timeA(text){
     
      if(this.time){
        clearTimeout(this.time)
      }

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
            newData.push(ds);
          }
      }
      this.setState({
        SelectData:newData,
     });

      return;
    }
    

    render(){
        if(!this.props){console.log('dsfgdfsֵ')}
        let {color,fontSize} = {...this.props.TextColor}
        return(<View>
            <TouchableOpacity disabled={this.props.isshow} onPress={()=>this.setState({visible:true})}>
            <View style={{flexDirection:'row',alignItems:'center',...this.props.style,backgroundColor:!this.props.isshow?"rgba(255,255,255,.1)":"rgba(255,255,255,.6)"}}>
                        <Text style={{padding:5,paddingLeft:6.5,flex:1,flexDirection:'row',color:color?color:'lightgray',fontSize:fontSize?fontSize:13}}>{
                            this.open()
                        }</Text>
                    </View>
            </TouchableOpacity>
            {
            this.state.visible && <Modal animationType={'slide'} transparent={true} onRequestClose={()=>{this.setState({visible:false,SelectData:this.props.SelectData})
            this.props.open(this.state.activeItem,this.props.leixin,this.props.banzu)}}>
            <View style={{backgroundColor:'#ecf0f1'}}>
            <View style={{flexDirection:'row',alignItems:'center',borderBottomColor:'lightgray',borderStyle:'solid',borderBottomWidth:1}}>
            <Image style={{left:5,width:16, height:16}}  source={require('../images/serch.png')}/>
            <TextInput maxLength={20} multiline={true} autoFocus={false} onChangeText={this.onChanegeTextKeyword.bind(this)}
                style={{fontSize:13, color: '#999',overflow:'hidden',width:'95%',left:5}}
                placeholder={"请输入"}
            />
            </View>
            </View>
                <FlatList style={{height:100,backgroundColor:'#ecf0f1'}}
                data = {this.state.SelectData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item,index}) =>
                <View key={index} style={{marginLeft:10,marginTop:10,flexDirection:'row',padding:5,width:'95%',height:40,backgroundColor:'white',borderRadius:5}}>
                <Checkbox checked={this.state.activeItem[item.userid || item.DepartmentID]}
                onChange={(e)=>{
                        let s = e.target.checked;
                        if(this.props.ParaName!="班组"){
                            this.state.ischanges=false;
                        }
                        if(s){
                            this.state.activeItem[item.userid || item.DepartmentID] = s?item.realname || item.DepartmentName:'';
                        }
                        else if(this.state.activeItem!==[]){
                            this.state.activeItem[item.userid || item.DepartmentID] = s?item.realname || item.DepartmentName:'';
                        }
                        this.forceUpdate();
                }}>
                <Text style={{width:'100%',left:5,color:'black',fontSize:fontSize?fontSize:18}}>{item.realname || item.DepartmentName}</Text></Checkbox>
                </View>}
                />
                <TouchableOpacity activeOpacity={.7} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#00a6e7',height:50}} 
                    onPress={()=>{
                        this.setState({visible:false,SelectData:this.props.SelectData})
                        this.props.open(this.state.activeItem,this.props.leixin,this.props.banzu)
                    }}>
                    <Text style={{fontSize:18,color:'white'}}>确定</Text>
                </TouchableOpacity>
            </Modal>
            }
            </View>
        )
    }
}