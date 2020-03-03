/*
报名类型枚举
1：外网报名
2：教务报名
3：部长报名
4：集体报名
*/
const signUpTypeEnum = {
  NORMAL: 1,
  EDU: 2,
  MINISTER: 3,
  GROUP: 4
};

/*
报名状态
1： 已预报名
2： 可面试
3： 可缴费
4： 已缴费
5： 已撤销
6： 已失效
7： 退费中
8： 已退费
9： 待激活
10：面试未通过
11：摇号未中
*/
const signUpFlowStatus = {
  TO_ROCKING_NUMBER: 1,
  TO_INTERVIEW: 2,
  TO_PAY: 3,
  PAID: 4,
  REVOKE: 5,
  INVALID: 6,
  REFUNDING: 7,
  REFUNDED: 8,
  TO_ACTIVATE: 9,
  INTERVIEW_FAILED: 10,
  ROCKING_NUMBER_FAILED: 11
};

/*
课程阶段
1：未上课
2：上课中
3：已结课
*/

const classPhaseEnum = {
  UN_START: 1,
  STARTING: 2,
  FINISH: 3
};

window.ENUM = {
  signUpTypeEnum,
  signUpFlowStatus,
  classPhaseEnum
};

export default window.ENUM;
