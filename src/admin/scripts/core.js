/* eslint-disable no-undef */

import utils from "@/scripts/utils"
import axiostool from "./axiostool"
import { useAdminEchoStore } from "@/stores/AdminEchoStore"

const submitConfig = async (adress) => {
    switch(adress) {
        case '/api/config/style/change':
            await queryStyleConfig();
            break;
        case '/api/config/comment/change':
            await queryCommentConfig();
            break;
        case '/api/config/actives/change':
            await queryActivesConfig();
            break;
        case '/api/config/home/change':
            await queryHomeConfig();
            break;
        case '/api/config/insertcode/change':
            await queryHomeConfig();
            break;
    }
}

export const setUserInfo = async () => {
    const AdminEchoStore = useAdminEchoStore();
    const response = await axiostool.senHttpPost("/api/admin/infos",{
        username: localStorage.getItem('username')
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) AdminEchoStore.setUserInfo(response.data.data);
};

export const setLinkList = async () => {
    const AdminEchoStore = useAdminEchoStore();
    const response = await axiostool.sendHttpGet("/api/links/query");
    if (response.data.code == 200) AdminEchoStore.setLinkList(response.data.data);
};

export const setMusicList = async () => {
    const AdminEchoStore = useAdminEchoStore();
    const response = await axiostool.sendHttpGet("/api/music/query");
    if (response.data.code == 200) AdminEchoStore.setMusicList(response.data.data);
};

export const deleteLinkItem = async (link) => {
    const response = await axiostool.senHttpPost("/api/links/delete",{
        link: link
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        await setLinkList();
        await ElMessage({type: 'success',message: response.data.message});
    } else await lMessage({type: 'error',message: response.data.message});
};

export const appendLinkItem = async (item) => {
    if (!utils.checkStringUrl(item.link) || !utils.checkStringUrl(item.image)) return ElMessage({type: 'error',message: '请输入正确的链接格式！'});
    const response = await axiostool.senHttpPost("/api/links/append",{
        link: item.link,
        name: item.name,
        desc: item.desc,
        image: item.image,
        target: item.target
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        await setLinkList();
        await ElMessage({type: 'success',message: response.data.message});
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const deleteMusicItem = async (src) => {
    const response = await axiostool.senHttpPost("/api/music/delete",{
        src: src
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        await setMusicList();
        await ElMessage({type: 'success',message: response.data.message});
    } else await ElMessage({type: 'error',message: response.data.message});
};

export const appendMusicItem = async (item) => {
    if (!utils.checkStringUrl(item.src) || !utils.checkStringUrl(item.image) || !utils.checkStringUrl(item.lyric)) return ElMessage({type: 'error',message: '请输入正确的链接格式！'});
    const response = await axiostool.senHttpPost("/api/music/append",{
        src: item.src,
        title: item.title,
        image: item.image,
        lyric: item.lyric
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        await setMusicList();
        await ElMessage({type: 'success',message: response.data.message});
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const queryActivesConfig = async () => {
    const response = await axiostool.senHttpPost("/api/config/actives",{
        configId: 3
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        const AdminEchoStore = useAdminEchoStore();
        AdminEchoStore.setActivConfig(response.data.data);
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const queryHomeConfig = async () => {
    const response = await axiostool.senHttpPost("/api/config/home",{
        configId: 4
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        const AdminEchoStore = useAdminEchoStore();
        AdminEchoStore.setHomeConfig(response.data.data);
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const queryStyleConfig = async () => {
    const response = await axiostool.senHttpPost("/api/config/style",{
        configId: 6
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        const AdminEchoStore = useAdminEchoStore();
        AdminEchoStore.setStyleConfig(response.data.data);
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const queryCommentConfig = async () => {
    const response = await axiostool.senHttpPost("/api/config/comment",{
        configId: 8
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        const AdminEchoStore = useAdminEchoStore();
        AdminEchoStore.setCommeConfig(response.data.data);
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const queryInertCodeConfig = async () => {
    const response = await axiostool.senHttpPost("/api/config/insertcode",{
        configId: 11
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        const AdminEchoStore = useAdminEchoStore();
        AdminEchoStore.setInserConfig(response.data.data);
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const submitConfigItem = async (config,adress) => {
    const response = await axiostool.senHttpPost(adress,{
        configData: config
    },'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        await submitConfig(adress);
        await ElMessage({type: 'success',message: response.data.message});
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const submitUserInfo = async (config) => {
    const AdminEchoStore = useAdminEchoStore();
    const response = await axiostool.senHttpPost("/api/admin/infos/edit",config,'application/x-www-form-urlencoded');
    if (response.data.code == 200) {
        if (config.username != AdminEchoStore.userInfo.username || config.password != localStorage.getItem('password')) {
            axiostool.removeToken();
            ElMessageBox.alert('由于您修改了用户账号或者密码，需要重新登录', '请重新登录', {
                confirmButtonText: '确认',
                callback: async () => {
                    setTimeout(() => location.reload(),1000);
                },
            });
            return;
        }
        setTimeout(async () => await setUserInfo(),1000);
        await ElMessage({type: 'success',message: response.data.message});
    } else await ElMessage({type: 'error',message: response.data.message});
}

export const checkConnectValid = async () => {
    await axiostool.senHttpPost("/api/token/connection",{},'application/x-www-form-urlencoded');
}

export const exitLogin = async () => {
    ElMessageBox.alert('确认退出登录吗，退出后若想进入须重新登录', '退出登录', {
        confirmButtonText: '确认',
        callback: async (action) => {
            if (action == 'confirm') {
                axiostool.removeToken();
                setTimeout(() => location.reload(),1000);
                await ElMessage({type: 'success',message: '退出登录成功！'});
            }
        },
    });
}