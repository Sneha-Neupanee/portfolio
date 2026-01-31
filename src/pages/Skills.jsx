import React from 'react';
import Card from '../components/Card';
import '../styles/Skills.css';

const Skills = () => {
  const skillCategories = [
    {
      category: 'Frontend',
      icon: '🎨',
      skills: [
        { name: 'React', level: 90 },
        { name: 'JavaScript', level: 85 },
        { name: 'HTML5', level: 95 },
        { name: 'CSS3', level: 90 },
        { name: 'Tailwind CSS', level: 85 },
        { name: 'Bootstrap', level: 80 },
        { name: 'UI/UX Design', level: 88 }
      ]
    },
    {
      category: 'Backend',
      icon: '⚙️',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express', level: 80 },
        { name: 'Python', level: 85 },
        { name: 'Django', level: 75 },
        { name: 'FastAPI', level: 80 },
        { name: 'MongoDB', level: 75 },
        { name: 'PostgreSQL', level: 70 },
        { name: 'REST APIs', level: 85 },
        { name: 'JWT Auth', level: 80 }
      ]
    },
    {
      category: 'Tools & Others',
      icon: '🛠️',
      skills: [
        { name: 'Git & GitHub', level: 90 },
        { name: 'VS Code', level: 95 },
        { name: 'Postman', level: 85 },
        { name: 'npm/yarn', level: 85 },
        { name: 'Figma', level: 75 },
        { name: 'Socket.IO', level: 80 },
        { name: 'Responsive Design', level: 90 }
      ]
    }
  ];

  const additionalSkills = [
    'Problem Solving',
    'Team Collaboration',
    'Agile/Scrum',
    'UI/UX Design',
    'Debugging',
    'Code Review',
    'Time Management',
    'Communication'
  ];

  return (
    <div className="skills-page">
      <div className="skills-container">
        <h1 className="section-title">My Skills</h1>
        <p className="skills-intro">
          These are the technologies and tools I work with to bring ideas to life. 
          Always learning, always growing! 🚀
        </p>

        <div className="skills-categories">
          {skillCategories.map((category, index) => (
            <Card key={index} className="category-card" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h2 className="category-title">{category.category}</h2>
              </div>
              
              <div className="skills-list">
                {category.skills.map((skill, idx) => (
                  <div key={idx} className="skill-item">
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ 
                          width: `${skill.level}%`,
                          animationDelay: `${(index * 0.2) + (idx * 0.1)}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        <div className="additional-skills-section">
          <h2 className="subsection-title">Soft Skills & More</h2>
          <Card className="additional-skills-card">
            <div className="additional-skills-grid">
              {additionalSkills.map((skill, index) => (
                <div 
                  key={index} 
                  className="additional-skill-badge"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="learning-section">
          <Card className="learning-card">
            <h3>🌱 Currently Learning</h3>
            <div className="learning-items">
              <span className="learning-badge">TypeScript</span>
              <span className="learning-badge">Next.js</span>
              <span className="learning-badge">Docker</span>
              <span className="learning-badge">GraphQL</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Skills;