import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import InfoCard from '../../components/InfoCard';

export default class Travel extends Component<PropsWithChildren> {
  detail = {
    '运营公司': '广州地铁',
    '始发站': '天河区天河公园',
    '终点站': '白云区江高镇',
    '全程总耗时': '1h',
    '全程总票价': '10元'
  }

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.5, 0.9]}
        style={styles.container}
      >
        <NavBar title='出行详情'/>
        <View style={styles.mapContainer}></View>
        <View style={styles.weatherBox}>
          <View style={styles.weatherLeft}>
            <Image 
              style={styles.locationsIcon}
              src='https://ide.code.fun/api/image?token=65e1827feb5b55001132221c&name=5f049b50221d2494d35bcc463c22b41f.png'
            />
            <View style={styles.locationsInfo}>
              <Text style={styles.locationstitle}>地点位置</Text>
              <Text style={styles.locationsName}>广州市天河区</Text>
            </View>
          </View>
          <View style={styles.weatherRight}>
            <Image 
              style={styles.weatherIcon}
              src='https://ide.code.fun/api/image?token=65e59070eb5b55001132901f&name=731c0714aa103e46672848836966f502.png'
            />
            <View style={styles.weatherInfo}>
              <Text style={styles.weathertitle}>地点天气</Text>
              <Text style={styles.weatherName}>26°C</Text>
            </View>
          </View>
        </View>
        <View style={styles.detail}>
          <InfoCard title='出行详细信息' content={this.detail} />
        </View>
      </LinearGradient>
    )
  }
}
