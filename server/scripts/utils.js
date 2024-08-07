/* eslint-disable no-undef */

const checkStringUrl = (urlstr) => {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // 协议 http/https
    '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|' + // 域名
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // 或者IP地址
    '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // 端口和路径
    '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // 查询参数
    '(\\#[-a-zA-Z\\d_]*)?$', 'i'); // 锚点
    return pattern.test(urlstr);
}

module.exports = { checkStringUrl };