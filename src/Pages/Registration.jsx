import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaUser, FaBuilding } from 'react-icons/fa'
import './Registration.css'

const CATEGORIES = [
  'Dairy Farm',
  'Cooling Center',
  'Supply Chain',
  'Milk Equipment',
  'Milk Processing',
  'Distribution',
]

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
]

function Registration() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [errors, setErrors] = useState({})

  const [formData, setFormData] = useState({
    // Step 0 - Registration Type
    registrationType: 'individual',

    // Step 1 - General Details
    fullName: 'John Kumar Sharma',
    aadharNumber: '123456789012',
    panCard: 'ABCDE1234F',
    email: 'john.sharma@example.com',
    phoneNumber: '9876543210',
    gstNumber: '27ABCDE1234F1Z5',

    // Step 2 - Company Details (only if company)
    companyName: 'ABC Dairy Pvt Ltd',
    companyId: 'COMP123456',
    category: ['Dairy Farm'],
    companyGst: '27ABCDE1234F1Z5',
    fssaiNumber: '12345678901234',
    idaMembership: 'IDA2026001234',

    // Step 3 - Location
    addressLine1: 'Plot No. 123, MG Road',
    addressLine2: 'Near City Hospital, 2nd Floor',
    city: 'Mumbai',
    district: 'Mumbai Suburban',
    companyLocation: 'Andheri West Branch',
    state: 'Maharashtra',
  })

  const steps = formData.registrationType === 'company'
    ? [
        { label: 'Registration Type', icon: '1' },
        { label: 'General Details', icon: '2' },
        { label: 'Company Details', icon: '3' },
        { label: 'Location', icon: '4' },
      ]
    : [
        { label: 'Registration Type', icon: '1' },
        { label: 'General Details', icon: '2' },
        { label: 'Location', icon: '3' },
      ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleCategoryToggle = (cat) => {
    setFormData((prev) => {
      const cats = prev.category.includes(cat)
        ? prev.category.filter((c) => c !== cat)
        : [...prev.category, cat]
      return { ...prev, category: cats }
    })
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: '' }))
    }
  }

  // ── Validation ──
  const validateStep = () => {
    const newErrors = {}

    if (currentStep === 0) {
      if (!formData.registrationType) {
        newErrors.registrationType = 'Please select a registration type'
      }
    }

    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required'
      if (!formData.aadharNumber.trim()) {
        newErrors.aadharNumber = 'Aadhar number is required'
      } else if (!/^\d{12}$/.test(formData.aadharNumber.replace(/\s/g, ''))) {
        newErrors.aadharNumber = 'Aadhar must be 12 digits'
      }
      if (!formData.panCard.trim()) {
        newErrors.panCard = 'PAN card is required'
      } else if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(formData.panCard.toUpperCase())) {
        newErrors.panCard = 'Invalid PAN format (e.g. ABCDE1234F)'
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required'
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address'
      }
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required'
      } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
        newErrors.phoneNumber = 'Phone number must be 10 digits'
      }
      if (!formData.gstNumber.trim()) {
        newErrors.gstNumber = 'GST number is required'
      } else if (!/^\d{2}[A-Z]{5}\d{4}[A-Z]\d[Z][A-Z\d]$/.test(formData.gstNumber.toUpperCase())) {
        newErrors.gstNumber = 'Invalid GST format'
      }
    }

    // Company Details step (only when registrationType is company)
    if (formData.registrationType === 'company' && currentStep === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required'
      if (!formData.companyId.trim()) newErrors.companyId = 'Company ID is required'
      if (formData.category.length === 0) newErrors.category = 'Select at least one category'
      if (!formData.fssaiNumber.trim()) newErrors.fssaiNumber = 'FSSAI number is required'
    }

    // Location step
    const locationStep = formData.registrationType === 'company' ? 3 : 2
    if (currentStep === locationStep) {
      if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address Line 1 is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.district.trim()) newErrors.district = 'District is required'
      if (!formData.state) newErrors.state = 'State is required'
      if (formData.registrationType === 'company' && !formData.companyLocation.trim()) {
        newErrors.companyLocation = 'Company location is required'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const handleFinish = () => {
    if (validateStep()) {
      navigate('/dashboard')
    }
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  const handleLogout = () => {
    navigate('/')
  }

  const isLastStep = currentStep === steps.length - 1

  // ── Render helpers ──
  const renderStepContent = () => {
    if (currentStep === 0) return renderRegistrationType()
    if (currentStep === 1) return renderGeneralDetails()
    if (formData.registrationType === 'company' && currentStep === 2) return renderCompanyDetails()
    return renderLocation()
  }

  /* ─── Step 0: Registration Type ─── */
  const renderRegistrationType = () => (
    <div className="step-content">
      <h2 className="step-title">How would you like to register?</h2>
      <p className="step-subtitle">Select your registration type to get started</p>

      <div className="type-cards">
        <div
          className={`type-card ${formData.registrationType === 'individual' ? 'selected' : ''}`}
          onClick={() => {
            setFormData((prev) => ({ ...prev, registrationType: 'individual' }))
            setErrors({})
          }}
        >
          <div className="type-icon"><FaUser /></div>
          <h3>Individual</h3>
          <p>Register as an individual dairy professional</p>
        </div>

        <div
          className={`type-card ${formData.registrationType === 'company' ? 'selected' : ''}`}
          onClick={() => {
            setFormData((prev) => ({ ...prev, registrationType: 'company' }))
            setErrors({})
          }}
        >
          <div className="type-icon"><FaBuilding /></div>
          <h3>Company</h3>
          <p>Register as an organization or business</p>
        </div>
      </div>
      {errors.registrationType && <span className="field-error center-error">{errors.registrationType}</span>}
    </div>
  )

  /* ─── Step 1: General Details ─── */
  const renderGeneralDetails = () => (
    <div className="step-content">
      <h2 className="step-title">General Details</h2>
      <p className="step-subtitle">Provide your personal identification details</p>

      <div className="form-grid">
        <div className="reg-field">
          <label>Full Name <span className="required">*</span></label>
          <input name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Kumar Sharma" />
          {errors.fullName && <span className="field-error">{errors.fullName}</span>}
        </div>

        <div className="reg-field">
          <label>Aadhar Number <span className="required">*</span></label>
          <input name="aadharNumber" value={formData.aadharNumber} onChange={handleChange} placeholder="123456789012" maxLength={12} />
          {errors.aadharNumber && <span className="field-error">{errors.aadharNumber}</span>}
        </div>

        <div className="reg-field">
          <label>PAN Card <span className="required">*</span></label>
          <input name="panCard" value={formData.panCard} onChange={handleChange} placeholder="ABCDE1234F" maxLength={10} style={{ textTransform: 'uppercase' }} />
          {errors.panCard && <span className="field-error">{errors.panCard}</span>}
        </div>

        <div className="reg-field">
          <label>Email <span className="required">*</span></label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="john.sharma@example.com" />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="reg-field">
          <label>Phone Number <span className="required">*</span></label>
          <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="9876543210" maxLength={10} />
          {errors.phoneNumber && <span className="field-error">{errors.phoneNumber}</span>}
        </div>

        <div className="reg-field">
          <label>GST Number <span className="required">*</span></label>
          <input name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="27ABCDE1234F1Z5" maxLength={15} style={{ textTransform: 'uppercase' }} />
          {errors.gstNumber && <span className="field-error">{errors.gstNumber}</span>}
        </div>
      </div>
    </div>
  )

  /* ─── Step 2: Company Details ─── */
  const renderCompanyDetails = () => (
    <div className="step-content">
      <h2 className="step-title">Company Details</h2>
      <p className="step-subtitle">Tell us about your organization</p>

      <div className="form-grid">
        <div className="reg-field">
          <label>Company Name <span className="required">*</span></label>
          <input name="companyName" value={formData.companyName} onChange={handleChange} placeholder="ABC Dairy Pvt Ltd" />
          {errors.companyName && <span className="field-error">{errors.companyName}</span>}
        </div>

        <div className="reg-field">
          <label>Company ID <span className="required">*</span></label>
          <input name="companyId" value={formData.companyId} onChange={handleChange} placeholder="COMP123456" />
          {errors.companyId && <span className="field-error">{errors.companyId}</span>}
        </div>
      </div>

      <div className="reg-field full-width">
        <label>Category <span className="required">*</span></label>
        <div className="category-grid">
          {CATEGORIES.map((cat) => (
            <div
              key={cat}
              className={`category-chip ${formData.category.includes(cat) ? 'active' : ''}`}
              onClick={() => handleCategoryToggle(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
        {errors.category && <span className="field-error">{errors.category}</span>}
      </div>

      <div className="form-grid">
        <div className="reg-field">
          <label>Company GST</label>
          <input name="companyGst" value={formData.companyGst} onChange={handleChange} placeholder="27ABCDE1234F1Z5" style={{ textTransform: 'uppercase' }} />
        </div>

        <div className="reg-field">
          <label>FSSAI Number <span className="required">*</span></label>
          <input name="fssaiNumber" value={formData.fssaiNumber} onChange={handleChange} placeholder="12345678901234" />
          {errors.fssaiNumber && <span className="field-error">{errors.fssaiNumber}</span>}
        </div>

        <div className="reg-field">
          <label>IDA Membership</label>
          <input name="idaMembership" value={formData.idaMembership} onChange={handleChange} placeholder="IDA2026001234" />
        </div>
      </div>
    </div>
  )

  /* ─── Step 3 / 2: Location ─── */
  const renderLocation = () => (
    <div className="step-content">
      <h2 className="step-title">Location Details</h2>
      <p className="step-subtitle">Where are you located?</p>

      <div className="form-grid">
        <div className="reg-field full-width">
          <label>Address Line 1 <span className="required">*</span></label>
          <input name="addressLine1" value={formData.addressLine1} onChange={handleChange} placeholder="Plot No. 123, MG Road" />
          {errors.addressLine1 && <span className="field-error">{errors.addressLine1}</span>}
        </div>

        <div className="reg-field full-width">
          <label>Address Line 2</label>
          <input name="addressLine2" value={formData.addressLine2} onChange={handleChange} placeholder="Near City Hospital, 2nd Floor" />
        </div>

        <div className="reg-field">
          <label>City <span className="required">*</span></label>
          <input name="city" value={formData.city} onChange={handleChange} placeholder="Mumbai" />
          {errors.city && <span className="field-error">{errors.city}</span>}
        </div>

        <div className="reg-field">
          <label>District <span className="required">*</span></label>
          <input name="district" value={formData.district} onChange={handleChange} placeholder="Mumbai Suburban" />
          {errors.district && <span className="field-error">{errors.district}</span>}
        </div>

        {formData.registrationType === 'company' && (
          <div className="reg-field">
            <label>Company Location <span className="required">*</span></label>
            <input name="companyLocation" value={formData.companyLocation} onChange={handleChange} placeholder="Andheri West Branch" />
            {errors.companyLocation && <span className="field-error">{errors.companyLocation}</span>}
          </div>
        )}

        <div className="reg-field">
          <label>State <span className="required">*</span></label>
          <select name="state" value={formData.state} onChange={handleChange}>
            <option value="">Select State</option>
            {STATES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.state && <span className="field-error">{errors.state}</span>}
        </div>
      </div>
    </div>
  )

  return (
    <div className="registration-container">
      <div className="registration-card">
        {/* Header */}
        <div className="reg-header">
          <h1>Complete Your Registration</h1>
          <div className="header-buttons">
            <button className="skip-btn" onClick={handleSkip}>Skip →</button>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* Stepper */}
        <div className="stepper">
          {steps.map((step, index) => (
            <div key={index} className={`stepper-item ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}>
              <div className="stepper-circle">
                {index < currentStep ? '✓' : step.icon}
              </div>
              <span className="stepper-label">{step.label}</span>
              {index < steps.length - 1 && <div className="stepper-line" />}
            </div>
          ))}
        </div>

        {/* Form Content */}
        {renderStepContent()}

        {/* Buttons */}
        <div className="reg-buttons">
          {currentStep > 0 && (
            <button className="back-btn" onClick={handleBack}>← Back</button>
          )}
          <div className="right-buttons">
            {isLastStep ? (
              <button className="finish-btn" onClick={handleFinish}>Finish ✓</button>
            ) : (
              <button className="next-btn" onClick={handleNext}>Next →</button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Registration
