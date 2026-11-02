"use client";

import { useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("online", onChange);
  window.addEventListener("offline", onChange);
  return () => {
    window.removeEventListener("online", onChange);
    window.removeEventListener("offline", onChange);
  };
}

function getSnapshot() {
  return typeof navigator === "undefined" ? true : navigator.onLine;
}

function getServerSnapshot() {
  // Server and the first hydration pass always render as online so markup matches.
  return true;
}

/**
 * Reads the browser connectivity state and re-renders when it changes.
 *
 * navigator.onLine only reflects the OS network interface. A request can still
 * fail while this returns true (captive portal, dead upstream, blocked API),
 * so callers must keep handling fetch failures separately.
 */
export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
