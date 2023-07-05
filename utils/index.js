const inquirer = require('inquirer');
/**
 * 选择输入方式
 */
async function choicesInputMethod() {
    let method = 'input';
    await inquirer
        .prompt([
            {
                type: 'list',
                name: 'selectName',
                message: '请选择输入方式',
                choices: [
                    '1.命令input',
                    '2.Vim/Vi编辑器',
                ]
            },
        ])
        .then((answers) => {
            const { selectName } = answers;
            switch (selectName) {
                case '1.命令input':
                    method =  'input'; break;
                case '2.Vim/Vi编辑器':
                    method =  'editor'; break;
            }
        }).catch((error) => {
            console.error('出错啦！', error);
        });
        return method;
}
exports.choicesInputMethod = choicesInputMethod;