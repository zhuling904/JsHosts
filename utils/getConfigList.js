const fs = require('fs');
const path = require('path');
/**
 * 获取配置文件list
 * @returns 
 */
function getConfigList() {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, '../hosts_config'), { encoding: 'utf-8' }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

exports.getConfigList = getConfigList;