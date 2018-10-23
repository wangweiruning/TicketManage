import React from 'react';
import {Checkbox} from 'antd-mobile-rn'
import {View,Text,Image,TouchableOpacity} from 'react-native';



export default class DropdownCheckbox extends React.Component{
    constructor(props){
        super(props)
        this.state={
            SelectData:this.props.SelectData,
            selected: '',
            show:false,
            activeItem:new Array(this.props.SelectData.length).fill("")
        }
    }
    onSelect = (value) => {
        this.setState({
          // visible: false,
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
        
        return(
            <View style={{backgroundColor:"white"}}>
                  <TouchableOpacity activeOpacity={0.5} onPress={()=>{
                            this.setState({show:!this.state.show});
                        }}>
                      <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{padding:5,flex:1}} >{
                            this.open()
                        }</Text>
                        <Image source={this.state.show?require('../images/jian1.png'):require('../images/jian.png')} style={{width:15,height:15,right:5}} />
                    </View>
                  </TouchableOpacity>
                  {
                    <View style={{display:this.state.show?"flex":"none"}}>
                          { 
                            this.state.SelectData.map((v,i)=>
                                <View key={i} style={{flexDirection:'row',padding:5}}>
                                    <Checkbox onChange={(e)=>{
                                         let s = e.target.checked;
                                            this.state.activeItem[i] = s?v:"";
                                            this.forceUpdate();
                                    }} /><Text>{v}</Text>
                                </View>
                                )
                          }
                       </View>
                  }
            </View>
        )
    }
}