/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { checkStringUrl } = require('../scripts/utils');

const linkQuery = async (connection, res) => {
    connection.query('SELECT * FROM re_links', (error, results, fields) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        res.status(200).send({ code: 200, data: results });
    });
}

const linkDelete = async (connection, req, res) => {
    const link = req.body.link;
    if (!link) return res.status(200).send({ code: '400', message: '链接不能为空！' });
    if (!checkStringUrl(link)) res.status(400).send({ code: '400', message: '请提交正确的链接格式！' });
    connection.query('Delete FROM re_links WHERE link = ?', [link], (error, results, fields) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        res.status(200).send({ code: 200, message: '删除链接成功！' });
    });
}

const linkAppend = async (connection, req, res) => {
    const link = req.body.link;
    const name = req.body.name;
    const desc = req.body.desc;
    const image = req.body.image;
    const target = req.body.target;
    
    if (!link || !name || !desc || !image || !target) return res.status(200).send({ code: '400', message: '链接、名称、描述、图片、跳转方式都不能为空！' });
    if (!checkStringUrl(link) || !checkStringUrl(image)) res.status(200).send({ code: '400', message: '请提交正确的链接格式！' });
    connection.query('SELECT * FROM re_links WHERE link = ?',[link],  (error, results, fields) => {
        if (error) if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        if (results.length > 0) return res.status(200).send({ code: 402, message: '链接已存在！' });
        connection.query('INSERT INTO re_links (name, text, link, image, target) VALUES (?, ?, ?, ?, ?)', [name, desc, link, image, target], (error, results, fields) => {
            if (error) if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
            res.status(200).send({ code: 200, message: '添加链接成功！' });
        });
    });
}

module.exports = { linkQuery, linkDelete, linkAppend }