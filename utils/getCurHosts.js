const fs = require('fs');
/**
 * 获取当前hosts内容
 * @returns 
 */
function getCurHosts () {
    return new Promise((resolve, reject) => {
        fs.readFile('/etc/hosts', {encoding: 'utf-8'}, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}
// 读取hosts文件
exports.getCurHosts = getCurHosts;