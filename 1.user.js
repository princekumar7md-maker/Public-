// ==UserScript==
// @name         Speed + Auto Click
// @namespace    arun-bhai
// @version      1.0
// @match        *://dusarisalary.com/*
// @match        *://*.dusarisalary.com/*
// @match        *://pipefitter.in/*
// @match        *://*.pipefitter.in/*
// @run-at       document-start
// @grant        unsafeWindow
// ==/UserScript==

(function () {
  'use strict';
  const win = unsafeWindow || window;
  const SPEED = 50;
  const SEL = 'a.yt.linky.buttonpanel';

  const startDate = Date.now();
  const startPerf = performance.now();
  const origDateNow = Date.now;
  const origPerfNow = performance.now;
  const origSetTimeout = win.setTimeout;
  const origSetInterval = win.setInterval;

  win.Date.now = () => startDate + (origDateNow() - startDate) * SPEED;
  win.performance.now = () => startPerf + (origPerfNow() - startPerf) * SPEED;
  win.setTimeout = (fn, delay, ...args) =>
    origSetTimeout(fn, Math.max(0, (delay || 0) / SPEED), ...args);
  win.setInterval = (fn, delay, ...args) =>
    origSetInterval(fn, Math.max(0, (delay || 0) / SPEED), ...args);

  if (location.hostname.includes('dusarisalary.com')) {
    const t = origSetInterval(() => {
      const el = document.querySelector(SEL);
      if (el) {
        el.click();
        clearInterval(t);
      }
    }, 50);
  }
})();