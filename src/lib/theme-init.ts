// Runs inline before first paint: mark that scripts run (so tabs render in their
// final state with no layout shift) and apply a theme picked earlier, if any.
// The CSP allows exactly this text by its SHA-256 (scripts/csp-hash.mjs).
export const THEME_INIT =
  "document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}";
