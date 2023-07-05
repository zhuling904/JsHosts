const readline = require('readline');

// 创建readline接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 提问用户的姓名
rl.question('请输入您的姓名：', (name) => {
  console.log(`欢迎，${name}！`);
  
  // 关闭readline接口
  rl.close();
});
