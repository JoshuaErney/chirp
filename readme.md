# 🐦 Chirp

##### Last Updated: 03/09/2026

🐦 Chirp — A lightweight, dependency-free toast notification library built with vanilla JS and modern CSS. Forked from [Butterup](https://github.com/nlanger/butterup) and rebuilt for simplicity and modern browser standards.

---

## Installation

**CDN**

```html
<link
	rel="stylesheet"
	href="chirp.css" />
<script src="chirp.js"></script>
```

**Manual**  
Download `chirp.js` and `chirp.css` from this repo and reference them directly in your HTML.

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

## Options

### `chirp.toast({})`

| Option            | Type       | Default     | Description                                                                           |
| ----------------- | ---------- | ----------- | ------------------------------------------------------------------------------------- |
| `title`           | `string`   | `null`      | Bold heading text                                                                     |
| `message`         | `string`   | `null`      | Body text                                                                             |
| `type`            | `string`   | `null`      | `success`, `error`, `warning`, `info`                                                 |
| `location`        | `string`   | `top-right` | `top-right`, `top-center`, `top-left`, `bottom-right`, `bottom-center`, `bottom-left` |
| `icon`            | `boolean`  | `false`     | Show a type-matched icon                                                              |
| `customIcon`      | `string`   | `null`      | Raw HTML/SVG to use as the icon                                                       |
| `theme`           | `string`   | `null`      | `glass`, `brutalist`                                                                  |
| `dismissable`     | `boolean`  | `false`     | Dismiss on click                                                                      |
| `customHTML`      | `string`   | `null`      | Inject custom HTML into the toast body                                                |
| `onClick`         | `function` | `null`      | Fires when the toast is clicked                                                       |
| `onRender`        | `function` | `null`      | Fires immediately after the toast is added to the DOM                                 |
| `onTimeout`       | `function` | `null`      | Fires just before the toast is removed                                                |
| `primaryButton`   | `object`   | `null`      | `{ text: string, onClick: function }`                                                 |
| `secondaryButton` | `object`   | `null`      | `{ text: string, onClick: function }`                                                 |

### Global Options

```js
chirp.options.maxToasts = 5; // Max toasts on screen at once
chirp.options.toastLife = 5000; // Toast duration in ms
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

**Promise toast**

```js
chirp.promise({
	promise: fetch("/api/save"),
	loadingMessage: "Saving...",
	successMessage: "Saved successfully!",
	errorMessage: "Something went wrong.",
	location: "bottom-right",
});
```

**Custom icon & theme**

```js
chirp.toast({
	message: "Copied to clipboard.",
	theme: "glass",
	icon: true,
	customIcon: "<svg>...</svg>",
	dismissable: true,
});
```

---

## Programmatic Dismissal

```js
chirp.despawnToast("chirpToast-1", () => {
	console.log("Toast dismissed");
});
```

---

## Attribution

Chirp is forked from [Butterup](https://github.com/nlanger/butterup) by [nlanger](https://github.com/nlanger), distributed under the MIT License.

---

## License

MIT — free to use in personal and commercial projects.

---

## Contributing

Fork the repo, make your changes, and open a pull request. Bug fixes and improvements are welcome.
