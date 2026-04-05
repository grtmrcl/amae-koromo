const init = () => import(/* webpackMode: "eager" */ "./bootstrap");

if (!Object.values || !window.URLSearchParams || !window.fetch || !window.Set) {
  import(/* webpackMode: "lazy" */ "./utils/polyfill").then(init);
} else {
  init();
}

export {};
