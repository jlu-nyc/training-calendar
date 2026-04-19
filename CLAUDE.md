# Claude Code Guidelines

## React Native / Expo

When building React Native/Expo apps, always test UI components for cross-platform compatibility (web, iOS, Android). Date pickers, modals, and native controls behave differently per platform - implement platform-specific handling from the start.

## Assets & Configuration

When adding static assets (favicons, icons, splash screens), ensure the file format matches what's referenced in config files (app.json, app.config.js). Don't generate SVG if the config expects PNG.

## UX Conventions

For any interactive UI controls that modify state (date pickers, dropdowns, toggles), always implement a confirm/cancel flow rather than committing changes immediately on selection.
