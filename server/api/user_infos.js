/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const userInfos = async (connection, req, res) => {
    const username = req.body.username;

    if (!username) return res.status(200).send({ code: '400', message: '用户名不能为空！' });
    connection.query('SELECT * FROM re_users WHERE username = ?', [username], (error, results, fields) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        if (results.length == 1) {
            res.send({
                code: 200,
                data: {
                    id: results[0].id,
                    email: results[0].email,
                    username: results[0].username,
                    nickname: results[0].nickname,
                    userdesc: results[0].userdesc,
                    permission: results[0].permission,
                }
            });
        } else {
            res.status(200).send({
                code: 400,
                message: '未找到该用户！'
            });
        }
    });
}

const editInfos = async (connection, req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const nickname = req.body.nickname;
    const username = req.body.username;
    const password = req.body.password;

    if (!id) return res.status(200).send({ code: '400', message: '唯一标识不能为空！' });
    connection.query('SELECT * FROM re_users WHERE id = ?', [Number(id)], (error, results, fields) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        if (results.length == 1) {

            const updates = [],values = [];

            if (email) {
                values.push(email);
                updates.push('email = ?');
            }

            if (nickname) {
                values.push(nickname);
                updates.push('nickname = ?');
            }

            if (username && username !== results[0].username) {
                values.push(username);
                updates.push('username = ?');
            }

            if (password && password !== results[0].password) {
                values.push(password);
                updates.push('password = ?');
            }

            if (updates.length === 0) return res.status(200).send({ code: 200, message: '没有需要更新的字段！' });

            const updateQuery = `UPDATE re_users SET ${updates.join(', ')} WHERE id = ?`;
            values.push(Number(id)); // 添加用户ID到values数组

            connection.query(updateQuery, values, (error, results) => {
                if (error) return res.status(200).send({ code: 500, message: '更新信息失败！' });
                res.send({ code: 200, message: '更新信息成功！' });
            });

        } else {
            res.status(200).send({
                code: 400,
                message: '未找到该用户！'
            });
        }
    });
}

module.exports = { userInfos, editInfos }