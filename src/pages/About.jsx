import React from 'react';
import Card from '../components/Card';
import '../styles/About.css';

const About = () => {
  const hobbies = [
    { name: 'Gym', icon: '💪', description: 'Staying fit and strong' },
    { name: 'Gaming', icon: '🎮', description: 'Conquering virtual worlds' },
    { name: 'Coding', icon: '💻', description: 'Building cool stuff' },
    { name: 'Painting', icon: '🎨', description: 'Creating art' },
    { name: 'Poetry', icon: '📝', description: 'Writing my thoughts' }
  ];

  const funFacts = [
    'I can code for hours without realizing time has passed ⏰',
    'Coffee is my debugging fuel ☕',
    'I believe every bug is just a feature in disguise 🐛',
    'I crush gym PRs and coding deadlines equally 💪',
    'My playlists range from lo-fi beats to heavy metal 🎵'
  ];

  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="section-title">About Me</h1>

        <div className="about-content">
          <div className="about-intro">
            <Card>
              <div className="intro-with-image">
                <div className="about-image">
                  <img src="/profile.jpg" alt="Sneha Neupane" />
                </div>
                <div className="intro-text">
                  <h2>Hey there! 👋</h2>
                  <p>
                    I'm Sneha Neupane, a passionate Full Stack Developer who loves turning ideas into 
                    reality through code. My journey in tech started with curiosity and evolved into 
                    a full-blown passion for creating beautiful, functional web applications.
                  </p>
                  <p>
                    When I'm not coding, you'll find me at the gym, gaming, painting, or writing poetry. 
                    I believe in living a balanced life where creativity meets logic, and strength meets 
                    code. My goal? To build applications that not only work flawlessly but also bring 
                    joy to users.
                  </p>
                  <p>
                    I'm a problem solver at heart, constantly learning and experimenting with new 
                    technologies. Whether it's front-end magic with React or back-end wizardry with 
                    Node.js, I'm always up for a challenge!
                  </p>
                </div>
              </div>
            </Card>
          </div>

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

          <div className="fun-facts-section">
            <h2 className="subsection-title">Fun Facts About Me</h2>
            <Card className="fun-facts-card">
              <ul className="facts-list">
                {funFacts.map((fact, index) => (
                  <li key={index} className="fact-item">
                    <span className="fact-bullet">✨</span>
                    {fact}
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <div className="journey-section">
            <h2 className="subsection-title">My Journey</h2>
            <Card className="journey-card">
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Started Coding</h3>
                    <p>Fell in love with programming and decided to pursue it seriously</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>First Projects</h3>
                    <p>Built my first full-stack applications and discovered my passion for web development</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Software Engineering Intern</h3>
                    <p>Gained real-world experience at Strio Consulting</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h3>Current Day</h3>
                    <p>Continuously learning, building, and creating amazing web experiences</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;