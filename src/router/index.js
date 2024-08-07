/* eslint-disable no-undef */

import Pace from "pace-js";
import siteConfig from "../../docs/main.js";
import HomeFrame from "@/frame/HomeFrame.vue";
import AdminIndex from "@/admin/AdminIndex.vue";
import { createRouter, createWebHistory } from "vue-router";
import { useReomEchoStore } from "@/stores/ReomEchoStore.js";

Pace.options = {ignoreURLs: [/.*.min\.js$/,/.*.min\.css$/,/.*\.mp3$/,/.*\.mp4$/,/.*\.wav$/,/.*\.jpg$/,/.*\.png$/,/.*\.webp$/,/.*\.jpeg$/,/.*\.gif$/,/.*\.svg$/,/.*\.ico$/,/.*\.woff$/,/.*\.woff2$/,/.*\.ttf$/,/.*\.eot$/,/.*\.json$/,/.*\.lrc$/,new RegExp(siteConfig.comment.twikoo_envid),new RegExp(siteConfig.comment.waline_server)]};

const setLoadingStatus = () => {
	const ReomEchoStore = useReomEchoStore();
	Pace.on("done", async () => await ReomEchoStore.setIsSiLodingStatus(false).then(async () => await checkSiteHref()));
};

const checkSiteHref = async () => {
	const ReomEchoStore = useReomEchoStore();
	let links = Array.from(document.getElementsByTagName("a"));
	links.forEach(link => {
        if (link.href.includes(location.host)) {
            link.addEventListener("click",(e) => {
                e.preventDefault();
                createRoutes.push(new URL(link.href).pathname).then(() => {
					ReomEchoStore.resetSitePathName();
					ReomEchoStore.resizeWindowInitConfig();
					document.querySelector("#Reomecho").scrollTo(0, 0);
				}).catch((error) => {
                    ElMessage({
                        type: "error",
                        message: "系统功能异常：" + error.message,
                    });
                });
            });
        }
    });
};

const reloadSystemStyles = async () => {
	document.body.className = "";
	document.body.style.setProperty(
		"--dominColor",
		siteConfig.style.site_dominColor
	);
	document.body.style.setProperty(
		"--buttoColor",
		siteConfig.style.site_buttoColor
	);
	document.body.style.setProperty(
		"--transition",
		siteConfig.style.transt_interval
	);
	document.body.style.setProperty(
		"--dotted_color1",
		siteConfig.style.dotted_color1
	);
	document.body.style.setProperty(
		"--dotted_color2",
		siteConfig.style.dotted_color2
	);
	document.body.style.setProperty(
		"--background",
		`url(${siteConfig.style.background_imag})`
	);
};

const routerPath = [
	{
		path: "/",
		name: "home",
		component: HomeFrame,
		meta: { route: "Home", scrollToTop: true },
		beforeEnter: [setLoadingStatus, reloadSystemStyles],
	},
	{
		path: "/docs/:alias",
		name: "docs",
		component: () => import("@/frame/ArticleFrame.vue"),
		meta: {
			route: "Home",
			config: { path: false },
			scrollToTop: true,
			type: "post",
		},
		beforeEnter: [setLoadingStatus],
	},
	siteConfig.system.admin.open
		? {
				path: `/${siteConfig.system.admin.path}`,
				name: "Admin",
				component: AdminIndex,
				meta: { route: "Admin", scrollToTop: true },
				children: [],
		}
		: {},
	siteConfig.pages.circle && {
		path: siteConfig.pages.circle.path,
		component: () => import("@/frame/PagesFrame.vue"),
		meta: {
			route: "Home",
			type: "circle",
			config: siteConfig.pages.circle.config,
			scrollToTop: true,
		},
		beforeEnter: [setLoadingStatus, reloadSystemStyles],
	},
	siteConfig.pages.project && {
		path: siteConfig.pages.project.path,
		component: () => import("@/frame/PagesFrame.vue"),
		meta: {
			route: "Home",
			type: "repo",
			config: siteConfig.pages.project.config,
			scrollToTop: true,
		},
		beforeEnter: [setLoadingStatus, reloadSystemStyles],
	},
	siteConfig.pages.privacy && {
		path: siteConfig.pages.privacy.path,
		component: () => import("@/frame/PagesFrame.vue"),
		meta: {
			route: "Home",
			type: "post",
			config: siteConfig.pages.privacy.config,
			scrollToTop: true,
		},
		beforeEnter: [setLoadingStatus, reloadSystemStyles],
	},
	siteConfig.pages.friends && {
		path: siteConfig.pages.friends.path,
		component: () => import("@/frame/PagesFrame.vue"),
		meta: {
			route: "Home",
			type: "link",
			config: siteConfig.pages.friends.config,
			scrollToTop: true,
		},
		beforeEnter: [setLoadingStatus, reloadSystemStyles],
	},
	siteConfig.pages.feedback && {
		path: siteConfig.pages.feedback.path,
		component: () => import("@/frame/PagesFrame.vue"),
		meta: {
			route: "Home",
			type: "feed",
			config: siteConfig.pages.feedback.config,
			scrollToTop: true,
		},
		beforeEnter: [setLoadingStatus, reloadSystemStyles],
	},
	{
		path: "/:catchAll(.*)",
		meta: { route: "Home" },
		component: () => import("@/model/SiteNotFounds.vue"),
		beforeEnter: [setLoadingStatus, reloadSystemStyles],
	},
];

const createRoutes = createRouter({
	routes: routerPath,
	history: createWebHistory(import.meta.env.BASE_URL),
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) return savedPosition;
		if (to.meta.scrollToTop) return { top: 0 };
		if (to.hash) return { el: to.hash, behavior: "smooth" };
	},
});

createRoutes.beforeEach(async (to, from, next) => {
	if (to === from) return;
	const ReomEchoStore = useReomEchoStore();
	Pace.on("start", async () => await ReomEchoStore.setIsSiLodingStatus(true));
	next();
});

export default createRoutes;
