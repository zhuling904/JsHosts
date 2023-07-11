const fs = require('fs');
const path = require('path');

/**
 * 读取配置文件内容
 * @param {*} fileName 
 * @returns 
 */
async function readConfileContent(fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__dirname, `../hosts_config/${fileName}`), { encoding: 'utf-8' }, (err, data) => {
            if (err) reject(err);
            resolve(data)
        });
    })
}

async function getConfileContent(fileName) {
    let fileContent = ''
    await readConfileContent(fileName).then(res=>{
        fileContent = res;
    });
    return fileContent;
}

exports.getConfileContent = getConfileContent;