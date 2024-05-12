
/**
 * 导入图片
 * import XXX from ""
 */

import avatar from "./assets/avatar.jpg"
import weixinpay from "./assets/weixinpay.png"
import background from "./assets/background-02.jpg"

import post_1 from "./assets/header/post-1.jpg"

const post_1_desc = "当你看到这篇文章时，即代表你的RecomEcho已经安装成功！";

export default {
    header: { /**（头部） */
        /**
         * header_icon: 博主头像 Type: String
         * header_image: PC端首页背景图 Type: String
         * header_title: 手机端导航栏标题 Type: String
         * header_navlist: 导航栏链接列表 Type: Array -> Object
         * 
         * header_navlist: [
         *      { name: "栏目名称", link: "/", target: "_blank" },
         * ]
         */
        header_icon: avatar,
        header_image: background,
        header_title: "网站标题",
        header_navlist: [
            { name: "博客首页", link: "/", target: "_blank" },
            { name: "友情链接", link: "/friends/", target: "_blank" },
            { name: "隐私政策", link: "/privacy/", target: "_blank" },
            { name: "我的项目", link: "/project/", target: "_blank" },
        ],
    },
    footer: { /**（尾部） */
        /**
         * footer_name: 网站名称 Type: String
         * footer_link: 网站地址 Type: String
         * footer_copyright: 网站底部相关信息（可用HTML） Type: String
         */
        footer_name: "RecomEcho",
        footer_link: "https://https://github.com/yichen9247/RecomEcho",
        footer_copyright: "Copyright © 2023 - 2024 <a href=\'https://https://github.com/yichen9247/RecomEcho\'>RecomEcho</a>"
    },
    post: { /**（文章） */
        /**
         * post_sharebtn: 是否启用文章底部分享按钮 Type: Boolean
         * post_copyright: 是否启用文章底部版权模块 Type: Boolean
         * post_staticspa: 是否启用文章底部字数统计 Type: Boolean
         * post_graphsbtn: 是否启用文章底部签名按钮 Type: Boolean
         * code_highlight: 是否启用文章代码高亮模式 Type: Boolean
         */
        post_sharebtn: true,
        post_copyright: true,
        post_staticspa: true,
        post_graphsbtn: true,
        code_highlight: true,
    },
    pages: { /**（独立页面列表） */
        /**
         * open: 是否启用 Type: Boolean
         * path: 页面路径 Type: String
         * name: 页面名称 Type: String
         * image: 页面的头部背景图 Type: String
         * file: 是否解析Markdown文件 Type: String
         * 
         * name: { open: true, path: "/", config: { open: true, path: "", name: "name", image: '', file: false } },
         */
        project: { open: true, path: "/project", config: { open: true, path: "project", name: "我的项目", image: background, file: false } },
        privacy: { open: true, path: "/privacy", config: { open: true, path: "privacy", name: "隐私政策", image: background, file: true } },
        friends: { open: true, path: "/friends", config: { open: true, path: "friends", name: "友情链接", image: background, file: false } }
    },
    actives: [ /**（文章列表） */
        /**
         * path: 文章路径 Type: String
         * name: 文章标题 Type: String
         * desc: 文章描述 Type: String
         * image: 文章大图 Type: String
         * isFixed: 是否置顶 Type: Boolean
         * tags: 文章标签列表 Type: Array -> String
         * class: 文章分类列表 Type: Array -> String
         * 
         * tags: [XXX,XXX,XXX]
         * class: [XXX,XXX,XXX]
         */
        { path: "post-1", config: { path: "post-1", name: 'Helo World', desc: post_1_desc, image: post_1, tags: ['默认标签'], class: ['默认分类'] }, isFixed: false },
    ],
    index: { /**（首页） */
        /**
         * post_eachnum: 首页每次加载文章个数 Type: Number
         * index_header: PC端首页是否启用头部 Type: Boolean
         * post_listmode: 首页文章列表显示模式（0：双列 1：单列） Type: Number
         * post_polishing: 是否启用文章擦亮效果 Type: Boolean
         * index_refreshs: 是否启用刷新（部分页面有效） Type: Boolean
         * index_pc_carousel: 是否启用PC端首页轮播图 Type: Boolean
         * index_mb_carousel: 是否启用PC端首页轮播图 Type: Boolean
         * carousel_interva: 首页轮播图切换间隔（ms） Type: Number
         */
        post_eachnum: 10,
        index_header: false,
        post_listmode: 0,
        post_polishing: true,
        index_refreshs: true,
        index_pc_carousel: false,
        index_mb_carousel: true,
        carousel_interval: 5000,
    },
    author: { /**（博主） */
        /**
         * author_name: 博主昵称 Type: String
         * author_link: 博主链接 Type: String
         * author_desc: 博主描述 Type: String
         * author_mail: 博主邮箱 Type: String
         * author_avatar: 博主头像 Type: String
         * author_github: 博主Github账号 Type: String
         */
        author_name: '博主昵称',
        author_link: '/',
        author_desc: "博主描述",
        author_mail: '',
        author_avatar: avatar,
        author_github: 'yichen9247'
    },
    style: { /**（样式） */
        /**
         * dotted_color1: 边框颜色 Type: String
         * dotted_color2: 边框颜色 Type: String
         * site_dominColor: 网站主色 Type: String
         * po_qrcode_color: 二维码颜色 Type: String
         * site_buttoColor: 按钮颜色 Type: String
         */
        dotted_color1: "#ff6c6c",
        dotted_color2: "#1989fa",
        site_dominColor: "#626aef",
        po_qrcode_color: "#626aef",
        site_buttoColor: "rgba(97, 104, 240, 0.75)"
    },
    aside: { /**（PC端右侧边栏） */
        /**
         * aside_aboutme: 是否显示关于我卡片 Type: Boolean
         * aside_sponsor: 是否开启赞助 Type: Boolean
         * aside_lastpost: 是否显示最新文章 Type: Boolean
         * aside_statistics: 是否显示统计 Type: Boolean
         * asode_gitbuttons: 是否显示Github按钮 Type: Boolean
         * sponsor_image: 赞助二维码 Type: String
         * aboutme_hitokoto: 点击关于我卡片的欢迎语提示 Type: String
         * gitbuttons_hrefs: Github链接 Type: String
         */
        aside_aboutme: true,
        aside_sponsor: true,
        aside_lastpost: true,
        aside_statistics: true,
        asode_gitbuttons: true,
        sponsor_image: weixinpay,
        aboutme_hitokoto: "你好，欢迎来看我呀！",
        gitbuttons_hrefs: "https://github.com/yichen9247/RecomEcho"
    },
    drawer: { /**（手机端左侧边栏） */
        /**
         * drawer_show: 是否显示侧边栏 Type: Boolean
         * drawer_image: 侧边栏顶部图片 Type: String
         * drawer_footer: 是否显示尾部 Type: Boolean
         * drawer_social: 是否显示社交图标 Type: Boolean
         * drawer_statistics: 是否显示统计 Type: Boolean
         */
        drawer_show: true,
        drawer_image: background,
        drawer_footer: true,
        drawer_social: true,
        drawer_statistics: true,
    },
    social: { /**（社交图标） */
        /**
         * show: 是否显示该图标 Type: Boolean
         * link: 对应的社交链接 Type: String
         * 
         * tcqq: 腾讯QQ Type: Object
         * tcwx: 腾讯微信 Type: Object
         * huab: 花瓣网 Type: Object
         * ding: 钉钉 Type: Object
         * qqmu: QQ音乐 Type: Object
         * bili: 哔哩哔哩 Type: Object
         */
        tcqq: { show: true, link: "#" },
        tcwx: { show: true, link: "#" },
        huab: { show: true, link: "#" },
        ding: { show: true, link: "#" },
        qqmu: { show: true, link: "#" },
        bili: { show: true, link: "#" },
    },
    global: { /**（全局设置） */
        /**
         * cook_notice: 是否启用协议提醒小助手 Type: Boolean
         * site_hreflinks: 网站路径（填根路径 '/' 就行） Type: Boolean
         * backtop_button: 是否启用返回顶部按钮 Type: Boolean
         * dialog_draggle: 是否启用拖拽式弹窗 Type: Boolean
         * site_title: 网站名称 Type: String
         * site_address: 网站地址 Type: String
         * cookie_mb_message: 手机端Cookie提示文案 Type: String
         * cookie_pc_message: 电脑端Cookie提示文案（可用HTML） Type: String
         */
        cook_notice: true,
        site_hreflinks: '/',
        backtop_button: true,
        dialog_draggle: false,
        site_title: "网站标题",
        site_address: "http://127.0.0.1",
        cookie_mb_message: "为记录访客的关键行为，我们使用Cookie技术来存储你的一些个人信息。",
        cookie_pc_message: "为记录访客的关键行为，我们使用Cookie技术来存储你的一些信息，详情请查看<a href='/pricay/'>《隐私政策》</a>"
    },
    friends: [ /**（友情链接列表） */
        /**
         * name: 友链名称 Type: String
         * desc: 友链描述 Type: String
         * image: 网站图片 Type: String
         * href: 网站链接 Type: String
         * target: 网站打开方式 Type: String
         * 
         * { name: "name", desc: 'desc', image: '', href: "/", target: "_blank" },
         */
        { name: "RecomEcho", desc: "一款基于Vue3编写的轻量级博客框架", image: avatar, href: "https://github.com/yichen9247/RecomEcho", target: "_blank" },
    ],
    carousel: [ /**（轮播图列表） */
        /**
         * title: 轮播标题 Type: String
         * desc: 轮播描述 Type: String
         * image: 轮播图片 Type: String
         * href: 轮播链接 Type: String
         * 
         * { title: 'title', desc: 'desc', image: '', href: '/' },
         */
        { title: 'Helo World', desc: post_1_desc, image: background, href: '/docs/post-1' },
    ]
}