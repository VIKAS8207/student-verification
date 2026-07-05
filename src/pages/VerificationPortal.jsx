import { useState } from 'react';
import { mockData } from '../data/mockData';

export default function VerificationPortal({ setIsStudentVerified }) {
  const [regNo, setRegNo] = useState('');
  const [dob, setDob] = useState('');
  
  const [hasSearched, setHasSearched] = useState(false);
  const [verifiedRecord, setVerifiedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!regNo.trim() || !dob.trim()) return;

    setIsLoading(true);
    setHasSearched(false);

    // Simulate API verification process
    setTimeout(() => {
      const match = mockData.find(student => 
        student.registerNumber.toLowerCase() === regNo.toLowerCase().trim() && 
        student.dob === dob.trim()
      );
      
      if (match) {
        setVerifiedRecord(match);
        // 2. UNLOCK THE NAVBAR BUTTON!
        setIsStudentVerified(true); 
      } else {
        setVerifiedRecord(null);
        // 3. Keep it locked if they fail
        setIsStudentVerified(false); 
      }
      
      setHasSearched(true);
      setIsLoading(false);
    }, 800);
  };

  const handleDownload = (studentName, semName) => {
    alert(`Downloading ${semName} for ${studentName}.pdf`);
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-8">
      
      {/* Header Section */}
      <div className="text-center md:text-left">
        <h1 className="text-[34px] font-bold text-textMain leading-tight">Student Verification</h1>
        <p className="text-textMuted font-medium mt-1">Enter the exact Register Number and Date of Birth to verify academic records.</p>
      </div>

      {/* Search Card */}
      <div className="bg-white rounded-[24px] p-8 shadow-edunut">
        <form onSubmit={handleVerify} className="flex flex-col md:flex-row gap-5 items-end">
          
          <div className="w-full md:w-[40%] space-y-2">
            <label className="text-sm font-bold text-textMain ml-1">Register Number</label>
            <div className="relative">
              <input 
                type="text" 
                value={regNo}
                onChange={(e) => setRegNo(e.target.value)}
                placeholder="e.g. EDN2024001"
                className="w-full h-[54px] bg-secondary text-textMain font-bold tracking-wide rounded-2xl px-5 pl-12 outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none placeholder:text-textMuted placeholder:font-medium"
                required
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" /></svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[40%] space-y-2">
            <label className="text-sm font-bold text-textMain ml-1">Date of Birth</label>
            <div className="relative">
              <input 
                type="text" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="DD/MM/YYYY"
                className="w-full h-[54px] bg-secondary text-textMain font-bold tracking-wide rounded-2xl px-5 pl-12 outline-none focus:ring-2 focus:ring-primary/20 transition-all border-none placeholder:text-textMuted placeholder:font-medium uppercase"
                required
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[20%]">
            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-[54px] bg-primary hover:bg-[#3411c9] text-white font-bold rounded-2xl transition-all shadow-[0_10px_20px_rgba(67,24,255,0.2)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Verify
                </>
              )}
            </button>
          </div>

        </form>
      </div>

      {/* Results Area */}
      {hasSearched && (
        <div className="animate-fade-in">
          {verifiedRecord ? (
            <div className="bg-white rounded-[24px] p-6 sm:p-8 shadow-edunut">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-6 border-b border-gray-100 gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-[#E8F8F5] text-success rounded-2xl flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-textMain">Status: Verified</h2>
                    <p className="text-sm text-textMuted font-medium">Official Record Found</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 bg-[#F4F7FE]/60 p-6 rounded-[20px] border border-gray-50">
                <div>
                  <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Student Name</p>
                  <p className="text-lg font-bold text-textMain">{verifiedRecord.studentName}</p>
                  <p className="text-xs text-textMuted font-medium mt-0.5 uppercase tracking-wide">Reg: {verifiedRecord.registerNumber}</p>
                </div>
                <div>
                  <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Course & Branch</p>
                  <p className="text-lg font-bold text-textMain">{verifiedRecord.course}</p>
                  <p className="text-xs text-textMuted font-medium mt-0.5">{verifiedRecord.branch}</p>
                </div>
                <div>
                  <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Passing Year</p>
                  <p className="text-lg font-bold text-textMain">{verifiedRecord.passingYear}</p>
                </div>
                <div>
                  <p className="text-xs text-textMuted font-bold uppercase tracking-wider mb-1">Total Semesters</p>
                  <p className="text-lg font-bold text-primary">{verifiedRecord.totalSemesters}</p>
                </div>
              </div>

              <h3 className="text-xl font-bold text-textMain mb-4">Academic Documents</h3>
              
              <div className="overflow-x-auto pb-4">
                <table className="w-full whitespace-nowrap">
                  <thead>
                    <tr className="text-textMuted text-sm font-medium text-left border-b border-gray-100">
                      <th className="px-6 py-4 font-medium">Document Name</th>
                      <th className="px-6 py-4 font-medium">Status</th>
                      <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: verifiedRecord.totalSemesters }, (_, i) => i + 1).map((sem) => {
                      const isCompleted = sem === verifiedRecord.totalSemesters;
                      
                      return (
                        <tr key={sem} className="transition-all hover:bg-secondary/50 group border-b border-gray-50 last:border-0">
                          <td className="px-6 py-5 rounded-l-[20px]">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-pdfBg text-primary rounded-xl flex items-center justify-center">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                              </div>
                              <span className="font-bold text-textMain">Semester {sem} Marksheet</span>
                            </div>
                          </td>
                          <td className="px-6 py-5">
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1.5 bg-[#E8F8F5] text-success px-3 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider">
                                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                Completed
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 bg-secondary text-textMuted px-3 py-1.5 rounded-lg font-bold text-[11px] uppercase tracking-wider">
                                Sem {sem}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-5 rounded-r-[20px] text-right">
                            <button 
                              onClick={() => handleDownload(verifiedRecord.studentName, `Semester ${sem} Marksheet`)}
                              className="inline-flex items-center gap-2 bg-white border border-gray-200 text-textMain hover:bg-primary hover:text-white hover:border-primary px-4 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                              Download PDF
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-[24px] p-16 shadow-edunut flex flex-col items-center justify-center text-center">
              <div className="w-24 h-24 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-textMain mb-2">Record Not Found</h3>
              <p className="text-textMuted font-medium max-w-md">
                We couldn't find any verified records matching the Register Number and Date of Birth provided. Please verify the details and try again.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}