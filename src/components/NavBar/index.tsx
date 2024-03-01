import { View, Text, Button } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'

export default class NavBar extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "",
  }
  constructor(props) {
    super(props)
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.navbarContainer}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          {title === "首页" ? <Button type='primary' style={styles.btn} size='mini'>紧急报警</Button> : null}
        </View>
      </View>
    );
  }
}