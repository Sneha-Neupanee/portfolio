import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import '../styles/Projects.css';

const Projects = () => {
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
      title: 'Professional Service Platform',
      description: 'A stunning, pixel-perfect service platform showcasing exceptional UI/UX design principles. Features smooth animations, responsive layouts across all devices, modern glassmorphism effects, and meticulous attention to detail in every component. Demonstrates mastery of professional frontend development and design aesthetics.',
      image: '/tackles.png',
      techStack: ['React', 'CSS3', 'JavaScript', 'Responsive Design', 'Modern UI/UX'],
      liveLink: 'https://handyman-website-iota.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/HandymanWebsite',
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
                    e.target.src = 'https://via.placeholder.com/400x250/FFB6C1/FFFFFF?text=Project+Image';
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
                <p className="project-description">{project.description}</p>

                <div className="project-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {project.features.map((feature, idx) => (
                      <li key={idx}>{feature}</li>
                    ))}
                  </ul>
                </div>

                <div className="tech-stack">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                <div className="project-links">
                  <Button href={project.liveLink} variant="primary">
                    🚀 Live Demo
                  </Button>
                  <Button href={project.githubLink} variant="secondary">
                    💻 GitHub Repo
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

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