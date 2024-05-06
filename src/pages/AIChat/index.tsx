import { Component, PropsWithChildren } from 'react'
import { View, Button, Image, WebView } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
// import ChatBox from '../../components/ChatBox';

export default class AIChat extends Component<PropsWithChildren> {

  render () {
    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='出行助理' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              会话
              <Image src='https://s2.loli.net/2024/03/07/DgNT1M9tnfHvw4u.png' style={styles.mark} />
            </View>
            <Button type='primary' style={styles.btn} size='mini'>重置会话</Button>
          </View>
          {/* <ChatBox content='您好，我是小黄，您有什么需要帮助的吗？' type='system' />
          <ChatBox content='您好，小黄，我是小李，很高兴认识您!' type='user' />
          <View style={styles.inputContainer}>
            <Input placeholder='请输入您的问题...' style={styles.input} />
            <Button type='primary' style={styles.submitBtn} size='mini'>
              <Image src='https://s2.loli.net/2024/03/07/CIQ2w9OU46mpXk3.png' style={styles.icon} />
            </Button>
          </View> */}
          <View style={styles.chat}>
            <WebView src='https://chat.lbgblog.xyz/' />
          </View>
        </View>
      </LinearGradient>
    )
  }
}
