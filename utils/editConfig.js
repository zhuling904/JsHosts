const { spawn } = require('child_process');
const path = require('path');
/**
 * 编辑配置文件
 * @param {*} fileName 配置文件名
 */
function editConfigFile(fileName) {
    // 启动vim进程编辑文件
    const vim = spawn('vim', [path.resolve(__dirname, `../hosts_config/${fileName}`)], {
        stdio: 'inherit' // 将子进程的输入/输出连接到当前进程的输入/输出
    });

    vim.on('exit', (code, signal) => {
        if (signal) {
            console.error(`编辑器被信号中断: ${signal}`);
        } else {
            console.log('编辑器已关闭');
        }
    });

    vim.on('error', err => {
        console.error('无法启动编辑器:', err);
    });
}

exports.editConfigFile = editConfigFile;