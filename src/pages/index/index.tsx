import { Component, PropsWithChildren } from 'react'
import { View, Text, Image, Input, WebView, Swiper, SwiperItem } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import { inject } from 'mobx-react';
// import IndexCard from '../../components/IndexCard';
import request from '../../utils/api'

@inject('store')
export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFlag: false,
      aUrls: [],
      imgUrls: [],
      titles: [],
      weather: []
    }
  }
  

  async getNews() {
    if (this.state.showFlag) return;
    const resp = await request('/static/weather', {}, 'GET', false);
    const resq = await request('/tasks/getNews', {}, 'GET', false);
    if (resq.data && resq.data.data) {
      this.setState(prev => ({
        showFlag: true,
        aUrls: resq.data.data.aUrls,
        imgUrls: resq.data.data.imgUrls,
        titles: resq.data.data.titles,
        weather: [resp.data.data.weather, resp.data.data.temperature]
      }))
    }
  }

  showNews() {
    const items = this.state.imgUrls.map((item, index) => {
      return (
        <SwiperItem key={index}>
          <Image src={item} style={styles.swiperItem}></Image>
          <View style={styles.swiperTitle}>{this.state.titles[index]}</View>
        </SwiperItem>
      )
    })

    return (
      <Swiper
        style={styles.swiper}
        indicatorDots
        autoplay
        circular
      >
        {items}
      </Swiper>
    )
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

  render () {
    this.getNews();

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='首页' />
        <View style={styles.mapContainer}>
          <WebView src='https://map.lbgblog.xyz/#/'></WebView>
        </View>
        <View style={styles.search}>
          <Image 
            style={styles.searchIcon} 
            src='https://s21.ax1x.com/2024/04/10/pFOhfvq.png'
          />
          <Input type='text' placeholder='请输入您想要前往的地点' style={styles.input} />
        </View>
        {this.state.showFlag ? this.showBox() : null}
        <View style={styles.footer}>
          {this.state.showFlag ? this.showNews() : null}
        </View>
        {/* <View>
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
        </View> */}
      </LinearGradient>
    )
  }
}
