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
import TicketFlew from './Component/TicketFlew';
import Result from './Component/Result';
import {StackNavigator,TabBarTop, TabNavigator,StackActions, NavigationActions} from "react-navigation";
import {Image,BackHandler,ToastAndroid,StatusBar,Easing,Animated,Alert} from 'react-native';
import {islogin} from './api/api'
MySorage._getStorage()
window.jconfig={
  userinfo:{},
  usermsg:{}
}
const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'login' })],
});
    var lastBackPressed;
    var current = true;
console.disableYellowBox = true;
const TabRouteConfigs = { // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页�?
  Home: { // 路由名称
      screen: HomeScreen, // 对应的路由页�?
      navigationOptions: ({ navigation }) => ({
          tabBarLabel: '管理',
          tabBarIcon: ({ focused }) => ( 
              <Image resizeMode = 'contain' source = { focused ? require('./images/whome.png') : require('./images/home.png') } style = { { width: 25, height: 25 } }
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
              <Image resizeMode = 'contain' source = { focused ? require('./images/wmy.png') : require('./images/my.png') } style = { { width: 25, height: 25 } }
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
  tabBarComponent: TabBarTop, // Tab选项卡组件，�?TabBarBottom �?TabBarTop 两个值，在iOS中默认为 TabBarBottom ，在Android中默认为 TabBarTop �?
  tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'�?bottom'可�?
  lazy: true, // 是否懒加载页�?
  header:null,
  tabBarOptions: {
    indicatorStyle:{backgroundColor:'white'},
    activeTintColor: "white",
    inactiveTintColor: "white",
    style: {
      backgroundColor: '#0b1b34',
        height:60,
    },
    labelStyle: {fontSize: 10, marginTop:10},
    IconStyle: {margin: 0},
    showIcon: true,
    pressOpacity: 1,
    tabStyle: {
        
    }
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
    path:'app/waitPlan',
    header: null,
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },
  correlationPlan:{
    screen: CorrelationPlan,
    path:'app/correlationPlan',
    header: null,
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },
  historyPlan:{
    screen: HistoryPlan,
    path:'app/historyPlan',
    header: null,
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },  
  newticket:{
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
  TicketFlew:{
    screen:TicketFlew,
    path:'app/TicketFlew',
    header:null,
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  }
};

const StackNavigatorConfigs={
  initialRouteName:'Tab',
  headerMode:'none',
  transitionConfig: () => ({
    transitionSpec: {
        duration: 300,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
        const {layout, position, scene} = sceneProps;
        const {index} = scene;
        const Width = layout.initWidth;
        //沿X轴平移
        const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [Width, 0, -(Width - 10)],
        });
        //透明度
        const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1],
        });
        return {opacity, transform: [{translateX}]};
    }
})
};

const Navigators = StackNavigator(StackRouteConfigs,StackNavigatorConfigs);


export default class App extends Component {

  async componentDidMount () {
    await this.getUserInfo()
  }

 async componentWillMount(){
    let d="?code=50ACD07A6C49F3B9E082EF40461AC6D1";
    let ff= await islogin(d);
    console.log(ff,'qqqqqqqqqqqqqqq')
    if(ff.form.status==0){
      Alert.alert("","登录信息已过期，请重新登录",[
        {text:'去登录',onPress:()=>this.navigator.dispatch(resetAction)}
      ],
      {cancelable:false}
      )
    }
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
}


  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
}

// onBackAndroid = () => {
//   this.props.navigator.pop();

//   // if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
//   //     //最近2秒内按过back键，可以退出应用。
//   //     BackHandler.exitApp();
//   //     return;
//   // }
//   // this.lastBackPressed = Date.now();
//   // ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
//   // return true;
//  }
 onBackAndroid = () => {
  if (current == true) {//如果是在首页
      if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
          //最近2秒内按过back键，可以退出应用。
          BackHandler.exitApp();
          return false;
      }

      lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true;
   } else {
      if (this.props && this.props.navigation) {
      this.props.navigator.pop();
   }
  }
}

async getUserInfo () {
  try {
    new Promise((s1, s2) => {
    MySorage._load("userinfo", (res) => {
      let info = JSON.parse(res);
      window.jconfig.userinfo=info;
      console.log(res,info,'ssssssssssss')
      if(!info){
        this.navigator.dispatch(resetAction);
        return
      }
    })
   })
  }
   catch(e){
      return
   }
   
  }

  render() {
    return (<React.Fragment>
      <StatusBar backgroundColor={'transparent'} translucent={true}/>
      <Navigators ref={(nav)=>{
        this.navigator = nav;
      }} configureScene={(route) => {
          // return Navigator.SceneConfigs.VerticalDownSwipeJump; // 底部弹出
    }}
    onNavigationStateChange={(prevState, newState, action) => {//注册路由改变监听事件
      if (newState && newState.routes[newState.routes.length - 1].routeName == 'Tab') {//如果当前路由是Home页面，则需要处理安卓物理返回按键。
          current = true;
      } else {
          current = false;
      }
    }}        
    renderScene={(route, navigator) => {
        let Component = route.component;
        Component.navigator = navigator;
        if (route.component) {
            return <Component {...route.params} navigator={navigator}/>
        }
    }} 
  />
    </React.Fragment>);
  }
}

