/* eslint-disable no-undef */

const fs = require('fs');
const rss = require('rss');
const feedList = require('./feed/feed.js');

const feed = new rss();
for (const content of feedList) feed.item(content);

const GenerRssFile  = async () => {
    const xml = feed.xml();
    fs.writeFileSync('scripts/feed/rss.xml', xml);
}

const RenderRssFile = async () => {
    fs.rename('scripts/feed/rss.xml', 'dist/rss.xml', async (err) => {
        if (err) return console.log(`\n\u001b[31m文件移动失败，请确保程序有读写权限！\u001b[0m\n`);
        console.log(`\u001b[32mRSS生成成功，文件路径： dist/rss.xml\u001b[0m\n`);
    });
}

GenerRssFile().then(async () => await RenderRssFile());