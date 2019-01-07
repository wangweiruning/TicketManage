/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import HomeScreen from './Component/HomeScreen';
import ToastExample from './Component/menu';
import Login from './Component/login';
import Tdetail from './Component/TicketDetail';
import WaitPlan from './Component/waitPlan';
import AddNewT from './Component/AddNewTictets';
import CorrelationPlan from './Component/correlationPlan';
import HistoryPlan from './Component/historyPlan';
import MySorage from './api/storage';
import TicketModel from './Component/TicketModel';
import TicketFlew from './Component/TicketFlew';
import Result from './Component/Result';
import {StackNavigator,TabBarTop,TabNavigator,StackActions,NavigationActions} from "react-navigation";
import {Image,BackHandler,ToastAndroid,StatusBar,Easing,Animated,Alert,NetInfo} from 'react-native';
import {islogin} from './api/api'
import Aboutme from './Component/Aboutme';
import Network from './Component/Network';
import Networks from './Component/Networks';
import Touchlogin from './Component/Touchlogin';
import Touch from './Component/Touchid'
import Nowapp from './Component/Nowapp';
import AddNewTT from './Component/AddNewTictetsTow';
MySorage._getStorage()
window.jconfig={
  userinfo:{},
  usermsg:{}
}

window.config={}

var lastBackPressed;
var current = true;     
console.disableYellowBox = true;
// NetInfo.isConnected.fetch().done((isConnected) => {
//   if(isConnected){}
//   else{
//       ToastAndroid.show('网络错误,请检查网络',ToastAndroid.SHORT)
//     }
// });

const TabRouteConfigs = { // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页�?
  Home: { // 路由名称
      screen: HomeScreen, // 对应的路由页�?
      navigationOptions: ({ navigation }) => ({
          tabBarLabel: '首页',
          tabBarIcon: ({ focused }) => ( 
              <Image resizeMode = 'contain' source = { focused ? require('./images/whome.png') : require('./images/home.png') } style = { { width: 25, height: 25 } }
              />
          )
      }),
  },
  AddNewT: {
      screen: AddNewT,
      navigationOptions: { // 指定路由页面的配置选项
          tabBarLabel: '模板', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
          tabBarIcon: ({ focused }) => ( 
              <Image resizeMode = 'contain' source = { focused ? require('./images/nnne.png') : require('./images/wmode.png') } style = { { width: 28, height: 28 } }
              />
          )
      },
  },
//   MyTicets: {
//       screen: MyTicetss,
//       navigationOptions: { // 指定路由页面的配置选项
//           tabBarLabel: '总览', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
//           tabBarIcon: ({ focused }) => ( 
//               <Image resizeMode = 'contain' source = { focused ? require('./images/cfjj.png') : require('./images/cfj.png') } style = { { width: 25, height: 25 } }
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
  }
};
const TabNavigatorConfigs = {
  initialRouteName: 'Home', // 初始显示的Tab对应的页面路由名�?
  tabBarComponent: TabBarTop, // Tab选项卡组件，�?TabBarBottom �?TabBarTop 两个值，在iOS中默认为 TabBarBottom ，在Android中默认为 TabBarTop �?
  tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'�?bottom'可�?
  lazy: true, // 是否懒加载页�?
  header:null,
  tabBarOptions: {
    indicatorStyle:{backgroundColor:'#0390e8'},
    activeTintColor: "#0390e8",
    inactiveTintColor: "#515151",
    style: {
      backgroundColor: 'white',
        height:60,
    },
    labelStyle: {fontSize: 10, marginTop:8},
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
  waitPlan:{
    screen: WaitPlan,
    path:'app/waitPlan',
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },
  correlationPlan:{
    screen: CorrelationPlan,
    path:'app/correlationPlan',
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },
  historyPlan:{
    screen: HistoryPlan,
    path:'app/historyPlan',
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },  
  AddNewTictets:{
    screen: AddNewT,
    path:'app/AddNewTictets',
    navigationOptions: {
            header: null,
            gesturesEnabled: true
        }
  },
  TicketDetail:{
    screen:Tdetail,
    path:'app/TicketDetail',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  Result:{
    screen:Result,
    path:'app/Result',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
},
  login:{
    screen:Login,
    path:'app/login',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  TicketModel:{
    screen:TicketModel,
    path:'app/TicketModel',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  TicketFlew:{
    screen:TicketFlew,
    path:'app/TicketFlew',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  Aboutme:{
    screen:Aboutme,
    path:'app/Aboutme',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  Network:{
    screen:Network,
    path:'app/Network',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  Networks:{
    screen:Networks,
    path:"app/Networks",
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  Touchlogin:{
    screen:Touchlogin,
    path:'app/Touchlogin',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  Touchid:{
    screen:Touch,
    path:'app/Touchid',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  Nowapp:{
    screen:Nowapp,
    path:'app/Nowapp',
    navigationOptions: {
      header: null,
      gesturesEnabled: true
  }
  },
  AddNewTictetsTow:{
    screen:AddNewTT,
    path:'app/AddNewTictetsTow',
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
    if(ff.form.status==0&&window.jconfig.userinfo!=null && !this.navigator.state.nav.routes[0].routeName == "login"){
     return Alert.alert(
            "登录验证",
            "登录数据过期，请重新登录",
            [
              {text: '去登陆', onPress: () =>{ this.navigator.dispatch(resetAction)}},
            ],
            {cancelable:false}
          )
          }
    BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
}


  componentWillUnmount() {
    // NetInfo.removeEventListener('change', this.handleConnectivityChange);
    BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
  }

  

  // handleConnectivityChange(status) {
  //   alert('status change:' + status);
  // //监听第一次改变后, 可以取消监听.或者在componentUnmount中取消监听
  // NetInfo.removeEventListener('change', this.handleConnectivityChange);
  // }

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
    MySorage._loadAll(["userinfo","history"],(data)=>{
        let res = data[0];
        let info = data[1];
        window.jconfig.userinfo=JSON.parse(res);
        if (!res) {
          let type = "Touchlogin"
          if(!info) type ="login"
            let resetAction = StackActions.reset({
              index: 0,
              actions: [NavigationActions.navigate({ routeName:type})],
            })
          return this.navigator.dispatch(resetAction);
          }
      })
   }catch(e){
      return
   }
  }






  render() {
    return (<React.Fragment>
      <StatusBar backgroundColor={'transparent'} translucent={true} />
      <Navigators ref={(nav)=>{this.navigator = nav}}
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



