import React from 'react';
import '../styles/Skills.css';
import frontendSvg from '../assets/frontend.svg';
import backendSvg from '../assets/backend.svg';
import creativeSvg from '../assets/creative.svg';
import aiSvg from '../assets/ai.svg';

const Skills = () => {
  return (
    <div className="skills-page">
      <div className="skills-wrap">

        <div className="top-bar">
          <span className="pg-title">Skills</span>
          <span className="pg-sub">What I bring to the table</span>
        </div>

        <div className="bento">

          <div className="card span8">
            <img src={frontendSvg} alt="Frontend" className="skill-svg frontend" />
            <h3 className="ctitle">Interfaces & Web</h3>
            <div className="chips">
              {['React','Next.js','JavaScript','TypeScript','Three.js','HTML5','CSS3','Tailwind CSS','Alpine.js','UI/UX Design','Responsive Design'].map(s => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <div className="card span4 pink-bg stat-card">
            <span className="clabel">Experience</span>
            <div className="stat-num">4+</div>
            <div className="stat-label">years building on the web</div>
          </div>

          <div className="card span5">
            <img src={backendSvg} alt="Backend" className="skill-svg backend" />
            <h3 className="ctitle">Server & Data</h3>
            <div className="chips">
              {['Node.js','Express','Python','FastAPI','Django','Laravel','PHP','MongoDB','MySQL', 'Docker','REST APIs','Socket.IO','Sanctum','Blade'].map(s => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <div className="card span4 light-rose">
            <img src={creativeSvg} alt="3D & Creative" className="skill-svg creative" />
            <h3 className="ctitle rose">Modeling & Motion</h3>
            <div className="chips">
              {['Blender','3D Modeling','Animation','Motion Graphics','Rigging','After Effects'].map(s => (
                <span key={s} className="chip on-rose">{s}</span>
              ))}
            </div>
          </div>

          <div className="card span3 dark-pink stat-card">
            <span className="clabel white">Stack depth</span>
            <div className="stat-num white">30+</div>
            <div className="stat-label white">tools & technologies</div>
          </div>

          <div className="card span4">
            <img src={aiSvg} alt="AI/ML" className="skill-svg ai" />
            <h3 className="ctitle">Intelligence & Data</h3>
            <div className="chips">
              {['Machine Learning','TensorFlow','OpenAI API','Data Analysis','Figma','Git & GitHub'].map(s => (
                <span key={s} className="chip">{s}</span>
              ))}
            </div>
          </div>

          <div className="card span5 pink-bg">
            <span className="clabel">Human Side</span>
            <h3 className="ctitle">Soft Skills</h3>
            <div className="chips">
              {['Problem Solving','Collaboration','Agile / Scrum','Code Review','Communication','Documentation'].map(s => (
                <span key={s} className="chip on-pink">{s}</span>
              ))}
            </div>
          </div>

          <div className="card span3 learning-card">
            <span className="clabel">Currently learning</span>
            <div className="chips">
              {['DevOps','GraphQL','AWS'].map(s => (
                <span key={s} className="chip outlined">{s}</span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Skills;