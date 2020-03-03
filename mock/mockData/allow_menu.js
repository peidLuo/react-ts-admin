module.exports = {
  type: 'get',
  response: () => ({
    data: [
      {
        id: 1,
        path: '/class',
        name: '班级管理',
        meta: {
          title: '班级管理'
        },
        children: [
          {
            id: 11,
            path: 'inf',
            name: '信息管理',
            meta: {
              title: '信息管理'
            }
          },
          {
            id: 12,
            path: 'status',
            name: '状态管理',
            meta: {
              title: '状态管理'
            }
          },
          {
            id: 13,
            path: 'numbers',
            name: '摇号管理',
            meta: {
              title: '摇号管理'
            }
          }
        ]
      },
      {
        id: 14,
        path: '/personal',
        name: '个人信息',
        meta: {
          title: '个人信息',
          icon: 'lock'
        },
        children: [
          {
            id: 15,
            path: 'base',
            name: '基础信息',
            meta: {
              title: '基础信息'
            }
          },
          {
            id: 16,
            path: 'classes',
            name: '我的班级',
            meta: {
              title: '我的班级'
            }
          },
          {
            id: 17,
            path: 'substitute',
            name: '代课管理',
            meta: {
              title: '代课管理'
            }
          },
          {
            id: 18,
            path: 'payroll',
            name: '我的工资单',
            meta: {
              title: '我的工资单'
            }
          }
        ]
      },
      {
        id: 19,
        path: '/base',
        name: '基础数据',
        meta: {
          title: '基础数据',
          icon: 'lock'
        },
        children: [
          {
            id: 20,
            path: 'structure',
            name: '组织架构',
            meta: {
              title: '组织架构'
            }
          },
          {
            id: 21,
            path: 'building',
            name: '教学楼管理',
            meta: {
              title: '教学楼管理'
            }
          },
          {
            id: 22,
            path: 'special',
            name: '专业管理',
            meta: {
              title: '专业管理'
            }
          },
          {
            id: 23,
            path: 'grade',
            name: '级别管理',
            meta: {
              title: '级别管理'
            }
          },
          {
            id: 24,
            path: 'discount',
            name: '打折理由',
            meta: {
              title: '打折理由'
            }
          }
        ]
      },
      {
        id: 25,
        path: '/sys',
        name: '系统管理',
        meta: {
          title: '系统管理',
          icon: 'lock'
        },
        children: [
          {
            id: 26,
            path: 'role',
            name: '角色管理',
            meta: {
              title: '角色管理'
            }
          },
          {
            id: 27,
            path: 'member',
            name: '成员管理',
            meta: {
              title: '成员管理'
            }
          }
        ]
      }
    ]
  })
};
