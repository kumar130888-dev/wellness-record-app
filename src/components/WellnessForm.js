import React, { useState, useRef } from 'react';
import { generatePDF, calculateBMI, calculateBodyFat, calculateBMR, getBodyFatStatus, getBMIStatus } from '../utils';
import PersonalInfo from './sections/PersonalInfo';
import EatingHabits from './sections/EatingHabits';
import WellnessCondition from './sections/WellnessCondition';
import PhysicalMeasurements from './sections/PhysicalMeasurements';
import DietaryRequirements from './sections/DietaryRequirements';
import ProgramDetails from './sections/ProgramDetails';

const initialFormState = {
  // Personal Information
  recordNo: '',
  date: new Date().toISOString().split('T')[0],
  name: '',
  age: '',
  dob: '',
  address: '',
  mobileNo: '',
  email: '',
  referredBy: '',
  gender: 'male',
  
  // Eating Habits
  wakeUp: '',
  teaCoffee: '',
  breakFast: '',
  lunch: '',
  eveSnacks: '',
  dinner: '',
  vegNonVeg: '',
  waterIntake: '',
  
  // Wellness Condition
  personalProblems: '',
  anyMedicines: '',
  bloodPressure: '',
  sugar: '',
  cardiac: '',
  tiredness: false,
  headache: false,
  giddiness: false,
  gastritis: false,
  acidity: false,
  indigestion: false,
  constipation: false,
  pain: false,
  painLocation: '',
  breathingProblem: false,
  sleepingDisorder: false,
  
  // Physical Measurements
  height: '',
  weight: '',
  bodyFat: '',
  bmi: '',
  vf: '',
  bmr: '',
  bodyAge: '',
  waist: '',
  
  // Dietary Requirements
  dietary: {
    fatOil: false,
    highCarbs: false,
    sugar: false,
    salt: false,
    chemicals: false,
    protein: false,
    vitaminsMinerals: false,
    microMacro: false,
    fibre: false,
    herbsOil: false,
    pureWater: false,
  },
  
  // Program Details
  program: '',
  coachSign: '',
};

function WellnessForm() {
  const [formData, setFormData] = useState(initialFormState);
  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [bmiData, setBmiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData(prevState => {
      const newState = {
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      };

      // Recalculate BMI when weight or height changes
      if (name === 'weight' || name === 'height') {
        setTimeout(() => recalculateMeasurements(newState), 0);
      }

      return newState;
    });
  };

  const handleDietaryChange = (e) => {
    const { name, checked } = e.target;
    
    setFormData(prevState => ({
      ...prevState,
      dietary: {
        ...prevState.dietary,
        [name]: checked
      }
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoDataUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const recalculateMeasurements = (state = formData) => {
    const height = parseFloat(state.height) || 0;
    const weight = parseFloat(state.weight) || 0;
    const age = parseInt(state.age) || 0;
    const gender = state.gender || 'male';

    const bmi = calculateBMI(weight, height);
    const bodyFat = calculateBodyFat(bmi, age, gender);
    const bmr = calculateBMR(weight, height, age, gender);

    if (bmi !== null) {
      setFormData(prevState => ({
        ...prevState,
        bmi: bmi,
        bodyFat: bodyFat || '',
        bmr: bmr || '',
      }));

      setBmiData({
        bmi: bmi,
        status: getBMIStatus(bmi),
        bodyFat: bodyFat,
        bodyFatStatus: bodyFat ? getBodyFatStatus(bodyFat, age, gender) : '',
        bmr: bmr
      });
    }
  };

  const handleGeneratePDF = async () => {
    if (!formData.name) {
      alert('Please enter the patient name before generating PDF.');
      return;
    }

    setIsLoading(true);
    try {
      await generatePDF(formData, photoDataUrl);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all fields?')) {
      setFormData(initialFormState);
      setPhotoDataUrl(null);
      setBmiData(null);
    }
  };

  return (
    <div className="container">
      <div className="button-group">
        <button 
          className="btn-primary" 
          onClick={handleGeneratePDF}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span> Generating PDF...
            </>
          ) : (
            <>📄 Generate PDF</>
          )}
        </button>
        <button className="btn-secondary" onClick={() => window.print()} disabled={isLoading}>
          🖨️ Print Form
        </button>
        <button className="btn-reset" onClick={handleReset} disabled={isLoading}>
          🔄 Reset Form
        </button>
      </div>

      <div id="pdf-content" ref={formRef}>
        <div className="header">
          <h1>WELLNESS RECORD</h1>
          <p style={{ color: '#666', marginTop: '5px' }}>Complete Health & Wellness Assessment Form</p>
        </div>

        <PersonalInfo
          formData={formData}
          handleInputChange={handleInputChange}
          handlePhotoUpload={handlePhotoUpload}
          photoDataUrl={photoDataUrl}
        />

        <EatingHabits
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <WellnessCondition
          formData={formData}
          handleInputChange={handleInputChange}
        />

        <PhysicalMeasurements
          formData={formData}
          handleInputChange={handleInputChange}
          bmiData={bmiData}
          recalculateMeasurements={recalculateMeasurements}
        />

        <DietaryRequirements
          formData={formData}
          handleDietaryChange={handleDietaryChange}
        />

        <ProgramDetails
          formData={formData}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}

export default WellnessForm;
