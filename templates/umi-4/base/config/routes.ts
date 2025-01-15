/**
 * @name 路由配置
 * -------------------------------
 * @doc 参考相关文档：https://umijs.org/docs/guides/routes
 */
export default [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: "./Home",
    name: "首页",
  },
  { path: "/403", component: "403" },
  {
    path: "*",
    layout: false,
    component: "404",
  },
];
