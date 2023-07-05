const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const { choicesInputMethod } = require('../../utils');
const { readDefaultHosts } = require('../readHosts');
const { getDefaultHosts } = require('../../utils/getDefaultHosts');
const { getInputFileName } = require('../getInputFileName');
const regex = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})\s+([a-zA-Z0-9.-]+)$/;
const PAGESIZE = 99;
/**
 * 增加预设hosts
 */
async function addConfigFile() {
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
                pageSize: method==='checkbox' ? PAGESIZE: undefined,
                choices: method==='checkbox' ? lines : undefined,
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
    if(Array.isArray(selectName)) {
        let selectNameStr = '';
        selectName.forEach(item => {
            selectNameStr = `${selectNameStr}${item}\n`;
        })
        selectName = selectNameStr
    }
    console.log("✅ ~ zhuling selectName:", selectName)
    const fileName = await getInputFileName();
    console.log("✅ ~ zhuling fileName:", fileName)
    // 创建一个文件
    fs.writeFile(path.resolve(__dirname, `../../hosts_config/${fileName}.txt`), selectName, (err)=>{
        if(err) throw err;
    })
}

exports.addConfigFile = addConfigFile;