import { useEffect, useState } from "react";

export function useKeyPress(targetKey: string) {
  const [pressed, setPressed] = useState(false);

  const downHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) setPressed(true);
  };
  const upHandler = ({ key }: KeyboardEvent) => {
    if (key === targetKey) setPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);
    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, [targetKey]);

  return pressed;
}
