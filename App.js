/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import HomeScreen from './Component/HomeScreen';
import ToastExample from './Component/menu';
import ActivityIndicatorExample from './Component/NewsScreen';
import FlexExample from './Component/flex';
import Litile from './Component/litile';
import {StackNavigator, TabBarBottom, TabNavigator} from "react-navigation";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

console.disableYellowBox = true;
const TabRouteConfigs = { // 表示各个页面路由配置,让导航器知道需要导航的路由对应的页�?
  Home: { // 路由名称
      screen: HomeScreen, // 对应的路由页�?
      navigationOptions: ({ navigation }) => ({
          header:null,
          headerMode:"none",
          tabBarLabel: '管理',
          tabBarIcon: ({ focused }) => ( 
              <Image resizeMode = 'contain' source = { focused ? require('./images/whome.png') : require('./images/home.png') } style = { { width: 20, height: 20 } }
              />
          )
      }),
  },
  ActivityIndicatorExample: {
      screen: ActivityIndicatorExample,
      navigationOptions: { // 指定路由页面的配置选项
          tabBarLabel: '查询', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
          tabBarIcon: ({ focused }) => ( 
              <Image resizeMode = 'contain' source = { focused ? require('./images/wmode.png') : require('./images/moda.png') } style = { { width: 20, height: 20 } }
              />
          )
      },
  },
  ToastExample: {
      screen: ToastExample,
      navigationOptions: { // 指定路由页面的配置选项
          tabBarLabel: '信息', // 可用作头部标�?headerTitle ，或者Tab标题 tabBarLabel
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
  }
};

const StackNavigatorConfigs={
  initialRouteName:'Tab',
  headerMode:'none',
};

const Navigators = StackNavigator(StackRouteConfigs,StackNavigatorConfigs);


export default class App extends Component {
  render() {
    return (
      <Navigators configureScene={(route) => {
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

