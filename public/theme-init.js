// Runs before first paint: mark that scripts run (so tabs can render in their
// final state without a layout shift) and apply a theme picked earlier, if any.
document.documentElement.classList.add('js');
try {
  var t = localStorage.getItem('theme');
  if (t === 'light' || t === 'dark') document.documentElement.dataset.theme = t;
} catch (e) {}
