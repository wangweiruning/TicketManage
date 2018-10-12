import React, {Component} from 'react';
import {View, Text, Image, StyleSheet, ScrollView,TouchableOpacity,Alert,Dimensions,Modal,ImageBackground,touchablehighlight} from 'react-native';
import {navigation} from 'react-navigation';
export default class RightTop extends Component{
    constructor(props) {
        super(props);
        this.state = {modalVisible: false};
    }

    // 按压控制显示/隐藏菜单
    _onPressListItem() {
        this.setState((previousState) => {
            return ({
                show: !previousState.show,
            })
        });
    }
    // constructor(props) {
    //     super(props);
    //     this.state = {modalVisible: false};
    //   }
    
      setModalVisible(visible) {
        this.setState({modalVisible: visible});
      }
    render() { 
        const { navigate } = this.props.navigation;
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
          };
        return(
             <View style={{}}>
             <Modal
              //  animationType={"slide"}
               transparent={true}
               visible={this.state.modalVisible}
               onRequestClose={() => {alert("Modal has been closed.")}}
               >
              <View>
               <View style={{position:"relative"}}>
               {/* <Image source={require('./images/righttop.png')} style={{width:'100%',height:"100%"}}/> */}
                 <TouchableOpacity onPress={() => {
                   this.setModalVisible(!this.state.modalVisible)
                 }}>
                   <Image  style={{ width:'100%',height:"100%",marginRight:10}}/>
                 </TouchableOpacity>
                  {/* <Image source={require('./images/lanyabg.png')} style={{position:"absolute",top:40,right:5,width:88,height:84}}/> */}
                  <ImageBackground  style={{position:"absolute",top:40,right:5,width:88,height:84,flexDirection:"column"}}>     
                      <TouchableOpacity 
                          > 
                        <View style={{width:88,height:42,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                          <Image style={{width:17,height:20}}/>
                          <Text style={{marginLeft:5}}>监控管理</Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                          > 
                        <View style={{width:88,height:42,flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                          <Image style={{width:12,height:20}}/>
                          <Text style={{marginLeft:5}}>蓝牙管理</Text>
                        </View>
                      </TouchableOpacity>
                      
                  </ImageBackground>
               </View>
              </View>
             </Modal>
     
             <TouchableOpacity onPress={() => {
               this.setModalVisible(true)
             }}>
               <Image  style={{ width:15, height: 15,marginRight:10 }}/>
             </TouchableOpacity>
     
           </View>
        )
    }
}