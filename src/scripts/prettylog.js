
const isProduction = import.meta.env.MODE === 'production';

const isEmpty = (value) => {
    return value == null || value === undefined || value === '';
};

const prettyPrint = (title, text, color) => {
    if (isProduction) return;
    console.log(
        `%c ${title} %c ${text} %c`,
        `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
        `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
        'background:transparent'
    );
};

const info = (textOrTitle, content = '') => {
    const title = isEmpty(content) ? 'Info' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#909399');
};

const error = (textOrTitle, content = '') => {
    const title = isEmpty(content) ? 'Error' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#F56C6C');
}

const warning = (textOrTitle, content = '') => {
    const title = isEmpty(content) ? 'Warning' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#E6A23C');
};
const success = (textOrTitle, content = '') => {
    const title = isEmpty(content) ? 'Success ' : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, '#67C23A');
};

export default { info, error, warning, success }