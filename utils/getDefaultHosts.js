const fs = require('fs');
const path = require('path');
/**
 * 获取预设hosts
 * @returns 
 */
function getDefaultHosts() {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, '../defaultHosts/hosts.txt'), { encoding: 'utf-8' }, (err, data) => {
            if (err) reject(err);
            resolve(data);
        })
    })
}

exports.getDefaultHosts = getDefaultHosts;