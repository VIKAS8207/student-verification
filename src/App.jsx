import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import VerificationPortal from './pages/VerificationPortal';
import DuplicateRequest from './pages/DuplicateRequest';

function App() {
  // 1. Create the state to track if a student is verified
  const [isStudentVerified, setIsStudentVerified] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        {/* 2. Pass the state to the Navbar so it knows whether to hide the button */}
        <Navbar isVerified={isStudentVerified} />
        
        <main className="flex-grow px-6 py-10 md:py-14">
          <Routes>
            {/* 3. Pass the state updater to the Portal so it can unlock the button on success */}
            <Route 
              path="/" 
              element={<VerificationPortal setIsStudentVerified={setIsStudentVerified} />} 
            />
            <Route path="/request-duplicate" element={<DuplicateRequest />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;