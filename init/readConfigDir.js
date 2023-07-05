const fs = require('fs');
const path = require('path');

function readConfigDir() {
    return new Promise((resolve, reject) => {
        fs.readdir(path.resolve(__dirname, '../hosts_config'), (err, data) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(data);
        });
    });
}


exports.readConfigDir = readConfigDir;




