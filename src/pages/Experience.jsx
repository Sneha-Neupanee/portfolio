import React, { useState } from 'react';
import Card from '../components/Card';
import '../styles/Experience.css';

const TimelineItem = ({ children, index }) => {
  return (
    <div
      className="timeline-item timeline-item--visible"
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      {children}
    </div>
  );
};

const Experience = () => {
  const [certModal, setCertModal] = useState(null);

  const workExperience = [
    {
      id: 1,
      position: 'Full Stack Developer',
      company: 'SRIYOG Consulting',
      duration: '',
      type: 'Full-time',
      description: 'Developed and maintained full-stack web applications, collaborating with cross-functional teams to deliver high-quality software solutions.',
      technologies: ['React', 'Node.js', 'JavaScript', 'Git', 'REST APIs', 'Agile'],
      certificate: { file: '/abc.jpg', type: 'image', name: 'Full Stack Developer', provider: 'SRIYOG Consulting', year: '2024' }
    },
    {
      id: 2,
      position: 'MERN Stack Developer',
      company: 'SCODUS Innovations',
      duration: 'December 2025 - March 2026',
      type: 'Full-time',
      description: 'Worked as a MERN Stack Developer building scalable web applications and contributing to innovative digital solutions.',
      technologies: ['MongoDB', 'Express', 'React', 'Node.js', 'JavaScript', 'Git'],
      certificate: { file: '/abcd.pdf', type: 'pdf', name: 'MERN Stack Developer', provider: 'SCODUS Innovations', year: '2025' }
    },
    {
      id: 3,
      position: 'Freelance Web Developer',
      company: 'Self-Employed',
      duration: '2022 - Present',
      type: 'Freelance',
      description: 'Creating custom web solutions for clients, from concept to deployment. Specialized in full-stack development and modern UI/UX design.',
      technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'UI/UX Design', 'Deployment'],
      certificate: null
    },
    {
      id: 4,
      position: 'Doomscroller',
      company: 'Instagram, TikTok & Reddit',
      duration: '6/7 - Tung Tung Tung Sahur',
      type: 'Part-Time',
      description: 'Achieved an uncanny mastery of internet culture through relentless, dedicated research. A walking encyclopedia of niche meme references, ironic lore, and obscure online moments that most humans would need a 3-hour explainer thread to understand.',
      technologies: ['Brainrot', 'Sigma Mindset', 'Deep Lore', 'Irony Poisoning', 'Scroll Velocity', 'Peak Comedy'],
      certificate: null,
      funny: true
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Bachelor in Computer Science and Information Technology',
      institution: 'Tribhuvan University',
      duration: '2022 - 2026',
      description: 'Focused on software engineering, web development, algorithms, and data structures with hands-on projects.',
      achievements: [
        'Maintained strong academic performance throughout the program',
        'Completed multiple full-stack web development projects',
        'Participated in hackathons and coding competitions',
        'Active member of university coding clubs and tech communities'
      ]
    }
  ];

  const certifications = [
    { name: 'Full Stack Web Developer', provider: 'SRIYOG Consulting', year: '2024', file: '/abc.jpg', type: 'image' },
    { name: 'MERN Stack Developer', provider: 'SCODUS Innovations', year: '2025', file: '/abcd.pdf', type: 'pdf' },
    { name: 'React - The Complete Guide', provider: 'Udemy', year: '2023', file: null, type: null },
    { name: 'Data Science & Machine Learning', provider: 'Coursera', year: '2023', file: null, type: null }
  ];

  return (
    <div className="experience-page">
      <div className="experience-container">
        <h1 className="section-title">Experience</h1>

        {/* Work Experience */}
        <div className="experience-section">
          <h2 className="subsection-title">
            <span className="section-icon">&#9670;</span>
            Work Experience
          </h2>

          <div className="experience-timeline">
            {workExperience.map((job, index) => (
              <TimelineItem key={job.id} index={index}>
                <div className={`experience-card ${job.funny ? 'experience-card--funny' : ''}`}>
                  <span className="timeline-dot" aria-hidden="true" />

                  <div className="exp-inner">
                    <div className="exp-header">
                      <div className="exp-header-left">
                        <h3 className="position">{job.position}</h3>
                        <h4 className="company">{job.company}</h4>
                      </div>
                      <div className="exp-header-right">
                        <span className="duration-badge">{job.duration}</span>
                        <span className={`type-badge ${job.funny ? 'type-badge--funny' : ''}`}>{job.type}</span>
                      </div>
                    </div>

                    <p className="exp-description">{job.description}</p>

                    <div className="exp-block">
                      <h5 className="exp-block-title">
                        {job.funny ? 'Tech Stack' : 'Technologies Used'}
                      </h5>
                      <div className="tech-tags">
                        {job.technologies.map((tech, idx) => (
                          <span key={idx} className={`tech-tag ${job.funny ? 'tech-tag--funny' : ''}`}>{tech}</span>
                        ))}
                      </div>
                    </div>

                    {job.certificate && (
                      <div className="exp-cert-row">
                        <button
                          className="cert-view-btn cert-view-btn--card"
                          onClick={() => setCertModal(job.certificate)}
                        >
                          <span className="cert-btn-icon">&#9670;</span>
                          View Certificate
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </TimelineItem>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="education-section">
          <h2 className="subsection-title">
            <span className="section-icon">&#9675;</span>
            Education
          </h2>

          <div className="education-timeline">
            {education.map((edu, index) => (
              <TimelineItem key={edu.id} index={index}>
                <Card className="education-card">
                  <div className="education-header">
                    <h3 className="degree">{edu.degree}</h3>
                    <span className="duration-badge">{edu.duration}</span>
                  </div>
                  <h4 className="institution">{edu.institution}</h4>
                  <p className="exp-description">{edu.description}</p>
                  <div className="exp-block">
                    <h5 className="exp-block-title">Achievements</h5>
                    <ul className="resp-list">
                      {edu.achievements.map((a, idx) => (
                        <li key={idx}>{a}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              </TimelineItem>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="certifications-section">
          <h2 className="subsection-title">
            <span className="section-icon">&#9733;</span>
            Certifications
          </h2>

          <Card className="certifications-card">
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div key={index} className="certification-item" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="cert-icon-mark">&#9670;</div>
                  <div className="cert-info">
                    <h4>{cert.name}</h4>
                    <p>{cert.provider}</p>
                    <span className="cert-year">{cert.year}</span>
                    {cert.file && (
                      <button className="cert-view-btn" onClick={() => setCertModal(cert)}>
                        View Certificate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="achievements-section">
          <Card className="achievements-banner">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">30+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">20+</span>
                <span className="stat-label">Technologies Mastered</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Passion for Coding</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Certificate Modal */}
      {certModal && (
        <div className="cert-modal-overlay" onClick={() => setCertModal(null)}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setCertModal(null)} aria-label="Close">
              &#10005;
            </button>
            <h3 className="cert-modal-title">{certModal.name}</h3>
            <p className="cert-modal-provider">{certModal.provider} &middot; {certModal.year}</p>
            {certModal.type === 'image' ? (
              <img src={certModal.file} alt={`${certModal.name} certificate`} className="cert-modal-img" />
            ) : (
              <iframe src={certModal.file} title={`${certModal.name} certificate`} className="cert-modal-pdf" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;