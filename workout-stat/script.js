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

// 清洗：只保留距离和时长都大于 0 的合法记录
const cleanWorkouts = (list) => list.filter(w => w.km > 0 && w.minutes > 0);

// 总里程：把所有记录的公里数累加
const totalKm = (list) => list.reduce((sum, w) => sum + w.km, 0);

// 最长的一次运动：两两比较，留下距离最大的那条
const longest = (list) => list.reduce((max, w) => w.km > max.km ? w : max, list[0]);

// 平均配速：总时长 ÷ 总里程，保留 1 位小数（分钟/公里）
const avgPace = (list) => (list.reduce((sum, w) => sum + w.minutes, 0) / totalKm(list)).toFixed(1);

// 达标记录：单次 ≥ 5 公里的日期名单（filter 筛选 + map 提取日期）
const reached = (list) => list.filter(w => w.km >= 5).map(w => w.date);

const valid = cleanWorkouts(workouts);
console.log('清洗后记录数:', valid.length);
console.log('总里程:', totalKm(valid), '公里');
console.log('最长一次:', longest(valid));
console.log('平均配速:', avgPace(valid), '分钟/公里');
console.log('达标记录(单次≥5km):', reached(valid));
