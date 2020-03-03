module.exports = {
  type: 'get',
  response: {
    data: {
      list: [
        {
          id: 1,
          create_time: '2018-1-1',
          role_name: '角色名称1'
        },
        {
          id: 2,
          create_time: '2018-1-1',
          role_name: '角色名称2'
        }
      ]
    }
  },
  msg: '获取用户角色列表成功'
};
