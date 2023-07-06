const { getConfigList } = require("../../utils/getConfigList");
const inquirer = require('inquirer');
const { getConfileContent } = require("../../utils/getConfileContent");
const { writeHosts } = require("../../utils/writeHosts");
const PAGESIZE = 99;
async function switchHostsFile() {
    const config_list = await getConfigList();
    if(config_list.length === 0) {
        console.log('配置文件为空，请先添加配置文件'); 
        return;
    }
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
            const fileContent = await getConfileContent(selectName);
            await writeHosts(fileContent, false, false);
        }).catch((error) => {
            console.error('出错啦！', error);
        });
}

exports.switchHostsFile = switchHostsFile;