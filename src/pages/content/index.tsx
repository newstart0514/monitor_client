import { Component } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import Taro from '@tarojs/taro';
import request from '../../utils/api';

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        from: '',
        to: '',
        from_city: '',
        to_city: '',
        text: '',
        cost: '',
        start_time: '',
        end_time: '',
        num: 0,
        processId: 1
      }
    }
  }

  submit = async () => {
    if (
      !this.state.form.from || 
      !this.state.form.to || 
      !this.state.form.from_city ||
      !this.state.form.to_city || 
      !this.state.form.text || 
      !this.state.form.cost ||
      !this.state.form.start_time || 
      !this.state.form.end_time || 
      !this.state.form.num
      ) {
      Taro.showToast({
        title: '请填写完整内容信息',
        icon: 'error',
        duration: 1500
      })
      return;
    }

    const postData = {
      ...this.state.form,
      start_time: this.state.form.start_time.split(' ').join('T'),
      end_time: this.state.form.end_time.split(' ').join('T')
    }

    const resq = await request('/content/add', postData, 'POST', true);

    if (resq?.code === 201) {
      Taro.showToast({
        title: '添加出行信息成功',
        icon: 'success',
        duration: 1500
      })
      Taro.switchTab({
        url: 'pages/travel/index'
      })
    } else {
      Taro.showToast({
        title: '添加出行信息失败，请检查',
        icon: 'error',
        duration: 1500
      })
    }
  }

  render () {

    // TODO:使用高阶函数改造
    const fromInput = (e) => {
      this.setState(prev => ({
        form: {
          from: e.target.value,
          to: prev.form.to,
          from_city: prev.form.from_city,
          to_city: prev.form.to_city,
          text: prev.form.text,
          cost: prev.form.cost,
          start_time: prev.form.start_time,
          end_time: prev.form.end_time,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const toInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: e.target.value,
          from_city: prev.form.from_city,
          to_city: prev.form.to_city,
          text: prev.form.text,
          cost: prev.form.cost,
          start_time: e.target.start_time,
          end_time: prev.form.end_time,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const fromCityInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: prev.form.to,
          from_city: e.target.value,
          to_city: prev.form.to_city,
          text: prev.form.text,
          cost: prev.form.cost,
          start_time: prev.form.start_time,
          end_time: prev.form.end_time,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const toCityInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: prev.form.to,
          from_city: prev.form.from_city,
          to_city: e.target.value,
          text: prev.form.text,
          cost: prev.form.cost,
          start_time: prev.form.start_time,
          end_time: prev.form.end_time,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const textInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: prev.form.to,
          from_city: prev.form.from_city,
          to_city: prev.form.to_city,
          text: e.target.value,
          cost: prev.form.cost,
          start_time: prev.form.start_time,
          end_time: prev.form.end_time,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const costInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: prev.form.to,
          from_city: prev.form.from_city,
          to_city: prev.form.to_city,
          text: prev.form.text,
          cost: e.target.value,
          start_time: prev.form.start_time,
          end_time: prev.form.end_time,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const startTimeInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: prev.form.to,
          from_city: prev.form.from_city,
          to_city: prev.form.to_city,
          text: prev.form.text,
          cost: prev.form.cost,
          start_time: e.target.value,
          end_time: prev.form.end_time,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const endTimeInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: prev.form.to,
          from_city: prev.form.from_city,
          to_city: prev.form.to_city,
          text: prev.form.text,
          cost: prev.form.cost,
          start_time: prev.form.start_time,
          end_time: e.target.value,
          num: prev.form.num,
          processId: prev.form.processId
        }
      }))
    }

    const numInput = (e) => {
      this.setState(prev => ({
        form: {
          from: prev.form.from,
          to: prev.form.to,
          from_city: prev.form.from_city,
          to_city: prev.form.to_city,
          text: prev.form.text,
          cost: prev.form.cost,
          start_time: prev.form.start_time,
          end_time: prev.form.end_time,
          num: parseInt(e.target.value),
          processId: prev.form.processId
        }
      }))
    }

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='内容编辑' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              出行信息
            </View>
            <Button type='primary' style={styles.btn} size='mini' onClick={this.submit}>发布信息</Button>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>起点</Text>
            <Input style={styles.value} placeholder='请输入...' onInput={fromInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>终点</Text>
            <Input style={styles.value} placeholder='请输入...' onInput={toInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>起点城市</Text>
            <Input style={styles.value} placeholder='请输入起点城市...' onInput={fromCityInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>终点城市</Text>
            <Input style={styles.value} placeholder='请输入终点城市...' onInput={toCityInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>出行金额</Text>
            <Input style={styles.value} placeholder='请输入每人的出行金额...' type='number' onInput={costInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>出行人数</Text>
            <Input style={styles.value} placeholder='请输入...' type='number' onInput={numInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>行程开始时间</Text>
            <Input style={styles.value} placeholder='2000-01-01 14:00:00' onInput={startTimeInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>行程结束时间</Text>
            <Input style={styles.value} placeholder='2000-01-01 14:00:00' onInput={endTimeInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>内容说明</Text>
            <Input style={styles.value} placeholder='请输入内容说明...' onInput={textInput} />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
