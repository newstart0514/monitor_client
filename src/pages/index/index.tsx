import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';

export default class Index extends Component<PropsWithChildren> {

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.55, 0.9]}
        style={styles.container}
      >
        <NavBar title='首页'/>
        <View style={styles.mapContainer}></View>
        <View style={styles.search}>
          <Image 
            style={styles.searchIcon} 
            src='https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/65e182275a7e3f031032138e/65e18239eb5b550011322142/c03a590672be85f0af8363c1f8838849.png'
          />
          <Input type='text' placeholder='请输入您想要前往的地点' style={styles.input}/>
        </View>
        <View style={styles.weatherBox}>
          <View style={styles.weatherLeft}>
            <Image 
              style={styles.locationsIcon}
              src='https://ide.code.fun/api/image?token=65e1827feb5b55001132221c&name=5f049b50221d2494d35bcc463c22b41f.png'
            />
            <View style={styles.locationsInfo}>
              <Text style={styles.locationstitle}>当前位置</Text>
              <Text style={styles.locationsName}>广州市天河区</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
