import { Component, PropsWithChildren } from 'react'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import { Image, View } from '@tarojs/components';
import DescRow from '../../components/DescRow';

export default class Personal extends Component<PropsWithChildren> {
  render () {
    const user = {
      name: '李佰贵',
      role: '超级管理员',
      avatar: 'https://picsum.photos/200/300',
      phone: 13800138000,
      email: '1418591636@qq.com',
      student_id: '123456789',
      from: '20通信88班',
      guardian_name: '李*发',
      guardian_phone: 13800138000,
    }

    const dic = {
      phone: '手机号码',
      email: '邮箱',
      student_id: '学号',
      from: '班级',
      guardian_name: '监护人姓名',
      guardian_phone: '监护人手机号码',
    }

    const keys = Object.keys(user);
    const renderItems = keys.map((key, index) => {
      if(key === 'avatar' || key === 'name' || key === 'role') return null;
      else return <DescRow title={dic[key]} value={user[key]} key={index} />
    });

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='个人中心' />
        <View style={styles.card}>
          <View style={styles.card_header}>
            <Image src='https://picsum.photos/200/300' style={styles.avatar} />
            <View style={styles.card_header_info}>
              <View style={styles.card_header_info_name}>{user.name}</View>
              <View style={styles.card_header_info_desc}>{user.role}</View>
            </View>
          </View>
          <View style={styles.card_hr}></View>
          <View style={styles.card_info}>
            {renderItems}
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.card_header2}>设置</View>
          <View style={styles.card_item}>
            <Image src='https://ide.code.fun/api/image?token=65f263e5731c750011ff634d&name=e4366256f062cb5c0136af76dda70fd3.png' style={styles.item_png} />
            <View style={styles.item_title}>修改密码</View>
          </View>
          <View style={styles.card_item}>
            <Image src='https://ide.code.fun/api/image?token=65f263e5731c750011ff634d&name=fe0d0df61868ab9e29e493b610090f1f.png' style={styles.item_png} />
            <View style={styles.item_title}>修改个人资料</View>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.card_header2}>其他</View>
          <View style={styles.card_item}>
            <Image src='https://ide.code.fun/api/image?token=65f263e5731c750011ff634d&name=ac6e57bb4d8df01259c9ecb7e4a206b9.png' style={styles.item_png} />
            <View style={styles.item_title}>帮助和反馈</View>
          </View>
          <View style={styles.card_item}>
            <Image src='https://ide.code.fun/api/image?token=65f263e5731c750011ff634d&name=d2db82876d90697b79eb620bc17bba05.png' style={styles.item_png} />
            <View style={styles.item_title}>关于我们</View>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
