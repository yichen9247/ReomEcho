
const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
let sourceDir = path.join(__dirname,'../docs');
let destinationDir = path.join(__dirname,'../dist/docs');
if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir,{ recursive: true });

fsExtra.copy(sourceDir, destinationDir,(error) => {
  if (error) throw error;
  console.log("文档目录处理完成！\n");
});

fs.readdir(destinationDir,(error,files) => {
  if (error) throw error;
  files.forEach(file => {
    if (path.extname(file) === '.js') {
      const filePath = path.join(destinationDir,file);
      fs.unlink(filePath,error => {
        if (error) throw error;
      });
    }
  });
});