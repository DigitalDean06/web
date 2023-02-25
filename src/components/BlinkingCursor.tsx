import { useEffect, useState } from "react";

export default function BlinkingCursor() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setShow((show) => !show), 1000);
    return () => clearInterval(interval);
  });

  return (
    <span
      className={`text-black ${
        show ? "opacity-100" : "opacity-0"
      } transition-all`}
    >
      |
    </span>
  );
}
