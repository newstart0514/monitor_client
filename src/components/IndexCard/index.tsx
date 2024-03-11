import { View, Text, Button, Image } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'

export default class IndexCard extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "无标题",
    content: "无内容",
    img: "https://ide.code.fun/api/image?token=65e59070eb5b55001132901f&name=0061554342d6c780227fe2884709370f.png",
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, content, img } = this.props;

    return (
      <View style={styles.container}>
        <Image src={img} style={styles.imgContainer} />
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>{title}</Text>
          <Text numberOfLines={5} style={styles.content}>{content}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button style={styles.button} size="mini" type="primary">查看详情</Button>
        </View>
      </View>
    );
  }
}