
/**
 * author: Hua
 * Markdown Render To Html Core
 */

import hljs from 'highlight.js'
import { marked } from 'marked'
import MarkdownIt from 'markdown-it'
import '@/views/assets/markdown.css'
import 'highlight.js/styles/github.css'
import siteConfig from "../../docs/main.js"
import patternConfig from "@/scripts/mapattern.js"

const renderMarkdown = (data) => {
    const renderer = new marked.Renderer();

    renderer.link = (href, title, text) => {
        return `<a class="link-text" href="${href}" target="_blank">${text}</a>`;
    };

    renderer.paragraph = (text) => {
        return `<p class="paragraph">${text}</p>`;
    };
    
    renderer.span = (text) => {
        return `<span class="span-text">${text}</span>`;
    };

    renderer.blockquote = (text) => {
        return `<blockquote class="block-text">${text}</blockquote>`;
    }

    renderer.image = (src) => {
        return `<p><img class="post-block-image" src="${src}" draggable="false" tabindex="0"/></p>`;
    }

    renderer.codespan = (text) => {
        return `<code class="code-span">${text}</code>`
    }

    renderer.code = (code,language) => {
        if (siteConfig.post.code_highlight) {
            if (language === '') {
                language = 'other';
                const highlightedCode = hljs.highlightAuto(code).value;
                return `<div class="code-pre-block"><pre class="code-text" :data-language="language-${language}"><div class="code-block">${highlightedCode}</div></pre></div>`;
            } else {
                const highlightedCode = hljs.highlight(code,{language:language}).value;
                return `<div class="code-pre-block"><pre class="code-text" :data-language="language-${language}"><div class="code-block">${highlightedCode}</div></pre></div>`;
            }
        } else {
            return `<pre class="code-text" :data-language="language-${language}"><div class="button-sheet"><button class="copycode">复制代码</button><button class="type-text">${language.toUpperCase()}</button></div><div class="code-block">${code}</div></pre>`;
        }
    }

    renderer.list = (body, ordered) => {
        const type = ordered ? 'ol' : 'ul';  
        if (type === 'ul') {
            return `<ul class="ul-list">${body}</ul>`;
        }
        if (type === 'ol') {
            return `<ol class="ol-list">${body}</ol>`;
        }
    };

    renderer.heading = (text, level) => {

        if (text.match(patternConfig.coloinePattern)) {
            return `
                <span class="marked-color-line"></span>
            `;
        } else 
        if (text.match(patternConfig.coloiamPattern)) {
            return `
                <span class="marked-color-lamp"></span>
            `;
        } else 

        if (text.match(patternConfig.blocksPattern)) {
            return `
                <div class="marked-blocked">
                    <span class="block-text">${text.replace(patternConfig.blocksPattern, '$1')}</span>
                </div>
            `;
        } else 
        if (text.match(patternConfig.noticePattern)) {
            return `
                <div class="marked-notice">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" viewBox="0 0 24 24" data-icon="solar:volume-loud-linear" class="iconify iconify--solar"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1.535 10.971c.073-1.208.11-1.813.424-2.394a3.215 3.215 0 0 1 1.38-1.3C3.94 7 4.627 7 6 7c.512 0 .768 0 1.016-.042a3 3 0 0 0 .712-.214c.23-.101.444-.242.871-.524l.22-.144C11.36 4.399 12.632 3.56 13.7 3.925c.205.07.403.17.58.295c.922.648.993 2.157 1.133 5.174A68.21 68.21 0 0 1 15.5 12c0 .532-.035 1.488-.087 2.605c-.14 3.018-.21 4.526-1.133 5.175a2.314 2.314 0 0 1-.58.295c-1.067.364-2.339-.474-4.882-2.151L8.6 17.78c-.427-.282-.64-.423-.871-.525a3 3 0 0 0-.712-.213C6.768 17 6.512 17 6 17c-1.374 0-2.06 0-2.66-.277a3.215 3.215 0 0 1-1.381-1.3c-.314-.582-.35-1.186-.424-2.395A17.127 17.127 0 0 1 1.5 12c0-.323.013-.671.035-1.029Z"></path><path stroke-linecap="round" d="M20 6s1.5 1.8 1.5 6s-1.5 6-1.5 6m-2-9s.5.9.5 3s-.5 3-.5 3"></path></g></svg>
                    <div class="mark-box"><span class="notice-text">${text.replace(patternConfig.noticePattern, '$1')}</span></div>
                </div>
            `;
        } else 
        if (text.match(patternConfig.noticeScrollPattern)) {
            return `
                <div class="marked-notice">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" viewBox="0 0 24 24" data-icon="solar:volume-loud-linear" class="iconify iconify--solar"><g fill="none" stroke="currentColor" stroke-width="1.5"><path d="M1.535 10.971c.073-1.208.11-1.813.424-2.394a3.215 3.215 0 0 1 1.38-1.3C3.94 7 4.627 7 6 7c.512 0 .768 0 1.016-.042a3 3 0 0 0 .712-.214c.23-.101.444-.242.871-.524l.22-.144C11.36 4.399 12.632 3.56 13.7 3.925c.205.07.403.17.58.295c.922.648.993 2.157 1.133 5.174A68.21 68.21 0 0 1 15.5 12c0 .532-.035 1.488-.087 2.605c-.14 3.018-.21 4.526-1.133 5.175a2.314 2.314 0 0 1-.58.295c-1.067.364-2.339-.474-4.882-2.151L8.6 17.78c-.427-.282-.64-.423-.871-.525a3 3 0 0 0-.712-.213C6.768 17 6.512 17 6 17c-1.374 0-2.06 0-2.66-.277a3.215 3.215 0 0 1-1.381-1.3c-.314-.582-.35-1.186-.424-2.395A17.127 17.127 0 0 1 1.5 12c0-.323.013-.671.035-1.029Z"></path><path stroke-linecap="round" d="M20 6s1.5 1.8 1.5 6s-1.5 6-1.5 6m-2-9s.5.9.5 3s-.5 3-.5 3"></path></g></svg>
                    <span class="notice-text">
                        <marquee truespeed="true">${text.replace(patternConfig.noticeScrollPattern, '$1')}</marquee>
                    </span>
                </div>
            `;
        } else 
        if (text.match(patternConfig.messagePattern)) {
            return `
                <div class="marked-message message-default">
                    <i class="el-icon el-alert__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"></path></svg>
                    </i>
                    <span class="message-text">${text.replace(patternConfig.messagePattern, '$1')}</span>
                </div>
            `;
        } else 
        if (text.match(patternConfig.message['default'])) {
            return `
                <div class="marked-message message-default">
                    <i class="el-icon el-alert__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896.064A448 448 0 0 1 512 64m67.2 275.072c33.28 0 60.288-23.104 60.288-57.344s-27.072-57.344-60.288-57.344c-33.28 0-60.16 23.104-60.16 57.344s26.88 57.344 60.16 57.344M590.912 699.2c0-6.848 2.368-24.64 1.024-34.752l-52.608 60.544c-10.88 11.456-24.512 19.392-30.912 17.28a12.992 12.992 0 0 1-8.256-14.72l87.68-276.992c7.168-35.136-12.544-67.2-54.336-71.296-44.096 0-108.992 44.736-148.48 101.504 0 6.784-1.28 23.68.064 33.792l52.544-60.608c10.88-11.328 23.552-19.328 29.952-17.152a12.8 12.8 0 0 1 7.808 16.128L388.48 728.576c-10.048 32.256 8.96 63.872 55.04 71.04 67.84 0 107.904-43.648 147.456-100.416z"></path></svg>
                    </i>
                    <span class="message-text">${text.replace(patternConfig.message['default'], '$1')}</span>
                </div>
            `;
        } else 
        if (text.match(patternConfig.message['success'])) {
            return `
                <div class="marked-message message-success">
                    <i class="el-icon el-alert__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"></path></svg>
                    </i>
                    <span class="message-text">${text.replace(patternConfig.message['success'], '$1')}</span>
                </div>
            `;
        } else 
        if (text.match(patternConfig.message['warning'])) {
            return `
                <div class="marked-message message-warning">
                    <i class="el-icon el-alert__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256m0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4"></path></svg>
                    </i>
                    <span class="message-text">${text.replace(patternConfig.message['warning'], '$1')}</span>
                </div>
            `;
        } else 
        if (text.match(patternConfig.message['erroring'])) {
            return `
                <div class="marked-message message-erroring">
                    <i class="el-icon el-alert__icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896m0 393.664L407.936 353.6a38.4 38.4 0 1 0-54.336 54.336L457.664 512 353.6 616.064a38.4 38.4 0 1 0 54.336 54.336L512 566.336 616.064 670.4a38.4 38.4 0 1 0 54.336-54.336L566.336 512 670.4 407.936a38.4 38.4 0 1 0-54.336-54.336z"></path></svg>
                    </i>
                    <span class="message-text">${text.replace(patternConfig.message['erroring'], '$1')}</span>
                </div>
            `;
        } else 
        if (text.match(patternConfig.titlesPattern)) {
            return `
                <p class="marked-title-center">
                    <span class="title-center">${text.replace(patternConfig.titlesPattern, '$1')}</span>
                </p>
            `;
        } else 
        if (text.match(patternConfig.musicPattern['song'])) {
            return `
                <iframe class="music-song" frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=86 src="https://music.163.com/outchain/player?type=2&id=${text.replace(patternConfig.musicPattern['song'], '$1')}&auto=1&height=66"></iframe>
            `;
        } else 
        if (text.match(patternConfig.musicPattern['list'])) {
            return `
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=110 src="https://music.163.com/outchain/player?type=0&id=${text.replace(patternConfig.musicPattern['list'], '$1')}&auto=1&height=90"></iframe>
            `;
        } else 
        if (text.match(patternConfig.musicPattern['lists'])) {
            return `
                <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=100% height=450 src="https://music.163.com/outchain/player?type=0&id=${text.replace(patternConfig.musicPattern['lists'], '$1')}&auto=1&height=430"></iframe>
            `;
        } else {
            return `<h${level} class="title-text">${text}</h${level}>`;
        }
    };

    renderer.blockquote = (text) => {
        return `<blockquote class="blockquote">${text}</blockquote>`;
    }

    return marked(data, { renderer });
}

const renderMarkdownIt = (data) => {
    const md = new MarkdownIt({
        html: true,
        breaks: true,
        linkify: true,
        xhtmlOut: true,
        typographer: true,
        langPrefix: 'language-',

        highlight: (code, language) => {
            if (language && hljs.getLanguage(language)) {
                try {
                    return `
                        <div class="code-pre-block"><pre class="code-text" :data-language="language-${language}"><div class="code-block">${hljs.highlight(code,{language:language}).value}</div></pre></div>
                    `;
                  } catch (__) {}
            } else {
                language = 'Other';
                return `
                    <div class="code-pre-block"><pre class="code-text" :data-language="language-${language}"><div class="code-block">${hljs.highlightAuto(code).value}</div></pre></div>
                `;
            }
            return '<pre class="hljs"><code>' + md.utils.escapeHtml(code) + '</code></pre>';
          }
        }
    
    );

    return md.render(data);
}

export default renderMarkdown;