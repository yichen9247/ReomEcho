/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const secretKey = 'reomecho';
const jwt = require('jsonwebtoken');

const userLogin = async (connection, req, res) => {
    const rem = req.body.rem;
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) return res.status(200).send({ code: '400', message: '用户名和密码不能为空！' });
    connection.query('SELECT * FROM re_users WHERE username = ? AND password = ?', [username, password], (error, results, fields) => {
        if (error) {
            res.status(200).send({ code: 500, message: '服务器内部错误！'});
            return;
        }
        if (results.length == 1) {
            const user = results[0];
            const accessToken = jwt.sign({ data: { id: user.id, username: user.username } }, secretKey, { expiresIn: rem ? '12h' : '72h' });
            res.status(200).send({
                code: 200,
                message: '登录成功！',
                accessToken: accessToken
            });
        } else return res.status(200).send({ code: 400, message: '用户名或密码错误！' });
    });
}

module.exports = { userLogin }