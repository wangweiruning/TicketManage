/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react'
import {Image,StatusBar,Easing,Animated} from 'react-native';
import {createSwitchNavigator,createStackNavigator,TabBarTop,createTabNavigator} from "react-navigation";
import HomeScreen from './Component/HomeScreen';
import Me from './Component/menu';
import AddNewT from './Component/AddNewTictets';
import Tdetail from './Component/TicketDetail';
import WaitPlan from './Component/waitPlan';
import CorrelationPlan from './Component/correlationPlan';
import HistoryPlan from './Component/historyPlan';
import {islogin} from './api/api';
import Aboutme from './Component/Aboutme';
import Network from './Component/Network';
import Networks from './Component/Networks';
import Touchlogin from './Component/Touchlogin';
import TicketModel from './Component/TicketModel';
import TicketFlew from './Component/TicketFlew';
import Result from './Component/Result';
import AddNewTT from './Component/AddNewTictetsTow';
import AuthLoadingScreen from './Auth'
import Touchid from './Component/Touchid'
import Login from './Component/login';

// async function checklogin(){
//     let d = `?code=50ACD07A6C49F3B9E082EF40461AC6D1`;
//     let ff = await islogin(d);
//     if(ff.form.status==0&&window.jconfig.userinfo!=null){
//       return this.navigator.dispatch(resetAction)
//       }
// }
// checklogin()
const RouteConfig = { // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页�?
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
    Me: {
        screen: Me,
        navigationOptions: { // 指定路由页面的配置选项
            tabBarLabel: '我的', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
            tabBarIcon: ({ focused }) => ( 
                <Image resizeMode = 'contain' source = { focused ? require('./images/wmy.png') : require('./images/my.png') } style = { { width: 25, height: 25 } }
                />
            )
        },
    }
  };
  const TabNavigatorConfig = {
    initialRouteName: 'Home', // 初始显示的Tab对应的页面路由名�?
    tabBarComponent: TabBarTop, // Tab选项卡组件，�?TabBarBottom �?TabBarTop 两个值，在iOS中默认为 TabBarBottom ，在Android中默认为 TabBarTop �?
    tabBarPosition: 'bottom', // 设置选项卡的位置，在顶部或是底部，有'top'�?bottom'可�?
    lazy: true, // 是否懒加载页�?
    header:null,
    backBehavior: 'none',
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
      pressOpacity:1,
      tabStyle: {
          
      }
    } // 在属性TabBarBottom与TabBarTop中有所不同
  };
  
const Tab = createTabNavigator(RouteConfig, TabNavigatorConfig);
const RouteConfigs={
    Tab: {
      screen: Tab,
    },
    waitPlan:{
      screen: WaitPlan,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    correlationPlan:{
      screen: CorrelationPlan,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    historyPlan:{
      screen: HistoryPlan,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },  
    AddNewTictets:{
      screen: AddNewT,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    TicketDetail:{
      screen:Tdetail,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    Result:{
      screen:Result,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    TicketModel:{
      screen:TicketModel,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    TicketFlew:{
      screen:TicketFlew,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    Aboutme:{
      screen:Aboutme,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    Network:{
      screen:Network,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    },
    AddNewTictetsTow:{
      screen:AddNewTT,
      navigationOptions: {
              header: null,
              gesturesEnabled: true
          }
    }
  };
  
  
  
  const StackNavigatorConfig={
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
  
const Navigators = createStackNavigator(RouteConfigs,StackNavigatorConfig);

const Auths = createStackNavigator({
    login:{
      screen:Login,
      navigationOptions: {
          header: null,
          gesturesEnabled: true
    }
  },
     Networks:{
      screen:Networks,
      navigationOptions: {
          header: null,
          gesturesEnabled: true
    }
  }
},{initialRouteName:'login'})

const SwitchNav = createSwitchNavigator({
    AuthLoadingScreen:AuthLoadingScreen,
    Auth: Auths,
    App: Navigators,
    Touch: Touchlogin,
    Touchid: Touchid
  },{
    initialRouteName:'AuthLoadingScreen',
  });
  
  
export default class App extends React.Component{
    render() {
        return (<React.Fragment>
            <StatusBar backgroundColor='transparent' translucent={true} />
          <SwitchNav />
        </React.Fragment>);
      }
};