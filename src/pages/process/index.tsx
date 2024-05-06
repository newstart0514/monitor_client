import { Component } from 'react'
import { ScrollView, View } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import Taro from '@tarojs/taro';
import { inject } from 'mobx-react';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import StatusCard from '../../components/StatusCard';
import request from '../../utils/api';
import { checkPositionInTimeRange } from '../../utils/timeHandle';

@inject('store')
export default class process extends Component {

  getList = async () => {
    let flag = true;
    await Taro.getStorage({
      key: 'access_token',
      fail(res) {
        flag = false;
      }
    })
    if (!flag) {
      Taro.showToast({
        title: '用户未登录',
        icon: 'error',
        duration: 2000
      })
      Taro.navigateTo({
        url: 'pages/login/index'
      })
    }
    const resq = await request('/travel-record/list', {}, 'GET', true);
    if (resq?.code === 200) {
      const data = resq.data.data.travelRecord;
      this.props.store.processStore.setInfo(data);
    } else {
      Taro.showToast({
        title: '获取出行记录数据失败',
        icon: 'error',
        duration: 1500
      })
    }
  }

  render () {
    this.getList();
    const statusArr = ['error', 'loading', 'success'];

    const renderItem = this.props.store.processStore.info.length > 0 ? this.props.store.processStore.info.map((item, index) => {
      if (item.delete_time) return null;
      const timeType = checkPositionInTimeRange(item.start_time, item.end_time);
      let text = '无温馨提醒，正在学习更多提醒情况...';
      if (timeType === 0) {
        text = `请在${item.from_city}出发，请留意出行天气以及路况~`
      } else if (timeType === 1) {
        text = '留意环境是否安全，有任何危险可以使用紧急报警~'
      } else if (timeType === 2) {
        text = `安全抵达，有任何问题可以向我们反馈~`
      }
      const click = () => {
        this.props.store.processDetailStore.setInfo(item)
        Taro.navigateTo({
          url: 'pages/processDetail/index',
        })
      }
      return <StatusCard title={`${item.from_city} ~ ${item.to_city}`} content={text} status={statusArr[timeType]} key={item.id} click={click} />
    }) : <View style={styles.empty}>没有出行记录数据</View>;

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='个人出行' />
        <ScrollView scrollY style={styles.content}>
          {renderItem}
        </ScrollView>
      </LinearGradient>
    )
  }
}
