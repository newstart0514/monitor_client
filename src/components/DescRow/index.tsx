import { View } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'

export default class DescRow extends Component<PropsWithChildren> {
  static defaultProps = {
    title: '',
    value: ''
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, value } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.left}>{title}</View>
        <View style={styles.right}>{value}</View>
      </View>
    );
  }
}