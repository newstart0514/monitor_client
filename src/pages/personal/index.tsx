import { Component, PropsWithChildren } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import { Image, View } from '@tarojs/components';

export default class ProcessDetail extends Component<PropsWithChildren> {
  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='个人中心' />
        <View style={styles.card}>
          <View style={styles.card_header}>
            <Image src='https://picsum.photos/200/300' style={styles.avatar} />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
