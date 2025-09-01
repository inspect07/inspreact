import { useEffect, useState } from "react";

type Theme = string;

export function useTheme(defaultTheme: Theme = "light", key: string = "theme") {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem(key);
    return saved || defaultTheme;
  });

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(key, theme);
  }, [theme, key]);

  const toggle = (t1: Theme = "light", t2: Theme = "dark") => {
    setTheme((prev) => (prev === t1 ? t2 : t1));
  };

  return [theme, setTheme, toggle] as const;
}
