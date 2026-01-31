import React from 'react';
import Card from '../components/Card';
import '../styles/Experience.css';

const Experience = () => {
  const workExperience = [
    {
      id: 1,
      position: 'Software Engineering Intern',
      company: 'SRIYOG Consulting',
      duration: 'June 2023 - August 2023',
      type: 'Internship',
      description: 'Worked on developing and maintaining web applications, collaborating with cross-functional teams to deliver high-quality software solutions.',
      responsibilities: [
        'Developed responsive web applications using React and modern JavaScript',
        'Collaborated with senior developers on full-stack projects',
        'Implemented RESTful APIs and integrated third-party services',
        'Participated in code reviews and agile development processes',
        'Fixed bugs and optimized application performance',
        'Wrote clean, maintainable, and well-documented code'
      ],
      technologies: ['React', 'Node.js', 'JavaScript', 'Git', 'REST APIs', 'Agile']
    },
    {
      id: 2,
      position: 'Freelance Web Developer',
      company: 'Self-Employed',
      duration: '2022 - Present',
      type: 'Freelance',
      description: 'Creating custom web solutions for clients, from concept to deployment. Specialized in full-stack development and modern UI/UX design.',
      responsibilities: [
        'Built custom websites and web applications for various clients',
        'Provided end-to-end solutions from design to deployment',
        'Implemented responsive designs and modern UI/UX principles',
        'Integrated APIs and third-party services',
        'Delivered projects on time with excellent client satisfaction',
        'Maintained and updated existing client websites'
      ],
      technologies: ['React', 'Node.js', 'Python', 'MongoDB', 'UI/UX Design', 'Deployment']
    }
  ];

  const education = [
    {
      id: 1,
      degree: 'Bachelor in Computer Science and Information Technology',
      institution: 'Tribhuvan University',
      duration: '2020 - 2024',
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
    { name: 'Full Stack Web Development', provider: 'Online Platform', year: '2023' },
    { name: 'React - The Complete Guide', provider: 'Udemy', year: '2023' },
    { name: 'Data Science & Machine Learning', provider: 'Coursera', year: '2023' }
  ];

  return (
    <div className="experience-page">
      <div className="experience-container">
        <h1 className="section-title">Experience</h1>

        <div className="experience-section">
          <h2 className="subsection-title">
            <span className="section-icon">💼</span>
            Work Experience
          </h2>
          
          <div className="experience-timeline">
            {workExperience.map((job, index) => (
              <Card key={job.id} className="experience-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="experience-header">
                  <div className="experience-main-info">
                    <h3 className="position">{job.position}</h3>
                    <h4 className="company">{job.company}</h4>
                  </div>
                  <div className="experience-meta">
                    <span className="duration">{job.duration}</span>
                    <span className="job-type">{job.type}</span>
                  </div>
                </div>

                <p className="experience-description">{job.description}</p>

                <div className="responsibilities">
                  <h5>Key Responsibilities:</h5>
                  <ul>
                    {job.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="technologies-used">
                  <h5>Technologies Used:</h5>
                  <div className="tech-tags">
                    {job.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="education-section">
          <h2 className="subsection-title">
            <span className="section-icon">🎓</span>
            Education
          </h2>
          
          <div className="education-timeline">
            {education.map((edu, index) => (
              <Card key={edu.id} className="education-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="education-header">
                  <h3 className="degree">{edu.degree}</h3>
                  <span className="duration">{edu.duration}</span>
                </div>
                <h4 className="institution">{edu.institution}</h4>
                <p className="education-description">{edu.description}</p>

                <div className="achievements">
                  <h5>Achievements:</h5>
                  <ul>
                    {edu.achievements.map((achievement, idx) => (
                      <li key={idx}>{achievement}</li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="certifications-section">
          <h2 className="subsection-title">
            <span className="section-icon">📜</span>
            Certifications
          </h2>
          
          <Card className="certifications-card">
            <div className="certifications-grid">
              {certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="certification-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="cert-icon">🏆</div>
                  <div className="cert-info">
                    <h4>{cert.name}</h4>
                    <p>{cert.provider}</p>
                    <span className="cert-year">{cert.year}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="achievements-section">
          <Card className="achievements-banner">
            <h3>Quick Stats</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">10+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10+</span>
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
    </div>
  );
};

export default Experience;