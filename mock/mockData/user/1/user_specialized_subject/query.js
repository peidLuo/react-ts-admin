module.exports = {
  type: 'get',
  response: {
    data: {
      list: [
        {
          id: 1,
          name: '名称1',
          code: '专业代码1',
          full_name: '专业大类1/专业名称1',
          remarks: '专业备注1',
          checked: true
        },
        {
          id: 2,
          name: '名称2',
          code: '专业代码2',
          full_name: '专业大类2/专业名称2',
          remarks: '专业备注2',
          checked: false
        }
      ]
    }
  },
  msg: '获取专业列表成功'
};
