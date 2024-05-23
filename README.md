
<p align="center">
    <svg class="logo" viewBox="0 0 128 128" width="84" height="84" data-v-fc157713=""><path fill="#42b883" d="M78.8,10L64,35.4L49.2,10H0l64,110l64-110C128,10,78.8,10,78.8,10z" data-v-fc157713=""></path><path fill="#35495e" d="M78.8,10L64,35.4L49.2,10H25.6L64,76l38.4-66H78.8z" data-v-fc157713=""></path></svg>
</p>

<h1 align="center" style="color: #42b883">ReomEcho</h1>

<p align="center" class="shields">
  <a href="https://github.com/yichen9247/ReomEcho/issues" style="text-decoration:none">
    <img src="https://img.shields.io/github/issues/yichen9247/ReomEcho.svg" alt="GitHub issues"/>
  </a>
  <a href="https://github.com/yichen9247/ReomEcho/stargazers" style="text-decoration:none">
    <img src="https://img.shields.io/github/stars/yichen9247/ReomEcho.svg" alt="GitHub stars"/>
  </a>
  <a href="https://github.com/yichen9247/ReomEcho/network" style="text-decoration:none">
    <img src="https://img.shields.io/github/forks/yichen9247/ReomEcho.svg" alt="GitHub forks"/>
  </a>
  </a>
  <a href="https://github.com/yichen9247/ReomEcho/LICENSE" style="text-decoration:none">
    <img src="https://img.shields.io/github/license/yichen9247/ReomEcho" alt="GitHub License"/>
  </a>
</p>

<p align="center">
    一款基于Vue3编写的轻量级博客框架，旨在使用简洁的文档语言来编写博客文章。
</p>


<details align="center">
  <summary>Star History</summary>
  <a href="https://star-history.com/#yichen9247/ReomEcho&Date" style="text-decoration:none">
    <img src="https://api.star-history.com/svg?repos=yichen9247/ReomEcho&type=Date" alt="Star History Chart">
  </a>
</details>


## 安装依赖

```bash
npm install && cd scripts && npm install
```

## 运行项目

```
npm run dev

也可以者打包再运行

npm run build && npm run preview

```

## 配置网站

请谨慎修改 `docs/main.js` 里面的配置文件，里面的配置有相关说明。

## 更新记录

2024-05.23 更新至 1.1.3 - 

1. 优化了加载速度。
2. 全局增加了跳转中加载动画。
3. 全局图片懒加载增加了开关控制。
4. 新增了一个字体以及一些配置选项。
5. 新增了评论系统，暂时只支持Valine。
6. PC端友情链接页面内友链项新增了拖动效果。
7. 修复了部分页面跳转时仍保留滑动位置的BUG。
8. 对文章页面和独立页面的顶部大图进行了对比度调整。
9. 新增一键开启网站安全保护模式开关，防君子但不防小人。

2024-05.11 更新至 1.1.2 - 

1. 移动端界面新增了协议提醒小助手。
2. 引入了一个移动端组件库以及一个二维码生成库。
3. 全局新增了回到顶部按钮，当下滑到一定程度的时候起作用。
4. 部分页面新增了下拉刷新操作，不过好像暂时没有用处。
5. 首页以及部分页面针对图片和背景图片新增了懒加载，以实现页面的快速加载。
6. 文章底部新增了分享和留下签名按钮，不过留下签名好像暂时没有用处。
7. 重写了当点击文章内图片时弹出图片预览层的逻辑.
8. 全局新增了滚动通知组件语法，使用更加得心应手。
9. 移动端首页界面更换了轮播图效果，并修复了轮播图内文本不能换行的问题。
10. 针对部分加载速度慢的情况进行了优化，采用按需导入技术进行模块的导入。
11. 修复了通知组件文本溢出显示不出来的问题并调整了组件内图标的大小。
12. 首页文章列表新增了悬停擦亮效果，并减弱了文本下边的黑色阴影。
13. PC端侧边栏新增了Github按钮和关于我卡片。
14. 首页文章列表每次加载文章数量从八个增加到十个，可自定义。

1.1.0 及之前 - 

## 开源说明

本项目作者：Hua（王健铮）

此项目是一个开源项目。此项目使用 GPL v3.0 开源许可。开源许可是具有法律效力的合同，请自觉遵守开源许可，尊重他人劳动。