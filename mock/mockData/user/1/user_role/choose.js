module.exports = {
  type: 'get',
  response: {
    'list|1-10': [
      {
        'id|+1': 1,
        create_time: '@date',
        'checked|1': true,
        address: '上海市普陀区金沙江路 1518 弄',
        name_label: '王小虎'
      }
    ]
  },
  msg: '获取角色列表成功'
};
