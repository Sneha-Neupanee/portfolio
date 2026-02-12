import React, { useEffect, useState } from 'react';
import '../styles/ParticlePlayground.css';

const ParticlePlayground = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      link: "https://handyman-website-iota.vercel.app/",
      description: "Service booking platform for home maintenance."
    }
  ];

  return (
    <div className="project-showcase-container">
      <div className="project-header">
        <h3>Projects I have worked on</h3>
      </div>

      <div className="project-cards-wrapper">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className={`project-card ${visible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 200}ms` }}
          >
            <div className="card-image-container">
              <img src={project.image} alt={project.name} className="project-image" />
            </div>
            <div className="card-info">
              <h4>{project.name}</h4>
              <div className="card-line"></div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="view-project-btn">
                View Project
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticlePlayground;