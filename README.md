# inspreact

![npm version](https://img.shields.io/npm/v/inspreact.svg)
![npm downloads](https://img.shields.io/npm/dm/inspreact.svg)
![License](https://img.shields.io/npm/l/inspreact.svg)

**inspreact** is a lightweight, TypeScript-first React utility library by `inspectph`.
It provides **commonly used hooks and helpers** to speed up React development.

---

## Table of Contents

- [Installation](#installation)
- [Hooks](#hooks)
- [Helpers](#helpers)
- [Usage Example](#usage-example)
- [Contribution](#contribution)
- [License](#license)

---

## Installation

```bash
npm install inspreact
# or
yarn add inspreact
```

---

## Hooks

### `useToggle`

Toggle a boolean state.

```ts
import { useToggle } from "inspreact";
const [isOpen, toggleOpen] = useToggle(false);
```

### `useCounter`

Counter with increment, decrement, and reset.

```ts
import { useCounter } from "inspreact";
const { count, increment, decrement, reset } = useCounter(0);
```

### `useLocalStorage`

Sync state with `localStorage`, with optional serializer/deserializer and SSR safety.

```ts
import { useLocalStorage } from "inspreact";
const [name, setName] = useLocalStorage("name", "John Doe");

// With custom serializer/deserializer
const [user, setUser] = useLocalStorage("user", null, {
  serializer: u => btoa(JSON.stringify(u)),
  deserializer: s => JSON.parse(atob(s)),
});
```
### `useMount`

Run a callback only once when the component mounts.

```ts
import { useMount } from "inspreact";
useMount(() => {
  // Do something on mount
});
```

### `useUnmount`

Run a callback only once when the component unmounts.

```ts
import { useUnmount } from "inspreact";
useUnmount(() => {
  // Cleanup logic here
});
```

### `useUpdateEffect`

Run an effect only on updates, not on initial mount.

```ts
import { useUpdateEffect } from "inspreact";
useUpdateEffect(() => {
  // Do something only on updates
}, [someValue]);
```

### `useIsFirstRender`

Detect if this is the first render of a component.

```ts
import { useIsFirstRender } from "inspreact";
const isFirst = useIsFirstRender();
```

### `useInterval`

Declarative setInterval for React.

```ts
import { useInterval } from "inspreact";
useInterval(() => {
  // Do something every second
}, 1000);
```

### `useFetch`

Async data fetching with loading, error, and refetch support.

```ts
import { useFetch } from "inspreact";
const { data, error, loading, refetch } = useFetch(() => fetch('/api/user').then(r => r.json()), []);
```
### `formatBytes`

Convert bytes to a human-readable string.

```ts
import { formatBytes } from "inspreact";
formatBytes(1024); // "1 KB"
```

### `slugify`

Convert a string to a URL-friendly slug.

```ts
import { slugify } from "inspreact";
slugify("Hello World!"); // "hello-world"
```

### `retry`

Retry an async function with configurable attempts and delay.

```ts
import { retry } from "inspreact";
await retry(() => fetch('/api').then(r => r.json()), 3, 1000);
```

### `useDebounce`

Debounce a value or callback.

```ts
import { useDebounce } from "inspreact";
const debouncedSearch = useDebounce(searchTerm, 500);
```

### `useWindowSize`

Track window width and height.

```ts
import { useWindowSize } from "inspreact";
const { width, height } = useWindowSize();
```

### `useThrottle`

Throttle a value or callback.

```ts
import { useThrottle } from "inspreact";
const throttledValue = useThrottle(value, 300);
```

### `usePrevious`

Get the previous value of a state.

```ts
import { usePrevious } from "inspreact";
const prev = usePrevious(count);
```

### `useClickOutside`

Detect clicks outside a DOM element.

```ts
import { useClickOutside } from "inspreact";
useClickOutside(ref, () => console.log("Clicked outside"));
```

### `useCopyToClipboard`

Copy text to clipboard.

```ts
import { useCopyToClipboard } from "inspreact";
const [copied, copy] = useCopyToClipboard();
copy("Hello World");
```

### `useOnlineStatus`

Detect online/offline status.

```ts
import { useOnlineStatus } from "inspreact";
const online = useOnlineStatus();
console.log(online ? "Online" : "Offline");
```

### `useTheme`

Manage **custom themes** with persistence.

```ts
import { useTheme } from "inspreact";
const [theme, setTheme, toggle] = useTheme("light");
setTheme("blue");
toggle();
```

> Persists the theme in `localStorage` and updates `document.body.dataset.theme`.

### `useTimeout`

Declarative `setTimeout`.

```ts
import { useTimeout } from "inspreact";
useTimeout(() => console.log("Timeout!"), 1000);
```

### `useKeyPress`

Detect key press events.

```ts
import { useKeyPress } from "inspreact";
const pressed = useKeyPress("Enter");
```

---

## Helpers

### `deepClone`

Deep copy an object or array.

```ts
import { deepClone } from "inspreact";
const copy = deepClone(obj);
```

### `isEmpty`

Check if a value is empty (array, object, string, or null/undefined).

```ts
import { isEmpty } from "inspreact";
isEmpty([]); // true
```

### `randomId`

Generate a random string ID.

```ts
import { randomId } from "inspreact";
const id = randomId(10);
```

### `classNames`

Combine class names conditionally.

```ts
import { classNames } from "inspreact";
const btnClass = classNames("btn", isPrimary && "btn-primary");
```

### `truncate`

Shorten text with ellipsis.

```ts
import { truncate } from "inspreact";
truncate("Hello World", 5); // "Hello…"
```

### `capitalize`

Capitalize the first letter of a string.

```ts
import { capitalize } from "inspreact";
capitalize("hello"); // "Hello"
```

---

## Usage Example

```ts
import {
  useThrottle,
  useCopyToClipboard,
  useTheme,
  deepClone,
} from "inspreact";

function App() {
  const [text, setText] = React.useState("");
  const throttledText = useThrottle(text, 500);
  const [copied, copy] = useCopyToClipboard();
  const [theme, setTheme, toggle] = useTheme("light");

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => copy(throttledText)}>
        {copied ? "Copied!" : "Copy"}
      </button>
      <p>Current theme: {theme}</p>
      <button onClick={() => toggle()}>Toggle Theme</button>
    </div>
  );
}
```

---

## Contribution

PRs and suggestions are welcome!
If you add new utilities, please follow **TypeScript** and **React Hooks / Helper conventions**.

---

## ⚖️ License

MIT License
