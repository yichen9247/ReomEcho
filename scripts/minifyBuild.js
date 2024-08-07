/* eslint-disable no-undef */

const fs = require('fs');
const htmlMinifier = require('html-minifier');

const minifyHtml = async () => {
    const inputHtml = fs.readFileSync('dist/index.html', 'utf8');
    const outputHtml = htmlMinifier.minify(inputHtml, {
        removeComments: true,
        collapseWhitespace: true,
    });
    fs.writeFileSync('dist/index.html', outputHtml);
}

module.exports = { minifyHtml }