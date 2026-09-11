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

// 格式化汇总报告（空数据保护：没有有效记录时返回提示而不是崩溃）
const report = (list) => {
  const valid = cleanWorkouts(list);
  if (valid.length === 0) {
    return '这周还没有有效运动记录';
  }
  return `本周共${valid.length}次有效运动，总里程${totalKm(valid)}公里，最长一次${longest(valid).km}公里（${longest(valid).date}），平均配速${avgPace(valid)}分钟/公里；达标(≥5km)日期：${reached(valid).join('、') || '无'}`;
};

try {
  console.log('本周报告:', report(workouts));
} catch (err) {
  console.error('报告生成失败: ', err.message);
}

// 交互输入：记录今天的一次运动（非法输入只提示，程序不崩溃）
const input = prompt('今天运动了多少公里？（输入数字，点取消则跳过）');
if (input !== null) {
  const km = Number(input);
  if (Number.isNaN(km) || km <= 0) {
    console.warn(`输入"${input}"无效，已忽略本次输入`);  // 非法输入处理
  } else {
    workouts.push({ date: '今天', type: '跑步', km: km, minutes: Math.round(km * 6) });
    console.log('已记录今天的运动:', workouts[workouts.length - 1]);
    console.log('更新后的报告:', report(workouts));
  }
}
