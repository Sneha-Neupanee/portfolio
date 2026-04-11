import React from 'react';
import Card from '../components/Card';
import '../styles/About.css';
import heySvg from '../assets/hey.svg';

const About = () => {
  const hobbies = [
    { name: 'Gym',      icon: '💪', description: 'Staying fit and strong'    },
    { name: 'Gaming',   icon: '🎮', description: 'Conquering virtual worlds' },
    { name: 'Coding',   icon: '💻', description: 'Building cool stuff'       },
    { name: 'Painting', icon: '🎨', description: 'Creating art'              },
    { name: 'Poetry',   icon: '📝', description: 'Writing my thoughts'       },
  ];

  const timeline = [
    {
      title: 'Started Coding',
      desc:  'Fell in love with programming and decided to pursue it seriously.',
    },
    {
      title: 'First Projects',
      desc:  'Built my first full-stack applications and discovered my passion for web development.',
    },
    {
      title: 'Software Engineering Intern',
      desc:  'Gained real-world experience at SRIYOG Consulting.',
    },
    {
      title: 'Worked at Companies',
      desc:  'Collaborated with professional teams, delivering production-grade solutions and growing as a developer.',
    },
    {
      title: 'Current Day',
      desc:  'Continuously learning, building, and creating amazing web experiences.',
    },
  ];

  const handleRickroll = () => {
    window.open(
      'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=RDdQw4w9WgXcQ&start_radio=1',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="section-title">About Me</h1>

        <div className="about-content">

          {/* ── INTRO ── */}
          <div className="about-intro">
            <div className="intro-with-image">
              <div className="about-image">
                <img src="/profile.jpg" alt="Sneha Neupane" />
              </div>
              <div className="intro-text">
                <img src={heySvg} alt="Hey" className="hey-svg" />
                <p>
                  I am Sneha Neupane, a Full Stack Developer specializing in React, Node.js, and Python.
                  I build scalable, high-performance web applications with a focus on clean code and exceptional user experience.
                </p>
                <p>
                  With a strong foundation in modern web technologies and a problem-solving mindset,
                  I turn complex requirements into seamless digital solutions.
                  Ready to bring your ideas to life? Let's build something amazing together.
                </p>
              </div>
            </div>
          </div>

          {/* ── HOBBIES ── */}
          <div className="hobbies-section">
            <h2 className="subsection-title">What I Love Doing</h2>
            <div className="hobbies-grid">
              {hobbies.map((hobby, index) => (
                <Card key={index} className="hobby-card">
                  <div className="hobby-icon">{hobby.icon}</div>
                  <h3>{hobby.name}</h3>
                  <p>{hobby.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* ── JOURNEY ── */}
          <div className="journey-section">
            <h2 className="subsection-title">My Journey</h2>
            <div className="journey__card">
              <div className="journey__timeline">
                {timeline.map((item, index) => (
                  <div className="journey__item" key={index}>
                    <div className="journey__dot" />
                    <div className="journey__content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── SEE MORE BUTTON ── */}
          <div className="about-cta">
            {/* Arrow SVG points toward the button from the right side, slightly above */}
            <div className="cta-wrapper">
              <button className="see-more-btn" onClick={handleRickroll}>
                See More About Me
              </button>
              <img
                src="/arrow.svg"
                alt=""
                aria-hidden="true"
                className="cta-arrow"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;