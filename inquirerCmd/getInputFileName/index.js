const inquirer = require('inquirer');
async function getInputFileName() {
    let fileName = '';
    await inquirer
        .prompt([
            {
                type: 'input',
                name: 'value',
                message: '请输入配置文件名',
            },
        ])
        .then((answers) => {
            const { value } = answers;
            fileName = value;
        }).catch((error) => {
            console.error('出错啦！', error);
        });
    return fileName;
}
exports.getInputFileName = getInputFileName