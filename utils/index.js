const inquirer = require('inquirer');
const { getDefaultHosts } = require('./getDefaultHosts');
/**
 * 选择输入方式
 */
async function choicesInputMethod(fromDefault = false) {
    let method = 'input';
    const choices = [
        '1.命令input',
        '2.Vim/Vi编辑器',
    ]
    const fromDefaultChoices = ['3.选择预设hosts']
    const defaultHostsList = await getDefaultHosts();
    // 处理数据
    const lines = defaultHostsList.trim().split("\n");
    console.log("✅ ~ zhuling lines:", lines)
    await inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectName',
                message: !fromDefault ? '请选择输入方式' : '请选择增加配置文件的方式',
                choices: !fromDefault || (lines.length === 1 && lines[0] === '') ? choices : choices.concat(fromDefaultChoices)
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            switch (selectName) {
                case '1.命令input':
                    method = 'input'; break;
                case '2.Vim/Vi编辑器':
                    method = 'editor'; break;
                case '3.选择预设hosts':
                    method = 'checkbox';break;
            }
        }).catch((error) => {
            console.error('出错啦！', error);
        });
    return method;
}
exports.choicesInputMethod = choicesInputMethod;