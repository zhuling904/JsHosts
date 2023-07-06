const inquirer = require('inquirer');
const { program } = require('commander');
const { addHosts } = require('./addHosts');
const { readHosts } = require('./readHosts');
const { delHosts } = require('./delHosts');
async function inquirerCmd() {
    program
        .version('0.0.1')
        .description('JsHosts切换hosts工具')
    program
        .command('start')
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
                            console.log('这是一个介绍5'); break;
                    }
                }).catch((error) => {
                    console.error('出错啦！', error);
                });
        });

    program.parse(process.argv);
}

exports.inquirerCmd = inquirerCmd;