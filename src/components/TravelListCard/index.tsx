import { View, Text, Button, Image } from "@tarojs/components";
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
        
      </View>
    );
  }
}