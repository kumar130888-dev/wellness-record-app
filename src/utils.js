import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (formData, photoDataUrl) => {
  const element = document.getElementById('pdf-content');
  
  if (!element) {
    alert('Unable to generate PDF');
    return;
  }

  try {
    const canvas = await html2canvas(element, { 
      scale: 2,
      useCORS: true,
      logging: false
    });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 5;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // For single page PDF, scale down if necessary
    if (imgHeight <= pdfHeight - 5) {
      // Fits on single page
      pdf.addImage(imgData, 'PNG', 2.5, 2.5, imgWidth, imgHeight);
    } else {
      // Scale to fit single page
      const scaledHeight = pdfHeight - 5;
      const scaledWidth = (canvas.width * scaledHeight) / canvas.height;
      const xOffset = (pdfWidth - scaledWidth) / 2;
      pdf.addImage(imgData, 'PNG', xOffset, 2.5, scaledWidth, scaledHeight);
    }

    const fileName = `WellnessRecord_${formData.name || 'Patient'}_${new Date().getTime()}.pdf`;
    pdf.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

export const calculateBMI = (weight, height) => {
  if (!weight || !height || height === 0) return null;
  const bmi = weight / ((height / 100) ** 2);
  return parseFloat(bmi.toFixed(2));
};

export const calculateBodyFat = (bmi, age, gender) => {
  if (!bmi || !age) return null;
  
  // Simplified body fat calculation
  const bodyFat = (1.39 * bmi) + (0.16 * age) - (gender === 'male' ? 10.34 : 9);
  return parseFloat(bodyFat.toFixed(2));
};

export const calculateBMR = (weight, height, age, gender) => {
  if (!weight || !height || !age) return null;
  
  // Harris-Benedict formula
  if (gender === 'male') {
    return Math.round(88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age));
  } else {
    return Math.round(447.593 + (9.247 * weight) + (3.098 * height) - (4.33 * age));
  }
};

export const getBodyFatStatus = (bodyFat, age, gender) => {
  if (!bodyFat) return '';
  
  if (gender === 'male') {
    if (bodyFat < 6) return 'Essential Fat';
    if (bodyFat < 13) return 'Athletes';
    if (bodyFat < 18) return 'Fitness';
    if (bodyFat < 25) return 'Average';
    return 'Overweight';
  } else {
    if (bodyFat < 13) return 'Essential Fat';
    if (bodyFat < 20) return 'Athletes';
    if (bodyFat < 25) return 'Fitness';
    if (bodyFat < 32) return 'Average';
    return 'Overweight';
  }
};

export const getBMIStatus = (bmi) => {
  if (!bmi) return '';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
};
