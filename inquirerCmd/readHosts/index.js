const inquirer = require('inquirer');
const { getDefaultHosts } = require('../../utils/getDefaultHosts');
const { getConfigList } = require('../../utils/getConfigList');
const { getCurHosts } = require('../../utils/getCurHosts');
const PAGESIZE = 99;
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
                    '3.查看当前hosts(只读)',
                ]
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            switch (selectName) {
                case '1.查看预设hosts列表':
                    readDefaultHosts(); break;
                case '2.查看配置文件列表':
                    readHostConfigDir(); break;
                case '3.查看当前hosts(只读)':
                    readCurHosts(); break;
            }
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

async function readDefaultHosts() {
    const defaultHostsList = await getDefaultHosts();
    // 处理数据
    const lines = defaultHostsList.trim().split("\n");
    inquirer
        .prompt([
            {
                type: 'checkbox',
                name: 'selectName',
                message: '预设hosts列表',
                pageSize: PAGESIZE,
                choices: lines
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

async function readHostConfigDir() {
    const config_list = await getConfigList();
    console.log("✅ ~ zhuling config_list:", config_list)
    inquirer
        .prompt([
            {
                type: 'checkbox',
                name: 'selectName',
                message: '预设hosts列表',
                pageSize: PAGESIZE,
                choices: config_list
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

async function readCurHosts() {
    const hosts = await getCurHosts();
    console.log("✅ ~ zhuling hosts:", hosts)
}

exports.readHosts = readHosts;
exports.readDefaultHosts = readDefaultHosts;