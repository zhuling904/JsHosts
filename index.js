const { init } = require("./init");
const { inquirerCmd } = require('./inquirerCmd');

async function main() {
    const { hostsList, configList } = await init();
    inquirerCmd()
}

main()
