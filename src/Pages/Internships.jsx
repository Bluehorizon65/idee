import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaSearch, FaMapMarkerAlt, FaIndustry, FaBriefcase, FaClock, FaMoneyBillWave, FaGraduationCap, FaCheckCircle, FaBuilding, FaUsers, FaTimes, FaBookmark, FaRegBookmark, FaPaperPlane, FaFilter, FaChevronDown } from 'react-icons/fa'
import { GiCow, GiMilkCarton } from 'react-icons/gi'
import './Internships.css'

const internshipData = [
  {
    id: 1,
    title: 'Dairy Farm Management Intern',
    company: 'Amul Dairy Cooperative',
    logo: '🐄',
    location: 'Anand, Gujarat',
    industry: 'Dairy Farming',
    type: 'Full-time Internship',
    duration: '6 Months',
    stipend: '₹15,000/month',
    posted: '2 days ago',
    applicants: 48,
    description: 'Join Amul\'s farm management team and gain hands-on experience in modern dairy farming practices, herd management, and milk production optimization.',
    eligibility: ['Currently pursuing B.Sc/M.Sc in Dairy Science, Animal Husbandry, or related field', 'Students in their final year or recent graduates (within 1 year)', 'Age between 18-28 years'],
    requirements: ['Basic understanding of dairy farm operations', 'Knowledge of animal nutrition and health management', 'Willingness to work in rural farm settings', 'Good communication skills in English and Hindi', 'Physically fit for farm duties'],
    qualifications: ['B.Sc in Dairy Science / Animal Husbandry / Veterinary Science', 'Minimum 60% aggregate in qualifying degree', 'Preference for candidates with prior farm experience'],
    skills: ['Farm Management', 'Herd Health', 'Milk Production', 'Animal Nutrition'],
    isHot: true
  },
  {
    id: 2,
    title: 'Quality Control Analyst Intern',
    company: 'Mother Dairy',
    logo: '🥛',
    location: 'Delhi NCR',
    industry: 'Quality & Testing',
    type: 'Full-time Internship',
    duration: '3 Months',
    stipend: '₹12,000/month',
    posted: '5 days ago',
    applicants: 72,
    description: 'Work with Mother Dairy\'s quality assurance team to conduct testing of milk and dairy products, ensure FSSAI compliance, and maintain quality benchmarks.',
    eligibility: ['B.Sc/M.Sc in Food Technology, Dairy Chemistry, or Microbiology', 'Currently enrolled or recently graduated', 'Valid FSSAI awareness certification preferred'],
    requirements: ['Lab skills including MBRT, acidity test, fat content analysis', 'Understanding of FSSAI standards and food safety regulations', 'Attention to detail and data recording', 'Ability to work in lab and factory environments'],
    qualifications: ['B.Sc/M.Sc Food Technology or Dairy Chemistry', 'Minimum 55% aggregate', 'Knowledge of ISO 22000 / HACCP is a plus'],
    skills: ['Quality Testing', 'FSSAI Compliance', 'Lab Analysis', 'Food Safety'],
    isHot: false
  },
  {
    id: 3,
    title: 'Dairy Supply Chain Intern',
    company: 'Nestlé India',
    logo: '🏭',
    location: 'Moga, Punjab',
    industry: 'Supply Chain',
    type: 'Full-time Internship',
    duration: '4 Months',
    stipend: '₹18,000/month',
    posted: '1 day ago',
    applicants: 35,
    description: 'Be part of Nestlé\'s cold chain logistics team managing milk procurement from farms, transportation, and storage across the supply chain network.',
    eligibility: ['MBA/BBA students specializing in Supply Chain or Operations', 'Engineering graduates with interest in logistics', 'Must have a valid driving license'],
    requirements: ['Understanding of cold chain logistics', 'Proficiency in MS Excel and ERP systems', 'Ability to coordinate with multiple stakeholders', 'Willingness to travel within the procurement zone'],
    qualifications: ['MBA / BBA in Supply Chain Management or Operations', 'B.Tech in Industrial Engineering also accepted', 'Minimum 60% aggregate in qualifying degree'],
    skills: ['Cold Chain', 'Logistics', 'Procurement', 'ERP Systems'],
    isHot: true
  },
  {
    id: 4,
    title: 'Cattle Nutrition Research Intern',
    company: 'NDDB (National Dairy Dev Board)',
    logo: '🌾',
    location: 'Anand, Gujarat',
    industry: 'Research & Development',
    type: 'Part-time Internship',
    duration: '6 Months',
    stipend: '₹10,000/month',
    posted: '1 week ago',
    applicants: 22,
    description: 'Assist NDDB researchers in formulating balanced cattle feed, conducting feeding trials, and analyzing the impact of nutrition on milk yield and quality.',
    eligibility: ['M.Sc/PhD students in Animal Nutrition or Dairy Science', 'Research-oriented mindset with academic publications preferred', 'Must be willing to work with cattle on-site'],
    requirements: ['Strong background in animal nutrition and physiology', 'Experience with feed formulation software', 'Research methodology and data analysis skills', 'Ability to handle cattle safely'],
    qualifications: ['M.Sc in Animal Nutrition / Dairy Science / Veterinary Science', 'Research publications in related journals are a plus', 'Minimum 65% aggregate'],
    skills: ['Animal Nutrition', 'Research', 'Feed Formulation', 'Data Analysis'],
    isHot: false
  },
  {
    id: 5,
    title: 'Dairy Product Development Intern',
    company: 'Britannia Industries',
    logo: '🧀',
    location: 'Mumbai, Maharashtra',
    industry: 'Product Development',
    type: 'Full-time Internship',
    duration: '5 Months',
    stipend: '₹20,000/month',
    posted: '3 days ago',
    applicants: 89,
    description: 'Collaborate with Britannia\'s R&D team on developing new dairy product lines including flavored milk, cheese variants, and probiotic yogurts.',
    eligibility: ['B.Tech/M.Tech in Food Technology or Dairy Technology', 'Creative thinkers with a passion for product innovation', 'Understanding of sensory evaluation methods'],
    requirements: ['Knowledge of dairy product processing techniques', 'Understanding of shelf-life testing and packaging', 'Familiarity with food regulations (FSSAI, Codex)', 'Team collaboration and presentation skills'],
    qualifications: ['B.Tech / M.Tech in Food Technology / Dairy Technology', 'Minimum 60% aggregate', 'Prior R&D or food lab experience preferred'],
    skills: ['Product Development', 'R&D', 'Food Processing', 'Packaging'],
    isHot: true
  },
  {
    id: 6,
    title: 'Veterinary Health Intern',
    company: 'Chitale Dairy',
    logo: '🩺',
    location: 'Pune, Maharashtra',
    industry: 'Veterinary Services',
    type: 'Full-time Internship',
    duration: '3 Months',
    stipend: '₹14,000/month',
    posted: '4 days ago',
    applicants: 31,
    description: 'Work alongside Chitale Dairy\'s veterinary team providing preventive healthcare, vaccination drives, and reproductive management for dairy cattle herds.',
    eligibility: ['B.V.Sc students (final year) or recent graduates', 'Registered with the Veterinary Council of India or state council', 'Comfortable working directly with large animals'],
    requirements: ['Clinical skills in bovine medicine', 'Knowledge of common dairy cattle diseases', 'Experience with AI (Artificial Insemination) techniques preferred', 'Record keeping and reporting abilities'],
    qualifications: ['B.V.Sc & AH (Bachelor of Veterinary Science)', 'Minimum 55% aggregate', 'VCI registration (or in process)'],
    skills: ['Veterinary Care', 'Vaccination', 'Cattle Health', 'AI Techniques'],
    isHot: false
  },
  {
    id: 7,
    title: 'Dairy Marketing & Sales Intern',
    company: 'Parag Milk Foods (Gowardhan)',
    logo: '📊',
    location: 'Manchar, Maharashtra',
    industry: 'Marketing & Sales',
    type: 'Full-time Internship',
    duration: '3 Months',
    stipend: '₹12,000/month',
    posted: '6 days ago',
    applicants: 56,
    description: 'Drive Gowardhan brand visibility through market surveys, distributor coordination, and creating localized dairy product marketing campaigns.',
    eligibility: ['MBA students with Marketing specialization', 'BBA/B.Com graduates with marketing interest', 'Strong local language skills (Marathi/Hindi)'],
    requirements: ['Understanding of FMCG distribution channels', 'Proficiency in market research and competitor analysis', 'Social media and digital marketing skills', 'Ability to travel to retail outlets and distributor points'],
    qualifications: ['MBA / BBA in Marketing', 'B.Com with relevant internship experience', 'Minimum 55% aggregate'],
    skills: ['Marketing', 'Sales', 'Market Research', 'Distribution'],
    isHot: false
  },
  {
    id: 8,
    title: 'Dairy Tech & Automation Intern',
    company: 'Stellapps Technologies',
    logo: '💻',
    location: 'Bengaluru, Karnataka',
    industry: 'Technology',
    type: 'Full-time Internship',
    duration: '6 Months',
    stipend: '₹25,000/month',
    posted: '1 day ago',
    applicants: 44,
    description: 'Build IoT solutions for dairy farms — smart milking machines, automated feed dispensers, and data analytics dashboards for milk production tracking.',
    eligibility: ['B.Tech/M.Tech in Computer Science, Electronics, or IoT', 'Knowledge of embedded systems and sensor integration', 'Interest in agri-tech and dairy innovation'],
    requirements: ['Programming skills in Python, C++, or JavaScript', 'Experience with IoT platforms (Arduino, Raspberry Pi)', 'Understanding of cloud services (AWS/Azure)', 'Data visualization and dashboard development'],
    qualifications: ['B.Tech / M.Tech in CS / ECE / IoT', 'Minimum 60% aggregate', 'GitHub portfolio or project demos preferred'],
    skills: ['IoT', 'Python', 'Embedded Systems', 'Data Analytics'],
    isHot: true
  },
  {
    id: 9,
    title: 'Dairy Cooperative Management Intern',
    company: 'Karnataka Milk Federation (KMF)',
    logo: '🤝',
    location: 'Bengaluru, Karnataka',
    industry: 'Cooperative Management',
    type: 'Part-time Internship',
    duration: '4 Months',
    stipend: '₹8,000/month',
    posted: '1 week ago',
    applicants: 18,
    description: 'Learn how India\'s largest dairy cooperative network operates — from farmer registration, milk collection logistics, to payment disbursement and governance.',
    eligibility: ['MBA / MSW / MA in Rural Management or Public Administration', 'Interest in cooperative movements and rural development', 'Fluency in Kannada is strongly preferred'],
    requirements: ['Understanding of cooperative society laws and governance', 'Excellent interpersonal and community engagement skills', 'Report writing and documentation abilities', 'Willingness to visit rural milk collection centers'],
    qualifications: ['MBA in Rural Management / MSW / MA Public Administration', 'Minimum 55% aggregate', 'Prior experience with NGOs or cooperatives is a plus'],
    skills: ['Cooperative Mgmt', 'Rural Development', 'Governance', 'Community'],
    isHot: false
  },
  {
    id: 10,
    title: 'Dairy Plant Engineering Intern',
    company: 'Gujarat Cooperative Milk (GCMMF)',
    logo: '⚙️',
    location: 'Mehsana, Gujarat',
    industry: 'Engineering',
    type: 'Full-time Internship',
    duration: '6 Months',
    stipend: '₹16,000/month',
    posted: '3 days ago',
    applicants: 27,
    description: 'Gain practical exposure in dairy plant operations — pasteurization, homogenization, packaging lines, and cold storage facility management at GCMMF plants.',
    eligibility: ['B.Tech in Mechanical / Chemical / Food Process Engineering', 'Diploma holders in Dairy Engineering also eligible', 'Must follow plant safety protocols strictly'],
    requirements: ['Knowledge of dairy processing equipment and machinery', 'Understanding of pasteurization and UHT processes', 'Basic knowledge of PLC/SCADA systems', 'Compliance with hygiene and safety standards'],
    qualifications: ['B.Tech in Mechanical / Chemical / Dairy Engineering', 'Diploma in Dairy Engineering (3 year)', 'Minimum 55% aggregate'],
    skills: ['Plant Operations', 'Pasteurization', 'SCADA', 'Maintenance'],
    isHot: false
  },
  {
    id: 11,
    title: 'Organic Dairy Farming Intern',
    company: 'Akshayakalpa Organic',
    logo: '🌿',
    location: 'Tiptur, Karnataka',
    industry: 'Dairy Farming',
    type: 'Full-time Internship',
    duration: '3 Months',
    stipend: '₹10,000/month',
    posted: '5 days ago',
    applicants: 41,
    description: 'Experience sustainable and organic dairy farming methods — zero-antibiotic cattle rearing, organic fodder cultivation, and eco-friendly waste management.',
    eligibility: ['B.Sc Agriculture / Organic Farming / Dairy Science students', 'Passion for sustainability and organic practices', 'Comfortable staying on a farm campus'],
    requirements: ['Interest in organic certification processes', 'Knowledge of composting and biogas systems', 'Basic understanding of soil and water management', 'Willingness to participate in manual farm work'],
    qualifications: ['B.Sc in Agriculture / Organic Farming / Dairy Science', 'Minimum 50% aggregate', 'NCC / NSS volunteers given preference'],
    skills: ['Organic Farming', 'Sustainability', 'Composting', 'Cattle Care'],
    isHot: false
  },
  {
    id: 12,
    title: 'Dairy Finance & Accounting Intern',
    company: 'Heritage Foods',
    logo: '💰',
    location: 'Hyderabad, Telangana',
    industry: 'Finance',
    type: 'Full-time Internship',
    duration: '3 Months',
    stipend: '₹15,000/month',
    posted: '2 days ago',
    applicants: 38,
    description: 'Support Heritage Foods\' finance team with dairy procurement cost analysis, GST compliance for dairy products, and financial reporting for cooperative operations.',
    eligibility: ['B.Com / M.Com / MBA Finance students', 'CA Inter or CMA Inter candidates', 'Knowledge of dairy industry economics preferred'],
    requirements: ['Proficiency in Tally, SAP, or QuickBooks', 'Understanding of GST for agricultural and dairy products', 'Financial modelling and Excel skills', 'Attention to detail in reconciliation tasks'],
    qualifications: ['B.Com / M.Com / MBA in Finance', 'CA Inter / CMA Inter also eligible', 'Minimum 55% aggregate'],
    skills: ['Finance', 'GST', 'Tally/SAP', 'Financial Analysis'],
    isHot: false
  }
]

const locations = ['All Locations', 'Gujarat', 'Maharashtra', 'Karnataka', 'Delhi NCR', 'Punjab', 'Telangana']
const industries = ['All Industries', 'Dairy Farming', 'Quality & Testing', 'Supply Chain', 'Research & Development', 'Product Development', 'Veterinary Services', 'Marketing & Sales', 'Technology', 'Cooperative Management', 'Engineering', 'Finance']

function Internships() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('All Locations')
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries')
  const [selectedInternship, setSelectedInternship] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])
  const [appliedJobs, setAppliedJobs] = useState([])
  const [showApplyModal, setShowApplyModal] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [applySuccess, setApplySuccess] = useState(false)

  const toggleSave = (id) => {
    setSavedJobs(prev =>
      prev.includes(id) ? prev.filter(j => j !== id) : [...prev, id]
    )
  }

  const handleApply = (id) => {
    setAppliedJobs(prev => [...prev, id])
    setShowApplyModal(false)
    setApplySuccess(true)
    setTimeout(() => setApplySuccess(false), 3000)
  }

  const filteredInternships = internshipData.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchLocation = selectedLocation === 'All Locations' || item.location.includes(selectedLocation.replace('Delhi NCR', 'Delhi'))
    const matchIndustry = selectedIndustry === 'All Industries' || item.industry === selectedIndustry
    return matchSearch && matchLocation && matchIndustry
  })

  return (
    <div className="internship-container">
      {/* Success Toast */}
      {applySuccess && (
        <div className="apply-toast">
          <FaCheckCircle /> Application submitted successfully!
        </div>
      )}

      {/* Header */}
      <header className="intern-header">
        <button className="intern-back-btn" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <div className="intern-title-row">
          <div className="intern-title-group">
            <GiCow className="intern-title-icon" />
            <div>
              <h1>Dairy Internships</h1>
              <p>Explore career opportunities across India's dairy industry</p>
            </div>
          </div>
          <div className="intern-title-stats">
            <div className="title-stat">
              <span className="title-stat-num">{internshipData.length}</span>
              <span className="title-stat-label">Openings</span>
            </div>
            <div className="title-stat">
              <span className="title-stat-num">{new Set(internshipData.map(i => i.company)).size}</span>
              <span className="title-stat-label">Companies</span>
            </div>
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="intern-controls">
        <div className="intern-search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by role, company, or skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="filter-toggle-btn" onClick={() => setShowFilters(!showFilters)}>
            <FaFilter /> Filters <FaChevronDown className={`chevron ${showFilters ? 'open' : ''}`} />
          </button>
        </div>
        <div className={`intern-filters ${showFilters ? 'show' : ''}`}>
          <div className="filter-group">
            <label><FaMapMarkerAlt /> Location</label>
            <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
              {locations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label><FaIndustry /> Industry</label>
            <select value={selectedIndustry} onChange={(e) => setSelectedIndustry(e.target.value)}>
              {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
          </div>
          <button className="clear-filters" onClick={() => { setSelectedLocation('All Locations'); setSelectedIndustry('All Industries'); setSearchQuery('') }}>
            Clear All
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="intern-body">
        {/* Job List */}
        <div className="intern-list">
          <p className="results-count">{filteredInternships.length} internship{filteredInternships.length !== 1 ? 's' : ''} found</p>
          {filteredInternships.length === 0 ? (
            <div className="no-results">
              <GiMilkCarton className="no-results-icon" />
              <h3>No internships found</h3>
              <p>Try adjusting your filters or search query</p>
            </div>
          ) : (
            filteredInternships.map(job => (
              <div
                className={`intern-card ${selectedInternship?.id === job.id ? 'active' : ''}`}
                key={job.id}
                onClick={() => setSelectedInternship(job)}
              >
                <div className="intern-card-top">
                  <div className="intern-card-logo">{job.logo}</div>
                  <div className="intern-card-info">
                    <h3>{job.title}</h3>
                    <p className="intern-company">{job.company}</p>
                  </div>
                  {job.isHot && <span className="hot-badge">🔥 Hot</span>}
                </div>
                <div className="intern-card-meta">
                  <span><FaMapMarkerAlt /> {job.location}</span>
                  <span><FaClock /> {job.duration}</span>
                  <span><FaMoneyBillWave /> {job.stipend}</span>
                </div>
                <div className="intern-card-skills">
                  {job.skills.map(skill => <span key={skill} className="skill-chip">{skill}</span>)}
                </div>
                <div className="intern-card-bottom">
                  <span className="posted-label">{job.posted}</span>
                  <span className="applicant-count"><FaUsers /> {job.applicants} applicants</span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Job Detail Panel */}
        <div className={`intern-detail ${selectedInternship ? 'has-selection' : ''}`}>
          {!selectedInternship ? (
            <div className="detail-placeholder">
              <FaBriefcase className="placeholder-icon" />
              <h3>Select an internship</h3>
              <p>Click on any listing to view full details</p>
            </div>
          ) : (
            <div className="detail-content">
              <div className="detail-header">
                <div className="detail-header-top">
                  <div className="detail-logo">{selectedInternship.logo}</div>
                  <div className="detail-title-info">
                    <h2>{selectedInternship.title}</h2>
                    <p className="detail-company"><FaBuilding /> {selectedInternship.company}</p>
                  </div>
                  <button className="detail-close" onClick={() => setSelectedInternship(null)}>
                    <FaTimes />
                  </button>
                </div>
                <div className="detail-meta-row">
                  <span><FaMapMarkerAlt /> {selectedInternship.location}</span>
                  <span><FaBriefcase /> {selectedInternship.type}</span>
                  <span><FaClock /> {selectedInternship.duration}</span>
                  <span><FaMoneyBillWave /> {selectedInternship.stipend}</span>
                </div>
                <div className="detail-actions">
                  {appliedJobs.includes(selectedInternship.id) ? (
                    <button className="applied-btn" disabled>
                      <FaCheckCircle /> Applied
                    </button>
                  ) : (
                    <button className="apply-btn" onClick={() => setShowApplyModal(true)}>
                      <FaPaperPlane /> Apply Now
                    </button>
                  )}
                  <button className="save-btn" onClick={() => toggleSave(selectedInternship.id)}>
                    {savedJobs.includes(selectedInternship.id) ? <FaBookmark /> : <FaRegBookmark />}
                    {savedJobs.includes(selectedInternship.id) ? ' Saved' : ' Save'}
                  </button>
                </div>
              </div>

              <div className="detail-body">
                <div className="detail-section">
                  <h3>About This Internship</h3>
                  <p>{selectedInternship.description}</p>
                </div>

                <div className="detail-section">
                  <h3><FaGraduationCap /> Eligibility</h3>
                  <ul>
                    {selectedInternship.eligibility.map((item, i) => (
                      <li key={i}><FaCheckCircle className="list-check" /> {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3><FaBriefcase /> Requirements</h3>
                  <ul>
                    {selectedInternship.requirements.map((item, i) => (
                      <li key={i}><FaCheckCircle className="list-check" /> {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3><FaGraduationCap /> Qualifications</h3>
                  <ul>
                    {selectedInternship.qualifications.map((item, i) => (
                      <li key={i}><FaCheckCircle className="list-check" /> {item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-section">
                  <h3>Skills Required</h3>
                  <div className="detail-skills">
                    {selectedInternship.skills.map(skill => (
                      <span key={skill} className="detail-skill-chip">{skill}</span>
                    ))}
                  </div>
                </div>

                <div className="detail-footer-info">
                  <span>Posted {selectedInternship.posted}</span>
                  <span>•</span>
                  <span>{selectedInternship.applicants} applicants</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && selectedInternship && (
        <>
          <div className="modal-overlay" onClick={() => setShowApplyModal(false)}></div>
          <div className="apply-modal">
            <button className="modal-close" onClick={() => setShowApplyModal(false)}><FaTimes /></button>
            <div className="modal-header">
              <div className="modal-logo">{selectedInternship.logo}</div>
              <div>
                <h3>{selectedInternship.title}</h3>
                <p>{selectedInternship.company}</p>
              </div>
            </div>
            <div className="modal-body">
              <div className="modal-field">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" defaultValue="Zach" />
              </div>
              <div className="modal-field">
                <label>Email Address</label>
                <input type="email" placeholder="your@email.com" defaultValue="zach@dairyhub.com" />
              </div>
              <div className="modal-field">
                <label>Phone Number</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" />
              </div>
              <div className="modal-field">
                <label>Resume / CV</label>
                <div className="file-upload-area">
                  <FaGraduationCap className="upload-icon" />
                  <p>Drag & drop your resume or <span>browse files</span></p>
                  <small>PDF, DOC up to 5MB</small>
                </div>
              </div>
              <div className="modal-field">
                <label>Cover Note (Optional)</label>
                <textarea placeholder="Why are you interested in this internship?" rows="3"></textarea>
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-cancel" onClick={() => setShowApplyModal(false)}>Cancel</button>
              <button className="modal-submit" onClick={() => handleApply(selectedInternship.id)}>
                <FaPaperPlane /> Submit Application
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Internships
