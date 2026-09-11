// workout-stat/script.js —— 第1次提交：定义一周运动数据
// 每条记录是一个对象：日期、运动类型、距离(公里)、时长(分钟)
const workouts = [
  { date: '周一', type: '跑步', km: 5.2, minutes: 32 },
  { date: '周二', type: '快走', km: 3.0, minutes: 40 },
  { date: '周三', type: '跑步', km: -2.0, minutes: 20 },  // 故意混入非法值：负数距离
  { date: '周四', type: '骑行', km: 12.5, minutes: 45 },
  { date: '周五', type: '跑步', km: 6.8, minutes: 41 },
  { date: '周六', type: '跳绳', km: 0, minutes: 0 },      // 故意混入非法值：无效记录
  { date: '周日', type: '跑步', km: 8.3, minutes: 50 }
];

console.log('原始记录数:', workouts.length);
