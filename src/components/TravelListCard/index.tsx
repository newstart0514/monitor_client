import { View, Text, Button } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'
import Taro from "@tarojs/taro";

export default class TravelListCard extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "错误的标题",
    price: "null元",
    time: "9:00~11:00",
    click: () => {
      Taro.showToast({
        title: '获取出行信息详情失败',
        icon: 'error',
        duration: 1500
      })
    }
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, price, time, click } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.title_text}>{title}</Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.content_text}>价格：{price}</Text>
          <Text style={styles.content_text}>时间：{time}</Text>
        </View>
        <View style={styles.button_container}>
          <Button style={styles.button} size='mini' type='primary' onClick={click} >详情</Button>
        </View>
      </View>
    );
  }
}