import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Input } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import IndexCard from '../../components/IndexCard';

export default class Index extends Component<PropsWithChildren> {

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
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
          <View style={styles.weatherRight}>
            <Image 
              style={styles.weatherIcon}
              src='https://ide.code.fun/api/image?token=65e59070eb5b55001132901f&name=731c0714aa103e46672848836966f502.png'
            />
            <View style={styles.weatherInfo}>
              <Text style={styles.weathertitle}>当前天气</Text>
              <Text style={styles.weatherName}>26°C</Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.infoTitle}>智能推荐出行信息</Text>
          <View style={styles.infoList}>
            <IndexCard 
              title='公交'
              content='信息很重要，信息很正义，信息very good，保护信息，人人有责信息很重要，信息很正义，信息very good，保护信息，人人有责'
              img='https://picsum.photos/200/300'
            ></IndexCard>
            <IndexCard 
              title='地铁' 
              content='信息很重要，信息很正义，信息very good，保护信息，人人有责'
              img='https://picsum.photos/200/300'
            ></IndexCard>
            <IndexCard
              title='公交' 
              content='信息很重要，信息很正义，信息very good，保护信息，人人有责' 
              img='https://picsum.photos/200/300'
            ></IndexCard>
            <IndexCard
              title='公交' 
              content='信息很重要，信息很正义，信息very good，保护信息，人人有责' 
              img='https://picsum.photos/200/300'
            ></IndexCard>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
