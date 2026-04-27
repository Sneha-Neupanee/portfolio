import React, { useState } from 'react';
import '../styles/Projects.css';

const Projects = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const projects = [
    {
      id: 1,
      title: 'Aura Hub',
      subtitle: 'Smart Inventory Intelligence System',
      description: 'A production-grade SaaS application for managing and gaining insight into personal assets and inventory. Built with a modular Django REST Framework backend featuring JWT authentication, an append-only audit trail, soft deletion, and UUID primary keys, all orchestrated with Docker Compose for seamless local development and deployment.',
      image: '/aura.png',
      techStack: ['React', 'TailwindCSS', 'Django REST Framework', 'PostgreSQL', 'Docker', 'JWT', 'Python'],
      githubLink: 'https://github.com/Sneha-Neupanee/AURA-HUB---Smart-Personal-Inventory-Intelligence-System',
      hasLive: false,
      type: 'Full Stack',
      features: ['Append-Only Audit Trail', 'Soft Deletion System', 'UUID Primary Keys', 'Dockerized Architecture']
    },
    {
      id: 2,
      title: 'SmartSales AI Assistant',
      subtitle: 'AI-Powered Sales Analytics Platform',
      description: 'An intelligent sales analytics platform powered by machine learning. Features predictive analytics with TensorFlow, natural language query processing, OpenAI-powered insights, and a real-time dashboard. The Python FastAPI backend is fully built with trained ML models ready for end-to-end deployment.',
      image: '/smart.png',
      techStack: ['React', 'Python', 'FastAPI', 'TensorFlow', 'OpenAI API', 'Pandas', 'Machine Learning'],
      githubLink: 'https://github.com/Sneha-Neupanee/SmartSales-with-AI-Assistant',
      hasLive: false,
      type: 'Full Stack',
      features: ['AI-Powered Insights', 'ML Sales Forecasting', 'Natural Language Queries', 'Real-time Analytics Dashboard']
    },
    {
      id: 3,
      title: 'TaskFlow',
      subtitle: 'Async Job Processing Platform',
      description: 'A production-style job processing engine built with a fully decoupled architecture. An Express API ingests job requests, BullMQ and Redis handle queue management, a dedicated Node.js worker processes jobs asynchronously, and Socket.IO delivers real-time status updates back to the client, all containerized with Docker.',
      image: '/taskflow.png',
      techStack: ['Next.js', 'Node.js', 'Express', 'Redis', 'BullMQ', 'MongoDB', 'Socket.IO', 'Docker'],
      githubLink: 'https://github.com/Sneha-Neupanee/TaskFlow---Async-Processing-Platform',
      hasLive: false,
      type: 'Full Stack',
      features: ['Async Job Queue with BullMQ', 'Real-time Updates via Socket.IO', 'Decoupled Worker Architecture', 'Dockerized Full-Stack Setup']
    },
    {
      id: 4,
      title: 'K Handyman',
      subtitle: 'Full-Stack Service Marketplace',
      description: 'A full-stack MERN marketplace connecting homeowners with skilled handymen across Kathmandu. Built with real-time chat via Socket.IO, intelligent provider matching using Bayesian ranking, interactive Leaflet maps for live location tracking, and a complete service lifecycle from booking to payment.',
      image: '/k-handyman.png',
      techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Leaflet', 'JWT', 'Multer'],
      liveLink: 'https://mernhandymanfinal.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/mernhandymanfinal',
      hasLive: true,
      type: 'Full Stack',
      features: ['Real-time Chat System', 'Bayesian Ranking Algorithm', 'Interactive Maps and Distance Tracking', 'Complete Service Management']
    },
    {
      id: 5,
      title: 'Kathmandu School Intelligence Dashboard',
      subtitle: 'Spatial Analytics and GIS Platform',
      description: 'An interactive geographic information system for exploring educational institutions across the Kathmandu Valley. Renders thousands of school markers with dynamic clustering, density heatmaps, geolocation-based radius analysis, and a synchronized analytics dashboard powered by MapLibre GL and OpenStreetMap data.',
      image: '/kathmandu.png',
      techStack: ['React 19', 'Vite', 'MapLibre GL JS', 'Recharts', 'TailwindCSS', 'Overpass API', 'Supercluster'],
      liveLink: 'https://kathmandu-school-map.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/Kathmandu-School-Map',
      hasLive: true,
      type: 'Frontend',
      features: ['Interactive Map with Clustering', 'Density Heatmap Overlay', 'Geolocation Radius Analysis', 'Real-time Filtering and Analytics']
    },
    {
      id: 6,
      title: 'Tackles',
      subtitle: 'Professional Service Platform',
      description: 'A polished, pixel-perfect service platform showcasing strong UI and UX principles. Features smooth animations, fully responsive layouts, modern glassmorphism effects, and meticulous attention to every design detail. A demonstration of professional frontend craftsmanship and design thinking.',
      image: '/tackles.png',
      techStack: ['React', 'CSS3', 'JavaScript', 'Responsive Design', 'Modern UI/UX'],
      liveLink: 'https://myhandymanfolder.vercel.app/',
      githubLink: 'https://github.com/Sneha-Neupanee/myhandymanfolder',
      hasLive: true,
      type: 'Frontend',
      features: ['Professional UI/UX Design', 'Smooth Animations and Transitions', 'Pixel-Perfect Implementation', 'Fully Responsive Design']
    }
  ];

  return (
    <div className="projects-page">
      <div className="projects-container">
        <h1 className="section-title">My Projects</h1>
        <p className="projects-intro">
          A collection of work spanning full-stack development, AI and machine learning, spatial analytics,
          and professional UI design. Each project reflects a different facet of my technical range.
        </p>

        <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="project-card"
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              {/* Left: Image */}
              <div className="project-card-image">
                <img
                  src={project.image}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/480x300/fdf0f4/c2768a?text=${encodeURIComponent(project.title)}`;
                  }}
                />
                <span className="project-type-badge">{project.type}</span>
              </div>

              {/* Right: Content */}
              <div className="project-card-content">
                <div className="project-number-row">
                  <span className="project-number">0{index + 1}</span>
                </div>

                <h2 className="project-title">{project.title}</h2>
                <p className="project-subtitle">{project.subtitle}</p>

                <div className="tech-stack">
                  {project.techStack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>

                {expanded[project.id] && (
                  <div className="project-details">
                    <p className="project-description">{project.description}</p>
                    <div className="project-features">
                      <p className="features-label">Key Features</p>
                      <ul>
                        {project.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="project-card-footer">
                  <button
                    className="view-more-btn"
                    onClick={() => toggleExpand(project.id)}
                  >
                    {expanded[project.id] ? 'Show Less' : 'Learn More'}
                    <span className={`chevron ${expanded[project.id] ? 'up' : ''}`}>&#8250;</span>
                  </button>

                  <div className="project-links">
                    {project.hasLive && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-live">
                        Live Demo
                      </a>
                    )}
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-github">
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study */}
        <div className="extra-section">
          <h2 className="extra-section-heading">Case Study</h2>
          <div className="case-study-card">
            <div className="cs-image-panel">
              <img
                src="/k-handyman.png"
                alt="K Handyman Case Study"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/480x300/fdf0f4/c2768a?text=K+Handyman';
                }}
              />
              <span className="cs-image-badge">Featured</span>
            </div>
            <div className="cs-content">
              <span className="cs-tag">In-depth Analysis</span>
              <h3 className="cs-title">K Handyman: From Idea to Product</h3>
              <p className="cs-desc">
                A detailed look into the product design process, architectural decisions, and engineering
                challenges behind building a real-time service marketplace. Covers user research, system
                design, algorithm choices, and key lessons from the development lifecycle.
              </p>
              <div className="cs-pills">
                <span className="cs-pill">System Architecture</span>
                <span className="cs-pill">Bayesian Ranking</span>
                <span className="cs-pill">Real-time Communication</span>
                <span className="cs-pill">UX Research</span>
              </div>
              <div className="cs-stats-row">
                <div className="cs-stat"><span className="cs-stat-val">MERN</span><span className="cs-stat-label">Stack</span></div>
                <div className="cs-stat"><span className="cs-stat-val">Live</span><span className="cs-stat-label">Chat</span></div>
                <div className="cs-stat"><span className="cs-stat-val">Maps</span><span className="cs-stat-label">Leaflet</span></div>
                <div className="cs-stat"><span className="cs-stat-val">JWT</span><span className="cs-stat-label">Auth</span></div>
              </div>
              <a href="/casestudy.pdf" target="_blank" rel="noopener noreferrer" className="cs-btn">
                View Case Study Document
              </a>
            </div>
          </div>
        </div>

        {/* Currently Building */}
        <div className="extra-section">
          <h2 className="extra-section-heading">Currently Building</h2>
          <div className="building-card">
            <div className="building-left">
              <div className="building-status-row">
                <span className="pulse-dot"></span>
                <span className="building-status-text">In Progress</span>
              </div>
              <h3 className="building-title">Fine-tuned AI Chatbot</h3>
              <p className="building-desc">
                Working on a domain-specific AI chatbot with custom fine-tuning on curated datasets.
                The goal is a conversational assistant that responds with contextual depth and precision,
                moving beyond generic model outputs to deliver genuinely useful, specialized interactions.
              </p>
              <div className="building-stack">
                {['Python', 'Hugging Face', 'PyTorch', 'LangChain', 'FastAPI'].map((t, i) => (
                  <span key={i} className="tech-badge">{t}</span>
                ))}
              </div>
            </div>
            <div className="building-right">
              <p className="progress-heading">Progress</p>
              <div className="building-progress">
                <div className="progress-item done"><span className="pi-check">&#10003;</span><span>Dataset curation complete</span></div>
                <div className="progress-item done"><span className="pi-check">&#10003;</span><span>Base model selected</span></div>
                <div className="progress-item done"><span className="pi-check">&#10003;</span><span>Fine-tuning pipeline built</span></div>
                <div className="progress-item active"><span className="pi-spin">&#9711;</span><span>Training and evaluation</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub CTA */}
        <div className="github-cta-section">
          <div className="github-cta">
            <h3>Want to see more?</h3>
            <p>Browse my GitHub for additional projects, experiments, and open source contributions.</p>
            <a href="https://github.com/Sneha-Neupanee" target="_blank" rel="noopener noreferrer" className="btn-live">
              Visit My GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;