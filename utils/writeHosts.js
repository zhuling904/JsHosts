const { readCurHosts } = require("../inquirerCmd/readHosts");
const fs = require('fs');
const { switchWifi } = require("./switchWifi");
const COMMENT_START = '#---JSHOSTS HOSTS START---';
const COMMENT_END = '#---JSHOSTS HOSTS END---';
const HOSTS_PATH = '/etc/hosts'
async function writeHosts(content, isAppendFile = false, isClear = false) {
    // 已经添加过了，并且是追加hosts
    // 先判断是否有预设注释
    const curHosts = await readCurHosts();
    let writeContent = '';
    if (curHosts.includes(COMMENT_START)) {
        // 将内容拆分为三部分
        const section = curHosts.split(COMMENT_START);
        const top = section[0].trim();
        const section2 = section[1].split(COMMENT_END);
        const toolContent = section2[0].trim();
        const bottom = section2[1].trim();
        if (isClear) {
            writeContent = `${top}\n${bottom}\n`;
        } else if (isAppendFile) {
            writeContent = `${top}\n${COMMENT_START}\n${toolContent}\n${content}\n${COMMENT_END}\n${bottom}\n`
        } else if (!isAppendFile) {
            writeContent = `${top}\n${COMMENT_START}\n${content}\n${COMMENT_END}\n${bottom}\n`
        }
    } else {
        writeContent = `${curHosts}\n${COMMENT_START}\n${content}\n${COMMENT_END}\n`
    }
    fs.writeFile(HOSTS_PATH, writeContent, async (err) => {
        if (err) throw err;
        console.log('修改成功');
        await switchWifi();
    })
    if(!content) {
        await switchWifi();
    }
}

exports.writeHosts = writeHosts;