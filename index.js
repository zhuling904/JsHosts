#!/usr/bin/env node
const { checkWrPermission } = require('./utils/checkWrPermission');
async function main() {
    checkWrPermission()
}
main()
