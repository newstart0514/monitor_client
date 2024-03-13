import { Component, PropsWithChildren } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';

export default class ProcessEdit extends Component<PropsWithChildren> {

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='流程编辑' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              流程信息
            </View>
            <Button type='primary' style={styles.btn} size='mini'>发布流程</Button>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>起点</Text>
            <Input style={styles.value} placeholder='请输入...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>终点</Text>
            <Input style={styles.value} placeholder='请输入...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>起点城市</Text>
            <Input style={styles.value} placeholder='请输入起点城市...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>终点城市</Text>
            <Input style={styles.value} placeholder='请输入终点城市...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>流程说明</Text>
            <Input style={styles.value} placeholder='请输入流程说明...' />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
