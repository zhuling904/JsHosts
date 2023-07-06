const fs = require('fs');
const filePath = '/etc/hosts';
const { exec } = require('child_process');
const { inquirerCmd } = require('jshosts/inquirerCmd');

// 授权以将hosts改为当前用户可读写
const command = 'chmod u+rw /etc/hosts';

async function checkWrPermission() {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.W_OK, (err) => {
            if (err) {
                reject(err)
                // 以管理员权限运行命令,将hosts改为当前用户可读写
                exec(`sudo ${command}`, (error) => {
                    if (error) {
                        console.error(`命令执行错误: ${error}`);
                        return;
                    }
                    console.log('授权成功');
                    inquirerCmd();
                });
            }
            inquirerCmd();
        });
    })
}

exports.checkWrPermission = checkWrPermission;