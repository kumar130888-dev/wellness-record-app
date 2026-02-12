# Wellness Record Web Application

A comprehensive React-based web application for managing wellness records with PDF generation capabilities.

## Features

✅ **Complete Patient Information Collection**

- Personal details (name, age, DOB, contact)
- Photo upload and preview
- Gender and referral information

✅ **Eating Habits Tracking**

- Daily eating schedule (wake up, breakfast, lunch, dinner, snacks)
- Beverage consumption
- Vegetarian/Non-vegetarian preferences
- Water intake tracking

✅ **Wellness Condition Assessment**

- Medical history and medications
- Blood pressure, sugar levels, cardiac status
- Health issues checklist (tiredness, headache, gastritis, etc.)
- Pain location tracking

✅ **Physical Measurements & Analytics**

- Height, weight, body fat percentage
- Automatic BMI calculation with status
- Body Fat percentage and category
- Basal Metabolic Rate (BMR) calculation
- Waist circumference and visceral fat index

✅ **Dietary Requirements Analysis**

- Track dietary excesses and deficiencies
- 11 dietary categories
- Nutritional needs assessment

✅ **Program & Coach Management**

- Program recommendations
- Coach signature and notes

✅ **PDF Generation**

- Download complete wellness record as PDF
- Print-friendly format
- Professional layout

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup Steps

1. **Navigate to project directory**

   ```bash
   cd c:\Kumar\PP\HL_Profile
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, manually navigate to the URL

## Usage

### Filling the Form

1. Enter patient's personal information
2. Fill in eating habits and lifestyle details
3. Record wellness conditions and health issues
4. Input physical measurements (height, weight)
5. Select dietary requirements/concerns
6. Add program details and coach information
7. Upload patient photo (optional)

### Generating PDF

1. Click **"Generate PDF"** button
2. The system will create a comprehensive PDF report
3. File downloads automatically as `WellnessRecord_[PatientName]_[Timestamp].pdf`

### Other Features

- **Print Form**: Click "Print Form" button to print directly
- **Reset Form**: Click "Reset Form" to clear all fields
- **Auto-calculations**: BMI, body fat, and BMR are calculated automatically

## Project Structure

```
HL_Profile/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── WellnessForm.js
│   │   └── sections/
│   │       ├── PersonalInfo.js
│   │       ├── EatingHabits.js
│   │       ├── WellnessCondition.js
│   │       ├── PhysicalMeasurements.js
│   │       ├── DietaryRequirements.js
│   │       └── ProgramDetails.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   └── utils.js
├── package.json
└── README.md
```

## Key Technologies

- **React 18.2.0** - UI framework
- **jsPDF 2.5.1** - PDF generation
- **html2canvas 1.4.1** - HTML to image conversion
- **React Scripts 5.0.1** - Build tools

## Calculations

### BMI (Body Mass Index)

```
BMI = Weight (kg) / Height (m)²
- Underweight: < 18.5
- Normal: 18.5 - 24.9
- Overweight: 25 - 29.9
- Obese: ≥ 30
```

### BMR (Basal Metabolic Rate)

Uses Harris-Benedict formula:

- **Males**: 88.362 + (13.397 × weight) + (4.799 × height) - (5.677 × age)
- **Females**: 447.593 + (9.247 × weight) + (3.098 × height) - (4.33 × age)

### Body Fat Percentage

Calculated using simplified formula based on BMI and age

## Responsive Design

- Mobile-friendly interface
- Tablet and desktop optimized
- Responsive grid layout
- Touch-friendly form elements

## Notes

- All measurements should be in standard units (cm for height, kg for weight)
- The form auto-calculates BMI, body fat, and BMR based on inputs
- Photo upload is optional but recommended for records
- PDF generation requires all sections to be completed
- The application works offline after initial load

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Database integration for patient records
- User authentication
- Medical history tracking
- Trend analysis and graphs
- Multi-language support
- Mobile app version

## Support

For issues or questions, please refer to the form tooltips or contact your system administrator.

## License

This application is for wellness and health assessment purposes.
