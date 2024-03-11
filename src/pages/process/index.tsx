import { Component, PropsWithChildren } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import StatusCard from '../../components/StatusCard';

export default class AIChat extends Component<PropsWithChildren> {

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='个人流程' />
        <View style={styles.content}>
          <StatusCard title='流程标题1' content='正在进行中，请耐心等待' status='loading' />
          <StatusCard title='流程标题2' content='流程已审批完毕' status='success' />
          <StatusCard title='流程标题3' content='流程已被驳回' status='error' />
        </View>
      </LinearGradient>
    )
  }
}
