
const writeHistory = async () => {
    history.pushState({}, "", location.href);
}

const writeClipBoardLink = async () => {
    await navigator.clipboard.writeText(location.href).then(
        async() => {
            await showToast('复制链接成功');
        },(error) => showToast('复制链接失败')
    );
}

export default { writeClipBoardLink, writeHistory }