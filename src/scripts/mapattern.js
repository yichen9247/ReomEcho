
const blocksPattern = /\[block\] (.+)/;
const coloinePattern = /\{colorLine\}/;
const coloiamPattern = /\{colorLamp\}/;
const noticePattern = /\[notice\] (.+)/;
const messagePattern = /\[message\] (.+)/;
const titlesPattern = /\[title center\] (.+)/;
const noticeScrollPattern = /\[notice scroll\] (.+)/;

const message = {
    default: /\[message default\] (.+)/,
    success: /\[message success\] (.+)/,
    warning: /\[message warning\] (.+)/,
    erroring: /\[message erroring\] (.+)/
}

const musicPattern = {
    song: /\{music-song id\[(.+)\]\}/,
    list: /\{music-list id\[(.+)\]\}/,
    lists: /\{music-list-show id\[(.+)\]\}/
}

export default {
    blocksPattern,message,musicPattern,coloinePattern,coloiamPattern,noticePattern,messagePattern,titlesPattern,noticeScrollPattern
}