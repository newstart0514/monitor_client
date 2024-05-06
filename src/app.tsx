import { Component, PropsWithChildren } from 'react'
import { Provider } from 'mobx-react'
import store from './store/index'
import './app.scss'

class App extends Component<PropsWithChildren> {

  // this.props.children 是将要会渲染的页面
  render () {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}
export default App
