import React, { useState } from 'react';
import { FileText, Clock, MapPin, Users, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

interface FormData {
  fullName: string;
  rank: string;
  timeOut: string;
  timeReturn: string;
  placesToVisit: string;
  reasonForVisit: string;
  agreed: boolean;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    rank: '',
    timeOut: '',
    timeReturn: '',
    placesToVisit: '',
    reasonForVisit: '',
  agreed: false
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ranks = [
    'Teacher I',
    'Teacher II', 
    'Teacher III',
    'Master Teacher I',
    'School Head',
    'Principal',
    'ADAS',
    'ADA'
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.rank) {
      newErrors.rank = 'Rank is required';
    }
    if (!formData.timeOut) {
      newErrors.timeOut = 'Time to be out is required';
    }
    if (!formData.timeReturn) {
      newErrors.timeReturn = 'Time to return is required';
    }
    if (!formData.placesToVisit.trim()) {
      newErrors.placesToVisit = 'Place(s) to be visited is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatTime12Hour = (time24: string): string => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const generateImage = async () => {
    // Generate random transaction code
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const transactionCode = `GNHS-${randomCode}`;
    
    // Create a temporary div with the pass slip content
    const passSlipContent = document.createElement('div');
    passSlipContent.style.cssText = `
      width: 850px;
      min-height: 1100px;
      border: 8px solid #1e40af;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      padding: 40px;
      background: white;
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    `;
    
    passSlipContent.innerHTML = `
      <div style="text-align: center; margin-bottom: 30px;">
        <!-- Transaction Code Header -->
        <div style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white; padding: 12px; border-radius: 8px; margin-bottom: 25px;">
          <div style="font-size: 14px; font-weight: bold; letter-spacing: 1px;">TRANSACTION CODE</div>
          <div style="font-size: 18px; font-weight: bold; margin-top: 5px; letter-spacing: 2px;">${transactionCode}</div>
        </div>
        
        <!-- School Logo and Header -->
            <!-- School Logo and Header -->
    <div style="margin-bottom: 20px;">
  <img src="/logo.png" alt="School Logo" style="height: 60px; margin: 0 auto; display: block;" />
</div>
        <h1 style="font-size: 28px; font-weight: bold; margin: 0; color: #1e40af;">GNHS-OLSAS</h1>
        <p style="font-size: 16px; color: #6b7280; margin: 5px 0;">Guinsiliban National High School</p>
        <p style="font-size: 16px; color: #6b7280; margin: 5px 0;">Online Locator Slip Application System</p>
        <h2 style="font-size: 20px; font-weight: bold; margin: 20px 0; color: #374151;">LOCATOR SLIP APPLICATION</h2>
      </div>
      
      <!-- Information Table -->
      <table style="width: 100%; border-collapse: collapse; border: 2px solid #1e40af; background: white; margin-bottom: 30px;">
        <thead>
          <tr style="background: linear-gradient(135deg, #1e40af, #3b82f6); color: white;">
            <th style="padding: 15px; text-align: left; border: 1px solid #1e40af; font-size: 16px; font-weight: bold; width: 35%;">FIELD</th>
            <th style="padding: 15px; text-align: left; border: 1px solid #1e40af; font-size: 16px; font-weight: bold;">INFORMATION</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background: #f8fafc;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: 600; color: #374151;">Full Name:</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #1f2937; font-size: 16px;">${formData.fullName}</td>
          </tr>
          <tr style="background: white;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: 600; color: #374151;">Rank/Position:</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #1f2937; font-size: 16px;">${formData.rank}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: 600; color: #374151;">Time to be Out:</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #1f2937; font-weight: 600; font-size: 16px;">${formatTime12Hour(formData.timeOut)}</td>
          </tr>
          <tr style="background: white;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: 600; color: #374151;">Time to Return:</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #1f2937; font-weight: 600; font-size: 16px;">${formatTime12Hour(formData.timeReturn)}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: 600; color: #374151;">Place(s) to be Visited:</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #1f2937; font-size: 16px;">${formData.placesToVisit}</td>
          </tr>
        ${formData.reasonForVisit ? `
          <tr style="background: white;">
            <td style="padding: 15px; border: 1px solid #e2e8f0; font-weight: 600; color: #374151;">Reason(s) for Visit:</td>
            <td style="padding: 15px; border: 1px solid #e2e8f0; color: #1f2937; font-size: 16px;">${formData.reasonForVisit}</td>
          </tr>
        ` : ''}
        </tbody>
      </table>
      
      <!-- Signature Section -->
      <div style="margin-top: 50px; border-top: 3px solid #1e40af; padding-top: 30px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
          <div style="text-align: center; flex: 1;">
            <div style="border-bottom: 2px solid #374151; width: 200px; margin: 0 auto 15px; padding-bottom: 8px;"></div>
			<p style="margin: 0; font-size: 14px;">${formData.fullName}</p>
            <p style="margin: 0; font-weight: 600; color: #374151; font-size: 14px;">Applicant's Signature</p>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #6b7280;">Date: ${new Date().toLocaleDateString()}</p>
          </div>
          <div style="text-align: center; flex: 1;">
            <div style="border-bottom: 2px solid #374151; width: 200px; margin: 0 auto 15px; padding-bottom: 8px;"></div>
			<p style="margin: 0; font-size: 14px;">ALEEN B. QUIPQUIPAN</p>
            <p style="margin: 0; font-weight: 600; color: #374151; font-size: 14px;">School Principal</p>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #6b7280;">Approved/Disapproved</p>
          </div>
        </div>
        
        ${formData.agreed ? `
  <p style="margin-top: 20px; font-size: 12px; font-style: italic; color: #475569;">
    Digitally signed and submitted by ${formData.fullName} on ${new Date().toLocaleDateString()} via GNHS Online Locator Slip Application System.
  </p>
` : ''}

        <!-- Footer -->
        <div style="text-align: center; margin-top: 40px; padding: 20px; background: #f1f5f9; border: 2px solid #cbd5e1; border-radius: 10px;">
          <p style="margin: 0; font-size: 12px; color: #64748b; font-style: italic;">
            Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}
          </p>
          <p style="margin: 8px 0 0 0; font-size: 11px; color: #94a3b8; font-weight: 600;">
            GNHS-OLSAS | Online Locator Slip Application System
          </p>
        </div>
      </div>
    `;
    
    document.body.appendChild(passSlipContent);
    
    try {
      const canvas = await html2canvas(passSlipContent, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        allowTaint: true
      });
      
      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `pass-slip-${formData.fullName.replace(/\s+/g, '-').toLowerCase()}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, 'image/jpeg', 0.95);
      
    } catch (error) {
      console.error('Error generating image:', error);
      alert('Error generating locator slip image. Please try again.');
    } finally {
      document.body.removeChild(passSlipContent);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsSubmitting(true);

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbxarjkYFt3fJPiZZtqbtIdDaxQCTnTqTS8V3t-Hu28NYVOuYyBGTLkuXN_AfkDnk4IBeg/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        fullName: formData.fullName,
        rank: formData.rank,
        timeOut: formData.timeOut,
        timeReturn: formData.timeReturn,
        placesToVisit: formData.placesToVisit,
        reasonForVisit: formData.reasonForVisit
      })
    });

    if (!response.ok) throw new Error("Failed to submit to Google Sheets");

    await generateImage();

    alert("Locator slip submitted successfully!");

    setFormData({
      fullName: '',
      rank: '',
      timeOut: '',
      timeReturn: '',
      placesToVisit: '',
      reasonForVisit: '',
      agreed: false
    });
  } catch (error) {
    console.error("Submission error:", error);
    alert("There was a problem submitting your slip.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b-4 border-blue-600">
  <div className="container mx-auto px-4 py-8">
    <div className="text-center">
      {/* Logo Image */}
      <div className="mb-6">
        <img
          src="/logo.png"
          alt="GNHS Logo"
          className="w-24 h-24 mx-auto object-contain rounded-full shadow-md border-4 border-blue-600"
        />
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">GNHS-OLSAS</h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Guinsiliban National High School - Online Locator Slip Application System
      </p>
    </div>
  </div>
</header>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Form Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
              <div className="flex items-center text-white">
                <FileText className="w-8 h-8 mr-3" />
                <h2 className="text-2xl font-bold">Locator Slip Application Form</h2>
              </div>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <p className="text-sm text-gray-500 mb-3">
                    Enter your complete name: First Name, Middle Initial, Surname
                  </p>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                        errors.fullName 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="e.g., Juan M. Dela Cruz"
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
                  )}
                </div>

                {/* Rank */}
                <div>
                  <label htmlFor="rank" className="block text-sm font-semibold text-gray-700 mb-2">
                    Rank <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="rank"
                    value={formData.rank}
                    onChange={(e) => handleInputChange('rank', e.target.value)}
                    className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                      errors.rank 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-300 focus:border-blue-500'
                    }`}
                  >
                    <option value="">Select your rank</option>
                    {ranks.map((rank) => (
                      <option key={rank} value={rank}>
                        {rank}
                      </option>
                    ))}
                  </select>
                  {errors.rank && (
                    <p className="mt-1 text-sm text-red-600">{errors.rank}</p>
                  )}
                </div>

                {/* Time Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="timeOut" className="block text-sm font-semibold text-gray-700 mb-2">
                      Time to be Out <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        id="timeOut"
                        value={formData.timeOut}
                        onChange={(e) => handleInputChange('timeOut', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          errors.timeOut 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.timeOut && (
                      <p className="mt-1 text-sm text-red-600">{errors.timeOut}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="timeReturn" className="block text-sm font-semibold text-gray-700 mb-2">
                      Time to Return <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="time"
                        id="timeReturn"
                        value={formData.timeReturn}
                        onChange={(e) => handleInputChange('timeReturn', e.target.value)}
                        className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${
                          errors.timeReturn 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-300 focus:border-blue-500'
                        }`}
                      />
                    </div>
                    {errors.timeReturn && (
                      <p className="mt-1 text-sm text-red-600">{errors.timeReturn}</p>
                    )}
                  </div>
                </div>

                {/* Places to Visit */}
                <div>
                  <label htmlFor="placesToVisit" className="block text-sm font-semibold text-gray-700 mb-2">
                    Place(s) to be Visited <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      id="placesToVisit"
                      value={formData.placesToVisit}
                      onChange={(e) => handleInputChange('placesToVisit', e.target.value)}
                      rows={3}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-colors resize-none ${
                        errors.placesToVisit 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-300 focus:border-blue-500'
                      }`}
                      placeholder="e.g., Division Office, District Office, others"
                    />
                  </div>
                  {errors.placesToVisit && (
                    <p className="mt-1 text-sm text-red-600">{errors.placesToVisit}</p>
                  )}
                </div>

                {/* Reason for Visit */}
                <div>
                  <label htmlFor="reasonForVisit" className="block text-sm font-semibold text-gray-700 mb-2">
                    Reason(s) for the Visit <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    id="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={(e) => handleInputChange('reasonForVisit', e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="e.g., Attend meeting, Submit documents, others"
                  />
                </div>

                {/* Submission Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-800">
                        Important Note
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        Send the file to your school records keeper and or principal for approval.
                      </p>
                    </div>
                  </div>
                </div>

                
{/* Digital Signature Agreement */}
<div className="bg-gray-100 border border-gray-300 rounded-md p-4 mt-6">
  <label className="flex items-start space-x-3">
    <input
      type="checkbox"
      className="mt-1"
      required
      checked={formData.agreed}
      onChange={(e) => setFormData((prev) => ({ ...prev, agreed: e.target.checked }))}
    />
    <span className="text-sm text-red-700">
      I hereby certify that the information provided in this form is true and correct. I understand that by checking this box, I am digitally signing this request, and I authorize the school to process it accordingly. I acknowledge that this submission holds the same intent and effect as my handwritten signature.
    </span>
  </label>
</div>


{/* Submit Button */}
                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-4 text-lg font-semibold text-white rounded-lg transition-all transform hover:scale-105 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing Application...
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5 mr-2" />
                        Submit Application
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2025 GNHS-OLSAS Developed by GNHS ICT Department
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;