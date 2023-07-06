const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { choicesInputMethod } = require('../../utils');
const { readCurHosts } = require('../readHosts');
const { getDefaultHosts } = require('../../utils/getDefaultHosts');
const { getInputFileName } = require('../getInputFileName');
const { writeHosts } = require('../../utils/writeHosts');
const regex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([a-zA-Z0-9.-]+)$/;
const PAGESIZE = 99;
const COMMENT_START = '#---ZHULING HOSTS START---';
const COMMENT_END = '#---ZHULING HOSTS END---';
/**
 * 增加预设hosts
 */
async function addConfigFile() {
    const { selectName, fileName } = await getFileInfo();
    fs.writeFile(path.resolve(__dirname, `../../hosts_config/${fileName}.txt`), selectName, (err) => {
        if (err) throw err;
    })
}

async function addToHosts() {
    const { selectName } = await getFileInfo(false);
    console.log("✅ ~ zhuling selectName:", selectName);
    // 判断hosts中是否已经有该hosts了
    const curHosts = await readCurHosts();
    console.log("✅ ~ zhuling curHosts:", curHosts)
    if (curHosts.includes(selectName)) {
        console.log('该hosts已在文件中，请勿重复添加');
        return;
    } else {
        // 写入hosts
        let writeContent = `${selectName}`
        writeHosts(writeContent, true);
    }

}

async function getFileInfo(needFileName = true) {
    const method = await choicesInputMethod(true);
    console.log("✅ ~ zhuling method:", method)
    const defaultHostsList = await getDefaultHosts();
    // 处理数据
    const lines = defaultHostsList.trim().split("\n");
    let { selectName } = await inquirer
        .prompt([
            {
                type: method,
                name: 'selectName',
                message: '请输入配置文件内容:',
                pageSize: method === 'checkbox' ? PAGESIZE : undefined,
                choices: method === 'checkbox' ? lines : undefined,
                validate: method === 'checkbox' ? undefined : (val) => {
                    const lines = val.trim().split("\n");
                    console.log("✅ ~ zhuling lines:", lines)
                    let flag = true;
                    lines.forEach(item => {
                        if (!item.match(regex)) {
                            flag = false;
                        }
                    });
                    if (flag) return true;
                    if (!flag) return '请输入正确的hosts';
                },
            },
        ])
    // 处理通过预设生成配置文件
    if (Array.isArray(selectName)) {
        let selectNameStr = '';
        selectName.forEach(item => {
            selectNameStr = `${selectNameStr}${item}\n`;
        })
        selectName = selectNameStr
    }
    console.log("✅ ~ zhuling selectName:", selectName)
    const fileName = needFileName && await getInputFileName();
    console.log("✅ ~ zhuling fileName:", fileName)
    // 创建一个文件
    return {
        selectName,
        fileName
    }
}

exports.addConfigFile = addConfigFile;
exports.addToHosts = addToHosts;