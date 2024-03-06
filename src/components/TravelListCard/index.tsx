import { View, Text, Button } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'

export default class TravelListCard extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "校车A",
    price: "2元",
    time: "9:00~11:00",
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, price, time } = this.props;

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
          <Button style={styles.button} size="mini" type="primary">详情</Button>
        </View>
      </View>
    );
  }
}