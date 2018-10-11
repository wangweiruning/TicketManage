import React from 'react';
import {Text,View,ScrollView,Image,TouchableOpacity,Alert} from 'react-native';

export default class HomeScreen extends React.Component {
  constructor(props){
    super(props)
    this.state={
      id:'',
      avater:'',
      log:false
    }
  }

  async componentDidMount(){
     
  }



  render() {
      const { navigate } = this.props.navigation;
      return (
        <ScrollView>
          
        </ScrollView>
      );
    }
  }