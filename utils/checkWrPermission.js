const fs = require('fs');
const filePath = '/etc/hosts';
const { exec } = require('child_process');
const { inquirerCmd } = require('jshosts/inquirerCmd');

// 授权以将hosts改为当前用户可读写
const command = 'chmod u+rw /etc/hosts';

/**
 * 检查是否有写入权限
 */
async function checkWrPermission() {
    fs.access(filePath, fs.constants.W_OK, async (err) => {
        if (err) {
            // 以管理员权限运行命令,将hosts改为当前用户可读写
            console.log('首次使用请先授权hosts写入权限');
            exec(`sudo ${command}`, async (error) => {
                if (error) {
                    return;
                }
                console.log('授权成功');
                await inquirerCmd();
            });
            return;
        }
        inquirerCmd();
    });
}

exports.checkWrPermission = checkWrPermission;