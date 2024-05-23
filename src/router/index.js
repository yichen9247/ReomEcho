
import siteConfig from '../../docs/main.js'
import HomeView from '@/views/HomeView.vue'
import NotFounds from '@/views/pages/NotFounds.vue'
import { createRouter, createWebHistory  } from 'vue-router'

const docsChildren = () => {
  let children = [];
  siteConfig.actives.map((article) => {
    children.push({ path: article.path, component: () => import('@/views/pages/ArticleView.vue'), meta: { config: article.config, scrollToTop: true } });
  });
  return children;
}

const routerPath = [
  { path: '/', name: 'home', component: HomeView , meta: {scrollToTop: true} },
  { path: '/docs', name: 'docs', component: () => import('@/views/pages/ArticleView.vue'), meta: { config: { path: false }, scrollToTop: true }, children: docsChildren()},
  siteConfig.pages.project && { path: siteConfig.pages.project.path, component: () => import('@/views/pages/PagesView.vue'), meta: { type: 'repo', config: siteConfig.pages.project.config, scrollToTop: true } },
  siteConfig.pages.privacy && { path: siteConfig.pages.privacy.path, component: () => import('@/views/pages/PagesView.vue'), meta: { type: 'post', config: siteConfig.pages.privacy.config, scrollToTop: true } },
  siteConfig.pages.friends && { path: siteConfig.pages.friends.path, component: () => import('@/views/pages/PagesView.vue'), meta: { type: 'link', config: siteConfig.pages.friends.config, scrollToTop: true } },
  siteConfig.pages.feedback && { path: siteConfig.pages.feedback.path, component: () => import('@/views/pages/PagesView.vue'), meta: { type: 'feed', config: siteConfig.pages.feedback.config, scrollToTop: true } },
  { path: '/*', redirect: NotFounds },
];

const createRoutes = createRouter({
  routes: routerPath,
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // 如果目标路由包含meta属性scrollToTop且为true，则滚动到顶部
    if (to.meta.scrollToTop) {
      return { top: 0, };
    }
    // 如果目标路由包含哈希，滚动到哈希指定的位置
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    }
    // 如果有保存的位置，则使用它
    if (savedPosition) return savedPosition;
    return;
  }
});


export default createRoutes