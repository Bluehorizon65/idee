import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaFileAlt, FaUser, FaGraduationCap, FaCalendar, FaCreditCard } from 'react-icons/fa'
import { GiCow } from 'react-icons/gi'
import './MembershipForm.css'

function MembershipForm() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
  const [formData, setFormData] = useState({
    title: 'Mr',
    first_name: '',
    middle_name: '',
    last_name: '',
    college_address: '',
    college_pincode: '',
    residential_address: '',
    residential_pincode: '',
    mailing_address_type: 'College',
    phone: '',
    mobile: '',
    email: '',
    course: '',
    year: '',
    dob_day: '',
    dob_month: '',
    dob_year: '',
    course_name: '',
    duration_from_month: '',
    duration_from_year: '',
    duration_to_month: '',
    duration_to_year: '',
    utr_no: '',
    payment_date: '',
    bank_name: ''
  })

  const [qualifications, setQualifications] = useState([
    { degree: '', university: '', year: '' }
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleQualificationChange = (index, field, value) => {
    const updated = [...qualifications]
    updated[index][field] = value
    setQualifications(updated)
  }

  const addQualification = () => {
    setQualifications([...qualifications, { degree: '', university: '', year: '' }])
  }

  const removeQualification = (index) => {
    const updated = qualifications.filter((_, i) => i !== index)
    setQualifications(updated)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'
      const response = await fetch(`${API_BASE}/api/generate-form`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          qualifications: qualifications
        }),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `IDA_Membership_${formData.first_name}_${formData.last_name}.docx`
        document.body.appendChild(a)
        a.click()
        a.remove()
        window.URL.revokeObjectURL(url)
        
        alert('Form generated successfully! Check your downloads.')
      } else {
        alert('Error generating form. Please try again.')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error connecting to server. Please make sure the Flask server is running.')
    } finally {
      setLoading(false)
    }
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  return (
    <div className="membership-form-container">
      {/* Header */}
      <header className="form-header">
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <div className="form-brand">
          <GiCow className="form-logo" />
          <h1>IDA Student Membership Application</h1>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(currentStep / 4) * 100}%` }}></div>
        </div>
        <div className="progress-steps">
          <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
            <FaUser /> <span>Personal Info</span>
          </div>
          <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
            <FaGraduationCap /> <span>Education</span>
          </div>
          <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
            <FaCalendar /> <span>Course Details</span>
          </div>
          <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
            <FaCreditCard /> <span>Payment</span>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="membership-form" onSubmit={handleSubmit}>
        
        {/* Step 1: Personal Information */}
        {currentStep === 1 && (
          <div className="form-step">
            <h2><FaUser /> Personal Information</h2>
            
            <div className="form-row">
              <div className="form-group small">
                <label>Title *</label>
                <select name="title" value={formData.title} onChange={handleInputChange} required>
                  <option value="Mr">Mr</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Dr">Dr</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>First Name *</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} required />
              </div>
              
              <div className="form-group">
                <label>Middle Name</label>
                <input type="text" name="middle_name" value={formData.middle_name} onChange={handleInputChange} />
              </div>
              
              <div className="form-group">
                <label>Last Name *</label>
                <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>College Address *</label>
                <textarea name="college_address" value={formData.college_address} onChange={handleInputChange} required rows="3"></textarea>
              </div>
              
              <div className="form-group small">
                <label>Pin Code *</label>
                <input type="text" name="college_pincode" value={formData.college_pincode} onChange={handleInputChange} maxLength="6" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Residential Address *</label>
                <textarea name="residential_address" value={formData.residential_address} onChange={handleInputChange} required rows="3"></textarea>
              </div>
              
              <div className="form-group small">
                <label>Pin Code *</label>
                <input type="text" name="residential_pincode" value={formData.residential_pincode} onChange={handleInputChange} maxLength="6" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mailing Address *</label>
                <div className="radio-group">
                  <label>
                    <input type="radio" name="mailing_address_type" value="College" checked={formData.mailing_address_type === 'College'} onChange={handleInputChange} />
                    College
                  </label>
                  <label>
                    <input type="radio" name="mailing_address_type" value="Residence" checked={formData.mailing_address_type === 'Residence'} onChange={handleInputChange} />
                    Residence
                  </label>
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} />
              </div>
              
              <div className="form-group">
                <label>Mobile *</label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleInputChange} required />
              </div>
              
              <div className="form-group">
                <label>Email *</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group small">
                <label>DOB Day *</label>
                <input type="text" name="dob_day" value={formData.dob_day} onChange={handleInputChange} placeholder="15" maxLength="2" required />
              </div>
              
              <div className="form-group">
                <label>DOB Month *</label>
                <input type="text" name="dob_month" value={formData.dob_month} onChange={handleInputChange} placeholder="March" required />
              </div>
              
              <div className="form-group small">
                <label>DOB Year *</label>
                <input type="text" name="dob_year" value={formData.dob_year} onChange={handleInputChange} placeholder="2005" maxLength="4" required />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-next" onClick={nextStep}>Next Step</button>
            </div>
          </div>
        )}

        {/* Step 2: Education/Qualifications */}
        {currentStep === 2 && (
          <div className="form-step">
            <h2><FaGraduationCap /> Educational Qualifications</h2>
            
            {qualifications.map((qual, index) => (
              <div key={index} className="qualification-item">
                <h4>Qualification {index + 1}</h4>
                <div className="form-row">
                  <div className="form-group">
                    <label>Degree/Diploma *</label>
                    <input 
                      type="text" 
                      value={qual.degree} 
                      onChange={(e) => handleQualificationChange(index, 'degree', e.target.value)}
                      placeholder="e.g., 12th (Senior Secondary)"
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>University/Institution *</label>
                    <input 
                      type="text" 
                      value={qual.university} 
                      onChange={(e) => handleQualificationChange(index, 'university', e.target.value)}
                      placeholder="e.g., CBSE Board"
                      required 
                    />
                  </div>
                  
                  <div className="form-group small">
                    <label>Year *</label>
                    <input 
                      type="text" 
                      value={qual.year} 
                      onChange={(e) => handleQualificationChange(index, 'year', e.target.value)}
                      placeholder="2022"
                      maxLength="4"
                      required 
                    />
                  </div>
                  
                  {qualifications.length > 1 && (
                    <button type="button" className="btn-remove" onClick={() => removeQualification(index)}>Remove</button>
                  )}
                </div>
              </div>
            ))}

            <button type="button" className="btn-add" onClick={addQualification}>+ Add Another Qualification</button>

            <div className="form-actions">
              <button type="button" className="btn-prev" onClick={prevStep}>Previous</button>
              <button type="button" className="btn-next" onClick={nextStep}>Next Step</button>
            </div>
          </div>
        )}

        {/* Step 3: Course Details */}
        {currentStep === 3 && (
          <div className="form-step">
            <h2><FaCalendar /> Current Course Details</h2>
            
            <div className="form-row">
              <div className="form-group">
                <label>Present Course *</label>
                <input type="text" name="course" value={formData.course} onChange={handleInputChange} placeholder="e.g., B.Tech Dairy Technology" required />
              </div>
              
              <div className="form-group small">
                <label>Year *</label>
                <input type="text" name="year" value={formData.year} onChange={handleInputChange} placeholder="3rd Year" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full">
                <label>Full Course Name *</label>
                <input type="text" name="course_name" value={formData.course_name} onChange={handleInputChange} placeholder="e.g., Bachelor of Technology in Dairy Technology" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Course Start Month *</label>
                <input type="text" name="duration_from_month" value={formData.duration_from_month} onChange={handleInputChange} placeholder="August" required />
              </div>
              
              <div className="form-group small">
                <label>Year *</label>
                <input type="text" name="duration_from_year" value={formData.duration_from_year} onChange={handleInputChange} placeholder="2022" maxLength="4" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Course End Month *</label>
                <input type="text" name="duration_to_month" value={formData.duration_to_month} onChange={handleInputChange} placeholder="May" required />
              </div>
              
              <div className="form-group small">
                <label>Year *</label>
                <input type="text" name="duration_to_year" value={formData.duration_to_year} onChange={handleInputChange} placeholder="2026" maxLength="4" required />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-prev" onClick={prevStep}>Previous</button>
              <button type="button" className="btn-next" onClick={nextStep}>Next Step</button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Details */}
        {currentStep === 4 && (
          <div className="form-step">
            <h2><FaCreditCard /> Payment Details</h2>
            
            <div className="payment-info-box">
              <h3>Student Membership Fee</h3>
              <p className="fee-amount">₹826/- (Including GST)</p>
              <p className="fee-details">Rs. 700 + GST@18%</p>
            </div>

            <div className="bank-details-box">
              <h4>Bank Account Details</h4>
              <p><strong>Account Name:</strong> Indian Dairy Association</p>
              <p><strong>Account Number:</strong> 90562170000024</p>
              <p><strong>IFSC Code:</strong> CNRB0019009</p>
              <p><strong>Bank:</strong> Canara Bank</p>
              <p><strong>Branch:</strong> Delhi Tamil Sangam Building, Sector-V, R.K. Puram, New Delhi</p>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>UTR No. / DD No. / Cheque No. *</label>
                <input type="text" name="utr_no" value={formData.utr_no} onChange={handleInputChange} placeholder="DD123456789" required />
              </div>
              
              <div className="form-group">
                <label>Payment Date *</label>
                <input type="text" name="payment_date" value={formData.payment_date} onChange={handleInputChange} placeholder="05/02/2026" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group full">
                <label>Bank Name *</label>
                <input type="text" name="bank_name" value={formData.bank_name} onChange={handleInputChange} placeholder="State Bank of India" required />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-prev" onClick={prevStep}>Previous</button>
              <button type="submit" className="btn-submit" disabled={loading}>
                {loading ? (
                  <>
                    <span className="spinner"></span> Generating Form...
                  </>
                ) : (
                  <>
                    <FaFileAlt /> Generate & Download Form
                  </>
                )}
              </button>
            </div>
          </div>
        )}

      </form>
    </div>
  )
}

export default MembershipForm
