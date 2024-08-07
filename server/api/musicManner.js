/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const { checkStringUrl } = require('../scripts/utils');

const musicQuery = async (connection, res) => {
    connection.query('SELECT * FROM re_music', (error, results, fields) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        res.status(200).send({ code: 200, data: results });
    });
}

const musicDelete = async (connection, req, res) => {
    const src = req.body.src;
    if (!src) return res.status(200).send({ code: '400', message: '链接不能为空！' });
    if (!checkStringUrl(src)) res.status(400).send({ code: '400', message: '请提交正确的链接格式！' });
    connection.query('Delete FROM re_music WHERE src = ?', [src], (error, results, fields) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        res.status(200).send({ code: 200, message: '删除音乐成功！' });
    });
}

const musicAppend = async (connection, req, res) => {
    const src = req.body.src;
    const title = req.body.title;
    const image = req.body.image;
    const lyric = req.body.lyric;
    
    if (!src || !title || !image || !lyric) return res.status(200).send({ code: '400', message: '链接、名称、歌词、图片都不能为空！' });
    if (!checkStringUrl(src) || !checkStringUrl(image) || !checkStringUrl(image)) res.status(200).send({ code: '400', message: '请提交正确的链接格式！' });
    connection.query('SELECT * FROM re_music WHERE src = ?',[src],  (error, results, fields) => {
        if (error) if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        if (results.length > 0) return res.status(200).send({ code: 402, message: '音乐已存在！' });
        connection.query('INSERT INTO re_music (title, src, image, lyric) VALUES (?, ?, ?, ?)', [title, src, image, lyric], (error, results, fields) => {
            if (error) if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
            res.status(200).send({ code: 200, message: '添加音乐成功！' });
        });
    });
}

module.exports = { musicQuery, musicDelete, musicAppend }