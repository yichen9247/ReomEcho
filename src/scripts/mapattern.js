
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

export default {
    blocksPattern,message,coloinePattern,coloiamPattern,noticePattern,messagePattern,titlesPattern,noticeScrollPattern
}