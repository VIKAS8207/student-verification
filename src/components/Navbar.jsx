import { Link } from 'react-router-dom';

// 1. Accept the isVerified prop
export default function Navbar({ isVerified }) {
  return (
    <header className="bg-white px-8 py-5 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-3 cursor-pointer">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center shadow-edunut">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
          </div>
          <span className="font-bold text-2xl text-textMain tracking-tight">CGPURC<span className="text-primary">.</span></span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        
        {/* 2. Wrap the button in a condition. It will ONLY show if isVerified is true */}
        {isVerified && (
          <Link 
            to="/request-duplicate" 
            className="hidden md:inline-flex items-center gap-2 bg-secondary text-primary hover:bg-primary hover:text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm border border-transparent hover:border-primary/20 animate-fade-in"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            Request Duplicate
          </Link>
        )}

        
      </div>
    </header>
  );
}