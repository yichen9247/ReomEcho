/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const ActivConfigChange = async (connection, req, res) => {
    const configData = req.body.configData;

    connection.query('SELECT * FROM settingsitems WHERE category_id = 3', (error, results) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！' });
        if (results.length === 0) return res.status(200).send({ code: 400, message: '未找到该配置项！' });

        const updates = [
            'post_copynoti', 'post_printbtn', 'post_sharebtn', 'post_copyright',
            'post_staticspa', 'post_graphsbtn', 'code_highlight', 'post_watermark'
        ].map(key => {
            return `WHEN item_name = '${key}' THEN ?`;
        }).join(' ');

        const values = [
            configData.post_copynoti,configData.post_printbtn,configData.post_sharebtn,configData.post_copyright,configData.post_staticspa,configData.post_graphsbtn,configData.code_highlight,configData.post_watermark
        ];
        const updateQuery = `UPDATE settingsitems SET item_value = CASE ${updates} ELSE item_value END WHERE category_id = 3;`;

        connection.query(updateQuery, values, (error, results) => {
            if (error) return res.status(200).send({ code: 500, message: '更新配置失败！' });
            res.send({ code: 200, message: '配置项更新成功！' });
        });
    });
}

const HomeConfigChange = async (connection, req, res) => {
    const configData = req.body.configData;

    connection.query('SELECT * FROM settingsitems WHERE category_id = 4', (error, results) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！' });
        if (results.length === 0) return res.status(200).send({ code: 400, message: '未找到该配置项！' });

        const updates = [
            'post_recomms', 'post_eachnum', 'post_listmode', 'index_header',
            'post_polishing', 'index_refreshs', 'index_pc_carousel', 'index_mb_carousel', 'carousel_interval'
        ].map(key => {
            return `WHEN item_name = '${key}' THEN ?`;
        }).join(' ');

        const values = [
            configData.post_recomms,configData.post_eachnum,configData.post_listmode,configData.index_header,configData.post_polishing,configData.index_refreshs,configData.index_pc_carousel,configData.index_mb_carousel,configData.carousel_interval
        ];
        const updateQuery = `UPDATE settingsitems SET item_value = CASE ${updates} ELSE item_value END WHERE category_id = 4;`;

        connection.query(updateQuery, values, (error, results) => {
            if (error) return res.status(200).send({ code: 500, message: '更新配置失败！' });
            res.send({ code: 200, message: '配置项更新成功！' });
        });
    });
}

const StyleConfigChange = async (connection, req, res) => {
    const configData = req.body.configData;

    connection.query('SELECT * FROM settingsitems WHERE category_id = 6', (error, results) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！' });
        if (results.length === 0) return res.status(200).send({ code: 400, message: '未找到该配置项！' });

        const updates = [
            'msgs_style', 'font_style', 'star_backmod', 'dynamic_color',
            'dotted_color1', 'dotted_color2', 'darkheme_toggle', 'transt_interval',
            'site_dominColor', 'po_qrcode_color', 'background_imag'
        ].map(key => {
            return `WHEN item_name = '${key}' THEN ?`;
        }).join(' ');

        const values = [
            configData.msgs_style,configData.font_style,configData.star_backmod,configData.dynamic_color,configData.dotted_color1,configData.dotted_color2,configData.darkheme_toggle,configData.transt_interval,configData.site_buttoColor,configData.po_qrcode_color,configData.background_imag
        ];
        const updateQuery = `UPDATE settingsitems SET item_value = CASE ${updates} ELSE item_value END WHERE category_id = 6;`;

        connection.query(updateQuery, values, (error, results) => {
            if (error) return res.status(200).send({ code: 500, message: '更新配置失败！' });
            res.send({ code: 200, message: '配置项更新成功！' });
        });
    });
}

const CommeConfigChange = async (connection, req, res) => {
    const configData = req.body.configData;

    connection.query('SELECT * FROM settingsitems WHERE category_id = 8', (error, results) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！' });
        if (results.length === 0) return res.status(200).send({ code: 400, message: '未找到该配置项！' });

        const updates = [
            'comment_style', 'comment_psize', 'comment_glbal', 'valine_emojes',
            'comment_types', 'twikoo_envids', 'valine_appids', 'valine_appkey','comment_place'
        ].map(key => {
            return `WHEN item_name = '${key}' THEN ?`;
        }).join(' ');

        const values = [
            configData.comment_style,configData.comment_psize,configData.comment_glbal,configData.valine_emojes,configData.comment_types,configData.twikoo_envids,configData.valine_appids,configData.valine_appkey,configData.comment_place
        ];
        const updateQuery = `UPDATE settingsitems SET item_value = CASE ${updates} ELSE item_value END WHERE category_id = 8;`;

        connection.query(updateQuery, values, (error, results) => {
            if (error) return res.status(200).send({ code: 500, message: '更新配置失败！' });
            res.send({ code: 200, message: '配置项更新成功！' });
        });
    });
}

const InsertCodeChange = async (connection, req, res) => {
    const configData = req.body.configData;

    connection.query('SELECT * FROM settingsitems WHERE category_id = 11', (error, results) => {
        if (error) return res.status(200).send({ code: 500, message: '服务器内部错误！' });
        if (results.length === 0) return res.status(200).send({ code: 400, message: '未找到该配置项！' });

        const updates = [
            'insert_styles', 'insert_javascript', 'insert_footer'
        ].map(key => {
            return `WHEN item_name = '${key}' THEN ?`;
        }).join(' ');

        const values = [
            configData.insert_styles,configData.insert_javascript,configData.insert_footer
        ];
        const updateQuery = `UPDATE settingsitems SET item_value = CASE ${updates} ELSE item_value END WHERE category_id = 11;`;

        connection.query(updateQuery, values, (error, results) => {
            if (error) return res.status(200).send({ code: 500, message: '更新配置失败！' });
            res.send({ code: 200, message: '配置项更新成功！' });
        });
    });
}

module.exports = { ActivConfigChange, HomeConfigChange, StyleConfigChange, CommeConfigChange, InsertCodeChange }