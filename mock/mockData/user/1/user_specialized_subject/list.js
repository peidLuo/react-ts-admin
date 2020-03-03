module.exports = {
  type: 'get',
  response: {
    data: {
      list: [
        {
          id: 1,
          specialized_subject_name: '专业名称1',
          specialized_subject_code: '代码1',
          specialized_subject_full_name: '专业大类1/专业名称1',
          specialized_subject_remarks: '专业备注1'
        },
        {
          id: 2,
          specialized_subject_name: '专业名称2',
          specialized_subject_code: '代码2',
          specialized_subject_full_name: '专业大类2/专业名称2',
          specialized_subject_remarks: '专业备注2'
        }
      ]
    }
  },
  msg: '获取用户专业列表成功'
};
