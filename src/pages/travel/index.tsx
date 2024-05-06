import { Component } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import TravelListCard from '../../components/TravelListCard';
import Taro from '@tarojs/taro';
import request from '../../utils/api';
import { calculateTotalTime, formatIsoDate } from '../../utils/timeHandle'

@inject('store')
export default class Travel extends Component {
  constructor(props) {
    super(props);
  }

  pageTo = (data) => {
    this.props.store.contentStore.setContent(data)
    Taro.navigateTo({
      url: 'pages/travelDetail/index',
    })
  }

  getList = async () => {
    const resq = await request('/content/list', {}, 'GET', false);
    if (resq?.code === 200) {
      const data = resq.data.data.contentList;
      this.props.store.travelStore.setInfo(data);
    } else {
      Taro.showToast({
        title: '获取团队出行数据失败',
        icon: 'error',
        duration: 1500
      })
    }
  }

  goToBus1 = () => {
    const data = {
      company: '广师大校车',
      start: '广东技术师范大学(白云校区)',
      end: '广东技术师范大学(东校区)',
      time: '50分钟',
      price: '0元',
      type: 'schoolBus'
    }
    this.pageTo(data);
  }

  goToBus2 = () => {
    const data = {
      company: '广师大校车',
      start: '广东技术师范大学(白云校区)',
      end: '广东技术师范大学(西校区)',
      time: '45分钟',
      price: '0元',
      type: 'schoolBus'
    }
    this.pageTo(data);
  }

  goToBus3 = () => {
    const data = {
      company: '广师大校车',
      start: '广东技术师范大学(白云校区)',
      end: '广东技术师范大学(河源校区)',
      time: '2小时30分钟',
      price: '0元',
      type: 'schoolBus'
    }
    this.pageTo(data);
  }

  goTo523 = () => {
    const data = {
      company: '广州公交',
      start: '江高总站',
      end: '广州白云站公交总站',
      time: '预计1小时30分钟',
      price: '2元',
      type: 'bus',
      id: 523
    }
    this.pageTo(data);
  }

  goTo652 = () => {
    const data = {
      company: '广州公交',
      start: '江高总站',
      end: '南岭村总站',
      time: '预计1小时25分钟',
      price: '2元',
      type: 'bus',
      id: 652
    }
    this.pageTo(data);
  }

  goTo843 = () => {
    const data = {
      company: '广州公交',
      start: '江高总站',
      end: '地铁高增站总站',
      time: '预计1小时35分钟',
      price: '2元',
      type: 'bus',
      id: 843
    }
    this.pageTo(data);
  }

  goTo977 = () => {
    const data = {
      company: '广州公交',
      start: '江高总站',
      end: '地铁滘心站总站',
      time: '预计1小时25分钟',
      price: '2元',
      type: 'bus',
      id: 977
    }
    this.pageTo(data);
  }

  goToSub3 = () => {
    const data = {
      company: '广州地铁',
      start: '机场北(2号航站楼)',
      end: '体育西路',
      time: '预计45分钟',
      price: '8元',
      type: 'subway',
      id: 3
    }
    this.pageTo(data);
  }

  goToSub8 = () => {
    const data = {
      company: '广州地铁',
      start: '滘心',
      end: '万胜围',
      time: '预计1小时',
      price: '7元',
      type: 'subway',
      id: 8
    }
    this.pageTo(data);
  }

  goToSub9 = () => {
    const data = {
      company: '广州地铁',
      start: '飞鹅岭',
      end: '高增',
      time: '预计28分钟',
      price: '6元',
      type: 'subway',
      id: 9
    }
    this.pageTo(data);
  }

  render () {
    this.getList();

    const renderItem = this.props.store.travelStore.info.length > 0 ? this.props.store.travelStore.info.map((item, index) => {
      const startTime = formatIsoDate(item.start_time)
      const diffTime = calculateTotalTime(item.start_time, item.end_time);
      const gotoDetail = () => {
        const data = {
          company: '团队出行',
          start: item.from,
          end: item.to,
          time: diffTime,
          price: `${item.cost}元`,
          type: 'team',
          id: 1
        }
        this.pageTo(data);
      }
      return <TravelListCard title={`${item.from_city} ~ ${item.to_city}`} price={`${item.cost}元`} time={startTime} key={item.id} click={gotoDetail} />
    }) : <View style={styles.empty}>没有团队出行数据</View>;

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.5, 0.9]}
        style={styles.container}
      >
        <NavBar title='出行信息'/>
        <ScrollView scrollY>
          <View style={styles.content}>
            <Text style={styles.title}>校车</Text>
            <TravelListCard title='东校区校车' price='0元' time='7:30~21:00' click={this.goToBus1} />
            <TravelListCard title='西校区校车' price='0元' time='7:30~21:00' click={this.goToBus2} />
            <TravelListCard title='河源校区校车' price='0元' time='7:30~21:00' click={this.goToBus3} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>公交车</Text>
            <TravelListCard title='523路公交车' price='2元' time='6:00~22:00' click={this.goTo523} />
            <TravelListCard title='652路公交车' price='2元' time='无确切时间' click={this.goTo652} />
            <TravelListCard title='843路公交车' price='2元' time='无确切时间' click={this.goTo843} />
            <TravelListCard title='977路公交车' price='2元' time='6:30~22:00' click={this.goTo977} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>地铁</Text>
            <TravelListCard title='3号线(北延段)' price='2~8元' time='6:10~23:00' click={this.goToSub3} />
            <TravelListCard title='8号线' price='2~7元' time='6:10~23:00' click={this.goToSub8} />
            <TravelListCard title='9号线' price='2~6元' time='6:10~23:00' click={this.goToSub9} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>团队出行</Text>
            { renderItem }
          </View>
        </ScrollView>
        
      </LinearGradient>
    )
  }
}
