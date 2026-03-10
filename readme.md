# 🐦 Chirp

##### Last Updated: 03/09/2026

A lightweight, dependency-free toast notification library built with vanilla JS and modern CSS. Forked from [Butterup](https://github.com/nlanger/butterup) and rebuilt for simplicity, accessibility, and modern browser standards.

---

## Features

- Zero dependencies — vanilla JS and modern CSS only
- Fully accessible — ARIA live regions, keyboard dismissal, screen reader announcements
- Dark mode support via `prefers-color-scheme`
- Reduced motion support via `prefers-reduced-motion`
- Windows High Contrast mode support via `forced-colors`
- Multiple toast types: `success`, `error`, `warning`, `info`
- Multiple themes: `glass`, `brutalist`
- Promise-based toasts for async workflows
- Configurable position, icons, buttons, and callbacks

---

## Installation

**Manual** Download `chirp.js` and `chirp.css` from this repo and reference them in your HTML.

```html
<link
	rel="stylesheet"
	href="chirp.css" />
<script src="chirp.js"></script>
```

---

## Basic Usage

```js
chirp.toast({
	title: "Success",
	message: "Your changes have been saved.",
	type: "success",
	location: "top-right",
	icon: true,
	dismissable: true,
});
```

---

## API

### `chirp.toast(options)`

| Option            | Type       | Default     | Description                                                                           |
| ----------------- | ---------- | ----------- | ------------------------------------------------------------------------------------- |
| `title`           | `string`   | `null`      | Bold heading text                                                                     |
| `message`         | `string`   | `null`      | Body text                                                                             |
| `type`            | `string`   | `null`      | `success`, `error`, `warning`, `info`                                                 |
| `location`        | `string`   | `top-right` | `top-right`, `top-center`, `top-left`, `bottom-right`, `bottom-center`, `bottom-left` |
| `icon`            | `boolean`  | `false`     | Show a type-matched icon                                                              |
| `customIcon`      | `string`   | `null`      | Raw HTML/SVG to use as the icon                                                       |
| `theme`           | `string`   | `null`      | `glass`, `brutalist`                                                                  |
| `dismissable`     | `boolean`  | `false`     | Dismiss on click, Enter, or Escape                                                    |
| `customHTML`      | `string`   | `null`      | Inject custom HTML into the toast body                                                |
| `onClick`         | `function` | `null`      | Fires when the toast is clicked                                                       |
| `onRender`        | `function` | `null`      | Fires immediately after the toast is added to the DOM                                 |
| `onTimeout`       | `function` | `null`      | Fires just before the toast auto-dismisses                                            |
| `primaryButton`   | `object`   | `null`      | `{ text: string, onClick: function }`                                                 |
| `secondaryButton` | `object`   | `null`      | `{ text: string, onClick: function }`                                                 |

Returns the `toastId` string, which can be passed to `chirp.despawnToast()`.

---

### `chirp.despawnToast(toastId, onClosed?)`

Programmatically dismiss a toast by its ID. Optionally fires `onClosed` after the exit animation completes.

```js
const id = chirp.toast({ message: "Hello!" });
chirp.despawnToast(id, () => console.log("Toast gone"));
```

---

### `chirp.clearAll()`

Dismisses all active toasts and announces the action to screen readers.

```js
chirp.clearAll();
```

---

### `chirp.promise(options)`

Shows a loading toast that updates automatically based on a promise outcome.

| Option           | Type      | Default                  | Description                 |
| ---------------- | --------- | ------------------------ | --------------------------- |
| `promise`        | `Promise` | required                 | The promise to track        |
| `loadingMessage` | `string`  | `'Loading...'`           | Message shown while pending |
| `successMessage` | `string`  | `'Operation successful'` | Message shown on resolve    |
| `errorMessage`   | `string`  | `'An error occurred'`    | Message shown on reject     |
| `location`       | `string`  | `top-right`              | Toast position              |
| `theme`          | `string`  | `null`                   | `glass`, `brutalist`        |

```js
chirp.promise({
	promise: fetch("/api/save"),
	loadingMessage: "Saving...",
	successMessage: "Saved successfully!",
	errorMessage: "Something went wrong.",
	location: "bottom-right",
});
```

---

### Global Options

```js
chirp.options.maxToasts = 5; // Max toasts visible at once (default: 5)
chirp.options.toastLife = 5000; // Auto-dismiss duration in ms (default: 5000)
```

---

## Examples

**With buttons**

```js
chirp.toast({
	title: "Delete item?",
	message: "This action cannot be undone.",
	type: "error",
	icon: true,
	primaryButton: {
		text: "Delete",
		onClick: () => deleteItem(),
	},
	secondaryButton: {
		text: "Cancel",
		onClick: () => console.log("Cancelled"),
	},
});
```

**Custom icon and theme**

```js
chirp.toast({
	message: "Copied to clipboard.",
	theme: "glass",
	icon: true,
	customIcon: '<svg aria-hidden="true" focusable="false">...</svg>',
	dismissable: true,
});
```

---

## Accessibility

Chirp is built with accessibility as a core requirement, not an afterthought.

- The toaster container has `role="region"` and `aria-label="Notifications"` for screen reader landmark navigation
- The toast rack uses `aria-live="polite"` by default, switching to `aria-live="assertive"` for `error` type toasts
- Each toast has `role="status"` or `role="alert"` depending on type
- Dismissable toasts are keyboard focusable (`tabindex="0"`) and respond to `Enter` and `Escape`
- All decorative icons include `aria-hidden="true"` and `focusable="false"`
- `chirp.clearAll()` announces dismissal to screen readers via a temporary live region
- Focus styles use `:focus-visible` and match each toast type's colour

---

## Browser Support

Chirp targets modern browsers and uses the following features:

- `aria-live` / ARIA roles — universal
- `prefers-reduced-motion` — all modern browsers
- `prefers-color-scheme` — all modern browsers
- `forced-colors` — Chromium 89+, Firefox 89+
- `:focus-visible` — all modern browsers
- `:is()` selector — all modern browsers
- `backdrop-filter` (glass theme) — all modern browsers; no fallback in Firefox pre-103

---

## Attribution

Chirp is forked from [Butterup](https://github.com/nlanger/butterup) by [nlanger](https://github.com/nlanger), distributed under the MIT License.

---

## License

MIT — free to use in personal and commercial projects.

---

## Contributing

Fork the repo, make your changes, and open a pull request. Bug fixes and improvements are welcome.
