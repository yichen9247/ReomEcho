
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import axios from 'axios'

const sendHttpGet = async (url) => {
    return new axios.get(url).then(data => {
        return data;
    }).catch(async (error) => {
        await ElMessage({type: 'error',message: "网络请求异常！"});
    });
};

export default { sendHttpGet };