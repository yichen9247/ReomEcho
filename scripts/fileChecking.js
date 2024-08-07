/* eslint-disable no-undef */

const fs = require('fs');
const fileBuildList = require('./fileBuildList.js');
console.log(`\n\u001b[34m正在检查文件完整性！\u001b[0m\n`);

for (const content of fileBuildList) {
    if (!fs.existsSync(content)) {
        console.log(`\n\u001b[31m${content} 文件不存在！\u001b[0m\n`);
        process.exit(1);
    }
}