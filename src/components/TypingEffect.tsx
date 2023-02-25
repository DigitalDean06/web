import { useEffect, useState } from "react";

interface Props {
  text: string[];
  typingSpeed: number;
  erasingSpeed: number;
  delay: number;
}

export default function TypingEffect({
  text,
  typingSpeed,
  erasingSpeed,
  delay,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [erase, setErase] = useState(false);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const nextIndex = () => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % text.length);
      setErase(false);
    };

    let timeout: null | NodeJS.Timeout = null;
    const interval = setInterval(
      () => {
        if (erase) {
          if (currentText.length === 0) {
            nextIndex();
          } else {
            setCurrentText((current) => current.slice(0, current.length - 1));
          }
        } else {
          if (currentText.length === text[currentIndex].length) {
            if (!timeout)
              timeout = setTimeout(() => {
                setErase(true);
              }, delay);
          } else {
            setCurrentText(
              (current) => current + text[currentIndex][current.length]
            );
          }
        }
      },
      erase ? erasingSpeed : typingSpeed
    );

    return () => {
      clearInterval(interval);
      if (timeout) clearTimeout(timeout);
    };
  }, [
    currentIndex,
    currentText.length,
    delay,
    erase,
    typingSpeed,
    text,
    erasingSpeed,
  ]);

  return <span>{currentText}</span>;
}
