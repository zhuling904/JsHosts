const fs = require('fs');
const path = require('path');

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
    console.log("✅ ~ zhuling fileContent:", fileContent)
    return fileContent;
}

exports.getConfileContent = getConfileContent;