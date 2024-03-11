import { View } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'

export default class ChatBox extends Component<PropsWithChildren> {
  static defaultProps = {
    content: '',
    type: ''
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { content, type } = this.props;

    return (
      <View style={styles.container}>
        {
          type === 'user' ? 
          <View style={styles.user}>{content}</View> : 
          <View style={styles.system}>{content}</View>
        }
      </View>
    );
  }
}