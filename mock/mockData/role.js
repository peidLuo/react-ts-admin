module.exports = {
  type: ['post', 'get'],
  response: config => {
    const { method } = config;
    if (method === 'GET') {
      return {
        data: {
          list: [{
            id: 1,
            name: '角色1'
          }, {
            id: 2,
            name: '角色2'
          }]
        },
        msg: '获取角色列表成功'
      };
    }
    return {
      data: {
        role: {
          id: 3,
          name: '角色3'
        }
      },
      msg: '创建角色成功'
    };
  }
};
