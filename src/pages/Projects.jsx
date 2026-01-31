import React from 'react';
import Card from '../components/Card';
import '../styles/Projects.css';

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: 'K Handyman',
      description: 'A comprehensive full-stack MERN application connecting homeowners with skilled handymen in Kathmandu. Features real-time chat, smart provider matching with Bayesian ranking, interactive maps, and complete service management.',
      image: '/k-handyman.png',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Leaflet', 'JWT'],
      liveLink: 'https://mernhandymanfinal.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/mernhandymanfinal',
      deployed: 'full-stack',
      features: ['Real-time Chat', 'Smart Matching Algorithm', 'Interactive Maps', 'Service Management']
    },
    {
      id: 2,
      title: 'Handyman Website (UI Focus)',
      description: 'A beautifully designed handyman service website showcasing professional UI/UX implementation. Clean, modern interface with smooth animations and perfect attention to detail in every component.',
      image: '/taggers.png',
      techStack: ['React', 'CSS3', 'JavaScript', 'Responsive Design'],
      liveLink: 'https://handyman-website-iota.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/HandymanWebsite',
      deployed: 'frontend',
      features: ['Professional UI/UX', 'Smooth Animations', 'Pixel-Perfect Design', 'Fully Responsive']
    },
    {
      id: 3,
      title: 'SmartSales AI Assistant',
      description: 'An AI-powered sales analytics dashboard with intelligent insights, ML-based predictions, and natural language queries. Built with React frontend and Python FastAPI backend featuring OpenAI integration.',
      image: '/smartest-assistance.png',
      techStack: ['React', 'Python', 'FastAPI', 'AI/ML', 'OpenAI API', 'TensorFlow'],
      liveLink: 'https://smart-sales-with-ai-assistant.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/SmartSales-with-AI-Assistant',
      deployed: 'frontend',
      features: ['AI Insights', 'Sales Predictions', 'Natural Queries', 'Analytics Dashboard']
    }
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <h1 className="section-title">My Projects</h1>
        <p className="projects-intro">
          Here are some of my favorite projects I've built. Each one represents a unique challenge 
          and learning experience. Click the buttons to explore them! 🚀
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
                  <a 
                    href={project.liveLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="custom-btn btn-primary"
                  >
                    🚀 Live Demo
                  </a>
                  <a 
                    href={project.githubLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="custom-btn btn-secondary"
                  >
                    💻 GitHub
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="more-projects">
          <Card className="github-cta">
            <h3>Want to see more?</h3>
            <p>Check out my GitHub for more projects and contributions!</p>
            <a 
              href="https://github.com/Sneha-Neupanee" 
              target="_blank" 
              rel="noopener noreferrer"
              className="custom-btn btn-primary"
            >
              Visit My GitHub
            </a>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Projects;