import React from 'react';

function DietaryRequirements({ formData, handleDietaryChange }) {
  const dietaryOptions = [
    { key: 'fatOil', label: 'Fat / Oil' },
    { key: 'highCarbs', label: 'High Carbohydrate' },
    { key: 'sugar', label: 'Sugar' },
    { key: 'salt', label: 'Salt' },
    { key: 'chemicals', label: 'Chemicals' },
    { key: 'protein', label: 'Protein' },
    { key: 'vitaminsMinerals', label: 'Vitamins & Minerals' },
    { key: 'microMacro', label: 'Micro & Macro' },
    { key: 'fibre', label: 'Fibre' },
    { key: 'herbsOil', label: 'Herbs, Oil' },
    { key: 'pureWater', label: 'Pure Water' },
  ];

  return (
    <div className="form-section">
      <div className="section-title">DIETARY REQUIREMENTS / EXCESS / DEFICIENCY</div>
      
      <h4 style={{ marginBottom: '15px', color: '#333', fontSize: '14px' }}>
        Check dietary concerns (Excess or Deficiency)
      </h4>

      <div className="wellness-grid">
        {dietaryOptions.map(option => (
          <div key={option.key} className="checkbox-item" style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            <input
              type="checkbox"
              name={option.key}
              id={option.key}
              checked={formData.dietary[option.key]}
              onChange={handleDietaryChange}
            />
            <label htmlFor={option.key} style={{ marginLeft: '8px', marginBottom: '0' }}>
              {option.label}
            </label>
          </div>
        ))}
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px', 
        backgroundColor: '#fff3cd', 
        borderLeft: '4px solid #ffc107',
        borderRadius: '4px'
      }}>
        <p style={{ margin: '0', fontSize: '13px', color: '#856404' }}>
          <strong>Note:</strong> Select all dietary items that are in excess or show deficiency in the patient's current diet.
        </p>
      </div>
    </div>
  );
}

export default DietaryRequirements;
