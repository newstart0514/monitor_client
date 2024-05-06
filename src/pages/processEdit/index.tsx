import { Component } from 'react'
import { View, Input, Button, Text, Picker } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import request from '../../utils/api';
import Taro from '@tarojs/taro';

@inject('store')
export default class ProcessEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      from_city: '',
      to_city: '',
      type: '',
      car_type: '',
      description: '',
      start_time: '',
      end_time: '',
      editor: false
    }
  }

  componentDidMount(): void {
    const info = this.props.store.processEditStore.info
    if (info) {
      this.setState(prev => ({
        from: info.from,
        to: info.to,
        from_city: info.from_city,
        to_city: info.to_city,
        type: info.type,
        car_type: info.car_type,
        description: info.description,
        start_time: info.start_time,
        end_time: info.end_time,
        editor: true
      }))
      this.props.store.processEditStore.setInfo({})
    }
  }

  input = (key: string) => {
    const self = this;
    return function(e) {
      self.setState(prev => ({
        [key]: e.target.value
      }))
    }
  }

  submit = async () => {
    if (
      !this.state.from || 
      !this.state.to || 
      !this.state.from_city ||
      !this.state.to_city || 
      !this.state.type || 
      !this.state.car_type ||
      !this.state.start_time || 
      !this.state.end_time || 
      !this.state.description
      ) {
      Taro.showToast({
        title: '请填写完整内容信息',
        icon: 'error',
        duration: 1500
      })
      return;
    }

    let data = {
      from: this.state.from,
      to: this.state.to,
      from_city: this.state.from_city,
      to_city: this.state.to_city,
      type: this.state.type,
      car_type: this.state.car_type,
      description: this.state.description,
      start_time: this.state.start_time,
      end_time: this.state.end_time
    }
    let resq;
    if (this.state.editor) {
      data = {
        id: this.props.store.processEditStore.info.id,
        ...data
      }
      resq = await request('/travel-record/update', data, 'POST', true);
    } else {
      resq = await request('/travel-record/add', data, 'POST', true);
    }
    
    if (resq?.code === 201) {
      Taro.showToast({
        title: '上报出行记录成功',
        icon: 'success',
        duration: 1500
      })
      const resp = await request('/travel-record/list', {}, 'GET', true);
      if (resp?.code === 200) {
        const data = resp.data.data.travelRecord;
        this.props.store.processStore.setInfo(data);
      } else {
        Taro.showToast({
          title: '获取出行记录数据失败',
          icon: 'error',
          duration: 1500
        })
      }
      Taro.switchTab({
        url: 'pages/process/index'
      })
    } else {
      Taro.showToast({
        title: '上报出行信息失败，请检查',
        icon: 'error',
        duration: 1500
      })
    }
  }

  render () {

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='记录编辑' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              出行记录
            </View>
            <Button type='primary' style={styles.btn} size='mini' onClick={this.submit}>上传记录</Button>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>起点</Text>
            <Input style={styles.value} placeholder='请输入...' onInput={this.input('from')} value={this.state.from} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>终点</Text>
            <Input style={styles.value} placeholder='请输入...' onInput={this.input('to')} value={this.state.to} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>起点城市</Text>
            <Input style={styles.value} placeholder='请输入起点城市...' onInput={this.input('from_city')} value={this.state.from_city} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>终点城市</Text>
            <Input style={styles.value} placeholder='请输入终点城市...' onInput={this.input('to_city')} value={this.state.to_city}  />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>出行类型</Text>
            <Input style={styles.value} placeholder='0:个人出行,1:团队出行' onInput={this.input('type')} value={this.state.type} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>交通工具</Text>
            <Input style={styles.value} placeholder='0:校车,1:铁路,2:飞机,3:私家车,4:公交大巴,5:其他' onInput={this.input('car_type')} value={this.state.car_type} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>流程说明</Text>
            <Input style={styles.value} placeholder='请输入流程说明...' onInput={this.input('description')} value={this.state.description} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>开始时间</Text>
            <Input style={styles.value} placeholder='2000-01-01 14:00:00' onInput={this.input('start_time')} value={this.state.start_time} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>结束时间</Text>
            <Input style={styles.value} placeholder='2000-01-01 18:00:00' onInput={this.input('end_time')} value={this.state.end_time} />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
