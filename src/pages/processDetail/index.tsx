import { Component, PropsWithChildren } from 'react'
import { View, Input, Button, Text } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import DescRow from '../../components/DescRow';

export default class ProcessDetail extends Component<PropsWithChildren> {
  render () {
    const detail = {
      promoter: '张三',
      cc_to: '李四',
      approver: '王五',
      type: '个人出行',
      status_desc: '流程状态已经由用户和审批人确认，自动结束。如果需要重新发起流程，请联系管理员。',
      title: '个人出行审批',
      content: '我申请了个人出行，请审批。我需要去公司出差，请安排我到公司。同时为我安排一个接机人。',
      cost: '10元',
    }

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='流程详情' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              {detail.title}
            </View>
            <View style={styles.status}>
              {/* <Text style={styles.status_success}>已通过</Text> */}
              {/* <Text style={styles.status_start}>已发起</Text> */}
              {/* <Text style={styles.status_doing}>进行中</Text> */}
              {/* <Text style={styles.status_fail}>已驳回</Text> */}
              <Text style={styles.status_done}>已结束</Text>
            </View>
          </View>
          <View style={styles.infoContent}>
            <DescRow title='发起人' value={detail.promoter} />
            <DescRow title='抄送人' value={detail.cc_to} />
            <DescRow title='审批人' value={detail.approver} />
            <DescRow title='类型' value={detail.type} />
            <DescRow title='资源花费' value={detail.cost} />
            <View style={styles.infoContent_hr}></View>
            <View style={styles.infoContent_title}>
              <Text style={styles.infoContent_title_text}>内容</Text>
              <Text style={styles.infoContent_title_content}>{detail.content}</Text>
            </View>
            <View style={styles.infoContent_hr}></View>
            <View style={styles.infoContent_title}>
              <Text style={styles.infoContent_title_text}>状态描述</Text>
              <Text style={styles.infoContent_title_content}>{detail.status_desc}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    )
  }
}
