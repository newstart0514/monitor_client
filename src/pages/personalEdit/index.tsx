import { Component } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import { inject } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import request from '../../utils/api';
import Taro from '@tarojs/taro';

@inject('store')
export default class PersonalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      student_id: '',
      from: '',
      guardian_name: '',
      guardian_phone: ''
    }
  }

  componentDidMount(): void {
    let info = {...this.props.store.userStore.userInfo};
    this.setState(prev => ({
      name: info.name,
      phone: info.phone,
      student_id: info.student_id,
      from: info.from,
      guardian_name: info.guardian_name,
      guardian_phone: info.guardian_phone
    }))
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
    let info = {...this.props.store.userStore.userInfo};
    const data = {
      username: info.username,
      avatar: info.avatar,
      name: this.state.name,
      phone: this.state.phone,
      student_id: this.state.student_id,
      from: this.state.from,
      guardian_name: this.state.guardian_name,
      guardian_phone: this.state.guardian_phone
    }
    const resq = await request('/user/update', data, 'POST', true);

    if (resq?.code === 201) {
      Taro.showToast({
        title: '修改信息成功',
        icon: 'success',
        duration: 1500
      })
      const newUserStore = {...info};
      newUserStore.name = this.state.name;
      newUserStore.phone = this.state.phone;
      newUserStore.student_id = this.state.student_id;
      newUserStore.from = this.state.from;
      newUserStore.guardian_name = this.state.guardian_name;
      newUserStore.guardian_phone = this.state.guardian_phone
      this.props.store.userStore.setUser(newUserStore);
      Taro.switchTab({
        url: 'pages/personal/index'
      })
    } else {
      Taro.showToast({
        title: '修改信息失败',
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
        <NavBar title='信息编辑' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              资料修改
            </View>
            <Button type='primary' style={styles.btn} size='mini' onClick={this.submit}>保存修改</Button>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>姓名</Text>
            <Input style={styles.value} placeholder='请输入姓名...' onInput={this.input('name')} value={this.state.name} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>手机号码</Text>
            <Input style={styles.value} placeholder='请输入手机号码...' onInput={this.input('phone')} value={this.state.phone} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>学号</Text>
            <Input style={styles.value} placeholder='请输入学号...' onInput={this.input('student_id')} value={this.state.student_id} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>班级</Text>
            <Input style={styles.value} placeholder='请输入班级...' onInput={this.input('from')} value={this.state.from} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>监护人姓名</Text>
            <Input style={styles.value} placeholder='请输入监护人姓名...' onInput={this.input('guardian_name')} value={this.state.guardian_name} />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>监护人手机号</Text>
            <Input style={styles.value} placeholder='请输入监护人手机号...' onInput={this.input('guardian_phone')} value={this.state.guardian_phone} />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
