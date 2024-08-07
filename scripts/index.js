/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const fs = require('fs');
const fileManner = require('./filesManner.js');
const minifyBuild = require('./minifyBuild.js');

fileManner.copyFile().then(async () => {
  console.log(`\u001b[32m文档目录处理完成！\u001b[0m\n`);

  fileManner.removeJsFiles().then(async () => {
    console.log(`\u001b[32m关键文件删除成功！\u001b[0m\n`);

    minifyBuild.minifyHtml().then(async () => {
      console.log(`\u001b[32m输出文件压缩完成！\u001b[0m\n`);

      process.stdout.write('\x1Bc');
      fs.readFile('package.json', 'utf8',async (err, data) => {
        if (err) return console.log(`\n\u001b[31m文件读取失败，请确保程序有读写权限！\u001b[0m\n`);
        const packageJson = JSON.parse(data);

        console.log(`\u001b[32m================== Reomecho ${packageJson.version} ==================\u001b[0m\n\n`);

        console.log(`\u001b[32m项目地址：https://github.com/Reomecho/Reomecho\u001b[0m\n`);
        console.log(`\u001b[32m使用文档：https://github.com/Reomecho/Reomecho/wiki\u001b[0m\n`);

        console.log(`\u001b[32m====================================================\u001b[0m\n\n`);
      });
    });
  });
});