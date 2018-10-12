import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';

export default class ActivityIndicatorExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
  }


  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <TouchableOpacity onPress={()=> navigate('litile')}>
         <Text>23423424</Text>
      </TouchableOpacity>
      </View>
    );
  }
}
