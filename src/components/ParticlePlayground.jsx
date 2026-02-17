import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ParticlePlayground.css';

const ParticlePlayground = () => {
  const [visible, setVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Projects I Have Worked On";
  const [typingStarted, setTypingStarted] = useState(false);
  const navigate = useNavigate();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !typingStarted) {
          setTypingStarted(true);
          setVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [typingStarted]);

  useEffect(() => {
    if (typingStarted && typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 50); // Adjust speed here for smoothness
      return () => clearTimeout(timeout);
    }
  }, [typingStarted, typedText, fullText]);

  const projects = [
    {
      id: 1,
      name: "Dr. Priyanka's Clinic",
      image: "/drpriyanka.png",
      link: "https://drpriyankasclinic.com/",
      description: "A comprehensive website for a medical clinic."
    },
    {
      id: 2,
      name: "SRIYOG Consulting",
      image: "/sriyog.png",
      link: "https://sriyog.com/",
      description: "Corporate website for a leading consulting firm."
    },
    {
      id: 3,
      name: "TACKLES",
      image: "/handyman.png",
      link: "https://myhandymanfolder.vercel.app/",
      description: "Service booking platform for home maintenance."
    }
  ];

  return (
    <div className="project-showcase-container" ref={sectionRef}>
      <div className="project-header">
        <h3 className="typing-title">
          {typedText}
          <span className="cursor-blink">|</span>
        </h3>
      </div>

      <div className="project-cards-wrapper">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 150}ms` }}
          >
            <div className="card-image-container">
              <img src={project.image} alt={project.name} className="project-image" />
            </div>
            <div className="card-info">
              <h4>{project.name}</h4>
              <div className="card-buttons">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-btn">
                  View Project
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="skills-button-container">
        <button className="view-skills-btn" onClick={() => navigate('/projects')}>
          View More Projects
        </button>
        <button className="view-skills-btn" onClick={() => navigate('/skills')}>
          View My Skills
        </button>
      </div>
    </div>
  );
};

export default ParticlePlayground;