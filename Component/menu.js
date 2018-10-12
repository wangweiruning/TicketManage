import React from 'react';
import { DeviceEventEmitter ,View,Text} from 'react-native';


export default class ToastExample extends React.Component {
  constructor(props){
    super(props)
  }
  componentDidMount() {
    DeviceEventEmitter.addListener('navigatorBack', () => {
    });
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }


  render() {
    return (
          <View>
            <Text>777777777</Text>
          </View>
    );
  }
}