/* eslint-disable no-undef */

const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');
let sourceDir = path.join(__dirname, '..', 'docs');
let destinationDir = path.join(__dirname, '..', 'dist/docs');

if (!fs.existsSync(destinationDir)) fs.mkdirSync(destinationDir, { recursive: true });

const copyFile = async () => {
    return new Promise((resolve, reject) => {
        fsExtra.copy(sourceDir, destinationDir, (error) => {
            if (error) {
                reject(error);
            } else resolve();
        });
    });
};

const removeJsFiles = () => {
    return new Promise((resolve, reject) => {
        fs.readdir(destinationDir, (error, files) => {
            if (error) return reject(error);
            
            const unlinkPromises = files.map(async file => {
                if (path.extname(file) === '.js') {
                    const filePath = path.join(destinationDir, file);
                    try {
                        return await fsExtra.unlink(filePath);
                    } catch (err) {
                        console.log(`\u001b[31m无法删除文件 ${filePath}: ${err}\u001b[0m\n`);
                    }
                }
            });
            Promise.all(unlinkPromises).then(resolve).catch(reject);
        });
    });
};

module.exports = {
    copyFile, removeJsFiles
}