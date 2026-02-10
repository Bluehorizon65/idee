import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ConnectWithOthers.css'

function ConnectWithOthers() {
  const navigate = useNavigate()
  const [locationFilter, setLocationFilter] = useState('all')
  const [industryFilter, setIndustryFilter] = useState('all')
  
  // Load connected people from localStorage
  const getConnectedPeopleIds = () => {
    const connected = localStorage.getItem('connectedPeopleIds')
    return connected ? JSON.parse(connected) : []
  }
  
  const [connectedPeople, setConnectedPeople] = useState(getConnectedPeopleIds())

  // Sample people data
  const [people] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Dairy Farm Owner',
      location: 'Mumbai, Maharashtra',
      industry: 'Dairy Farm',
      mutualConnections: 12,
      image: '👨‍🌾',
      verified: true
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Milk Quality Analyst',
      location: 'Pune, Maharashtra',
      industry: 'Cooling Center',
      mutualConnections: 8,
      image: '👩‍🔬',
      verified: true
    },
    {
      id: 3,
      name: 'Amit Patel',
      title: 'Cold Chain Logistics Manager',
      location: 'Ahmedabad, Gujarat',
      industry: 'Supply Chain',
      mutualConnections: 15,
      image: '👨‍💼',
      verified: false
    },
    {
      id: 4,
      name: 'Sneha Reddy',
      title: 'Dairy Equipment Supplier',
      location: 'Hyderabad, Telangana',
      industry: 'Milk Equipment',
      mutualConnections: 5,
      image: '👩‍💼',
      verified: true
    },
    {
      id: 5,
      name: 'Vikram Singh',
      title: 'Cattle Feed Specialist',
      location: 'Jaipur, Rajasthan',
      industry: 'Cattle Feed',
      mutualConnections: 20,
      image: '👨‍🌾',
      verified: false
    },
    {
      id: 6,
      name: 'Anita Desai',
      title: 'Dairy Cooperative Manager',
      location: 'Anand, Gujarat',
      industry: 'Dairy Farm',
      mutualConnections: 18,
      image: '👩‍💼',
      verified: true
    },
    {
      id: 7,
      name: 'Suresh Yadav',
      title: 'Veterinary Doctor',
      location: 'Lucknow, Uttar Pradesh',
      industry: 'Veterinary',
      mutualConnections: 10,
      image: '👨‍⚕️',
      verified: true
    },
    {
      id: 8,
      name: 'Kavita Nair',
      title: 'Dairy Processing Expert',
      location: 'Kochi, Kerala',
      industry: 'Cooling Center',
      mutualConnections: 7,
      image: '👩‍🔬',
      verified: false
    },
    {
      id: 9,
      name: 'Rahul Verma',
      title: 'Milk Distribution Head',
      location: 'Delhi, NCR',
      industry: 'Supply Chain',
      mutualConnections: 22,
      image: '👨‍💼',
      verified: true
    },
    {
      id: 10,
      name: 'Pooja Gupta',
      title: 'Dairy Product Developer',
      location: 'Bangalore, Karnataka',
      industry: 'Dairy Farm',
      mutualConnections: 14,
      image: '👩‍🔬',
      verified: true
    },
    {
      id: 11,
      name: 'Manoj Joshi',
      title: 'Milk Collection Center Owner',
      location: 'Nagpur, Maharashtra',
      industry: 'Cooling Center',
      mutualConnections: 9,
      image: '👨‍🌾',
      verified: false
    },
    {
      id: 12,
      name: 'Deepa Iyer',
      title: 'Quality Control Manager',
      location: 'Chennai, Tamil Nadu',
      industry: 'Cooling Center',
      mutualConnections: 11,
      image: '👩‍💼',
      verified: true
    },
    {
      id: 13,
      name: 'Arjun Mehta',
      title: 'Dairy Technology Consultant',
      location: 'Mumbai, Maharashtra',
      industry: 'Milk Equipment',
      mutualConnections: 16,
      image: '👨‍💼',
      verified: true
    },
    {
      id: 14,
      name: 'Shalini Kapoor',
      title: 'Organic Dairy Farmer',
      location: 'Chandigarh, Punjab',
      industry: 'Dairy Farm',
      mutualConnections: 6,
      image: '👩‍🌾',
      verified: false
    },
    {
      id: 15,
      name: 'Karan Malhotra',
      title: 'Export Import Manager',
      location: 'Kolkata, West Bengal',
      industry: 'Supply Chain',
      mutualConnections: 19,
      image: '👨‍💼',
      verified: true
    },
    {
      id: 16,
      name: 'Nisha Agarwal',
      title: 'Dairy Nutritionist',
      location: 'Indore, Madhya Pradesh',
      industry: 'Veterinary',
      mutualConnections: 13,
      image: '👩‍⚕️',
      verified: true
    },
    {
      id: 17,
      name: 'Sandeep Rao',
      title: 'Cold Storage Facility Manager',
      location: 'Visakhapatnam, Andhra Pradesh',
      industry: 'Supply Chain',
      mutualConnections: 8,
      image: '👨‍💼',
      verified: false
    },
    {
      id: 18,
      name: 'Meera Pillai',
      title: 'Dairy Business Analyst',
      location: 'Trivandrum, Kerala',
      industry: 'Dairy Farm',
      mutualConnections: 17,
      image: '👩‍💼',
      verified: true
    },
    {
      id: 19,
      name: 'Aditya Chopra',
      title: 'Milk Procurement Officer',
      location: 'Surat, Gujarat',
      industry: 'Cooling Center',
      mutualConnections: 21,
      image: '👨‍💼',
      verified: true
    },
    {
      id: 20,
      name: 'Ritu Malhotra',
      title: 'Dairy Farm Consultant',
      location: 'Ludhiana, Punjab',
      industry: 'Dairy Farm',
      mutualConnections: 4,
      image: '👩‍💼',
      verified: false
    }
  ])

  // Save connected people to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('connectedPeopleIds', JSON.stringify(connectedPeople))
    
    // Also save full person data for messaging
    const connectedPeopleData = people.filter(p => connectedPeople.includes(p.id))
    localStorage.setItem('connectedPeople', JSON.stringify(connectedPeopleData))
  }, [connectedPeople, people])

  const handleConnect = (id) => {
    setConnectedPeople([...connectedPeople, id])
  }

  const handleDismiss = (id) => {
    // Could add dismissed people tracking here
    console.log('Dismissed:', id)
  }

  const handleBack = () => {
    navigate('/dashboard')
  }

  // Filter people based on selected filters
  const filteredPeople = people.filter(person => {
    const locationMatch = locationFilter === 'all' || person.location.includes(locationFilter)
    const industryMatch = industryFilter === 'all' || person.industry === industryFilter
    return locationMatch && industryMatch && !connectedPeople.includes(person.id)
  })

  // Sort by location first (Maharashtra/Mumbai at top), then by mutual connections
  const sortedPeople = [...filteredPeople].sort((a, b) => {
    // If no filter is applied, prioritize Maharashtra locations
    if (locationFilter === 'all') {
      const aIsMaharashtra = a.location.includes('Maharashtra')
      const bIsMaharashtra = b.location.includes('Maharashtra')
      
      if (aIsMaharashtra && !bIsMaharashtra) return -1
      if (!aIsMaharashtra && bIsMaharashtra) return 1
      
      // Within same location priority, sort by mutual connections
      return b.mutualConnections - a.mutualConnections
    }
    
    // When filter is applied, just sort by mutual connections
    return b.mutualConnections - a.mutualConnections
  })

  return (
    <div className="connect-container">
      <div className="connect-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Dashboard
        </button>
        <h1>Connect with Others</h1>
        <p>Discover and connect with dairy professionals near you</p>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <label>📍 Location</label>
          <select value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)}>
            <option value="all">All Locations</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Punjab">Punjab</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Kerala">Kerala</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="filter-group">
          <label>🏭 Industry Type</label>
          <select value={industryFilter} onChange={(e) => setIndustryFilter(e.target.value)}>
            <option value="all">All Industries</option>
            <option value="Dairy Farm">Dairy Farm</option>
            <option value="Cooling Center">Cooling Center</option>
            <option value="Supply Chain">Supply Chain</option>
            <option value="Milk Equipment">Milk Equipment</option>
            <option value="Cattle Feed">Cattle Feed</option>
            <option value="Veterinary">Veterinary</option>
          </select>
        </div>

        <div className="results-count">
          Showing {sortedPeople.length} {sortedPeople.length === 1 ? 'person' : 'people'}
        </div>
      </div>

      <div className="suggestions-section">
        <h2>Suggestions for you</h2>
        <p className="subtitle">Based on people close to you and shared connections</p>

        <div className="people-grid">
          {sortedPeople.map((person) => (
            <div key={person.id} className="person-card">
              <button className="dismiss-btn" onClick={() => handleDismiss(person.id)}>✕</button>
              
              <div className="person-image">
                <div className="avatar">{person.image}</div>
                {person.mutualConnections > 15 && (
                  <div className="close-badge">#CloseToWork</div>
                )}
              </div>

              <div className="person-info">
                <h3>
                  {person.name}
                  {person.verified && <span className="verified-badge">✓</span>}
                </h3>
                <p className="person-title">{person.title}</p>
                <p className="person-location">📍 {person.location}</p>
                <p className="person-industry">🏭 {person.industry}</p>
                
                {person.mutualConnections > 0 && (
                  <p className="mutual-connections">
                    👥 {person.mutualConnections} mutual connection{person.mutualConnections !== 1 ? 's' : ''}
                  </p>
                )}
              </div>

              <button 
                className={`connect-btn ${connectedPeople.includes(person.id) ? 'connected' : ''}`}
                onClick={() => handleConnect(person.id)}
                disabled={connectedPeople.includes(person.id)}
              >
                {connectedPeople.includes(person.id) ? '✓ Connected' : '➕ Connect'}
              </button>
            </div>
          ))}
        </div>

        {sortedPeople.length === 0 && (
          <div className="no-results">
            <span className="no-results-icon">🔍</span>
            <h3>No people found</h3>
            <p>Try adjusting your filters to see more suggestions</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ConnectWithOthers
