import { useState, useEffect, useRef } from "react";

export function TypewriterText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const words = text.split(" ");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(words.slice(0, i).join(" "));
      if (i >= words.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <div ref={ref} className="text-sm text-gray-700 leading-relaxed">
      {displayed}
      {started && !done && <span className="animate-pulse ml-0.5 text-blue-500">|</span>}
    </div>
  );
}
