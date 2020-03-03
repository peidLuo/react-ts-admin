export default {
  CAPTCHA_ERROR: 105001,
  TOKEN_NEED_REFRESH: 99997, // 访问Token已过期，请刷新token
  TIMER_OUT: 105000, // 验证码过期
  NEED_LOGIN: 99995, // session过期，需要登录
  INVALID: 99998, // session过期，需要登录
  SUCCESS: 999999, // 成功
  NEED_CATCH_LIST: [105001, 99997, 99998, 105001, 105000]
};
