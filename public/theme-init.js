// Applies the theme picked with the header toggle before the first paint, so
// the page never flashes the other theme. BaseLayout loads it as a blocking
// classic script in <head>: an external file, never inline (CSP). Without a
// stored choice nothing is set and the CSS follows the system theme. The
// 'theme' key is written by src/components/ThemeToggle.astro.
try {
  const theme = localStorage.getItem('theme')
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme
} catch {
  // Storage blocked (privacy settings): keep the system theme.
}
