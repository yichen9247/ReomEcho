/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

let validate = false;
import axios from 'axios'
import utils from '@/scripts/utils'
import { throttle, debounce } from 'lodash-es'

const siteConfig = utils.siteConfig;

const removeToken = async () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.removeItem('loginStatus');
    localStorage.removeItem('accessToken');
}

const sendHttpGet = throttle(async (url) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        removeToken();
        location.reload();
    }

    return new axios.get(siteConfig.system.server_adress + url).then(data => {
        return data;
    }).catch(async (error) => {
        if (error.message == "Request failed with status code 429") return await ElMessage({type: 'error',message: "太多请求了，请稍后再试！"});
        await ElMessage({type: 'error',message: "网络请求异常！"});
    });
},0);

const senHttpPost = throttle(async (url,data,type,login) => {
    const accessToken = localStorage.getItem('accessToken');

    return new axios.post(siteConfig.system.server_adress + url,data,{
        headers: login ? {
            "Content-Type": type,
        } : {
            "Content-Type": type,
            "Authorization": `Bearer ${accessToken}`
        }
    }).then(data => {
        if (data.data.code == 403 && !validate && localStorage.getItem('loginStatus') == 'True') {
            validate = true;
            ElMessageBox.alert('当前登录状态已失效，请重新登录', '请重新登录', {
                confirmButtonText: '确认',
                callback: async (action) => {
                    removeToken();
                    setTimeout(() => location.reload(),1000);
                },
            });
        } else return data;
    }).catch(async (error) => {
        if (error.message == "Request failed with status code 429") return await ElMessage({type: 'error',message: "太多请求了，请稍后再试！"});
        return await ElMessage({type: 'error',message: "网络请求异常！"});
    });
},0);

export default { sendHttpGet, senHttpPost, removeToken };