// ==UserScript==
// @name        zhihu-elder-river
// @namespace   https://github.com/OpenGG/zhihu-elder-river
// @description Make zhihu more elder-friendly.
// @icon        https://cdn.rawgit.com/OpenGG/zhihu-elder-river/master/icon.png
// @version     1.0.0
// @noframes
// @grant       none
// @run-at      document-start
// @require     https://cdn.rawgit.com/OpenGG/zhihu-elder-river/next/co.js
// @match       *://zhihu.com/*
// @match       *://*.zhihu.com/*
// ==/UserScript==

/* jshint esversion: 6, strict: true */
'use strict';
(() => {
  const name = 'zhihu-elder-river';

  const removeCookie = (key, domain, path = '/') => {

    // get a date in the past
    const expireDate = new Date(-1).toUTCString();

    // clear the size-related cookie and force it to expire
    document.cookie = `${key}=; domain=${domain}; path=${path}; expires=${expireDate}`;
  };

  const wait =
    time =>
    new Promise(
      (resolve) =>
      setTimeout(resolve, time)
    );

  const main = function* () {
    const repeat = 10;

    const key = 'nweb_qa';

    const domain = '.zhihu.com';

    for (let i = 0; i < repeat; ++i) {
      removeCookie(key, domain);
      console.log(`[${name}]: remove cookie ${key} on domain ${domain}`);
      yield wait(1000);
    }
  };

  co(main)
    .then(
      () => {
        console.log('[${name}]: end');
      },
      (e) => {
        console.error(e)
      }
    );
})();
