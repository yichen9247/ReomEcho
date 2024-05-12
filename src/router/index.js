
import siteConfig from '../../docs/main.js'
import HomeView from '@/views/HomeView.vue'
import NotFounds from '@/views/pages/NotFounds.vue'
import { createRouter, createWebHistory  } from 'vue-router'

const docsChildren = () => {
  let children = [];
  siteConfig.actives.map((article) => {
    children.push({ path: article.path, component: () => import('@/views/pages/ArticleView.vue'), meta: { config: article.config } });
  });
  return children;
}

const routerPath = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/docs', name: 'docs', component: () => import('@/views/pages/ArticleView.vue'), meta: { config: { path: false } }, children: docsChildren()},
  siteConfig.pages.project && { path: siteConfig.pages.project.path, component: () => import('@/views/pages/PagesView.vue'), meta: { type: 'repo', config: siteConfig.pages.project.config } },
  siteConfig.pages.privacy && { path: siteConfig.pages.privacy.path, component: () => import('@/views/pages/PagesView.vue'), meta: { type: 'post', config: siteConfig.pages.privacy.config } },
  siteConfig.pages.friends && { path: siteConfig.pages.friends.path, component: () => import('@/views/pages/PagesView.vue'), meta: { type: 'link', config: siteConfig.pages.friends.config } },
  { path: '/*', redirect: NotFounds },
];

const createRoutes = createRouter({
  routes: routerPath,
  history: createWebHistory(import.meta.env.BASE_URL)
});


export default createRoutes