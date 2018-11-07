import React from 'react';
import {Checkbox} from 'antd-mobile-rn';
import * as Animatable from 'react-native-animatable';
import {View,Text,Image,TouchableOpacity,Modal,TextInput,FlatList} from 'react-native';



export default class DropdownCheckbox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            SelectData:this.props.SelectData,
            selected: '',
            show:false,
            text:'',
            default:this.props.defaultValue,
            activeItem:new Array(this.props.SelectData.length).fill(""),
            defaultChecked:false,
            datas:''
        }
    }
    

    onSelect = (value) => {
        this.setState({
          visible: false,
          selected: value,
        });
    } 
    
    componentWillReceiveProps(nextProps){
            this.setState({default:nextProps.defaultValue,SelectData:nextProps.SelectData})
           if(nextProps.SelectData.length>0 && nextProps.defaultValue!=undefined){
            nextProps.SelectData.map(item=>{
                let listOne = item.userid?item.userid:item.id;
                let alls = nextProps.defaultValue;
                console.log(listOne,alls,"4444444444444444444444")
                if (alls.indexOf(listOne)!=-1) {
                     this.state.activeItem[item.userid||item.id] = (item.realname||item.departmentName);
                this.forceUpdate()
                }
            })
        }
    }


    open(){
        let activeItem = this.state.activeItem;
        let display = [];
        console.log(activeItem,"vvvvvvvvvcccccccc")
   
        for(let i in activeItem){
            if(activeItem[i]){
                display.push(activeItem[i]);
            }
        };

        if(display.length>0){
            return display.join(",");
        }else{
            return '请选择'
        }
    }


    handleInput(k, v){
        this.setState({
            [k]: v
        });
    }


    onChanegeTextKeyword(text){
        this.timeA(text);
    }

    timeA(text){
     
      if(this.time){
        clearTimeout(this.time)
      }
      
      this.time = setTimeout(()=>{
        if (text==='') {
              this.setState({
                SelectData:this.props.SelectData,
                });
            return;
        }else{
            for (var i = 0; i < this.props.SelectData.length; i++) {
               if (this.props.SelectData[i].realname===text ||this.props.SelectData[i].departmentName ===text) {
                    this.setState({
                        SelectData:[this.props.SelectData[i]],
                    });
                return;
        }else{
             this.setState({
                SelectData:[]
              });
        }

        }
        }
        });
        }
    

    render(){
        if(!this.props){console.log('dsfgdfsֵ')}
        let {color,fontSize} = {...this.props.TextColor}
        console.log(this.state.SelectData,"fffffffffddddddd")
        return(
            <View>
            <TouchableOpacity disabled={this.props.isshow} onPress={()=>this.setState({visible:true})}>
            <View style={{flexDirection:'row',alignItems:'center',...this.props.style}}>
                        <Text style={{backgroundColor:this.props.isshow?'#cccfff':"#fffeee",padding:5,flex:1,flexDirection:'row',color:color?color:'gray',fontSize:fontSize?fontSize:18}}>{
                            this.open()
                        }</Text>
                    </View>
            </TouchableOpacity>
            {
            this.state.visible && 
            <Modal animationType={'slide'} transparent={true} onRequestClose={()=>console.log('关闭')}>
            <View style={{backgroundColor:'#ecf0f1',}}>
            <View style={{flexDirection:'row',alignItems:'center',borderBottomColor:'lightgray',borderStyle:'solid',borderBottomWidth:1}}>
            <Image style={{left:5,width:16, height:16}}  source={require('../images/serch.png')}/>
            <TextInput 
                maxLength={20}
                multiline={true}
                autoFocus={false}
                onChangeText={this.onChanegeTextKeyword.bind(this)}
                style={{fontSize:13, color: '#999',overflow:'hidden',width:'95%',left:5}}
                placeholder={"请输入"}
            />
            </View>
            </View>
                <FlatList style={{height:100,backgroundColor:'#ecf0f1'}}
                data = {this.state.SelectData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item,index}) =>
                <Animatable.View useNativeDriver animation="fadeInRight" easing="ease-out-quart"><View key={index} style={{marginLeft:10,marginTop:10,flexDirection:'row',padding:5,width:'95%',height:40,backgroundColor:'white',borderRadius:5}}>
                <Checkbox checked={this.state.activeItem[item.userid ||item.id]}
                onChange={(e)=>{
                        let s = e.target.checked;
                        this.state.activeItem[item.userid||item.id] = s?(item.realname||item.departmentName):"";
                        this.forceUpdate();
                }}>
                <Text style={{width:'100%',left:5,color:color?color:'gray',fontSize:fontSize?fontSize:18}}>{item.realname ||item.departmentName}</Text></Checkbox>
                </View></Animatable.View>}
                />
                <TouchableOpacity activeOpacity={.7} style={{justifyContent:'center',alignItems:'center',backgroundColor:'#00a6e7',height:50}} 
                    onPress={()=>{
                        this.setState({visible:false,SelectData:this.props.SelectData})
                        this.props.open(this.state.activeItem,this.props.leixin)}
                    }>
                    <Text style={{fontSize:18,color:'white'}}>确定</Text>
                </TouchableOpacity>
            </Modal>
            }
            </View>
        )
    }
}