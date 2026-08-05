// Post-build step: Expo's metro web export generates a minimal index.html with no
// PWA metadata, and it can't be templated without expo-router. This injects the
// manifest link and the Apple-specific tags iOS needs for "Add to Home Screen"
// (custom icon + full-screen standalone launch) into dist/index.html.
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'dist', 'index.html');

const TAGS = `    <link rel="manifest" href="/manifest.json" />
    <meta name="theme-color" content="#0f0f23" />
    <meta name="mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="apple-mobile-web-app-title" content="Training" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" href="/favicon.png" />
`;

let html = fs.readFileSync(htmlPath, 'utf8');

if (html.includes('rel="manifest"')) {
  console.log('[inject-pwa] tags already present, skipping');
} else {
  html = html.replace('</head>', `${TAGS}  </head>`);
  fs.writeFileSync(htmlPath, html);
  console.log('[inject-pwa] injected PWA head tags into dist/index.html');
}
