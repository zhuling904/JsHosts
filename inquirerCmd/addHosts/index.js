const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { choicesInputMethod } = require('../../utils');
async function addHosts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectName',
                message: '<增加>hosts配置',
                choices: [
                    '1.增加预设hosts',
                    '2.增加配置文件',
                    '3.hosts文件中追加hosts',
                ]
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            switch (selectName) {
                case '1.增加预设hosts':
                    addDefaultHosts(); break;
                case '2.增加配置文件':
                    console.log('这是一个介绍2'); break;
                case '3.hosts文件中追加hosts':
                    console.log('这是一个介绍3'); break;
            }
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

/**
 * 增加预设hosts
 */
async function addDefaultHosts() {
    const method = await choicesInputMethod();
    console.log("✅ ~ zhuling method:", method)
    inquirer
        .prompt([
            {
                type: method,
                name: 'selectName',
                message: '请输入新增的预设:',
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            console.log("✅ ~ zhuling selectName:", selectName)
            if(method === 'input') {
                fs.appendFile(path.resolve(__dirname, '../../defaultHosts/hosts.txt'), `${selectName}\n`, (err,data) => {
                    if(err) throw err;
                    console.log("✅ ~ zhuling data:", data)
                })
            }
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

exports.addHosts = addHosts;