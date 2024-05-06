import { Component, PropsWithChildren } from 'react'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import LinearGradient from 'react-native-linear-gradient';
import { inject } from 'mobx-react';
import Taro from '@tarojs/taro';
import styles from './index.module.scss'
import NavBar from '../../components/NavBar';
import DescRow from '../../components/DescRow';
import { outType, carType } from '../../utils/dictory';
import { checkPositionInTimeRange, formatIsoDate } from '../../utils/timeHandle';
import request from '../../utils/api';

@inject('store')
export default class ProcessDetail extends Component<PropsWithChildren> {
  render () {
    const detail = this.props.store.processDetailStore.info;
    const user = detail.user;
    const timeType = checkPositionInTimeRange(detail.start_time, detail.end_time);
    const status = () => {
      if (timeType === 0) {
        return <Text style={styles.status_start}>待开始</Text>;
      } else if (timeType === 1) {
        return <Text style={styles.status_fail}>进行中</Text>;
      } else if (timeType === 2) {
        return <Text style={styles.status_success}>已结束</Text>;
      }
    }

    const deleteTravel = async () => {
      const resq = await request('/travel-record/delete', {recordId: detail.id}, 'GET', true);
      console.log(resq)
      if (resq.code === 200) {
        Taro.showToast({
          title: '删除成功',
          icon: 'success',
          duration: 1500
        })
        const resq = await request('/travel-record/list', {}, 'GET', true);
        if (resq?.code === 200) {
          const data = resq.data.data.travelRecord;
          this.props.store.processStore.setInfo(data);
        } else {
          Taro.showToast({
            title: '获取出行记录数据失败',
            icon: 'error',
            duration: 1500
          })
        }
        Taro.switchTab({
          url: 'pages/process/index'
        })
      } else {
        Taro.showToast({
          title: '删除失败',
          icon: 'error',
          duration: 1500
        })
      }
    }

    const editTravel = () => {
      this.props.store.processEditStore.setInfo(detail);
      Taro.navigateTo({
        url: 'pages/processEdit/index'
      })
    }

    const showModal = () => {
      Taro.showModal({
        title: '提示',
        content: '确认要删除该出行记录么？此操作不可逆！',
        success: async function (res) {
          if (res.confirm) {
            await deleteTravel();
          } 
          // else if (res.cancel) {
          //   console.log('用户点击取消')
          // }
        }
      })
    }

    return (
      <LinearGradient
        colors={['rgba(163, 230, 53, 1)', 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 1)']}
        locations={[0.1, 0.45, 0.9]}
        style={styles.container}
      >
        <NavBar title='记录详情' />
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.title}>
              {`${detail.from_city}~${detail.to_city}`}
            </View>
            <View style={styles.status}>
              {/* <Text style={styles.status_success}>已通过</Text> */}
              {/* <Text style={styles.status_start}>已发起</Text> */}
              {/* <Text style={styles.status_doing}>进行中</Text> */}
              {/* <Text style={styles.status_fail}>已驳回</Text> */}
              {/* <Text style={styles.status_done}>已结束</Text> */}
              {status()}
            </View>
          </View>
          <ScrollView style={styles.infoContent}>
            <DescRow title='起点' value={detail.from} />
            <DescRow title='终点' value={detail.to} />
            <DescRow title='起点城市' value={detail.from_city} />
            <DescRow title='终点城市' value={detail.to_city} />
            <DescRow title='出行类型' value={outType(detail.type)} />
            <DescRow title='交通工具' value={carType(detail.car_type)} />
            <DescRow title='开始时间' value={formatIsoDate(detail.start_time)} />
            <DescRow title='结束时间' value={formatIsoDate(detail.end_time)} />
            <View style={styles.infoContent_hr}></View>
            {/* <View style={styles.infoContent_title}>
              <Text style={styles.infoContent_title_text}>内容</Text>
              <Text style={styles.infoContent_title_content}>{detail.content}</Text>
            </View> */}
            <DescRow title='记录人姓名' value={user.name} />
            <DescRow title='记录人邮箱' value={user.email} />
            <DescRow title='记录人班级' value={user.from} />
            <DescRow title='记录人学号' value={user.student_id} />
            <DescRow title='记录人监护人' value={user.guardian_name} />
            <View style={styles.infoContent_hr}></View>
            <View style={styles.infoContent_title}>
              <Text style={styles.infoContent_title_text}>记录说明</Text>
              <Text style={styles.infoContent_title_content}>{detail.description}</Text>
            </View>
            <View style={styles.infoContent_hr}></View>
            <View style={styles.infoContent_title}>
              <Text style={styles.infoContent_title_text}>记录操作</Text>
              <View style={styles.btn_group}>
                <Button type='primary' style={styles.btn1} size='mini' onClick={editTravel}>修改记录</Button>
                <Button type='primary' style={styles.btn2} size='mini' onClick={showModal}>删除记录</Button>
              </View>
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    )
  }
}
