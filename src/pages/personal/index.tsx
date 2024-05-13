import { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import { Image, View, Button } from '@tarojs/components';
import DescRow from '../../components/DescRow';
import Taro from '@tarojs/taro';
import { inject } from 'mobx-react';
import request from '../../utils/api';
import { maskEmail, maskName, maskPhone, maskStudentID } from '../../utils/mask';

@inject('store')
export default class Personal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: false
    }
  }

  async componentDidMount(): Promise<void> {
    await this.getUserInfo();
  }

  goToLogin = () => {
    Taro.redirectTo({
      url: 'pages/login/index'
    })
  }

  goToRegister = () => {
    Taro.redirectTo({
      url: 'pages/register/index'
    })
  }

  goToPasswordEdit = () => {
    Taro.navigateTo({
      url: 'pages/passwordEdit/index'
    })
  }

  goToPersonalEdit = () => {
    Taro.navigateTo({
      url: 'pages/personalEdit/index'
    })
  }

  getUserInfo = async () => {
    const resq = await request('/user/userInfo', {}, 'GET', true);
    if (resq.code === 200) {
      this.props.store.userStore.setUser(resq.data.data);
      this.setState(prev => ({
        isLogin: true
      }))
    }
  }

  logOut = () => {
    Taro.removeStorage({
      key: 'access_token'
    })
    Taro.removeStorage({
      key: 'refresh_token'
    })
    this.setState(prev => ({
      isLogin: false
    }))
  }

  render () {

    const loginView = () => {
      let info = {...this.props.store.userStore.userInfo};
      if (info.role === '2') info.role = '超级管理员';
      else if(info.role === '1') info.role = '普通管理员'
      else info.role = '普通用户'

      const keys = Object.keys(info);
      const dic = {
        phone: '手机号码',
        email: '邮箱',
        student_id: '学号',
        from: '班级',
        guardian_name: '监护人姓名',
        guardian_phone: '监护人手机号码',
      }
      const renderItems = keys.map((key, index) => {
        if (key === 'from') {
          return <DescRow title={dic[key]} value={info[key]} key={index} />
        } else if(key === 'email') {
          return <DescRow title={dic[key]} value={maskEmail(info[key])} key={index} />
        } else if(key === 'guardian_name') {
          return <DescRow title={dic[key]} value={maskName(info[key])} key={index} />
        } else if(key === 'phone' || key === 'guardian_phone') {
          return <DescRow title={dic[key]} value={maskPhone(info[key])} key={index} />
        } else if(key === 'student_id') {
          return <DescRow title={dic[key]} value={maskStudentID(info[key])} key={index} />
        } else {
          return null
        }
      });

      return (
        <>
          <View style={styles.card}>
            <View style={styles.card_header}>
              <Image src='https://picsum.photos/200/300' style={styles.avatar} />
              <View style={styles.card_header_info}>
                <View style={styles.card_header_info_name}>{info.username}</View>
                <View style={styles.card_header_info_desc}>{info.role}</View>
              </View>
              <View style={styles.loginBtn}>
                <Button type='primary' style={styles.cancelBtn} size='mini' onClick={this.logOut}>退出登录</Button>
              </View>
            </View>
            <View style={styles.card_hr}></View>
            <View style={styles.card_info}>
              {renderItems}
            </View>
          </View>
          <View style={styles.card}>
            <View style={styles.card_header2}>设置</View>
            <View style={styles.card_item} onClick={this.goToPasswordEdit}>
              <Image src='https://s21.ax1x.com/2024/04/10/pFOhxr6.png' style={styles.item_png} />
              <View style={styles.item_title}>修改密码</View>
            </View>
            <View style={styles.card_item} onClick={this.goToPersonalEdit}>
              <Image src='https://s21.ax1x.com/2024/04/10/pFOhzqK.png' style={styles.item_png} />
              <View style={styles.item_title}>修改个人资料</View>
            </View>
          </View>
        </>
      )
    }

    const unLoginView = () => {
      return (
        <>
          <View style={styles.boxCard}>
            <View style={styles.card_header2}>未登录，请选择：</View>
            <View style={styles.card_item}>
              <Button type='primary' style={styles.btn} size='mini' onClick={this.goToLogin}>用户登录</Button>
            </View>
            <View style={styles.card_item}>
              <Button type='primary' style={styles.cancelBtn} size='mini' onClick={this.goToRegister}>用户注册</Button>
            </View>
          </View>
        </>
      )
    }

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='个人中心' />
        {this.state.isLogin ? loginView() : unLoginView()}
        <View style={styles.card}>
          <View style={styles.card_header2}>其他</View>
          <View style={styles.card_item}>
            <Image src='https://s21.ax1x.com/2024/04/10/pFOTSld.png' style={styles.item_png} />
            <View style={styles.item_title}>帮助和反馈</View>
          </View>
          <View style={styles.card_item}>
            <Image src='https://s21.ax1x.com/2024/04/10/pFOozSH.png' style={styles.item_png} />
            <View style={styles.item_title}>关于我们</View>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
