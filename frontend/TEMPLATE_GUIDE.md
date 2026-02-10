# ST_Nation.docx Template Guide

## How to Create Your Template

Your `ST_Nation.docx` template should be a Word document with placeholders that will be replaced by the Python script.

### Template Structure

Create a Word document with the following content and placeholders:

---

## Page 1: Application Form

**INDIAN DAIRY ASSOCIATION**  
**STUDENT MEMBERSHIP APPLICATION FORM**

---

### 1. Name of Applicant (in capital letters)

| Field | Value |
|-------|-------|
| Title | {{title}} |
| First Name | {{first_name}} |
| Middle Name | {{middle_name}} |
| Last Name | {{last_name}} |

---

### 2. College Address

| Field | Value |
|-------|-------|
| Address | {{college_address}} |
| Pin Code | {{college_pincode}} |

---

### 3. Residential Address

| Field | Value |
|-------|-------|
| Address | {{residential_address}} |
| Pin Code | {{residential_pincode}} |

---

### 4. Mailing Address & Contact Details

| Field | Value |
|-------|-------|
| Mailing Address Type | {{mailing_address_type}} (College / Residence) |
| Phone | {{phone}} |
| Mobile | {{mobile}} |
| E-mail | {{email}} |

---

### 5. Qualifications

| Degree/Diploma | University/Institution | Years Awarded |
|----------------|------------------------|---------------|
| {{qualifications_table}} | | |

*Note: The {{qualifications_table}} marker will be replaced with actual qualification rows*

---

### 6. Present Status

| Course | Year |
|--------|------|
| {{course}} | {{year}} |

---

### 7. Date of Birth

| Day | Month | Year |
|-----|-------|------|
| {{dob_day}} | {{dob_month}} | {{dob_year}} |

---

### 8. Name of the Course

{{course_name}}

**Duration of Course:**  
From: {{duration_from_month}} {{duration_from_year}}  
To: {{duration_to_month}} {{duration_to_year}}

---

### Declaration

The above information is true to the best of my knowledge and belief. If admitted to the Association I undertake to abide by the Constitution of the Association as contained therein or as amended.

Date: {{payment_date}}

(Signature of the applicant)

---

### 9. Eligibility Criteria:

• Any person who is a student for diploma or bachelor's degree in any stream of dairy science and not employed by any organisation or drawing any salary, is eligible for under-graduate student membership.

• Any person who is a student for post-graduate or Doctorate Programme in any stream of dairy science and not employed by any organisation or drawing any salary is eligible for student membership.

**P.T.O.**

---

## Page 2: Payment Details

### 10. Payment Information

**UTR No. / DD No. / Cheque at par:** {{utr_no}}  
**Date:** {{payment_date}}  
**Name of the Bank:** {{bank_name}}

---

**BANK DETAILS:**  
Name: Indian Dairy Association  
SB a/c No: 90562170000024  
IFSC: CNRB0019009  
Bank: Canara Bank  
Branch Address: Delhi Tamil Sangam Building, Sector-V, R.K. Puram, New Delhi.

---

| Fee Description | Amount |
|----------------|--------|
| STUDENT MEMBERSHIP FEE (PER COURSE) @ (Rs. 700 + GST@18%) | TOTAL: Rs. 826/- Including GST |

---

### 11. Note

Only Soft copy of the journal will be shared on the registered Email ID.

---

## Placeholder Reference

Use these placeholders in your template:

### Personal Information
- `{{title}}` - Mr/Ms/Dr
- `{{first_name}}` - First name in capitals
- `{{middle_name}}` - Middle name in capitals
- `{{last_name}}` - Last name in capitals

### Address Information
- `{{college_address}}` - Full college address
- `{{college_pincode}}` - College PIN code
- `{{residential_address}}` - Full residential address
- `{{residential_pincode}}` - Residential PIN code
- `{{mailing_address_type}}` - College or Residence

### Contact Information
- `{{phone}}` - Phone number
- `{{mobile}}` - Mobile number
- `{{email}}` - Email address

### Academic Information
- `{{course}}` - Current course name
- `{{year}}` - Current year of study
- `{{course_name}}` - Full name of the course
- `{{duration_from_month}}` - Course start month
- `{{duration_from_year}}` - Course start year
- `{{duration_to_month}}` - Course end month
- `{{duration_to_year}}` - Course end year

### Date of Birth
- `{{dob_day}}` - Day
- `{{dob_month}}` - Month
- `{{dob_year}}` - Year

### Payment Information
- `{{utr_no}}` - UTR/DD/Cheque number
- `{{payment_date}}` - Payment date
- `{{bank_name}}` - Bank name

### Special Table Markers
- `{{qualifications_table}}` - Place this in the first data row of qualifications table

---

## Tips for Creating the Template

1. **Use Tables**: Create tables in Word for structured data sections
2. **Formatting**: Apply the formatting you want (bold, italic, font sizes) directly in the template
3. **Placeholders**: Type placeholders exactly as shown (case-sensitive)
4. **Table Marker**: For the qualifications table, create a 3-column table with headers, then put `{{qualifications_table}}` in the first cell of the first data row

---

## Example: Creating Qualifications Table in Template

1. Insert a 3-column table
2. Row 1 (Header): `Degree/Diploma` | `University/Institution` | `Years Awarded`
3. Row 2 (Data row): `{{qualifications_table}}` | (leave empty) | (leave empty)

The script will replace the marker row with actual qualification data.
