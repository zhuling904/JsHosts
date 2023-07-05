#!/usr/bin/env node

const { program } = require('commander');

program
  .version('1.0.0')
  .description('一个带有多个命令的命令行工具');

program
  .command('greet <name>')
  .description('向某人打招呼')
  .option('-t, --times <n>', '打招呼的次数', parseInt, 1)
  .action((name, options) => {
    for (let i = 0; i < options.times; i++) {
      console.log(`你好，${name}！`);
    }
  });

program
  .command('count')
  .description('从1数到给定的数字')
  .option('-s, --start <start>', '起始数字', parseInt, 1)
  .option('-e, --end <end>', '结束数字', parseInt, 10)
  .action((options) => {
    const { start, end } = options;
    for (let i = start; i <= end; i++) {
      console.log(i);
    }
  });

program.parse(process.argv);
