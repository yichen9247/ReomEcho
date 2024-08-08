/* eslint-disable no-unused-vars */

/**
 * 导入图片
 * import XXX from ""
 */

import avatar from "./assets/avatar.jpg"
import VueIcon from "./assets/favicon.ico"
import NotFoundImage from "./assets/404.gif"
import weixinpay from "./assets/weixinpay.png"
import background from "./assets/background.webp"
import background01 from "./assets/background.jpg"
import lazyLoadImage from "./assets/lazyload.jpg"
import advertisement from "./advertisement/5554BD7CB8B706E9252FEB06016A6F80.jpg"

const hikototo = "也幻想过自己是鼓手，是赛车手，是小提琴手，但最后发现还是最想牵你的手，所以我松开拳头用手握紧笔，作为自己作为人类也作为你，就像是一场华尔街的阴谋，透露着优雅的杀戮。";
const hello = "当你看到这篇文章的时候，你的博客已经部署成功了，这是默认提供的一篇示例文章，你可以编辑或删除它。";

export default {
    header: { /**（头部） */
        /**
         * header_navlist: 导航栏链接列表 Type: Array -> Object
         * header_navlist: [
         *      { name: "栏目名称", link: "/", target: "_blank" },
         * ]
         * 
         * 图标来源：https://feathericons.com/
         */
        header_navlist: [
            { name: "首页", link: "/", target: "_self", featherIcon: 'home', iconFill: 'rgb(138, 43, 226)'  },
            { name: "链接", link: "/friends", target: "_self", featherIcon: 'linkedin', iconFill: '#FF99CC' },
            { name: "隐私", link: "/privacy", target: "_self", featherIcon: 'file-minus', iconFill: '#9999CC' },
            { name: "项目", link: "/project", target: "_self", featherIcon: 'instagram', iconFill: '#FF9999' },
            { name: "留言", link: "/feedback", target: "_self", featherIcon: 'edit', iconFill: '#FF9966' },
            { name: "关于", link: "/aboutme", target: "_self", featherIcon: 'at-sign', iconFill: '#66CCCC' },
            { name: "朋友圈", link: "/circle", target: "_self", featherIcon: 'aperture', iconFill: '#00CC99' },
        ],
    },
    footer: { /**（尾部） */
        /**
         * footer_copyright: 网站底部相关信息（可用HTML） Type: String
         */
        footer_copyright: "Copyright © 2023 - 2024 <a href='https://github.com/yichen9247/Reomecho'>ReomEcho</a>"
    },
    post: { /**（文章） */
        /**
         * post_copynoti: 是否启用文章复制提醒 Type: Boolean
         * post_printbtn: 是否启用文章底部打印按钮 Type: Boolean
         * post_sharebtn: 是否启用文章底部分享按钮 Type: Boolean
         * post_copyright: 是否启用文章底部版权模块 Type: Boolean
         * post_staticspa: 是否启用文章底部字数统计 Type: Boolean
         * post_graphsbtn: 是否启用文章底部签名按钮 Type: Boolean
         * code_highlight: 是否启用文章代码高亮模式 Type: Boolean
         * post_watermark: 是否启用文章水印 Type: Boolean
         * copy_noticeText: 复制文章内容时提醒文本 Type: String
         */
        post_copynoti: true,
        post_printbtn: true,
        post_sharebtn: true,
        post_copyright: true,
        post_staticspa: true,
        post_graphsbtn: true,
        code_highlight: true,
        post_watermark: false,
        text_watermark: "Hua's home",
        copy_noticeText: '复制成功，转载请保留原文链接',
    },
    pages: { /**（独立页面列表） */
        /**
         * open: 是否启用 Type: Boolean
         * path: 页面路径 Type: String
         * name: 页面名称 Type: String
         * image: 页面的头部背景图 Type: String
         * file: 是否解析Markdown文件 Type: String
         * comment: 是否开启当前页面的评论系统 Type: Boolean
         * 
         * name: { open: true, path: "/", config: { open: true, path: "", name: "name", image: '', file: false, comment: false } },
         */
        circle: { open: true, path: "/circle", config: { open: true, path: "circle", name: "友链朋友圈", image: background01, file: false, comment: false, head: true } },
        project: { open: true, path: "/project", config: { open: true, path: "project", name: "我的项目", image: background01, file: false, comment: false, head: true } },
        privacy: { open: true, path: "/privacy", config: { open: true, path: "privacy", name: "隐私政策", image: background01, file: true, comment: false, head: true } },
        friends: { open: true, path: "/friends", config: { open: true, path: "friends", name: "友情链接", image: background01, file: false, comment: true, head: true } },
        feedback: { open: true, path: "/feedback", config: { open: true, path: "feedback", name: "给我留言", image: background01, file: false, comment: true, head: true } },
    },
    circle: { /**（朋友圈） */
        /**
         * 每页展示文章数量 Type: Number
         * serverAdress: 后端服务器地址（不要带后面的斜杠） Type: String
         * 朋友圈文档地址：https://fcircle-doc.yyyzyyyz.cn/
         */
        eachItem: 10,
        serverAdress: 'http://'
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
         * comment: 是否开启当前页面的评论系统 Type: Boolean
         * 
         * lock: 是否启用当前文章锁 Type: Boolean
         * password: 当前文章锁密码 Type: String
         * expires: 当前文章锁过期时间（天） Type: Number
         *
         * tags: [XXX,XXX,XXX]
         * class: [XXX,XXX,XXX]
         */
        { path: "hello", config: { type: 'post', path: "hello", name: 'Hello World', desc: hello, image: background01, tags: ['Hello World'], class: ['Hello World'], comment: true, lock: false, password: '123456', expires: 30  }, isFixed: true, recom: true },
    ],
    index: { /**（首页） */
        /**
         * post_eachnum: 首页每次加载文章个数 Type: Number
         * index_hitoSt: 首页是否启用一言 Type: Boolean
         * index_hitokoto: 首页一言列表 Type: Array => String
         */
        post_eachnum: 5,
        index_hitoSt: true,
        index_hitokoto: [
            '欲买桂花同载酒，荒泷天下第一斗。',
            '巧笑倩兮，美目盼兮，素以为绚兮。',
            '今人不见古时月，今月曾经照古人。',
        ]
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
        author_name: 'Reomecho author',
        author_link: 'https://boke.xiaokolomi.cn/',
        author_desc: hikototo,
        author_mail: 'test@163.com',
        author_avatar: avatar,
        author_github: 'yichen9247',
        author_background: background01
    },
    style: { /**（样式） */
        /**
         * msgs_style: 移动端Msg消息样式[1: Vant 2: Lay] Type: Number
         * font_style: 字体样式 [0: 默认 1:可爱体] Type: Number
         * img_sandbox: 图片沙箱样式[0-1] Type: Number
         * dotted_color1: 边框颜色 Type: String
         * dotted_color2: 边框颜色 Type: String
         * image_lazyload: 全局懒加载图片 Type: String
         * transt_interval: 动画过渡时间（ms） Type: String
         * site_dominColor: 网站主色 Type: String
         * po_qrcode_color: 二维码颜色 Type: String
         * site_buttoColor: 按钮颜色 Type: String
         * background_imag: 背景图片 Type: String
         * image_lazyerror: 图片加载失败时显示图片 Type: String
         * darkheme_toggle: 深色模式（1：自由 2：自动（每天 10:00 - 8:00））
         */
        msgs_style: 2,
        font_style: 2,
        img_sandbox: 2,
        darkheme_toggle: 1,
        dotted_color1: "#ff6c6c",
        dotted_color2: "#1989fa",
        image_lazyload: lazyLoadImage,
        background_imag: background,
        notfound_image: background01,
        transt_interval: "0.3s",
        site_dominColor: "#626aef",
        po_qrcode_color: "#626aef",
        image_lazyerror: NotFoundImage,
        site_buttoColor: "rgba(97, 104, 240, 0.75)",
    },
    aside: { /**（PC端右侧边栏） */
        /**
        * sponsor_image: 赞助二维码 Type: String
        * aboutme_hitokoto: 点击关于我卡片的欢迎语提示 Type: String
        * gitbuttons_hrefs: Github链接 Type: String
        * aside_list: ['sponsor','socials','lastpost','sakanas','statistics','lovetime','gitbuttons'] Type: Array => String
        * sponsor: 赞助组件 socials: 社交组件 reckon: 人生计时 lastpost: 最新文章 sakanas: 板娘组件 statistics: 统计组件 lovetime: 恋爱组件 advertisement: 广告组件 gitbuttons: Github按钮组件
        */
        sponsor_image: weixinpay,
        gitbuttons_hrefs: "https://github.com/yichen9247/ReomEcho",
        aside_list: ['sponsor','socials','reckon','lastpost','sakanas','statistics','lovetime','advertisement','gitbuttons']
    },
    lovevs: { /**（恋爱时间板块） */
        /**
         * star_date: 恋爱开始时间（年，月，日，时，分，秒） Type: String
         * left_avatar: 左侧头像 Type: String
         * righ_avatar: 右侧头像 Type: String
         */
        star_date: Date.UTC(2019, 12, 28, 6, 45, 0),
        left_avatar: 'https://q2.qlogo.cn/g?b=qq&nk=865252486&s=640',
        righ_avatar: 'https://q2.qlogo.cn/g?b=qq&nk=1486823198&s=640',
    },
    drawer: { /**（手机端左侧边栏） */
        /**
         * drawer_show: 是否显示侧边栏 Type: Boolean
         * drawer_image: 侧边栏顶部图片 Type: String
         * drawer_footer: 是否显示尾部 Type: Boolean
         * drawer_social: 是否显示社交图标 Type: Boolean
         * drawer_search: 是否显示搜索组件 Type: Boolean
         * drawer_musicst: 是否显示音乐板块 Type: Boolean
         * drawer_statistics: 是否显示统计 Type: Boolean
         */
        drawer_show: true,
        drawer_image: background01,
        drawer_footer: true,
        drawer_social: true,
        drawer_search: true,
        drawer_musicst: false,
        drawer_statistics: true,
    },
    statis: { /**（统计） */
        /**
         * statics_pv: 是否显示网站总访问量统计 Type: Boolean
         * statics_uv: 是否显示网站总访客量统计 Type: Boolean
         * statics_links: 是否显示友链统计 Type: Boolean
         * statics_posts: 是否显示文章统计 Type: Boolean
         */
        statics_pv: true,
        statics_uv: true,
        statics_links: true,
        statics_posts: true,
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
    comment: { /**（评论） */
        /**
         * comment_styl: 评论框样式 [0: 无样式 1-6: 有点多，不列举了，可一个一个试] Type: Number
         * comment_psiz: 每页加载的评论条数 Type: Number
         * comment_maxs: 最大评论字数 Type: Number
         * comment_lang: 评论系统多语言支持 Type: String
         * comment_glba: 是否全局开启评论系统 Type: Boolean
         * valine_emoje: Vaine评论系统启用更多表情包 Type: Boolean
         * artalk_server: Artalk评论系统后端地址 Type: String
         * waline_login: Waline评论必须登录 Type: Boolean
         * comment_type: 评论系统 ['Valine','Twikoo','Artalk','Waline'] Type: String
         * twikoo_envid: Twikoo环境ID Type: String
         * waline_server: Waline评论系统后端地址 Type: String
         * valine_appid: Valine评论系统AppId Type: String
         * valine_appkey: Valine评论系统AppKey Type: String
         * comment_placehoter: 评论输入框占位文本 Type: String
         * waline_reaction: Waline评论系统是否启用互动表情 Type: Boolean
         */
        comment_styl: 6,
        comment_psiz: 10,
        comment_maxs: 500,
        comment_glba: false,
        valine_emoje: true,
        artalk_server: '',
        waline_login: true,
        comment_lang: 'zh-cn',
        comment_type: 'Twikoo',
        waline_reaction: true,
        twikoo_envid: 'https://',
        valine_appid: '',
        waline_server: 'https://',
        valine_appkey: '',
        comment_placehoter: '请输入评论内容，请勿发布无意义的内容...'
    },
    cookie: { /**（Cookie设置） */
        /**
         * cookie_notice: 是否启用协议提醒小助手 Type: Boolean
         * cookie_mb_message: 手机端Cookie提示文案 Type: String
         * cookie_pc_message: 电脑端Cookie提示文案（可用HTML） Type: String
         */
        cookie_notice: true,
        cookie_mb_message: "为记录访客的关键行为，我们使用Cookie技术来存储你的一些个人信息。",
        cookie_pc_message: "为记录访客的关键行为，我们使用Cookie技术来存储你的一些信息，详情请查看<a href='/privacy/'>《隐私政策》</a>"
    },
    widget: { /** （组件设置） */
        /**
         * music_widget: 是否启用音乐播放器组件 Type: Boolean
         * users_widget: 是否启用用户中心组件 Type: Boolean
         * rando_widget: 是否显示随机开往组件 Type: Boolean
         * theme_widget: 是否启用主题切换组件 Type: Boolean
         * resize_widget: 是否启用放大缩小组件 Type: Boolean
         * search_widget: 是否启用搜索组件 Type: Boolean
         * header_widget: 是否启用更多功能组件 Type: Boolean
         */
        music_widget: true,
        users_widget: true,
        rando_widget: true,
        theme_widget: true,
        resize_widget: true,
        search_widget: true,
        header_widget: true,
        header_setting: true,
    },
    sundry: { /** （其他设置） */
        /**
         * baktop_bton: 是否启用返回顶部绳子 Type: Boolean
         * click_effec: 是否启用点击效果 Type: Boolean
         * moused_wave: 是否启用鼠标波浪效果 Type: Boolean
         * load_topline: 是否启用加载进度条 Type: Boolean
         * music_cookie: 是否启用音乐播放器cookie Type: Boolean
         * site_openrss: 是否启用RSS订阅 Type: Boolean
         * is_cssinsert: 是否启用全局CSS样式注入 Type: Boolean
         * is_javainsert: 是否启用JavaScript脚本注入 Type: Boolean
         * dynamic_color: 是否启用动态配色（实验版） Type: Number
         * site_mourning: 是否启用悼念模式，该模式下一切内容皆为黑白 Type: Boolean
         * image_lazyload: 是否开启全局图片懒加载 Type: String
         * backtop_button: 是否启用返回顶部按钮 Type: Boolean
         * load_fullscreen: 是否启用全屏加载效果 Type: Boolean
         * dialog_draggle: 是否启用拖拽式弹窗 Type: Boolean
         * friends_draggle: PC端友链界面是否启用友链拖动效果 Type: Boolean
         */
        baktop_bton: true,
        click_effec: false,
        moused_wave: true,
        load_topline: true,
        music_cookie: true,
        site_openrss: true,
        is_cssinsert: false,
        is_javainsert: false,
        dynamic_color: false,
        site_mourning: false,
        image_lazyload: true,
        site_secproduc: true,
        backtop_button: true,
        load_fullscreen: true,
        dialog_draggle: false,
        friends_draggle: true,
    },
    global: { /**（全局设置） */
        /**
         * music_cookie: 是否启用音乐播放记录Cookkie缓存 Type: String
         * site_hreflinks: 网站路径（填根路径 '/' 就行） Type: String
         * site_title: 网站名称 Type: String
         * site_icons: 网站图标 Type: String
         * text_watermark: 文章水印文本 Type: String
         * site_rssPath: 网站RSS地址 Type: String
         * site_address: 网站地址 Type: String
         * site_loadingIcon: 网站全屏加载图片 Type: String
         * site_description: 网站描述 Type: String
         */
        site_title: "ReomEcho",
        site_icons: VueIcon,
        site_rssPath: 'rss.xml',
        site_address: "http://localhost:5173",
        site_hreflinks: '/',
        site_loadingIcon: avatar,
        site_description: "一款基于Vue3编写的轻量级博客框架，旨在使用简洁的文档语言来编写博客文章。",
    },
    musics: [ /**（音乐列表） */
        /**
         * name: 歌曲名称 Type: String
         * img: 歌曲图片 Type: String
         * src: 歌曲链接 Type: String
         * lyric: 歌曲歌词 Type: String
         * 
         * { title: '音乐名称',img: '音乐封面链接' src: '音乐文件链接',lyric: '歌词文件链接' }
         */
        {
            name: '音乐名称',
            img: background01, 
            src: '音乐链接.mp3',
            lyric: '音乐链接.lrc'
        }
    ],
    advertisement: [ /**（广告列表） */
        /**
         * title: 广告标题 Type: String
         * height: 广告图片高度 Type: String
         * image: 广告图片 Type: String
         * href: 广告链接 Type: String
         * target: 网站打开方式 Type: String
         * 
         * { title: '广告标题', height: '100px', image: '广告图片', href: "广告链接", target: "_blank" },
         */
        { title: '软天空社区电脑版', height: '100px', image: advertisement, href: 'http://rtk.tiank.top', target: '_blank' },
    ],
    depoly: { /**（部署设置） */
        /**
         * method: 部署方式['Vercel', 'Server', 'Location', 'Other'] Type: String
         * Analytics: 是否启用Analytics Type: Boolean，详情见：https://vercel.com/docs/analytics/quickstart#add-the-analytics-component-to-your-app
         * SpeedInsights: 是否启用VercelSpeedInsights Type: Boolean，详情见：https://vercel.com/docs/speed-insights/quickstart#add-the-speedinsights-component-to-your-app
         */
        method: 'Vercel',
        Analytics: true,
        SpeedInsights: true,
    },
    system: { /**（系统设置） */
        admin: { /**（后台设置） */
            /**
             * open: 是否启用后台 Type: Boolean
             * path: 后台路径 Type: String
             */
            open: true,
            path: 'console'
        },
        server_adress: 'http://localhost:3000', /**（后端服务器地址） */
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
        { name: "Hua's home", desc: "从微观到宏观，用技术改变世界", image: avatar, href: "https://boke.xiaokolomi.cn/", target: "_blank" },

    ],
    insert_styles: ``, /**（注入CSS样式） */
    insert_footer: "Copyright © 2023 - 2024 <a href='https://github.com/yichen9247/Reomecho'>ReomEcho</a>", /**（注入页脚代码） */
    insert_javascript: `` /**（注入JavaScript脚本） */
}