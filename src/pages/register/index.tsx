import { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import { Image, View, Text, Input, Button } from '@tarojs/components';
import request from '../../utils/api';
import Taro from '@tarojs/taro';

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        username: '',
        password: '',
        name: '',
        email: '',
        phone: '',
        student_id: '',
        from: '',
        captcha: ''
      },
      nextPassword: '',
      second: 0
    }
  }

  getCaptcha = async () => {
    this.setState(prev => ({
      second: 0
    }))
    const resq = await request('/user/captcha', {address: this.state.form.email}, 'GET', false);
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

  back = () => {
    Taro.switchTab({
      url: 'pages/index/index'
    })
  }

  register = async () => {
    if (
      !this.state.form.username || 
      !this.state.form.password || 
      !this.state.form.captcha ||
      !this.state.form.name ||
      !this.state.form.email ||
      !this.state.form.phone ||
      !this.state.form.student_id ||
      !this.state.form.from
      ) {
      Taro.showToast({
        title: '请填写完整注册信息',
        icon: 'error',
        duration: 1500
      })
      return;
    } else if (this.state.nextPassword !== this.state.form.password) {
      Taro.showToast({
        title: '确认密码和密码不一致',
        icon: 'error',
        duration: 1500
      })
      return;
    }

    const postData = {
      ...this.state.form,
      avatar: "https://baidu.com",
      guardian_name: "未知",
      guardian_phone: "00000000"
    }
    const resq = await request('/user/register', postData, 'POST', false);

    if (resq.code === 201 || resq.code === 200) {
      Taro.showToast({
        title: '注册成功，正在前往登录',
        icon: 'success',
        duration: 2000
      })
      Taro.navigateTo({
        url: 'pages/login/index'
      })
    } else {
      Taro.showToast({
        title: '注册失败，请检查信息',
        icon: 'error',
        duration: 2000
      })
    }
  }

  render () {
    const usernameInput = (e) => {
      this.setState(prev => ({
        form: {
          username: e.target.value,
          password: prev.form.password,
          name: prev.form.name,
          email: prev.form.email,
          phone: prev.form.phone,
          student_id: prev.form.student_id,
          from: prev.form.from,
          captcha: prev.form.captcha
        },
      }));
    }

    const passwordInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: e.target.value,
          name: prev.form.name,
          email: prev.form.email,
          phone: prev.form.phone,
          student_id: prev.form.student_id,
          from: prev.form.from,
          captcha: prev.form.captcha
        },
      }));
    }

    const nameInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: prev.form.password,
          name: e.target.value,
          email: prev.form.email,
          phone: prev.form.phone,
          student_id: prev.form.student_id,
          from: prev.form.from,
          captcha: prev.form.captcha
        },
      }));
    }

    const emailInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: prev.form.password,
          name: prev.form.name,
          email: e.target.value,
          phone: prev.form.phone,
          student_id: prev.form.student_id,
          from: prev.form.from,
          captcha: prev.form.captcha
        },
      }));
    }

    const phoneInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: prev.form.password,
          name: prev.form.name,
          email: prev.form.email,
          phone: e.target.value,
          student_id: prev.form.student_id,
          from: prev.form.from,
          captcha: prev.form.captcha
        },
      }));
    }

    const studentIdInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: prev.form.password,
          name: prev.form.name,
          email: prev.form.email,
          phone: prev.form.phone,
          student_id: e.target.value,
          from: prev.form.from,
          captcha: prev.form.captcha
        },
      }));
    }

    const fromInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: prev.form.password,
          name: prev.form.name,
          email: prev.form.email,
          phone: prev.form.phone,
          student_id: prev.form.student_id,
          from: e.target.value,
          captcha: prev.form.captcha
        },
      }));
    }

    const captchaInput = (e) => {
      this.setState(prev => ({
        form: {
          username: prev.form.username,
          password: prev.form.password,
          name: prev.form.name,
          email: prev.form.email,
          phone: prev.form.phone,
          student_id: prev.form.student_id,
          from: prev.form.from,
          captcha: e.target.value
        },
      }));
    }

    const rePasswordInput = (e) => {
      this.setState(prev => ({
        nextPassword: e.target.value
      }))
    }

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <Image src='https://s2.loli.net/2024/02/25/sKm46pk1nIFJSZH.webp' style={styles.logo} />
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={styles.title}>
              用户注册
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
            <Text style={styles.key}>确认密码</Text>
            <Input style={styles.value} placeholder='请输入确认密码...' onInput={rePasswordInput} type='password' password />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>姓名</Text>
            <Input style={styles.value} placeholder='请输入真实姓名...' onInput={nameInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>学号</Text>
            <Input style={styles.value} placeholder='请输入学号...' onInput={studentIdInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>班级</Text>
            <Input style={styles.value} placeholder='请输入班级...' onInput={fromInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>邮箱</Text>
            <Input style={styles.value} placeholder='请输入邮箱...' onInput={emailInput} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>手机号</Text>
            <Input style={styles.value} placeholder='请输入手机号...' onInput={phoneInput} />
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
            <Button style={styles.login} size='mini' type='primary' onClick={this.register} >确认注册</Button>
            <Button style={styles.register} size='mini' type='primary' onClick={this.back} >取消</Button>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
