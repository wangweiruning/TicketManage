/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import HomeScreen from './Component/HomeScreen';
import ToastExample from './Component/menu';

import Newticket from './Component/newticket';
import Login from './Component/login';
import Tdetail from './Component/TicketDetail';
import Litile from './Component/litile';
import WaitPlan from './Component/waitPlan';
import CorrelationPlan from './Component/correlationPlan';
import HistoryPlan from './Component/historyPlan';
import MySorage from './api/storage';
import TicketModel from './Component/TicketModel';
// import TicketFlew from './Component/TicketFlew';
import Result from './Component/Result';
import {StackNavigator, TabBarBottom, TabNavigator,StackActions, NavigationActions} from "react-navigation";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,BackHandler,ToastAndroid
} from 'react-native';
MySorage._getStorage()
window.jconfig={
  userinfo:{},
  usermsg:{}
}
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login' })],
});
console.disableYellowBox = true;
const TabRouteConfigs = { // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页�?
  Home: { // 路由名称
      screen: HomeScreen, // 对应的路由页�?
      navigationOptions: ({ navigation }) => ({
          tabBarLabel: '管理',
          tabBarIcon: ({ focused }) => ( 
              <Image resizeMode = 'contain' source = { focused ? require('./images/whome.png') : require('./images/home.png') } style = { { width: 20, height: 20 } }
              />
          )
      }),
  },
//   ActivityIndicatorExample: {
//       screen: ActivityIndicatorExample,
//       navigationOptions: { // 指定路由页面的配置选项
//           tabBarLabel: '查询', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
//           tabBarIcon: ({ focused }) => ( 
//               <Image resizeMode = 'contain' source = { focused ? require('./images/wmode.png') : require('./images/moda.png') } style = { { width: 20, height: 20 } }
//               />
//           )
//       },
//   },
  ToastExample: {
      screen: ToastExample,
      navigationOptions: { // 指定路由页面的配置选项
          tabBarLabel: '我的', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
          tabBarIcon: ({ focused }) => ( 
              <Image resizeMode = 'contain' source = { focused ? require('./images/wmy.png') : require('./images/my.png') } style = { { width: 20, height: 20 } }
              />
          )
      },
  },
  // FlexExample: {
  //     screen: FlexExample,
  //     navigationOptions: { // 指定路由页面的配置选项
  //         tabBarLabel: 'wo', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
  //         tabBarIcon: ({ focused }) => ( 
  //             <Image resizeMode = 'contain' source = { focused ? require('./images/cfjj.png') : require('./images/cfj.png') } style = { { width: 20, height: 20 } }
  //             />
  //         )
  //     },
  // }
};
const TabNavigatorConfigs = {
  initialRouteName: 'Home', // 初始显示的Tab对应的页面路由名�?
  tabBarComponent: TabBarBottom, // Tab选项卡组件，�?TabBarBottom �?TabBarTop 两个值，在iOS中默认为 TabBarBottom ，在Android中默认为 TabBarTop �?
  tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'�?bottom'可�?
  lazy: true, // 是否懒加载页�?
  header:null,
  tabBarOptions: {
      activeBackgroundColor:'#0C97E2',
     inactiveBackgroundColor:'#c1c1c1',
     activeTintColor: 'white',
     inactiveTintColor:'black',
      labelStyle: { fontSize: 10, margin: 0 },
      IconStyle: { margin: 0 },
      showIcon: true,
      pressOpacity: 1,
      tabStyle: {
          // backgroundColor: '#0C97E2',
      },
  } // 在属性TabBarBottom与TabBarTop中有所不同
};
const Tab = TabNavigator(TabRouteConfigs, TabNavigatorConfigs);

const StackRouteConfigs={
  Tab: {
      screen: Tab,
  },
  litile:{
    screen: Litile,
    path:'app/litile',
    header: null,
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },
  waitPlan:{
    screen: WaitPlan,
    path:'app/waitPlan'
  },
  correlationPlan:{
    screen: CorrelationPlan,
    path:'app/correlationPlan'
  },
  historyPlan:{
    screen: HistoryPlan,
    path:'app/historyPlan'
  },  newticket:{
    screen: Newticket,
    path:'app/newticket',
    header: null,
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },
  TicketDetail:{
      screen:Tdetail,
      path:'app/TicketDetail',
      header:null,
      navigationOptions: {
        header: null,
        gesturesEnabled: true
    }
  },
  Result:{
    screen:Result,
    path:'app/Result',
    header:null,
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
},
  login:{
    screen:Login,
    path:'app/login',
    header:null,
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  TicketModel:{
    screen:TicketModel,
    path:'app/TicketModel',
    header:null,
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  // TicketFlew:{
  //   screen:TicketFlew,
  //   path:'app/TicketFlew',
  //   header:null,
  //   navigationOptions: {
  //     header: null,
  //     gesturesEnabled: true
  // }
  // }
};

const StackNavigatorConfigs={
  initialRouteName:'Tab',
  headerMode:'none',
};

const Navigators = StackNavigator(StackRouteConfigs,StackNavigatorConfigs);


export default class App extends Component {

  async componentDidMount () {
    let s = await this.getUserInfo();
    console.log("------------>",s);
   //  this.navigator.dispatch(resetAction);
    
  }

  componentWillMount(){
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
}


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
}

onBackAndroid = () => {
  if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
      //最近2秒内按过back键，可以退出应用。
      BackHandler.exitApp();
      return;
  }
  this.lastBackPressed = Date.now();
  ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
  return true;
 }

  async getUserInfo () {
  //  try {
  //    console.log('_')
  //   MySorage._load("userinfo",async (res) => {
  //     console.log("登录信息:",res);
  //     let info = JSON.parse(res);
  //     // if(!info){
  //     //   this.navigator.dispatch(resetAction);
  //     // }
  //     window.jconfig.userinfo=info;
  //     console.log("sasaasasa",info)
  //   })
  //  } catch (error) {
  //    console.log("rrrrrrrrrr:",error)
  //  }
  try {
   return new Promise((s1, s2) => {
    MySorage._load("userinfo", (res) => {
              console.log("登录信息:",res);
      let info = JSON.parse(res);
      if(!info){
        this.navigator.dispatch(resetAction);
        return
      }
      window.jconfig.userinfo=info;
      console.log("sasaasasa",info)
    });
   });}
   catch(e){
      console.log(e,'ghhhggg')
   }
  }

  render() {
    return (
      <Navigators ref={(nav)=>{
        this.navigator = nav;
      }} configureScene={(route) => {
        return Navigator.SceneConfigs.HorizontalSwipeJumpFromRight;
    }}
    renderScene={(route, navigator) => {
        let Component = route.component;
        Component.navigator = navigator;
        if (route.component) {
            return <Component {...route.params} navigator={navigator}/>
        }
    }} 
  />
    );
  }
}

