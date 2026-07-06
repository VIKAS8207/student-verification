import { useState } from 'react';

export default function DuplicateRequest() {
  // --- MOCK INCOMING DATA ---
  // In a real flow, you would pass this from VerificationPortal via state/props
  const studentProfile = {
    studentName: "Aarav Sharma",
    registerNumber: "EDN2024001",
    dob: "14/05/2001",
    university: "Chhattisgarh Swami Vivekanand Technical University (CSVTU)",
    course: "B.Tech",
    branch: "Computer Science",
    passingYear: "2024",
    totalSemesters: 8
  };

  // Form States
  const [selectedSems, setSelectedSems] = useState([]);
  const [wantsFinalCert, setWantsFinalCert] = useState(false);
  const [hasDeclared, setHasDeclared] = useState(false);
  
  // Submission States
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSemToggle = (sem) => {
    setErrorMsg(''); 
    setSelectedSems(prev => 
      prev.includes(sem) ? prev.filter(s => s !== sem) : [...prev, sem]
    );
  };

  const handleCertToggle = () => {
    setErrorMsg('');
    setWantsFinalCert(!wantsFinalCert);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Validation 
    if (selectedSems.length === 0 && !wantsFinalCert) {
      setErrorMsg("Please select at least one document (Semester Marksheet or Final Certificate).");
      return;
    }
    if (!hasDeclared) {
      setErrorMsg("You must check the declaration box to verify your identity before submitting.");
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
          Your request for duplicate documents has been securely routed to <span className="text-primary font-bold">{studentProfile.university}</span>. You will receive an update shortly.
        </p>
        <button onClick={() => window.location.href = '/'} className="bg-primary text-white px-8 py-3.5 rounded-[12px] font-bold hover:bg-[#3411c9] transition-all shadow-[0_8px_16px_rgba(67,24,255,0.15)] inline-flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-[900px] mx-auto animate-fade-in space-y-8 relative">
      
      {/* Header */}
      <div className="text-center md:text-left">
        <h1 className="text-[34px] font-bold text-textMain leading-tight tracking-tight">Duplicate Document Request</h1>
        <p className="text-textMuted font-medium mt-2 text-lg">Select the specific academic documents you need reissued.</p>
      </div>

      <div className="bg-white rounded-[24px] p-8 md:p-10 shadow-edunut border border-gray-50">
        
        {/* Verified Student Profile Display */}
        <div className="bg-secondary/60 rounded-[20px] p-6 border border-gray-100 mb-10">
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200/60">
            <div className="w-8 h-8 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </div>
            <h3 className="font-bold text-textMain text-lg">Verified Student Profile</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4">
            <div>
              <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Student Name</p>
              <p className="font-bold text-textMain">{studentProfile.studentName}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Registration No.</p>
              <p className="font-bold text-textMain">{studentProfile.registerNumber}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Date of Birth</p>
              <p className="font-bold text-textMain">{studentProfile.dob}</p>
            </div>
            <div className="md:col-span-3">
              <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">University</p>
              <p className="font-bold text-primary">{studentProfile.university}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Course</p>
              <p className="font-bold text-textMain">{studentProfile.course}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Branch</p>
              <p className="font-bold text-textMain">{studentProfile.branch}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Passing Year</p>
              <p className="font-bold text-textMain">{studentProfile.passingYear}</p>
            </div>
          </div>
        </div>

        {/* Custom Inline Error Alert */}
        {errorMsg && (
          <div className="bg-danger/10 border border-danger/20 text-danger px-5 py-4 rounded-xl flex items-center gap-3 animate-fade-in mb-8">
            <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-bold text-sm tracking-wide">{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-10">
          
          {/* Document Selection Grid */}
          <div className="space-y-4">
            <label className="text-sm font-bold text-textMain uppercase tracking-wider block">Select Documents for Reissue</label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              
              {/* Dynamically Generate Semester Checkboxes */}
              {Array.from({ length: studentProfile.totalSemesters }, (_, i) => i + 1).map(sem => {
                const isSelected = selectedSems.includes(sem);
                return (
                  <div 
                    key={sem} 
                    onClick={() => handleSemToggle(sem)}
                    className={`flex items-center justify-between p-4 rounded-[12px] border-2 cursor-pointer transition-all duration-200 ${isSelected ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 bg-secondary hover:border-gray-300'}`}
                  >
                    <span className={`font-bold text-sm ${isSelected ? 'text-primary' : 'text-textMain'}`}>Sem {sem} Marksheet</span>
                    <div className={`w-5 h-5 shrink-0 rounded-[6px] flex items-center justify-center transition-all ${isSelected ? 'bg-primary text-white scale-110' : 'bg-white border-2 border-gray-300'}`}>
                      {isSelected && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                    </div>
                  </div>
                );
              })}

              {/* Final Certificate Checkbox (Styled exactly like semesters) */}
              <div 
                onClick={handleCertToggle}
                className={`flex items-center justify-between p-4 rounded-[12px] border-2 cursor-pointer transition-all duration-200 ${wantsFinalCert ? 'border-primary bg-primary/5 shadow-sm' : 'border-gray-100 bg-secondary hover:border-gray-300'}`}
              >
                <span className={`font-bold text-sm ${wantsFinalCert ? 'text-primary' : 'text-textMain'}`}>Final Certificate</span>
                <div className={`w-5 h-5 shrink-0 rounded-[6px] flex items-center justify-center transition-all ${wantsFinalCert ? 'bg-primary text-white scale-110' : 'bg-white border-2 border-gray-300'}`}>
                  {wantsFinalCert && <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </div>
              </div>

            </div>
          </div>

          {/* Declaration Checkbox */}
          <div className="pt-6 border-t border-gray-100">
            <label className="flex items-start gap-4 cursor-pointer group">
              <div className="mt-1">
                <div 
                  onClick={() => {
                    setHasDeclared(!hasDeclared);
                    setErrorMsg('');
                  }}
                  className={`w-6 h-6 rounded-[6px] flex items-center justify-center transition-all border-2 ${hasDeclared ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 group-hover:border-primary/50'}`}
                >
                  {hasDeclared && <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                </div>
              </div>
              <p className="text-sm text-textMuted font-medium leading-relaxed select-none" onClick={() => { setHasDeclared(!hasDeclared); setErrorMsg(''); }}>
                I declare that I am applying for a duplicate academic document and verify that I am the person stated in the profile above. I understand that submitting false claims may result in legal action by the university.
              </p>
            </label>
          </div>

          {/* Submit Action */}
          <div>
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