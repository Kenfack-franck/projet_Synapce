import { useEffect, useMemo, useState } from "react";

export function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const words = useMemo(() => text.split(" "), [text]);
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setIndex(0);
    setDone(false);
  }, [text]);

  useEffect(() => {
    if (index >= words.length) {
      setDone(true);
      return;
    }

    const timeout = window.setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, speed);

    return () => window.clearTimeout(timeout);
  }, [index, words, speed]);

  const displayed = words.slice(0, index).join(" ");

  return (
    <div className="text-sm leading-relaxed text-gray-700">
      {displayed}
      {!done && <span className="ml-0.5 animate-pulse text-blue-500">|</span>}
    </div>
  );
}
