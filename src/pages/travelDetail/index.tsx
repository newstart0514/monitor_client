import { Component } from 'react'
import { View, Text, Image, WebView } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import InfoCard from '../../components/InfoCard';
import request from '../../utils/api';

@inject('store')
export default class Travel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFlag: false,
      weather: []
    }
  }
  
  showDetail = () => {
    const info = this.props.store.contentStore.contentInfo
    const showData = {
      '运营公司': info.company,
      '始发站': info.start,
      '终点站': info.end,
      '全程总耗时': info.time,
      '全程总票价': info.price
    }
    return <InfoCard title='出行详细信息' content={showData} />
  }

  showBox() {
    return (
      <View style={styles.weatherBox}>
        <View style={styles.weatherLeft}>
          <Image 
            style={styles.locationsIcon}
            src='https://s21.ax1x.com/2024/04/10/pFOhTVU.png'
          />
          <View style={styles.locationsInfo}>
            <Text style={styles.locationstitle}>当前天气</Text>
            <Text style={styles.locationsName}>{this.state.weather[0]}</Text>
          </View>
        </View>
        <View style={styles.weatherRight}>
          <Image 
            style={styles.weatherIcon}
            src='https://s21.ax1x.com/2024/04/10/pFOh4K0.png'
          />
          <View style={styles.weatherInfo}>
            <Text style={styles.weathertitle}>当前温度</Text>
            <Text style={styles.weatherName}>{this.state.weather[1]}°C</Text>
          </View>
        </View>
      </View>
    )
  }

  async getNews() {
    if (this.state.showFlag) return;
    const resp = await request('/static/weather', {}, 'GET', false);
    if (resp.data && resp.data.data) {
      this.setState(prev => ({
        showFlag: true,
        weather: [resp.data.data.weather, resp.data.data.temperature]
      }))
    }
  }

  showMap = () => {
    const info = this.props.store.contentStore.contentInfo
    if (info.type === 'schoolBus') {
      let url;
      if (info.end === '广东技术师范大学(河源校区)') url = `https://map.lbgblog.xyz/#/path?from=${info.start}&fromCity=广州&to=${info.end}&toCity=河源`
      else url = `https://map.lbgblog.xyz/#/path?from=${info.start}&fromCity=广州&to=${info.end}&toCity=广州`
      return <WebView src={url}></WebView>
    } else if (info.type === 'bus') {
      let url = `https://map.lbgblog.xyz/#/busLine?bus=${info.id}`
      return <WebView src={url}></WebView>
    } else if (info.type === 'subway') {
      let url;
      if (info.id === 3) {
        url = `https://map.lbgblog.xyz/#/subway?line=${info.id}%E5%8F%B7%E7%BA%BF(%E5%8C%97%E5%BB%B6%E6%AE%B5)`
      } else {
        url = `https://map.lbgblog.xyz/#/subway?line=${info.id}%E5%8F%B7%E7%BA%BF`
      }
      return <WebView src={url}></WebView>
    } else {
      const tarvel = this.props.store.travelStore.info[info.id];
      let url = `https://map.lbgblog.xyz/#/path?from=${info.start}&fromCity=${tarvel.from_city}&to=${info.end}&toCity=${tarvel.to_city}`
      return <WebView src={url}></WebView>
    }
  }

  render () {
    this.getNews();

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.5, 0.9]}
        style={styles.container}
      >
        <NavBar title='出行详情'/>
        <View style={styles.mapContainer}>
          {this.showMap()}
        </View>
        {this.state.showFlag ? this.showBox() : null}
        <View style={styles.detail}>
          {this.showDetail()}
        </View>
      </LinearGradient>
    )
  }
}
