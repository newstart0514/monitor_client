import { Component } from 'react'
import { Image, View, Text, Input, Button } from '@tarojs/components';
import Taro from '@tarojs/taro';
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import styles from './index.module.scss'
import request from '../../utils/api';

@inject('store')
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
        captcha: ''
      },
      second: 0
    }
  }

  getCaptcha = async () => {
    this.setState(prev => ({
      second: 0
    }))
    const resq = await request('/user/captcha', {username: this.state.form.username}, 'GET', false);
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

  login = async () => {
    if (!this.state.form.username || !this.state.form.password || !this.state.form.captcha) {
      Taro.showToast({
        title: '请填写完整登录信息',
        icon: 'error',
        duration: 1500
      })
      return;
    }
    const resq = await request('/user/login', this.state.form, 'POST', false);
    if (resq.code === 201) {
      Taro.setStorage({
        key: 'access_token',
        data: resq.data.data.accessToken
      });
      Taro.setStorage({
        key: 'refresh_token',
        data: resq.data.data.refreshToken
      })
      if (this.props.store) {
        const {setUser, userInfo} = this.props.store.userStore;
        const newInfo = {
          ...userInfo,
          ...resq.data.data.userInfo
        }
        this.props.store.userStore.setUser(newInfo);
      }
      Taro.showToast({
        title: '登录成功，正在跳转',
        icon: 'success',
        duration: 1500
      })
      Taro.switchTab({
        url: 'pages/index/index'
      })
    } else {
      Taro.showToast({
        title: '登录失败，请检查',
        icon: 'error',
        duration: 2000
      })
    }
  }

  back = () => {
    Taro.switchTab({
      url: 'pages/index/index'
    })
  }

  render () {
    const usernameInput = (e) => {
      this.setState(prev => ({
        form: {
          username: e.target.value,
          password: prev.form.password,
          captcha: prev.form.captcha,
        }
      }))
    }
    const passwordInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: e.target.value,
          captcha: prev.form.captcha,
        }
      }))
    }
    const captchaInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: prev.form.password,
          captcha: e.target.value,
        }
      }))
    }

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <View style={styles.back} onClick={this.back}>
          &lt; 返回
        </View>
        <Image src='https://s2.loli.net/2024/02/25/sKm46pk1nIFJSZH.webp' style={styles.logo} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.title}>
              用户登录
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>账号</Text>
            <Input style={styles.value} placeholder='请输入账号...' onInput={usernameInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>密码</Text>
            <Input style={styles.value} placeholder='请输入密码...' onInput={passwordInput} type='password' password />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>验证码</Text>
            <View style={styles.content}>
              <Input style={styles.inputContent} placeholder='请输入验证码...' onInput={captchaInput} />
              <Button 
                type='primary' 
                style={styles.btn} 
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
          <View style={styles.row}>
            <Button style={styles.login} size='mini' type='primary' onClick={this.login}>登录</Button>
            <Button style={styles.register} size='mini' type='primary'>注册</Button>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
