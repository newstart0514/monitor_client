import { View, Text, Button, Image } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'

export default class StatusCard extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "",
    content: "",
    status: "",
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, content, status } = this.props;
    const imgList = [
      'https://ide.code.fun/api/image?token=65eec9a8eb5b550011340e16&name=54a21c70439efc277594da2f282ec69d.png',
      'https://ide.code.fun/api/image?token=65eec9a8eb5b550011340e16&name=88109d0184270137d5a7cd48acb0dd34.png',
      'https://ide.code.fun/api/image?token=65eec9a8eb5b550011340e16&name=d89beca83758a5454e50da9e6c939027.png'
    ];
    let imgSrc = imgList[0];
    if(status === 'loading') {
      imgSrc = imgList[1];
    } else if(status === 'error') {
      imgSrc = imgList[2];
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
          <Text style={styles.content_text}>流程状态:{status}</Text>
          <Text style={styles.content_text}>状态描述:{content}</Text>
        </View>
        <View style={styles.button_container}>
          <Button style={styles.button} size="mini" type="primary">详情</Button>
        </View>
      </View>
    );
  }
}