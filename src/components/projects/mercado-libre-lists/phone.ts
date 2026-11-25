export const ICON = {
  back: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 12H5m6-6-6 6 6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11 12 4l8 7v9h-5v-6H9v6H4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  grid: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="4" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="14" width="6" height="6" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M17 14v6m-3-3h6" stroke="currentColor" stroke-width="1.6"/></svg>',
  cart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h3l2 10h10l2-7H7" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="10" cy="19" r="1.2" fill="currentColor"/><circle cx="17" cy="19" r="1.2" fill="currentColor"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m10 9 5 3-5 3Z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>',
  more: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h11M4 17h7m6-3v6m-3-3h6" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>',
  search:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="m16.5 16.5 4 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>',
  pencil:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 4.5 4.5 4.5L8 20.5H3.5V16Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  heart:
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7.5-4.6-7.5-10.3A4.2 4.2 0 0 1 12 7.2a4.2 4.2 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"/></svg>',
  signal:
    '<svg viewBox="0 0 20 13" aria-hidden="true"><rect x="0" y="8" width="3.2" height="5" rx="1" fill="currentColor"/><rect x="5.5" y="5.5" width="3.2" height="7.5" rx="1" fill="currentColor"/><rect x="11" y="3" width="3.2" height="10" rx="1" fill="currentColor"/><rect x="16.5" y="0" width="3.2" height="13" rx="1" fill="currentColor"/></svg>',
  wifi: '<svg viewBox="0 0 18 13" aria-hidden="true"><path d="M1 4.6a11 11 0 0 1 16 0M3.6 7.6a7 7 0 0 1 10.8 0M6.3 10.5a3.200 3.200 0 0 1 5.400 0" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/><circle cx="9" cy="12" r="1.2" fill="currentColor"/></svg>',
  battery:
    '<svg viewBox="0 0 28 13" aria-hidden="true"><rect x=".6" y=".6" width="23" height="11.800" rx="3.600" fill="none" stroke="currentColor" stroke-opacity=".4" stroke-width="1.200"/><rect x="2.400" y="2.400" width="19.200" height="8.200" rx="2.200" fill="currentColor"/><path d="M25.500 4.500v4a2 2 0 0 0 0-4Z" fill="currentColor" fill-opacity=".45"/></svg>',
};
export const iosTop = (head: string) =>
  `<div class="n-top"><div class="n-status" aria-hidden="true"><span class="n-time">9:41</span><span class="n-sys">${ICON.signal}${ICON.wifi}${ICON.battery}</span></div><div class="n-head">${head}</div></div>`;
export const iosBar = (labels: readonly string[]) =>
  `<div class="n-bar" aria-hidden="true">${(["home", "grid", "cart", "play", "more"] as const).map((k, n) => `<span${n === 4 ? ' class="on"' : ""}>${ICON[k]}<small>${labels[n]}</small></span>`).join("")}</div>`;
export const iosChrome =
  '<i class="n-island" aria-hidden="true"></i><i class="n-home" aria-hidden="true"></i>';
