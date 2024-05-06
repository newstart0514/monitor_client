import Taro, { showLoading, hideLoading } from '@tarojs/taro';
const BASE_URL = 'https://api.lbgblog.xyz';
const REFRESH_TOKEN_URL = '/user/refresh'; // 通常是一个单独的端点，用于刷新JWT
let isRefreshing = false; // 标记是否正在刷新JWT

const request = async (url, data = {}, method = 'GET', needAuth = true) => {
  showLoading({ title: '加载中...' });
  let accessToken: string = '';
  await Taro.getStorage({
    key: 'access_token',
    success(result) {
      accessToken = result.data;
    },
    fail(res) {
      Taro.showToast({
        title: '用户未登录',
        icon: "none",
        duration: 1000
      });
      return;
    },
  })
  const header = needAuth ? { 'Authorization': `Bearer ${ accessToken }` } : {};
  let resq = {
    code: 0,
    data: {}
  };
  await Taro.request({    
    url: BASE_URL + url,
    method, 
    header: { ...header, 'Content-Type': 'application/json' },
    data,
    dataType: 'json',    
    success: async (res) => {      
      hideLoading();
      if (res.statusCode === 401 && needAuth) {        
        const repate = await handleAuthError(url, data, method, needAuth);
        resq = repate;
      }
      resq.data = res.data;
      resq.code = res.statusCode;
    },    
    fail: (err) => {
      hideLoading(); 
      console.log(err);
      Taro.showToast({
        title: '请求失败',
        icon: 'error',
        duration: 2000
      })  
    }  
  });
  return resq;
};

const handleAuthError = async (originalUrl, originalData, originalMethod, needAuth) => {
  if (!isRefreshing) {    
    isRefreshing = true; 
    let refreshToken = '';
    await Taro.getStorage({
      key: 'refresh_token',
      success(result) {
        refreshToken = result.data;
      },
      fail(res) {
        Taro.showToast({
          title: '用户未登录',
          icon: "none",
          duration: 1000
        });
        return;
      },
    })
    try {      
      const refreshTokenRes = await Taro.request({        
        url: BASE_URL + REFRESH_TOKEN_URL,        
        method: 'GET',        
        data: { refresh_token: refreshToken },        
        // 这里不需要携带JWT，因为我们是要刷新它      
      });
      if (refreshTokenRes.statusCode === 200) {        
        const newJwt = refreshTokenRes.data.data.access_token;        
        const newRefreshToken = refreshTokenRes.data.data.refresh_token;        
        Taro.setStorage({
          key: 'access_token',
          data: newJwt
        });
        Taro.setStorage({
          key: 'refresh_token',
          data: newRefreshToken
        })
        // 重新发送原请求       
        return request(originalUrl, originalData, originalMethod, needAuth);      
      } else {        
        Taro.showToast({
          title: '登录态失效',
          icon: 'error',
          duration: 2000
        })
      }    
    } catch (error) {       
      // 这里可以执行登出操作，例如清除本地存储的JWT和刷新令牌      
      Taro.removeStorage({
        key: 'access_token'
      });
      Taro.removeStorage({
        key: 'refresh_token'
      });
      // 根据实际情况可能需要进行页面跳转等操作
      Taro.navigateTo({
        url: 'pages/login/index'
      })    
    } finally {      
      isRefreshing = false;    
    }  
  }
};

export default request;

// // 使用示例
// const originalUrl = 'your/api/endpoint';
// const originalData = { /* 请求数据 */ };
// const originalMethod = 'POST';
// request(originalUrl, originalData, originalMethod, true).then((data) => {  
//   // 处理请求成功
// }).catch((error) => {  
//   // 处理请求失败
// });