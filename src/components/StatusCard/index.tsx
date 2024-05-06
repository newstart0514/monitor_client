import { View, Text, Button, Image } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import Taro from "@tarojs/taro";
import styles from './index.module.scss'

export default class StatusCard extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "",
    content: "",
    status: "",
    click: () => {
      Taro.showToast({
        title: '获取出行详情失败，请重试',
        icon: 'error',
        duration: 1500
      })
    }
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, content, status, click } = this.props;
    const imgList = [
      'https://s21.ax1x.com/2024/04/10/pFOhW2n.png',
      'https://s21.ax1x.com/2024/04/10/pFOh5rV.png',
      'https://s21.ax1x.com/2024/04/10/pFOhIbT.png'
    ];
    const statusArr = ['未开始', '进行中', '已结束'];
    let imgSrc = imgList[0];
    if(status === 'loading') {
      imgSrc = imgList[1];
    } else if(status === 'error') {
      imgSrc = imgList[2];
    }

    const getStatus = (type: string) => {
      let res = statusArr[2];
      if(type === 'loading') {
        res = statusArr[1];
      } else if(type === 'error') {
        res = statusArr[0];
      }
      return res;
    }

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.title_text}>
            <Image src={imgSrc} style={styles.img} />
            {title}
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.content_text}>状态:{getStatus(status)}</Text>
          <Text style={styles.content_text}>{content}</Text>
        </View>
        <View style={styles.button_container}>
          <Button style={styles.button} size='mini' type='primary' onClick={click}>详情</Button>
        </View>
      </View>
    );
  }
}