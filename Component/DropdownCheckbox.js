import React from 'react';
import {Checkbox,Button} from 'antd-mobile-rn'
import {View,Text,Image,TouchableOpacity,ScrollView,Modal} from 'react-native';



export default class DropdownCheckbox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            SelectData:this.props.SelectData,
            selected: '',
            show:false,
            activeItem:new Array(this.props.SelectData.length).fill(""),
        }
    }
    onSelect = (value) => {
        this.setState({
          visible: false,
          selected: value,
        });
    }


    componentWillReceiveProps(nextProps){
        this.setState({SelectData:this.props.SelectData});
    }

    open(){
        let activeItem = this.state.activeItem;
        let display = [];

        for(let i in activeItem){
            if(activeItem[i]){
                display.push(activeItem[i]);
            }
        };

        if(display.length>0){
            return display.join(",");
        }else{
            return "请选择"
        }
    }

    render(){
        if(!this.props){console.log('没有传值')}
        let {color,fontSize} = {...this.props.TextColor}
        return(
            <View style={{...this.props.style}}>
             <TouchableOpacity onPress={()=>this.setState({visible:true})}>
             <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{padding:5,flex:1,flexDirection:'row',color:color?color:'gray',fontSize:fontSize?fontSize:18}}>{
                            this.open()
                        }</Text>
                    </View>
            </TouchableOpacity>
            {
              this.state.visible && 
              <Modal animationType={'slide'} transparent={true} onRequestClose={()=>console.log('弹框打开')}>
                <ScrollView style={{
                width:"100%",
                height:100,
                backgroundColor:'white'}}>
                {
                    this.state.SelectData.map((v,i)=>
                    <View key={i} style={{flexDirection:'row',padding:5,backgroundColor:'skyblue'}}>
                                    <Checkbox checked={!!this.state.activeItem[i]} onChange={(e)=>{
                                            let s = e.target.checked;
                                            this.state.activeItem[i] = s?v:"";
                                            this.forceUpdate();
                                    }} /><Text style={{color:color?color:'gray',fontSize:fontSize?fontSize:18}}>{v}</Text> 
                    </View>) 
                }
                </ScrollView>
                <Button onClick={()=>this.setState({visible:false})}>关闭</Button>
              </Modal>
            }
            </View>
        )
    }
}