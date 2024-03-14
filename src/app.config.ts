export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/travel/index',
    'pages/travelDetail/index',
    'pages/AIChat/index',
    'pages/process/index',
    'pages/content/index',
    'pages/processEdit/index',
    'pages/processDetail/index',
    'pages/login/index',
    'pages/register/index',
    'pages/personal/index',
    'pages/personalEdit/index',
  ],
  tabBar: {
    selectedColor: '#a3e635',
    borderStyle: 'white',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/index/index',
        iconPath: 'static/home.png',
        selectedIconPath: 'static/home_hover.png',
        text: '首页'
      },
      {
        pagePath: 'pages/travel/index',
        iconPath: 'static/carList.png',
        selectedIconPath: 'static/carList_hover.png',
        text: '出行'
      },
      {
        pagePath: 'pages/AIChat/index',
        iconPath: 'static/chat.png',
        selectedIconPath: 'static/chat_hover.png',
        text: '智能助理'
      },
      {
        pagePath: 'pages/process/index',
        iconPath: 'static/process.png',
        selectedIconPath: 'static/process_hover.png',
        text: '我的流程'
      },
      {
        pagePath: 'pages/personal/index',
        iconPath: 'static/info.png',
        selectedIconPath: 'static/info_hover.png',
        text: '个人中心'
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: 'transparent',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom',
  }
})
