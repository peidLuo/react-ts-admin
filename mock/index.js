const Mock = require('mockjs');

const { VUE_APP_MOCK } = process.env;

const mocks = [];

const controllers = require('./requireAll')({
  dirname: `${__dirname}/mockData`
});

// 循环获取对象并扁平化
const setMockData = obj => {
  Object.keys(obj).map(key => {
    const item = obj[key];
    if (item && item.url) {
      return mocks.push(obj[key]);
    }
    return setMockData(item);
  });
};

setMockData(controllers);
// for mock server
const responseFake = (url, type, respond) => ({
  url: new RegExp(
    `${VUE_APP_MOCK || '/mock'}${url.replace(/_file|_folde/g, '')}`
  ),
  type: type || 'get',
  response(req, res) {
    const data = respond instanceof Function ? respond(req, res) : respond;
    if (data) {
      setTimeout(() => {
        if (data.code && data.code !== 200) {
          res.status(data.code || 404).json(Mock.mock(data));
        } else {
          res.json(Mock.mock(data));
        }
      }, (data && data.timeout) || 0);
    } else {
      res.status(404).end();
    }
  }
});

const mockDatas = [];
mocks.map(route => {
  if (route.type instanceof Array) {
    // 支持type以array的形式传递
    return route.type.map(item =>
      mockDatas.push(responseFake(route.url, item, route.response))
    );
  }
  return mockDatas.push(responseFake(route.url, route.type, route.response));
});

module.exports = mockDatas;
