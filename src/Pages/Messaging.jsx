import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Messaging.css'

function Messaging() {
  const navigate = useNavigate()
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageInput, setMessageInput] = useState('')
  
  // Get connected people from localStorage
  const getConnectedPeople = () => {
    const connected = localStorage.getItem('connectedPeople')
    return connected ? JSON.parse(connected) : []
  }

  const [connectedPeople] = useState(getConnectedPeople())

  // Sample contacts with messages
  const [contacts] = useState([
    {
      id: 1,
      name: 'Rajesh Kumar',
      title: 'Dairy Farm Owner',
      location: 'Mumbai, Maharashtra',
      image: '👨‍🌾',
      online: true,
      lastMessage: 'Thanks for connecting! Looking forward to collaborate.',
      lastMessageTime: '2 min ago',
      unread: 2
    },
    {
      id: 2,
      name: 'Priya Sharma',
      title: 'Milk Quality Analyst',
      location: 'Pune, Maharashtra',
      image: '👩‍🔬',
      online: true,
      lastMessage: 'Can we schedule a call tomorrow?',
      lastMessageTime: '15 min ago',
      unread: 1
    },
    {
      id: 3,
      name: 'Amit Patel',
      title: 'Cold Chain Logistics Manager',
      location: 'Ahmedabad, Gujarat',
      image: '👨‍💼',
      online: false,
      lastMessage: 'I have some insights about cold storage solutions.',
      lastMessageTime: '1 hour ago',
      unread: 0
    },
    {
      id: 6,
      name: 'Anita Desai',
      title: 'Dairy Cooperative Manager',
      location: 'Anand, Gujarat',
      image: '👩‍💼',
      online: true,
      lastMessage: 'Would love to discuss cooperative models with you.',
      lastMessageTime: '2 hours ago',
      unread: 0
    },
    {
      id: 9,
      name: 'Rahul Verma',
      title: 'Milk Distribution Head',
      location: 'Delhi, NCR',
      image: '👨‍💼',
      online: false,
      lastMessage: 'Great to connect! Let me know if you need any help.',
      lastMessageTime: '3 hours ago',
      unread: 0
    }
  ])

  // Sample messages for each contact
  const [messages] = useState({
    1: [
      { id: 1, sender: 'them', text: 'Hi! Thanks for connecting.', time: '10:30 AM' },
      { id: 2, sender: 'me', text: 'Hello Rajesh! Glad to connect with you.', time: '10:32 AM' },
      { id: 3, sender: 'them', text: 'I saw your profile. Are you into dairy farming?', time: '10:35 AM' },
      { id: 4, sender: 'me', text: 'Yes, I am. How about you?', time: '10:36 AM' },
      { id: 5, sender: 'them', text: 'I run a dairy farm in Mumbai. We supply to local dairies.', time: '10:38 AM' },
      { id: 6, sender: 'them', text: 'Thanks for connecting! Looking forward to collaborate.', time: '10:40 AM' }
    ],
    2: [
      { id: 1, sender: 'them', text: 'Hello! Nice to meet you.', time: '9:15 AM' },
      { id: 2, sender: 'me', text: 'Hi Priya! Great to connect.', time: '9:20 AM' },
      { id: 3, sender: 'them', text: 'I work on milk quality testing. Do you need any consultation?', time: '9:25 AM' },
      { id: 4, sender: 'me', text: 'That would be helpful. What are your rates?', time: '9:30 AM' },
      { id: 5, sender: 'them', text: 'Can we schedule a call tomorrow?', time: '9:45 AM' }
    ],
    3: [
      { id: 1, sender: 'them', text: 'Hi there!', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'Hello Amit!', time: 'Yesterday' },
      { id: 3, sender: 'them', text: 'I have some insights about cold storage solutions.', time: 'Yesterday' },
      { id: 4, sender: 'me', text: 'That sounds interesting. Please share.', time: 'Yesterday' }
    ],
    6: [
      { id: 1, sender: 'them', text: 'Great to connect with you!', time: '8:00 AM' },
      { id: 2, sender: 'me', text: 'Likewise! I have been following your work.', time: '8:15 AM' },
      { id: 3, sender: 'them', text: 'Would love to discuss cooperative models with you.', time: '8:30 AM' }
    ],
    9: [
      { id: 1, sender: 'them', text: 'Hello!', time: 'Yesterday' },
      { id: 2, sender: 'me', text: 'Hi Rahul!', time: 'Yesterday' },
      { id: 3, sender: 'them', text: 'Great to connect! Let me know if you need any help.', time: 'Yesterday' }
    ]
  })

  const handleBack = () => {
    navigate('/dashboard')
  }

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      // In a real app, this would send the message to the server
      setMessageInput('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const totalUnread = contacts.reduce((sum, contact) => sum + contact.unread, 0)

  return (
    <div className="messaging-container">
      <div className="messaging-header">
        <button className="back-btn" onClick={handleBack}>
          ← Back to Dashboard
        </button>
        <h1>Messaging</h1>
        <div className="header-info">
          {totalUnread > 0 && (
            <span className="total-unread">{totalUnread} unread message{totalUnread !== 1 ? 's' : ''}</span>
          )}
        </div>
      </div>

      <div className="messaging-layout">
        {/* Contacts Sidebar */}
        <div className="contacts-sidebar">
          <div className="sidebar-header">
            <h2>Conversations</h2>
            <span className="contacts-count">{contacts.length}</span>
          </div>
          
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search messages..." />
          </div>

          <div className="contacts-list">
            {contacts.length === 0 ? (
              <div className="no-contacts">
                <span className="no-contacts-icon">💬</span>
                <p>No conversations yet</p>
                <button onClick={() => navigate('/connect')} className="connect-people-btn">
                  Connect with People
                </button>
              </div>
            ) : (
              contacts.map((contact) => (
                <div
                  key={contact.id}
                  className={`contact-item ${selectedChat?.id === contact.id ? 'active' : ''}`}
                  onClick={() => setSelectedChat(contact)}
                >
                  <div className="contact-avatar">
                    {contact.image}
                    {contact.online && <div className="online-indicator"></div>}
                  </div>
                  <div className="contact-info">
                    <div className="contact-header">
                      <h3>{contact.name}</h3>
                      <span className="message-time">{contact.lastMessageTime}</span>
                    </div>
                    <p className="contact-title">{contact.title}</p>
                    <p className="last-message">
                      {contact.lastMessage}
                    </p>
                  </div>
                  {contact.unread > 0 && (
                    <div className="unread-badge">{contact.unread}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {selectedChat ? (
            <>
              <div className="chat-header">
                <div className="chat-user-info">
                  <div className="chat-avatar">
                    {selectedChat.image}
                    {selectedChat.online && <div className="online-indicator"></div>}
                  </div>
                  <div>
                    <h3>{selectedChat.name}</h3>
                    <p className="user-status">
                      {selectedChat.online ? '🟢 Online' : '⚫ Offline'} • {selectedChat.title}
                    </p>
                  </div>
                </div>
                <div className="chat-actions">
                  <button className="action-btn" title="Voice Call">📞</button>
                  <button className="action-btn" title="Video Call">📹</button>
                  <button className="action-btn" title="More Options">⋮</button>
                </div>
              </div>

              <div className="messages-container">
                {messages[selectedChat.id]?.map((message) => (
                  <div key={message.id} className={`message ${message.sender}`}>
                    <div className="message-bubble">
                      <p>{message.text}</p>
                      <span className="message-time">{message.time}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="message-input-area">
                <button className="attach-btn" title="Attach file">📎</button>
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  className="message-input"
                />
                <button className="emoji-btn" title="Add emoji">😊</button>
                <button 
                  className="send-btn" 
                  onClick={handleSendMessage}
                  disabled={!messageInput.trim()}
                >
                  ➤
                </button>
              </div>
            </>
          ) : (
            <div className="no-chat-selected">
              <div className="no-chat-content">
                <span className="no-chat-icon">💬</span>
                <h3>Select a conversation</h3>
                <p>Choose a contact from the left to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messaging
