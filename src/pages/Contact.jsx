import React, { useState } from 'react';
import Card from '../components/Card';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setFormStatus('success');
    
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });

    setTimeout(() => {
      setFormStatus('');
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📧',
      title: 'Email',
      value: 'sneha.neupane@example.com',
      link: 'mailto:sneha.neupane@example.com'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      value: 'Connect with me',
      link: 'https://www.linkedin.com/in/sneha-neupane-93b065269/'
    },
    {
      icon: '💻',
      title: 'GitHub',
      value: 'Check my code',
      link: 'https://github.com/Sneha-Neupanee'
    },
    {
      icon: '📍',
      title: 'Location',
      value: 'Kathmandu, Nepal',
      link: null
    }
  ];

  return (
    <div className="contact-page">
      <div className="contact-container">
        <h1 className="section-title">Get In Touch</h1>
        <p className="contact-intro">
          Have a project in mind or just want to say hi? Feel free to reach out! 
          I'm always open to discussing new opportunities and collaborations. 💬
        </p>

        <div className="contact-content">
          <div className="contact-form-section">
            <Card className="contact-form-card">
              <h2>Send me a message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Your Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Your Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject *</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="What's this about?"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell me more..."
                  ></textarea>
                </div>

                <button type="submit" className="custom-btn btn-primary">
                  Send Message 🚀
                </button>

                {formStatus === 'success' && (
                  <div className="form-message success">
                    ✅ Message sent successfully! I'll get back to you soon.
                  </div>
                )}
              </form>
            </Card>
          </div>

          <div className="contact-info-section">
            <Card className="contact-info-card">
              <h2>Contact Information</h2>
              <div className="contact-info-list">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index} 
                    className="contact-info-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-details">
                      <h4>{info.title}</h4>
                      {info.link ? (
                        <a href={info.link} target="_blank" rel="noopener noreferrer">
                          {info.value}
                        </a>
                      ) : (
                        <p>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="social-media-card">
              <h2>Let's Connect!</h2>
              <p>Follow me on social media for updates and cool content!</p>
              <div className="social-buttons">
                <a 
                  href="https://github.com/Sneha-Neupanee" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="custom-btn btn-secondary"
                >
                  GitHub 💻
                </a>
                <a 
                  href="https://www.linkedin.com/in/sneha-neupane-93b065269/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="custom-btn btn-secondary"
                >
                  LinkedIn 💼
                </a>
              </div>
            </Card>

            <Card className="availability-card">
              <h3>💡 Available For</h3>
              <ul className="availability-list">
                <li>Freelance Projects</li>
                <li>Full-time Opportunities</li>
                <li>Collaboration</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;