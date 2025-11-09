import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PolicyDetailsPage from './pages/policy_details';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import IllustrationPage from './pages/IllustrationPage';
import PolicyCal from './pages/policy_calculation';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/policy_calculate' element={<PolicyCal />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/policy_illustration' element={<IllustrationPage />} />
          <Route path="/policy_details" element={<PolicyDetailsPage />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
