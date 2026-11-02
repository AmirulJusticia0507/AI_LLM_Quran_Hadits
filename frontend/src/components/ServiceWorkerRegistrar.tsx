"use client";

import { useEffect } from "react";

/**
 * Registers the service worker (see public/sw.js) that keeps /quran readable
 * without internet.
 *
 * A page loaded before the worker existed is not controlled until its next
 * navigation, and offline reading depends on being controlled. After the first
 * install the worker reloads open pages once (see the activate handler); the
 * session flag below makes sure that happens at most once per browser session.
 * Skipped in development so `next dev` is never pinned by a stale cache.
 */
const CLAIMED_KEY = "alhikmah-sw-claimed";

export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then(async () => {
          if (navigator.serviceWorker.controller) {
            try {
              sessionStorage.setItem(CLAIMED_KEY, "1");
            } catch {
              // Storage can be unavailable in private modes.
            }
            return;
          }
          let alreadyReloaded = false;
          try {
            alreadyReloaded = sessionStorage.getItem(CLAIMED_KEY) === "1";
          } catch {
            alreadyReloaded = false;
          }
          if (alreadyReloaded) return;

          navigator.serviceWorker.addEventListener("controllerchange", () => {
            try {
              sessionStorage.setItem(CLAIMED_KEY, "1");
            } catch {
              // Ignore storage failures.
            }
            window.location.reload();
          });
        })
        .catch(() => {
          // Offline support is best effort; the app keeps working online.
        });
    };

    if (document.readyState === "complete") {
      register();
      return;
    }
    window.addEventListener("load", register, { once: true });
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
