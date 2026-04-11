import React, { useEffect, useState, useCallback } from 'react';
import '../styles/Intro3D.css';

const Intro3D = ({ onFinish }) => {
  const [hide, setHide] = useState(false);
  const [text, setText] = useState("");

  const fullText = "Ni Hao!";

  const handleFinish = useCallback(() => {
    onFinish();
  }, [onFinish]);

  useEffect(() => {
    // Smooth typing (no pause)
    let index = 0;
    const typing = setInterval(() => {
      index++;
      setText(fullText.slice(0, index));
      if (index >= fullText.length) clearInterval(typing);
    }, 120); // faster & consistent

    // Total intro ~3s, then smooth exit
    const exitTimer = setTimeout(() => setHide(true), 3000);
    const doneTimer = setTimeout(() => handleFinish(), 3600);

    return () => {
      clearInterval(typing);
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [handleFinish]);

  return (
    <div className={`intro-wrapper ${hide ? "intro-hide" : ""}`}>
      
      {/* Image */}
      <img 
        src="/Mew.jpg" 
        alt="intro" 
        className="intro-image"
      />

      {/* Text */}
      <h1 className="intro-text">{text}</h1>

    </div>
  );
};

export default Intro3D;