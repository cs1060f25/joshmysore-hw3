import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import Banner from './components/Banner';
import Home from './pages/Home';
import Results from './pages/Results';
import Candidate from './pages/Candidate';
import Confirm from './pages/Confirm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Banner />
          <div className="pt-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/results" element={<Results />} />
              <Route path="/candidate/:id" element={<Candidate />} />
              <Route path="/confirm" element={<Confirm />} />
            </Routes>
          </div>
          <Toaster position="top-right" />
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App
