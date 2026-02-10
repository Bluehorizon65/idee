import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaClipboardList, FaGlobeAmericas, FaHandshake, FaComments, FaGraduationCap, FaCog, FaBars, FaTimes, FaSignOutAlt, FaSun, FaMoon, FaBell, FaChartBar, FaArrowRight, FaUser, FaLeaf, FaFileAlt } from 'react-icons/fa'
import { GiMilkCarton, GiCow, GiGrass, GiBarn, GiWheat, GiWaterDrop } from 'react-icons/gi'
import './Dashboard.css'

function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(true)
  const [loading, setLoading] = useState(true)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'update',
      message: 'New government dairy subsidy scheme announced',
      time: '2 min ago',
      icon: '📢',
      read: false
    },
    {
      id: 2,
      type: 'alert',
      message: 'Milk quality standards updated - Check new guidelines',
      time: '15 min ago',
      icon: '⚠️',
      read: false
    },
    {
      id: 3,
      type: 'info',
      message: 'ABC Dairy Farm posted a new job opening',
      time: '1 hour ago',
      icon: '💼',
      read: true
    },
    {
      id: 4,
      type: 'success',
      message: 'Your export license has been approved',
      time: '2 hours ago',
      icon: '✅',
      read: true
    },
    {
      id: 5,
      type: 'update',
      message: 'Cold chain equipment maintenance scheduled for tomorrow',
      time: '3 hours ago',
      icon: '🔧',
      read: true
    }
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const clockTimer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(clockTimer)
  }, [])

  const handleLogout = () => { navigate('/') }
  const toggleSidebar = () => { setSidebarOpen(!sidebarOpen) }
  const toggleTheme = () => { setIsDarkTheme(!isDarkTheme) }

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const greeting = () => {
    const hour = currentTime.getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 17) return 'Good Afternoon'
    return 'Good Evening'
  }

  const formatDate = () => {
    return currentTime.toLocaleDateString('en-IN', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  const formatTime = () => {
    return currentTime.toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    })
  }

  const cards = [
    { icon: <FaFileAlt />, title: 'Generate Membership Form', desc: 'Create IDA student membership application', tag: 'Form', onClick: () => navigate('/membership-form') },
    { icon: <FaClipboardList />, title: 'Scheme Application', desc: 'Apply for government dairy schemes', tag: 'Gov', onClick: () => alert('Scheme Application - Coming Soon!') },
    { icon: <FaGlobeAmericas />, title: 'Import Export', desc: 'Manage import/export operations', tag: 'Trade', onClick: () => alert('Import Export - Coming Soon!') },
    { icon: <FaHandshake />, title: 'Connect with Others', desc: 'Network with dairy professionals', tag: 'Network', onClick: () => navigate('/connect') },
    { icon: <FaComments />, title: 'Messaging', desc: 'Chat with your connections', tag: 'Live', isLive: true, onClick: () => navigate('/messaging') },
    { icon: <FaGraduationCap />, title: 'Internship Co', desc: 'Find dairy internship opportunities', tag: 'Career', onClick: () => navigate('/internships') },
    { icon: <FaCog />, title: 'Settings', desc: 'Manage your preferences', tag: 'Config', onClick: () => alert('Settings - Coming Soon!') },
  ]

  // Loading Screen
  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-content">
          <div className="loading-logo">
            <GiCow className="loading-cow" />
          </div>
          <div className="loading-bar-container">
            <div className="loading-bar"></div>
          </div>
          <h2>DairyHub</h2>
          <p>Fresh from the farm to your fingertips...</p>
          <div className="loading-icons">
            <GiMilkCarton /><GiWheat /><GiBarn />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`dashboard-container ${isDarkTheme ? 'dark-theme' : 'light-theme'} fade-in`}>
      
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-logo">
            <GiCow className="brand-icon" />
          </div>
          <span>DairyHub</span>
          <button className="close-sidebar" onClick={toggleSidebar}><FaTimes /></button>
        </div>
        <div className="sidebar-profile">
          <div className="profile-avatar"><FaUser /></div>
          <div className="profile-info">
            <h4>Zach</h4>
            <span>Farm Admin</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">
            <FaChartBar className="nav-icon-react" />
            <span>Dashboard</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/connect') }}>
            <FaHandshake className="nav-icon-react" />
            <span>Connect</span>
          </a>
          <a href="#" className="nav-item" onClick={(e) => { e.preventDefault(); navigate('/messaging') }}>
            <FaComments className="nav-icon-react" />
            <span>Messaging</span>
            <span className="sidebar-badge live-badge">Live</span>
          </a>
          <a href="#" className="nav-item">
            <FaBell className="nav-icon-react" />
            <span>Notifications</span>
            {unreadCount > 0 && <span className="sidebar-badge">{unreadCount}</span>}
          </a>
          <a href="#" className="nav-item">
            <FaGraduationCap className="nav-icon-react" />
            <span>Internships</span>
          </a>
          <a href="#" className="nav-item">
            <FaCog className="nav-icon-react" />
            <span>Settings</span>
          </a>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="sidebar-logout">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Main */}
      <main className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="hamburger-btn" onClick={toggleSidebar}>
              <FaBars />
            </button>
            <div className="topbar-brand">
              <GiCow className="topbar-logo" />
              <span>DairyHub</span>
            </div>
          </div>
          <div className="topbar-right">
            <div className="topbar-clock">
              <span className="clock-time">{formatTime()}</span>
            </div>
            <button onClick={toggleTheme} className="theme-toggle-btn" title={isDarkTheme ? 'Light Mode' : 'Dark Mode'}>
              {isDarkTheme ? <FaSun /> : <FaMoon />}
            </button>
            <button className="notif-btn">
              <FaBell />
              {unreadCount > 0 && <span className="notif-dot">{unreadCount}</span>}
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Hero */}
        <section className="hero-section">
          <div className="hero-bg-pattern"></div>
          <div className="hero-decor">
            <GiCow className="decor-cow" />
            <GiBarn className="decor-barn" />
            <GiGrass className="decor-grass" />
          </div>
          <div className="hero-text">
            <p className="hero-date"><FaLeaf className="date-leaf" /> {formatDate()}</p>
            <h1>{greeting()}, <span className="hero-name">Zach</span></h1>
            <p className="hero-subtitle">Your dairy farm operations at a glance</p>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <div className="stat-icon-wrap cowbg"><GiCow className="stat-icon" /></div>
              <div>
                <h4>24</h4>
                <span>Active Farms</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap milkbg"><GiWaterDrop className="stat-icon" /></div>
              <div>
                <h4>1,250 L</h4>
                <span>Today&apos;s Milk</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap barnbg"><GiBarn className="stat-icon" /></div>
              <div>
                <h4>8</h4>
                <span>Collection Centers</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon-wrap connectbg"><FaHandshake className="stat-icon" /></div>
              <div>
                <h4>142</h4>
                <span>Connections</span>
              </div>
            </div>
          </div>
        </section>

        {/* Milk Production Banner */}
        <section className="milk-banner">
          <div className="banner-item">
            <GiMilkCarton className="banner-icon" />
            <div>
              <h4>Today&apos;s Production</h4>
              <p>1,250 Litres collected from 24 farms</p>
            </div>
          </div>
          <div className="banner-divider"></div>
          <div className="banner-item">
            <GiWheat className="banner-icon" />
            <div>
              <h4>Feed Stock</h4>
              <p>3.2 Tonnes available in storage</p>
            </div>
          </div>
          <div className="banner-divider"></div>
          <div className="banner-item">
            <GiCow className="banner-icon" />
            <div>
              <h4>Cattle Health</h4>
              <p>All cattle in good condition</p>
            </div>
          </div>
        </section>

        {/* Dashboard Body */}
        <div className="dashboard-body">
          {/* Cards */}
          <section className="cards-section">
            <div className="section-header">
              <h2>Quick Actions</h2>
              <div className="section-deco-group">
                <GiGrass className="section-deco" />
                <GiCow className="section-deco deco-sm" />
              </div>
            </div>
            <div className="dashboard-cards">
              {cards.map((card, index) => (
                <div 
                  className="card" 
                  key={index} 
                  onClick={card.onClick}
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="card-top">
                    <div className="card-icon-wrapper">{card.icon}</div>
                    <span className={`card-tag ${card.isLive ? 'live-tag' : ''}`}>{card.tag}</span>
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <div className="card-arrow"><FaArrowRight /></div>
                </div>
              ))}
            </div>
          </section>

          {/* Notifications */}
          <aside className="notifications-panel">
            <div className="notif-panel-header">
              <div className="notif-panel-title">
                <span className="live-dot"></span>
                <h3>Live Updates</h3>
                {unreadCount > 0 && <span className="unread-count">{unreadCount}</span>}
              </div>
              <button className="clear-all-btn" onClick={() => setNotifications([])}>Clear</button>
            </div>
            <div className="notif-list">
              {notifications.length === 0 ? (
                <div className="no-notifications">
                  <FaBell className="no-notif-icon" />
                  <p>All caught up!</p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    className={`notif-item ${notif.read ? 'read' : 'unread'}`}
                    onClick={() => markAsRead(notif.id)}
                  >
                    <div className="notif-icon-wrap">{notif.icon}</div>
                    <div className="notif-body">
                      <p>{notif.message}</p>
                      <span className="notif-time">{notif.time}</span>
                    </div>
                    {!notif.read && <div className="unread-dot"></div>}
                  </div>
                ))
              )}
            </div>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default Dashboard
