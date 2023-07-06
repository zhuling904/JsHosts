const inquirer = require('inquirer');
const { program } = require('commander');
const { addHosts, addDefaultHosts, addConfigFile, addToHosts } = require('./addHosts');
const { readHosts, readHostConfigDir, readDefaultHosts, readCurHosts } = require('./readHosts');
const { delHosts, clearConfig } = require('./delHosts');
const { switchHostsFile } = require('./switchHostsFile');
async function inquirerCmd() {
    program
        .version('1.0.0', '-v,--version')
        .description('JsHosts切换hosts工具')
    program
        .command('g')
        .description('JsHosts使用引导')
        .action(() => {
            inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'selectName',
                        message: '工具菜单如下',
                        choices: [
                            '1.tool介绍',
                            '2.<增加>hosts配置',
                            '3.<删除>hosts配置',
                            '4.<查看>hosts配置',
                            '5.<切换>hosts配置',
                        ]
                    },
                ])
                .then((answers) => {
                    const { selectName } = answers;
                    switch (selectName) {
                        case '1.tool介绍':
                            console.log('这是一个介绍1'); break;
                        case '2.<增加>hosts配置':
                            addHosts(); break;
                        case '3.<删除>hosts配置':
                            delHosts(); break;
                        case '4.<查看>hosts配置':
                            readHosts(); break;
                        case '5.<切换>hosts配置':
                            switchHostsFile(); break;
                    }
                }).catch((error) => {
                    console.error('出错啦！', error);
                });
        });
    program
        .command('s')
        .description('切换hosts')
        .action(() => {
            switchHostsFile()
        });
    program
        .command('c')
        .description('清空配置')
        .action(() => {
            clearConfig()
        });
    program
        .command('lp')
        .description('查看预设hosts')
        .action(() => {
            readDefaultHosts()
        });
    program
        .command('lc')
        .description('查看配置文件列表')
        .action(() => {
            readHostConfigDir()
        });
    program
        .command('lh')
        .description('查看当前hosts内容')
        .action(() => {
            readCurHosts()
        });
    program
        .command('ap')
        .description('增加预设hosts')
        .action(() => {
            addDefaultHosts();
        });
    program
        .command('ac')
        .description('增加hosts配置文件')
        .action(() => {
            addConfigFile();
        });
    program
        .command('ah')
        .description('当前hosts中追加')
        .action(() => {
            addToHosts();
        });
    program.parse(process.argv);
}

exports.inquirerCmd = inquirerCmd;