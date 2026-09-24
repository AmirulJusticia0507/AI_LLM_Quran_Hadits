// Broad estimates only: do not persist the raw User-Agent or IP address.
export function visitorDevice(ua: string) {
  const bot = /bot|crawler|spider|headless|slurp/i.test(ua);
  const device = !ua ? 'Unknown' : bot ? 'Bot' : /ipad|tablet|android(?!.*mobile)/i.test(ua) ? 'Tablet' : /mobile|iphone|ipod/i.test(ua) ? 'Mobile' : 'Desktop';
  const os = !ua ? 'Unknown' : /android/i.test(ua) ? 'Android' : /iphone|ipad|ipod/i.test(ua) ? 'iOS' : /cros/i.test(ua) ? 'ChromeOS' : /windows/i.test(ua) ? 'Windows' : /macintosh|mac os/i.test(ua) ? 'macOS' : /linux/i.test(ua) ? 'Linux' : 'Other';
  const browser = !ua ? 'Unknown' : /edg(?:e|a|ios)?\//i.test(ua) ? 'Edge' : /samsungbrowser/i.test(ua) ? 'Samsung Internet' : /opr\/|opera/i.test(ua) ? 'Opera' : /firefox|fxios/i.test(ua) ? 'Firefox' : /chrome|crios/i.test(ua) ? 'Chrome' : /safari/i.test(ua) ? 'Safari' : 'Other';
  return { device, browser, os };
}
