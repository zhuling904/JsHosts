const fs = require('fs');
function readHosts () {
    return new Promise((resolve, reject) => {
        fs.readFile('/etc/hosts', (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        })
    })
}
// 读取hosts文件
exports.readHosts = readHosts;