import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import TravelListCard from '../../components/TravelListCard';

export default class Travel extends Component<PropsWithChildren> {

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='出行信息'/>
        <View style={styles.school}>
          <Text style={styles.schoolTitle}>校车</Text>
          <TravelListCard title='校车A' price='3元' time='9:30~10:40' />
        </View>
      </LinearGradient>
    )
  }
}
