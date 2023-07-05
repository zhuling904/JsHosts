const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
async function readHosts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectName',
                message: '<查看>hosts配置',
                choices: [
                    '1.查看预设hosts列表',
                    '2.查看配置文件列表',
                    '3.查看当前hosts',
                ]
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            switch (selectName) {
                case '1.查看预设hosts列表':
                    readDefaultHosts(); break;
                case '2.查看配置文件列表':
                    console.log('这是一个介绍2'); break;
                case '3.查看当前hosts':
                    console.log('这是一个介绍3'); break;
            }
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

async function readDefaultHosts() {
    let hostList = [];
    fs.readFile(path.resolve(__dirname, '../../defaultHosts/hosts.txt'), { encoding: 'utf-8' }, (err, data) => {
        if (err) throw err;
        console.log("✅ ~ zhuling data:\n", data)
    })
    // 用chekout展示
}

exports.readHosts = readHosts;