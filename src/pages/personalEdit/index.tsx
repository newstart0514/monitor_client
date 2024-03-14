import { Component, PropsWithChildren } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';

export default class PersonalEdit extends Component<PropsWithChildren> {

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='个人资料' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              资料修改
            </View>
            <Button type='primary' style={styles.btn} size='mini'>保存修改</Button>
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>姓名</Text>
            <Input style={styles.value} placeholder='请输入姓名...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>手机号码</Text>
            <Input style={styles.value} placeholder='请输入手机号码...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>邮箱</Text>
            <Input style={styles.value} placeholder='请输入邮箱...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>学号</Text>
            <Input style={styles.value} placeholder='请输入学号...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>班级</Text>
            <Input style={styles.value} placeholder='请输入班级...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>监护人姓名</Text>
            <Input style={styles.value} placeholder='请输入监护人姓名...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>监护人手机号</Text>
            <Input style={styles.value} placeholder='请输入监护人手机号...' />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
