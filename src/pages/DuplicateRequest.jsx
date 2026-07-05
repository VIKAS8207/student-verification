import { useState } from 'react';

export default function DuplicateRequest() {
  // Form States
  const [university, setUniversity] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSems, setSelectedSems] = useState([]);
  const [wantsFinalCert, setWantsFinalCert] = useState(false);
  
  // Submission States
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Data
  const availableSemesters = [1, 2, 3, 4, 5, 6, 7, 8];
  const universities = [
    "Chhattisgarh Swami Vivekanand Technical University (CSVTU)",
    "Pt. Ravishankar Shukla University (PRSU)",
    "Hidayatullah National Law University (HNLU)",
    "Other Regional University"
  ];

  const handleSemToggle = (sem) => {
    setErrorMsg(''); // Clear errors when user interacts
    setSelectedSems(prev => 
      prev.includes(sem) ? prev.filter(s => s !== sem) : [...prev, sem]
    );
  };

  const handleCertToggle = () => {
    setErrorMsg(''); // Clear errors when user interacts
    setWantsFinalCert(!wantsFinalCert);
  };

  const handleUniversitySelect = (uni) => {
    setUniversity(uni);
    setIsDropdownOpen(false);
    setErrorMsg(''); // Clear errors when user interacts
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Custom Validation 
    if (!university) {
      setErrorMsg("Please select your affiliated university to proceed.");
      return;
    }
    if (selectedSems.length === 0 && !wantsFinalCert) {
      setErrorMsg("Please select at least one document (Semester Marksheet or Final Certificate).");
      return;
    }

    // Pass Validation -> Success
    setErrorMsg('');
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="max-w-[800px] mx-auto animate-fade-in text-center py-20 bg-white rounded-[24px] shadow-edunut mt-10 p-10 border border-gray-50">
        <div className="w-20 h-20 bg-[#E8F8F5] text-success rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
          <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
        </div>
        <h2 className="text-3xl font-bold text-textMain mb-4">Request Submitted Successfully</h2>
        <p className="text-textMuted font-medium text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          Your request for duplicate documents has been securely routed to <span className="text-primary font-bold">{university}</span>. You will receive an update shortly.
        </p>
        <button onClick={() => window.location.href = '/'} className="bg-primary text-white px-8 py-3.5 rounded-[12px] font-bold hover:bg-[#3411c9] transition-all shadow-[0_8px_16px_rgba(67,24,255,0.15)] inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto animate-fade-in space-y-10 relative">
      
      {/* Header */}
      <div className="text-center md:text-left border-b border-gray-200 pb-6">
        <h1 className="text-[34px] font-bold text-textMain leading-tight tracking-tight">Duplicate Document Request</h1>
        <p className="text-textMuted font-medium mt-2 text-lg">Select your university and the specific academic documents you need reissued.</p>
      </div>

      <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-edunut border border-gray-50">
        
        {/* Custom Inline Error Alert */}
        {errorMsg && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-5 py-4 rounded-xl flex items-center gap-3 animate-fade-in mb-8">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-bold text-sm tracking-wide">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-10">
          
          {/* Custom University Dropdown */}
          <div className="space-y-3 relative z-20">
            <label className="text-sm font-bold text-textMain uppercase tracking-wider">Select University</label>
            <div className="relative">
              
              {/* Dropdown Trigger */}
              <div 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`w-full min-h-[54px] bg-secondary text-textMain font-bold rounded-[10px] px-5 py-3 flex items-center justify-between cursor-pointer transition-all ${isDropdownOpen ? 'ring-2 ring-primary/20 bg-white shadow-sm' : 'hover:bg-gray-100'}`}
              >
                <span className={university ? 'text-textMain' : 'text-textMuted'}>
                  {university || "Choose your affiliated institution..."}
                </span>
                <svg className={`w-5 h-5 text-textMuted transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <ul className="absolute w-full mt-2 bg-white border border-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.1)] rounded-[10px] overflow-hidden animate-fade-in origin-top">
                  {universities.map(uni => (
                    <li 
                      key={uni}
                      onClick={() => handleUniversitySelect(uni)}
                      className="px-5 py-3.5 hover:bg-secondary cursor-pointer text-sm font-bold text-textMain transition-colors border-b border-gray-50 last:border-0"
                    >
                      {uni}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Semester Selection */}
          <div className="space-y-4 relative z-10">
            <label className="text-sm font-bold text-textMain uppercase tracking-wider block">Select Semesters for Marksheet Reissue</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableSemesters.map(sem => {
                const isSelected = selectedSems.includes(sem);
                return (
                  <div 
                    key={sem} 
                    onClick={() => handleSemToggle(sem)}
                    className={`flex items-center justify-between p-4 rounded-[12px] border-2 cursor-pointer transition-all duration-200 ${isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 bg-secondary hover:border-gray-300'}`}
                  >
                    <span className={`font-bold text-sm ${isSelected ? 'text-primary' : 'text-textMain'}`}>Semester {sem}</span>
                    <div className={`w-5 h-5 rounded-[6px] flex items-center justify-center transition-all ${isSelected ? 'bg-primary text-white scale-110' : 'bg-white border-2 border-gray-300'}`}>
                      {isSelected && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Final Certificate Option */}
          <div className="space-y-4 pt-6 border-t border-gray-100 relative z-10">
            <div 
              onClick={handleCertToggle}
              className={`flex items-start gap-4 p-5 rounded-[16px] border-2 cursor-pointer transition-all duration-200 ${wantsFinalCert ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 bg-gray-50 hover:border-gray-300'}`}
            >
              <div className="mt-1">
                 <div className={`w-6 h-6 rounded-[8px] flex items-center justify-center transition-all ${wantsFinalCert ? 'bg-primary text-white scale-110' : 'bg-white border-2 border-gray-300'}`}>
                    {wantsFinalCert && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                  </div>
              </div>
              <div>
                <span className={`font-bold text-lg block ${wantsFinalCert ? 'text-primary' : 'text-textMain'}`}>Final Degree Certificate</span>
                <span className="text-sm text-textMuted font-medium mt-1.5 block leading-relaxed">Request a duplicate copy of your consolidated final degree. Additional university verification fees may apply.</span>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4">
            <button 
              type="submit" 
              className="w-full md:w-auto px-12 h-[54px] bg-primary hover:bg-[#3411c9] text-white font-bold rounded-[12px] transition-all shadow-[0_10px_20px_rgba(67,24,255,0.2)] flex items-center justify-center gap-2"
            >
              Submit Request
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}