# Membership Form Generator - Quick Start

## Installation

1. Install the required package:
```bash
pip install python-docx
```

Or using the requirements file:
```bash
pip install -r requirements_docx.txt
```

## Usage

### Option 1: Using a Template (Recommended)

1. Create `ST_Nation.docx` template following the guide in `TEMPLATE_GUIDE.md`
2. Update the data variables in `fill_membership_form.py` if needed
3. Run the script:
```bash
python fill_membership_form.py
```

The script will generate `Filled_Membership_Form.docx`

### Option 2: Generate Without Template

If you don't have a template, the script will automatically create a complete form from scratch using the predefined data.

## Customizing Data

Edit the variables in `fill_membership_form.py`:

```python
# Applicant personal data
applicant_data = {
    'title': 'Mr',
    'first_name': 'RAHUL',
    'middle_name': 'KUMAR',
    'last_name': 'SHARMA',
    # ... update with your data
}

# Education qualifications
qualifications = [
    {
        'degree': '12th (Senior Secondary)',
        'university': 'CBSE Board',
        'year': '2022'
    },
    # Add more qualifications
]
```

## File Structure

```
├── fill_membership_form.py      # Main script
├── ST_Nation.docx               # Template (you create this)
├── Filled_Membership_Form.docx  # Generated output
├── TEMPLATE_GUIDE.md            # Template creation guide
├── requirements_docx.txt        # Python dependencies
└── README_DOCX.md              # This file
```

## Features

✅ Automatic placeholder replacement  
✅ Dynamic table population  
✅ Predefined data variables  
✅ Multiple qualifications support  
✅ Fallback to scratch generation if template is missing  
✅ Professional formatting

## Template Placeholders

Use these in your `ST_Nation.docx`:

- `{{first_name}}`, `{{middle_name}}`, `{{last_name}}`
- `{{college_address}}`, `{{college_pincode}}`
- `{{phone}}`, `{{mobile}}`, `{{email}}`
- `{{course}}`, `{{year}}`
- `{{dob_day}}`, `{{dob_month}}`, `{{dob_year}}`
- `{{qualifications_table}}` - Special marker for table data
- And more... (see TEMPLATE_GUIDE.md)

## Examples

### Update Applicant Name
```python
applicant_data['first_name'] = 'PRIYA'
applicant_data['middle_name'] = 'SINGH'
applicant_data['last_name'] = 'PATEL'
```

### Add More Qualifications
```python
qualifications.append({
    'degree': 'M.Sc. Dairy Microbiology',
    'university': 'NDRI, Karnal',
    'year': '2024'
})
```

## Troubleshooting

**Error: "No module named 'docx'"**
- Solution: Run `pip install python-docx`

**Error: "Template file 'ST_Nation.docx' not found"**
- Solution: Either create the template or let the script generate from scratch

**Template not updating correctly**
- Check that placeholders are typed exactly: `{{placeholder_name}}`
- Ensure no extra spaces: ❌ `{{ first_name }}` ✅ `{{first_name}}`

## Support

For detailed template creation instructions, see `TEMPLATE_GUIDE.md`
