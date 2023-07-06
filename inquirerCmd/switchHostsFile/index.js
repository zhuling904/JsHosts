const { getConfigList } = require("../../utils/getConfigList");
const inquirer = require('inquirer');
const { getConfileContent } = require("../../utils/getConfileContent");
const { writeHosts } = require("../../utils/writeHosts");
const PAGESIZE = 99;
async function switchHostsFile() {
    const config_list = await getConfigList();
    console.log("✅ ~ zhuling config_list:", config_list)
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectName',
                message: '请选择配置文件',
                pageSize: PAGESIZE,
                choices: config_list
            },
        ])
        .then(async (answers) => {
            const { selectName } = answers;
            console.log("✅ ~ zhuling selectName:", selectName);
            const fileContent = await getConfileContent(selectName);
            console.log("✅ ~ zhuling fileContent:", fileContent);
            writeHosts(fileContent, false, false);
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

exports.switchHostsFile = switchHostsFile;