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
        locations={[0.1, 0.5, 0.9]}
        style={styles.container}
      >
        <NavBar title='出行信息'/>
        <View style={styles.content}>
          <Text style={styles.title}>校车</Text>
          <TravelListCard title='校车A' price='3元' time='9:30~10:40' />
          <TravelListCard title='校车B' price='10元' time='9:30~10:99' />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>公交车</Text>
          <TravelListCard title='523路公交车' price='3元' time='7:30~23:40' />
          <TravelListCard title='652路公交车' price='3元' time='7:30~23:520' />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>地铁</Text>
          <TravelListCard title='8号线' price='3元' time='9:30~10:499' />
          <TravelListCard title='3号线' price='13元' time='9:30~10:999' />
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>回乡包车</Text>
          <TravelListCard title='包车1' price='300元' time='9:30~10:40' />
          <TravelListCard title='大巴125' price='100元' time='9:30~10:99' />
        </View>
      </LinearGradient>
    )
  }
}
