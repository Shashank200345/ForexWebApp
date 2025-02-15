import React, { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  delayBeforeRestart?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ 
  text, 
  speed = 100,
  className = "",
  delayBeforeRestart = 2000
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (!isDeleting && currentIndex < text.length) {
      // Typing
      timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (!isDeleting && currentIndex >= text.length) {
      // Wait before starting to delete
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, delayBeforeRestart);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      timeout = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, speed / 2);
    } else if (isDeleting && displayText.length === 0) {
      // Reset to start typing again
      setIsDeleting(false);
      setCurrentIndex(0);
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, isDeleting, displayText.length, delayBeforeRestart]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-cursor inline-block w-[2px] h-[1.2em] ml-1 align-middle bg-current">
        &nbsp;
      </span>
    </span>
  );
};

export default TypewriterText; 