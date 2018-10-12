import React from 'react';
import NavigationBar from './NavigationBar';
import {View,Text} from 'react-native';


export default class ToastExample extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {

  }

  render() {
    return (<View>
      <NavigationBar navigation={this.props.navigation} centertext={'我的'}/>
      </View>);
  }
}