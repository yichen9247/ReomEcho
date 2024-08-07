/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const queryConfigItem = async (connection, req, res) => {
    const configId = req.body.configId;
    if (!configId) return res.status(200).send({ code: '400', message: '配置项不能为空！' });
    connection.query('SELECT * FROM settingsitems WHERE category_id = ?', [Number(configId)], (error, results, fields) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！'});
        if (results.length != 0) {
            res.send({
                code: 200,
                data: results
            });
        } else {
            res.status(200).send({
                code: 400,
                message: '未找到该配置项！'
            });
        }
    });
}

module.exports = { queryConfigItem }