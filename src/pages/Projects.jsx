import React, { useState } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/Projects.css';

const Projects = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const projects = [
    {
      id: 1,
      title: 'K Handyman',
      description: 'A comprehensive full-stack MERN marketplace connecting homeowners with skilled handymen in Kathmandu. Features real-time chat with Socket.IO, intelligent provider matching using Bayesian ranking algorithms, interactive Leaflet maps for location tracking, and complete service lifecycle management from booking to payment.',
      image: '/k-handyman.png',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Leaflet', 'JWT', 'Multer'],
      liveLink: 'https://mernhandymanfinal.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/mernhandymanfinal',
      deployed: 'full-stack',
      features: ['Real-time Chat System', 'Bayesian Ranking Algorithm', 'Interactive Maps & Distance Tracking', 'Complete Service Management']
    },
    {
      id: 2,
      title: 'SmartSales AI Assistant',
      description: 'An intelligent sales analytics platform powered by AI and Machine Learning. Features predictive analytics using TensorFlow, natural language query processing, OpenAI-powered insights, and real-time dashboard analytics. Built with React frontend and Python FastAPI backend with ML models for sales forecasting and trend analysis.',
      image: '/smart.png',
      techStack: ['React', 'Python', 'FastAPI', 'Machine Learning', 'TensorFlow', 'OpenAI API', 'Pandas'],
      liveLink: 'https://smart-sales-with-ai-assistant.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/SmartSales-with-AI-Assistant',
      deployed: 'frontend',
      features: ['AI-Powered Insights', 'ML Sales Predictions', 'Natural Language Queries', 'Real-time Analytics Dashboard']
    },
    {
      id: 3,
      title: 'TACKLES - Professional Service Platform',
      description: 'A stunning, pixel-perfect service platform showcasing exceptional UI/UX design principles. Features smooth animations, responsive layouts across all devices, modern glassmorphism effects, and meticulous attention to detail in every component. Demonstrates mastery of professional frontend development and design aesthetics.',
      image: '/tackles.png',
      techStack: ['React', 'CSS3', 'JavaScript', 'Responsive Design', 'Modern UI/UX'],
      liveLink: 'https://myhandymanfolder.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/myhandymanfolder',
      deployed: 'frontend',
      features: ['Professional UI/UX Design', 'Smooth Animations & Transitions', 'Pixel-Perfect Implementation', 'Fully Responsive Design']
    }
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <h1 className="section-title">My Projects</h1>
        <p className="projects-intro">
          Here are some of my standout projects showcasing full-stack development, AI/ML integration,
          and professional UI/UX design. Each project demonstrates different aspects of my technical expertise.
        </p>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <Card key={project.id} className="project-card" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="project-image">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x250/f5eaf0/b07090?text=Project+Image';
                  }}
                />
                <div className="project-overlay">
                  <span className="deployment-badge">
                    {project.deployed === 'full-stack' ? '⚡ Full Stack' : '🎨 Frontend'}
                  </span>
                </div>
              </div>

              <div className="project-content">
                <h2 className="project-title">{project.title}</h2>

                <div className="tech-stack">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                {expanded[project.id] && (
                  <div className="project-details">
                    <p className="project-description">{project.description}</p>
                    <div className="project-features">
                      <h4>Key Features</h4>
                      <ul>
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <button
                  className="view-more-btn"
                  onClick={() => toggleExpand(project.id)}
                >
                  {expanded[project.id] ? 'View Less' : 'View More'}
                  <span className={`chevron ${expanded[project.id] ? 'up' : ''}`}>›</span>
                </button>

                <div className="project-links">
                  <Button href={project.liveLink} variant="primary">
                    🚀 Live Demo
                  </Button>
                  <Button href={project.githubLink} variant="secondary">
                    💻 GitHub
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Case Study Section */}
        <div className="extra-section">
          <h2 className="extra-section-heading">Case Study</h2>
          <Card className="case-study-card">
            <div className="case-study-inner">
              <div className="case-study-text">
                <span className="cs-tag">In-depth Analysis</span>
                <h3 className="cs-title">K Handyman: From Idea to Product</h3>
                <p className="cs-desc">
                  A deep dive into the product design, architectural decisions, and engineering challenges
                  behind building a real-time service marketplace from scratch. This case study covers
                  user research, system design, algorithm choices, and lessons learned throughout
                  the development lifecycle.
                </p>
                <div className="cs-pills">
                  <span className="cs-pill">System Architecture</span>
                  <span className="cs-pill">Bayesian Ranking</span>
                  <span className="cs-pill">Real-time Communication</span>
                  <span className="cs-pill">UX Research</span>
                </div>
                <a
                  href="/casestudy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cs-btn"
                >
                  📄 View Case Study Document
                </a>
              </div>
              <div className="cs-visual">
                <div className="cs-stat-grid">
                  <div className="cs-stat"><span className="cs-stat-val">MERN</span><span className="cs-stat-label">Stack</span></div>
                  <div className="cs-stat"><span className="cs-stat-val">Live</span><span className="cs-stat-label">Chat</span></div>
                  <div className="cs-stat"><span className="cs-stat-val">Maps</span><span className="cs-stat-label">Leaflet</span></div>
                  <div className="cs-stat"><span className="cs-stat-val">JWT</span><span className="cs-stat-label">Auth</span></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Currently Building Section */}
        <div className="extra-section">
          <h2 className="extra-section-heading">Currently Building</h2>
          <Card className="building-card">
            <div className="building-inner">
              <div className="building-status-row">
                <span className="pulse-dot"></span>
                <span className="building-status-text">In Progress</span>
              </div>
              <h3 className="building-title">SmartSales AI Assistant - Full Deployment</h3>
              <p className="building-desc">
                The backend is fully built with Python FastAPI, TensorFlow models, and OpenAI integration.
                Currently in the process of deploying the complete backend infrastructure so SmartSales
                becomes a fully functional, end-to-end AI-powered sales intelligence platform.
              </p>
              <div className="building-progress">
                <div className="progress-item done"><span className="pi-icon">✓</span><span>React frontend deployed</span></div>
                <div className="progress-item done"><span className="pi-icon">✓</span><span>FastAPI backend complete</span></div>
                <div className="progress-item done"><span className="pi-icon">✓</span><span>ML models trained</span></div>
                <div className="progress-item active"><span className="pi-icon spin">⟳</span><span>Backend deployment</span></div>
              </div>
              <div className="building-stack">
                {['Python', 'FastAPI', 'TensorFlow', 'OpenAI API', 'Vercel'].map((t, i) => (
                  <span key={i} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* GitHub CTA */}
        <div className="more-projects">
          <Card className="github-cta">
            <h3>Want to see more?</h3>
            <p>Check out my GitHub for more projects, contributions, and code samples!</p>
            <Button href="https://github.com/Sneha-Neupanee" variant="primary">
              Visit My GitHub
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;