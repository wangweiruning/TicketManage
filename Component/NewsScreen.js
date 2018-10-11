import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ActivityIndicatorExample extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
    this.loadingToast = this.loadingToast.bind(this);
  }

  componentWillUnmount() {
    clearTimeout(this.closeTimer);
  }

  loadingToast() {
    this.setState({ animating: !this.state.animating });
    // this.closeTimer = setTimeout(() => {
      this.setState({ animating: !this.state.animating });
    // }, 2000);
  }

  render() {
    return (
      <View style={[styles.demo]}>
      <Text>444444444444444</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  demo: {
    marginTop: 20,
  },
  darkBg: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 89,
    height: 89,
    backgroundColor: '#2B2F42',
  },
  gray: {
    backgroundColor: '#CCC',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
});