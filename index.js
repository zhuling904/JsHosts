const { init } = require("./init");
const { inquirerCmd } = require('./inquirerCmd');
const COMMENT_START = '# --- ZHULING HOSTS START ---';
const COMMENT_END = '# --- ZHULING HOSTS END ---';


async function main() {
    const { hostsList, configList } = await init();
    inquirerCmd()
}

main()
