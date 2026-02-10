import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Pages/Login'
import Registration from './Pages/Registration'
import Dashboard from './Pages/Dashboard'
import ConnectWithOthers from './Pages/ConnectWithOthers'
import Messaging from './Pages/Messaging'
import Internships from './Pages/Internships'
import MembershipForm from './Pages/MembershipForm'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connect" element={<ConnectWithOthers />} />
        <Route path="/messaging" element={<Messaging />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/membership-form" element={<MembershipForm />} />
      </Routes>
    </Router>
  )
}

export default App
