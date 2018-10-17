import React from 'react';
import Title from './Title';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    ListView,
    TouchableHighlight,
    Alert,
    Dimensions,
    ActivityIndicator,
    RefreshControl,
  } from 'react-native';

import Scroller from './Scroller'
import CreationItem from './CreationItem'
import {quanxian} from './../api/api'
let {width} = Dimensions.get("window");

// 缓存列表中所有数据
let cachedResults = {
    nextPage: 1, // 下一页
    items: [], // listview 数据(视频列表)
    total: 0 // 总数
  };

export default class Litile extends React.Component{
    constructor(props){
        super(props);
        let ds = new ListView.DataSource({
            // 比较两条数据是否是一样的,来判断数据是否发生改变
            rowHasChanged: (r1, r2) => r1 !== r2
          });
          this.state = {
            dataSource: ds.cloneWithRows([]),
            isLoadingTail: false, // loading?
            isRefreshing: false // refresh?
          }
        }
    // 生命周期-组件挂载完毕 请求数据
  componentDidMount() {
    this._fetchData(1);
  }
 
  // 请求数据
 async _fetchData(page) {
    if(!jconfig.userinfo) return ToastAndroid.show('请登录',ToastAndroid.SHORT);
    let that = this;
 
    if (page !== 0) { // 加载更多操作
      this.setState({
        isLoadingTail: true
      });
    } else { // 刷新操作
      this.setState({
        isRefreshing: true
      });
      // 初始哈 nextPage
      cachedResults.nextPage = 1;
    }
       const datas = "?form.jqgrid_row_selected_id=cc55ac4474df44d18b55b5ec454749fb";
        // data 变化的新数据
       const data = await quanxian(datas);
        if (data.form.templateContents) {
            const dataPage = data.form.templateContents;
            // 保存原数据
            let items = cachedResults.items.slice();
            if (page !== 0) { // 加载更多操作
            // 数组拼接
            items = items.concat(dataPage);
            cachedResults.nextPage += 1;
            } else { // 刷新操作
            // 数据不变
            items = dataPage;
            }

            cachedResults.items = items; // 视频列表数据
            cachedResults.total = dataPage.length; // 总数
           
            if (page !== 0) { // 加载更多操作
                that.setState({
                isLoadingTail: false,
                dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
                });
            } else { // 首次次操作
                that.setState({
                isRefreshing: false,
                dataSource: that.state.dataSource.cloneWithRows(cachedResults.items)
                });
            }
        }
    }

     // 列表 Item
  _renderRow(row) {
    const { navigation } = this.props;
    // console.log(navigation,"3333333333333333")
    return (
      <CreationItem
        navigation={navigation}
        key={row.FatherID} // 子组件唯一性
        row={row}
      />
    )
  }

    render(){
        const data= this.props.navigation.state.params.TicketSerialNum;
        return(<View>
              <Title navigation={this.props.navigation} centerText={'信息管理系统'} />
              <View>
                    {/*列表数据*/}
                    <Scroller
                        // 数据源
                        dataSource={this.state.dataSource}
                        // 渲染item(子组件)
                        renderRow={this._renderRow.bind(this)}
                        // 是否可以刷新
                        isRefreshing={this.state.isRefreshing}
                        // 是否可以加载更多
                        isLoadingTail={this.state.isLoadingTail}
                        // 请求数据
                        fetchData={this._fetchData.bind(this)}
                        // 缓存列表数据
                        cachedResults={cachedResults}
                    />
                </View>
            </View>)
    }
}
// 样式
const styles = StyleSheet.create({
    container: {
      flex: 1,
      width:'100%',
      backgroundColor: 'red',
    },
    // 头部样式
    header: {
      paddingTop: 25,
      paddingBottom: 12,
      backgroundColor: '#ee735c',
    },
    // 头部title样式
    headerTitle: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: '600'
    },
    // 菊花图
    loadingMore: {
      marginVertical: 20
    },
    // 文案样式
    loadingText: {
      color: '#777',
      textAlign: 'center'
    }
  });