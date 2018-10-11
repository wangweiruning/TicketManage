import React from 'react';
import { ScrollView, View ,Text} from 'react-native';

export default class FlexExample extends React.Component {
  render() {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: '#f5f5f9' }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
      <View>
        <Text>555555555555555</Text>
      </View>
      </ScrollView>
    );
  }
}