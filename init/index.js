const { readConfigDir } = require('./readConfigDir');
const { readHosts } = require('./readHosts');
// 初始化获取配置文件与去取hosts
async function init() {
    let configList = [];
    let hostsList = '';
    await Promise.all([readConfigDir(), readHosts()])
        .then(([configRes, hostsRes]) => {
            configList = configRes;
            hostsList = hostsRes.toString();
        })
        .catch(err => {
            console.error('发生错误:', err);
        });
    return {
        configList,
        hostsList,
    }
}

exports.init = init;