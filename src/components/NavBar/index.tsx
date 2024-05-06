import { View, Text, Button } from "@tarojs/components";
import { Component, PropsWithChildren } from "react";
import styles from './index.module.scss'
import Taro from "@tarojs/taro";
import request from "../../utils/api";

export default class NavBar extends Component<PropsWithChildren> {
  static defaultProps = {
    title: "",
  }
  constructor(props) {
    super(props)
  }

  back = () => {
    Taro.navigateBack({
      delta: 1
    });
  }

  toProcessDetail = () => {
    Taro.navigateTo({
      url: 'pages/processEdit/index'
    })
  }

  addContent = () => {
    Taro.navigateTo({
      url: 'pages/content/index'
    })
  }

  addWarn = async () => {
    const data = {
      cc_to_id: 1,
      approver_id: 1,
      type: "0",
      title: "用户的紧急告警",
      "content": "我遇到了危险，需要帮助，SOS！",
      "cost": "紧急危险处理"
    }
    const resq = await request('/process/add', data, 'POST', true);
    if (resq.code === 201) {
      Taro.showToast({
        title: '紧急报警成功',
        icon: 'success',
        duration: 5000
      })
    }
  }

  buttonView = (title: string) => {
    if(title === '首页') {
      return <Button type='primary' style={styles.btn} size='mini' onClick={this.addWarn}>紧急报警</Button>
    } else if(title === '出行信息') {
      return <Button type='primary' style={styles.btn} size='mini' onClick={this.addContent} >发布信息</Button>
    } else if(title === '个人出行') {
      return <Button type='primary' style={styles.btn} size='mini' onClick={this.toProcessDetail}>新建出行</Button>
    } else if(title === '流程编辑' || title === '内容编辑' || title === '记录编辑' || title === '信息编辑' || title === '密码修改') {
      return <Button type='primary' style={styles.cancelBtn} size='mini' onClick={this.back}>取消</Button>
    } else if(title === '出行详情' || title === '记录详情') {
      return <Button type='primary' style={styles.cancelBtn} size='mini' onClick={this.back}>返回</Button>
    }
    return null;
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.navbarContainer}>
        <View style={styles.left}>
          <Text style={styles.title}>{title}</Text>
          {this.buttonView(title)}
        </View>
      </View>
    );
  }
}