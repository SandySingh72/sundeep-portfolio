import { useState } from 'react';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="page">
      <nav className="top-nav">
        <div className="logo">SBS</div>
        <div className="nav-links">
          <button
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
          <button
            className={activeTab === 'skills' ? 'active' : ''}
            onClick={() => setActiveTab('skills')}
          >
            Key Skills
          </button>
          <button
            className={activeTab === 'experience' ? 'active' : ''}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={activeTab === 'contact' ? 'active' : ''}
            onClick={() => setActiveTab('contact')}
          >
            Contact
          </button>
        </div>
      </nav>

      <header className="hero">
        <h1 className="name">Sundeep B Singh</h1>
        <h2 className="headline">
          Senior Project Manager (Director, Government of India)
        </h2>
        <p className="tagline">
          Leading complex aviation, infrastructure, and transformation programmes
          across the Indian Air Force.
        </p>

        <div className="hero-buttons">
          {/* Update this href with your real resume link when ready */}
          <a
            className="btn"
            href="YOUR_RESUME_LINK_HERE"
            target="_blank"
            rel="noreferrer"
          >
            View Resume
          </a>
          <a
            className="btn secondary"
            href="https://www.linkedin.com/in/sundeep72singh"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="btn secondary"
            href="https://www.github.com/SandySingh72"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </header>

      <main className="content">
        {activeTab === 'about' && (
          <section id="about" className="section">
            <h3>About</h3>
            <p>
              Senior Air Force officer with 30+ years of experience delivering
              large-scale aviation, infrastructure, logistics, and training
              programmes. Google-certified project management professional and
              Lean Six Sigma Black Belt, focused on governance, risk control, and
              measurable operational impact. Experienced in driving digital and
              analytics-led transformation while building high-performance teams
              and strong stakeholder relationships.
            </p>
          </section>
        )}

        {activeTab === 'skills' && (
          <section id="skills" className="section">
            <h3>Key Skills</h3>
            <ul className="skills-list">
              <li>Program &amp; Portfolio Management</li>
              <li>Aviation Operations &amp; Infrastructure Delivery</li>
              <li>CAPEX/OPEX &amp; Budget Governance</li>
              <li>Process Improvement &amp; Lean Six Sigma</li>
              <li>Risk, Vendor &amp; Stakeholder Management</li>
              <li>Digital Transformation &amp; Analytics</li>
            </ul>
          </section>
        )}

        {activeTab === 'experience' && (
          <section id="experience" className="section">
            <h3>Experience</h3>

            <div className="experience-item">
              <h4>Director – Operations &amp; Infrastructure</h4>
              <p className="experience-meta">
                Indian Air Force · New Delhi · 2015 – Present
              </p>
              <p>
                Leading multi-base infrastructure and VVIP air operations,
                improving project timelines, cost control, procurement reliability,
                and flight-operations efficiency.
              </p>
            </div>

            <div className="experience-item">
              <h4>Senior Project Manager – Training &amp; Org Development</h4>
              <p className="experience-meta">
                Indian Air Force · New Delhi · 2012 – 2015
              </p>
              <p>
                Designed and scaled executive development programmes, digitised
                learning operations, and managed large training budgets with zero
                audit deviations.
              </p>
            </div>

            <div className="experience-item">
              <h4>Program Manager – Operations &amp; Process Improvement</h4>
              <p className="experience-meta">
                Indian Air Force · Agra · 2004 – 2012
              </p>
              <p>
                Drove lean initiatives across maintenance and logistics, codified
                critical SOPs, and strengthened operational readiness of large
                teams.
              </p>
            </div>

            <div className="experience-item">
              <h4>Operations &amp; Administration Manager</h4>
              <p className="experience-meta">
                Indian Air Force · Vadodara · 1992 – 2004
              </p>
              <p>
                Managed administration, flight-operations support, and
                infrastructure development for large operational units.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section id="projects" className="section">
            <h3>Selected Projects</h3>
            <ul className="projects-list">
              <li>
                <strong>Aircraft Infrastructure Modernisation (₹220 Cr):</strong>{' '}
                Delivered major hangar and technical-complex upgrades for Code-E
                aircraft.
              </li>
              <li>
                <strong>High-Altitude Logistics – Leh–Ladakh:</strong> Coordinated
                heavy-lift air operations, achieving ~95% mission success.
              </li>
              <li>
                <strong>Survey &amp; Reconnaissance System:</strong> Built a
                GPS-enabled aerial platform with analytics, cutting redundant
                flight hours and costs.
              </li>
            </ul>
          </section>
        )}

        {activeTab === 'contact' && (
          <section id="contact" className="section">
            <h3>Contact</h3>
            <p>
              Email:{' '}
              <a href="mailto:meetsandysingh72@gmail.com">
                meetsandysingh72@gmail.com
              </a>
            </p>
            <p>Contact: +91-9414064564</p>
            <p>
              LinkedIn:{' '}
              <a
                href="https://www.linkedin.com/in/sundeep72singh"
                target="_blank"
                rel="noreferrer"
              >
                www.linkedin.com/in/sundeep72singh
              </a>
            </p>
            <p>
              GitHub:{' '}
              <a
                href="https://www.github.com/SandySingh72"
                target="_blank"
                rel="noreferrer"
              >
                www.github.com/SandySingh72
              </a>
            </p>
          </section>
        )}
      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Sundeep B Singh</small>
      </footer>
    </div>
  );
}

export default App;
