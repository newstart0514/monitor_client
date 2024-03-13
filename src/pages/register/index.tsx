import { Component, PropsWithChildren } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import { Image, View, Text, Input, Button } from '@tarojs/components';

export default class Register extends Component<PropsWithChildren> {

  render () {
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
            <Input style={styles.value} placeholder='请输入账号...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>密码</Text>
            <Input style={styles.value} placeholder='请输入密码...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>确认密码</Text>
            <Input style={styles.value} placeholder='请输入确认密码...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>姓名</Text>
            <Input style={styles.value} placeholder='请输入真实姓名...' />
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
            <Text style={styles.key}>邮箱</Text>
            <Input style={styles.value} placeholder='请输入邮箱...' />
          </View>
          <View style={styles.row}>
            <Text style={styles.key}>验证码</Text>
            <Input style={styles.value} placeholder='请输入验证码...' />
          </View>
          <View style={styles.row}>
            <Button style={styles.login} size="mini" type="primary">确认注册</Button>
            <Button style={styles.register} size="mini" type="primary">取消</Button>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
