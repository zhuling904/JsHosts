const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { addToHosts } = require('../addConfigFile');
const { getDefaultHosts } = require('../../utils/getDefaultHosts');
const { getConfigList } = require('../../utils/getConfigList');
const { writeHosts } = require('../../utils/writeHosts');
const { readCurHosts } = require('../readHosts');
const PAGESIZE = 99;
const COMMENT_START = '#---JSHOSTS HOSTS START---';
const COMMENT_END = '#---JSHOSTS HOSTS END---';
async function delHosts() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectName',
                message: '删除hosts配置',
                choices: [
                    '1.删除预设hosts',
                    '2.删除配置文件',
                    '3.清除已添加的hosts配置',
                ]
            },
        ])
        .then(async (answers) => {
            const { selectName } = answers;
            switch (selectName) {
                case '1.删除预设hosts':
                    delDefaultHosts(); break;
                case '2.删除配置文件':
                    delConfigFile(); break;
                case '3.清除已添加的hosts配置':
                    clearConfig(); break;
            }
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

async function delDefaultHosts() {
    const defaultHostsList = await getDefaultHosts();
    // 处理数据
    let lines = defaultHostsList.trim().split("\n");
    await inquirer
        .prompt([
            {
                type: 'checkbox',
                name: 'selectName',
                message: '请选择删除的预设hosts',
                pageSize: PAGESIZE,
                choices: lines
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            // 删除选中项
            lines = lines.filter(item => !selectName.includes(item));
            let writeContent = '';
            lines.forEach(item => {
                writeContent = writeContent + item + '\n';
            });
            fs.writeFile(path.resolve(__dirname, '../../defaultHosts/hosts.txt'), writeContent, (err) => {
                if(err) throw err;
                console.log('删除成功');
            })
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

async function delConfigFile() {
    const config_list = await getConfigList();
    inquirer
        .prompt([
            {
                type: 'checkbox',
                name: 'selectName',
                message: '请选择需要删除的配置文件',
                pageSize: PAGESIZE,
                choices: config_list
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            selectName.forEach(item=>{
                fs.unlink(path.resolve(__dirname, `../../hosts_config/${item}`), err =>{
                    if(err) throw err
                    console.log('删除成功')
                })
            })
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

async function clearConfig() {
    const curHosts = await readCurHosts();
    if (!curHosts.includes(COMMENT_START)) {
        console.log('还未添加过配置');
        return;
    }
    inquirer
        .prompt([
            {
                type: 'confirm',
                name: 'selectName',
                message: '确认清除配置?',
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            if(selectName) writeHosts(undefined, false, true);
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

exports.delHosts = delHosts;
exports.clearConfig = clearConfig;