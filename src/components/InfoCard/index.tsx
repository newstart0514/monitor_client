import { View } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'
import DescRow from "../DescRow";

export default class InfoCard extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "信息标题",
    content: {},
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title, content } = this.props;

    const keys = Object.keys(content);
    const renderItems = keys.map((key, index) =>
      <DescRow title={key} value={content[key]} key={index}/>
    );

    return (
      <View style={styles.container}>
        <View style={styles.title}>{title}</View>
        <View style={styles.content}>
          {renderItems}
        </View>
      </View>
    );
  }
}