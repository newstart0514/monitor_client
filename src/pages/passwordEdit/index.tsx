import { Component } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import request from '../../utils/api';
import Taro from '@tarojs/taro';

@inject('store')
export default class PasswordEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      second: 0,
      password: '',
      captcha: '',
      confirmPassword: ''
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

  getCaptcha = async () => {
    let info = {...this.props.store.userStore.userInfo};
    this.setState(prev => ({
      second: 0
    }))
    const resq = await request('/user/captcha', {username: info.username}, 'GET', false);
    if (resq.code !== 200) {
      Taro.showToast({
        title: '获取验证码失败',
        icon: 'error',
        duration: 1500
      })
    } else {
      Taro.showToast({
        title: '获取成功,请检查您的邮箱',
        icon: 'success',
        duration: 1500
      })
      this.setState(prev => ({
        second: 60
      }))
      setInterval(() => {
        this.setState(prev => ({
          second: prev.second - 1
        }))
      }, 1000)
    }
  }

  submit = async () => {
    let info = {...this.props.store.userStore.userInfo};
    const data = {
      username: info.username,
      newPassword: this.state.password,
      captcha: this.state.captcha
    }
    const resq = await request('/user/updatePassword', data, 'POST', true);

    if (resq?.code === 201) {
      Taro.showToast({
        title: '修改密码成功',
        icon: 'success',
        duration: 1500
      })
      Taro.switchTab({
        url: 'pages/personal/index'
      })
    } else {
      Taro.showToast({
        title: '修改密码失败',
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
        <NavBar title='密码修改' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              密码修改
            </View>
            <Button type='primary' style={styles.btn} size='mini' onClick={this.submit}>保存修改</Button>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>新密码</Text>
            <Input style={styles.value} placeholder='请输入密码...' password onInput={this.input('password')} value={this.state.password} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>确认新密码</Text>
            <Input style={styles.value} placeholder='请输入确认密码...' password onInput={this.input('confirmPassword')} value={this.state.confirmPassword} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>验证码</Text>
            <View style={styles.content1}>
              <Input style={styles.inputContent} placeholder='请输入验证码...' onInput={this.input('captcha')} value={this.state.captcha} />
              <Button 
                type='primary' 
                style={styles.btn1} 
                size='mini' 
                plain 
                disabled={this.state.second > 0} 
                loading={this.state.second > 0}
                onClick={this.getCaptcha}
              >
                {this.state.second > 0 ? `${this.state.second} S` : '获取'}
              </Button>
            </View>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
