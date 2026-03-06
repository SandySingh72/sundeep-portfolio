import { useState } from 'react'
import './App.css'
import HeroScene from './HeroScene'

function App() {
  const [activeTab, setActiveTab] = useState('about')
  const [showPhoneForm, setShowPhoneForm] = useState(false)
  const [phoneSent, setPhoneSent] = useState(false)

  return (
    <div className="hero-page">
      <nav className="top-nav">
      <div className="logo">
        <img src="/sbs-logo.svg" alt="SBS Logo" />
        </div>
        <div className="nav-links">
          {['about', 'skills', 'experience', 'projects', 'contact'].map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? 'active' : ''}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'skills' ? 'Key Skills' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </nav>

      <header className="hero">
        <div className="hero-content">
          <h1 className="name">Sundeep B Singh</h1>
          <h2 className="headline">Senior Project Manager (Director) @ Government of India</h2>
          <p className="tagline">
            Leading complex aviation, infrastructure, and transformation programmes across the Indian Air Force.
          </p>
          <div className="hero-buttons">
            <a
              className="btn"
              href="https://drive.google.com/file/d/1nrK4ZShuDNp75VrQ2T-qsRwhIq0rMkWD/preview"
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
        </div>
      </header>

      <section className="hero-canvas">
        <HeroScene />
      </section>

      <main className="content">
        {activeTab === 'about' && (
          <section id="about" className="section">
            <h3>About</h3>
            <p>
              Senior Air Force officer with 30+ years of experience delivering large-scale aviation, infrastructure,
              logistics, and training programmes. Google-certified project management professional and Lean Six Sigma
              Black Belt, focused on governance, risk control, and measurable operational impact. Experienced in
              driving digital and analytics-led transformation while building high-performance teams and strong
              stakeholder relationships.
            </p>
          </section>
        )}

        {activeTab === 'skills' && (
          <section id="skills" className="section">
            <h3>Key Skills</h3>
            <ul className="skills-list">
              <li>Program and Portfolio Management</li>
              <li>Aviation Operations and Infrastructure Delivery</li>
              <li>CAPEX/OPEX and Budget Governance</li>
              <li>Process Improvement and Lean Six Sigma</li>
              <li>Risk, Vendor and Stakeholder Management</li>
              <li>Digital Transformation and Analytics</li>
            </ul>
          </section>
        )}

        {activeTab === 'experience' && (
          <section id="experience" className="section">
            <h3>Experience</h3>
            <div className="experience-item">
              <h4>Director - Operations and Infrastructure</h4>
              <p className="experience-meta">Indian Air Force · New Delhi · 2015 - Present</p>
              <p>
                Leading multi-base infrastructure and VVIP air operations, improving project timelines, cost control,
                procurement reliability, and flight-operations efficiency.
              </p>
            </div>
            <div className="experience-item">
              <h4>Senior Project Manager - Training and Org Development</h4>
              <p className="experience-meta">Indian Air Force · New Delhi · 2012 - 2015</p>
              <p>
                Designed and scaled executive development programmes, digitised learning operations, and managed large
                training budgets with zero audit deviations.
              </p>
            </div>
            <div className="experience-item">
              <h4>Program Manager - Operations and Process Improvement</h4>
              <p className="experience-meta">Indian Air Force · Agra · 2004 - 2012</p>
              <p>
                Drove lean initiatives across maintenance and logistics, codified critical SOPs, and strengthened
                operational readiness of large teams.
              </p>
            </div>
            <div className="experience-item">
              <h4>Operations and Administration Manager</h4>
              <p className="experience-meta">Indian Air Force · Vadodara · 1992 - 2004</p>
              <p>
                Managed administration, flight-operations support, and infrastructure development for large operational
                units.
              </p>
            </div>
          </section>
        )}

        {activeTab === 'projects' && (
          <section id="projects" className="section">
            <h3>Selected Projects</h3>
            <ul className="projects-list">
              <li>
                <strong>Aircraft Infrastructure Modernisation (Rs 220 Cr):</strong> Delivered major hangar and
                technical-complex upgrades for Code-E aircraft.
              </li>
              <li>
                <strong>High-Altitude Logistics - Leh-Ladakh:</strong> Coordinated heavy-lift air operations, achieving
                ~95% mission success.
              </li>
              <li>
                <strong>Survey and Reconnaissance System:</strong> Built a GPS-enabled aerial platform with analytics,
                cutting redundant flight hours and costs.
              </li>
            </ul>
          </section>
        )}

{activeTab === 'contact' && (
  <section id="contact" className="section">
    <h3>Contact</h3>
    <p>
      Email:{' '}
      <a href="mailto:meetsandysingh72@gmail.com">meetsandysingh72@gmail.com</a>
    </p>
    <p>
      Contact:{' '}
      {phoneSent ? (
        <span style={{ color: '#38bdf8' }}>Request sent! Sundeep will contact you shortly.</span>
      ) : !showPhoneForm ? (
        <button className="reveal-btn" onClick={() => setShowPhoneForm(true)}>
          Request Phone Number
        </button>
      ) : (
        <form
          className="phone-form"
          onSubmit={async (e) => {
            e.preventDefault()
            const data = new FormData(e.target)
            await fetch('https://formspree.io/f/xaqpwozg', {
              method: 'POST',
              body: data,
              headers: { Accept: 'application/json' },
            })
            setPhoneSent(true)
            setShowPhoneForm(false)
          }}
        >
          <input className="phone-input" type="text" name="name" placeholder="Your Name" required />
          <input className="phone-input" type="email" name="email" placeholder="Your Email" required />
          <input type="hidden" name="message" value="Requesting phone number of Sundeep B Singh" />
          <button type="submit" className="reveal-btn">Send Request</button>
          <button
            type="button"
            className="reveal-btn"
            style={{ marginLeft: '0.5rem', opacity: 0.6 }}
            onClick={() => setShowPhoneForm(false)}
          >
            Cancel
          </button>
        </form>
      )}
    </p>
    <p>
      LinkedIn:{' '}
      <a href="https://www.linkedin.com/in/sundeep72singh" target="_blank" rel="noreferrer">
        linkedin.com/in/sundeep72singh
      </a>
    </p>
    <p>
      GitHub:{' '}
      <a href="https://www.github.com/SandySingh72" target="_blank" rel="noreferrer">
        github.com/SandySingh72
      </a>
    </p>
  </section>
)}

      </main>

      <footer className="footer">
        <small>© {new Date().getFullYear()} Sundeep B Singh</small>
      </footer>
    </div>
  )
}

export default App
